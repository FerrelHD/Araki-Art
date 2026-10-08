import { ref, computed, watch } from 'vue'
import { lenis } from '@/lenis'

export interface ValentineConfig {
  // Camera Zoom Focus
  cameraZoom: number
  cameraOriginX: number
  cameraOriginY: number

  // Idle Mode (Alone in #capsules section)
  aloneX: number
  aloneY: number
  aloneScale: number

  // Stand Mode (With D4C)
  standX: number
  standY: number
  standScale: number

  // JoJo Menacing FX (ゴゴゴ)
  menacingX: number
  menacingY: number
  menacingScale: number
  menacingOpacity: number
  menacingFlip: boolean

  // Manga Speech Bubble
  bubbleX: number
  bubbleY: number
  bubbleRotate: number
  bubbleScale: number

  // Stand Watermark D4C
  watermarkOpacity: number
}

export const defaultValentineConfig: ValentineConfig = {
  cameraZoom: 1.1,
  cameraOriginX: 84,
  cameraOriginY: 46,

  aloneX: -80,
  aloneY: 14,
  aloneScale: 1.28,

  standX: -150,
  standY: 19,
  standScale: 1.6,

  menacingX: 47,
  menacingY: 0,
  menacingScale: 1.25,
  menacingOpacity: 85,
  menacingFlip: false,

  bubbleX: 45,
  bubbleY: 0,
  bubbleRotate: 6,
  bubbleScale: 1.28,

  watermarkOpacity: 6,
}

const STORAGE_KEY = 'araki_valentine_universal_v5'

const loadSavedConfig = (): ValentineConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return { ...defaultValentineConfig, ...JSON.parse(raw) }
    }
  } catch {
    // ignore
  }
  return { ...defaultValentineConfig }
}

// Global shared state across components (Persona 5 SkillsScreen architecture)
const config = ref<ValentineConfig>(loadSavedConfig())
const isStandActive = ref(false)
const showValentineAdjuster = ref(false)
const editorTab = ref<'char' | 'camera' | 'bubble' | 'kanji'>('char')
const currentQuoteIdx = ref(0)
const copySuccess = ref(false)

// Track the focal camera origin so zoom-out scales back from the exact same point without jerking
const lastFocusOrigin = ref<{ originX: number; originY: number }>({
  originX: config.value.cameraOriginX,
  originY: config.value.cameraOriginY,
})

export const valentineQuotes = [
  "Dojyaaa~~n!",
  "Suppose that you were sitting down at this table... Which napkin would you take?",
  "My heart and actions are utterly unclouded... They are all those of 'Justice'.",
  "The one who took the first napkin determines the rules.",
  "D4C! Dirty Deeds Done Dirt Cheap!",
]

const currentQuote = computed(() => valentineQuotes[currentQuoteIdx.value])

watch(
  config,
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config.value))
    } catch {
      // ignore
    }
  },
  { deep: true }
)

export function useValentineStage() {
  const handleSelectValentine = (origin?: { originX: number; originY: number }) => {
    lastFocusOrigin.value = origin || {
      originX: config.value.cameraOriginX,
      originY: config.value.cameraOriginY,
    }

    isStandActive.value = true

    try {
      lenis?.stop?.()
    } catch {
      // ignore
    }
  }

  const handleResetCamera = () => {
    isStandActive.value = false
    // NOTE: lastFocusOrigin is deliberately preserved so that CSS transform-origin
    // stays pinned to the character's focus point while the camera smoothly scales back down to 1!

    try {
      lenis?.start?.()
    } catch {
      // ignore
    }
  }

  const toggleStandMode = (origin?: { originX: number; originY: number } | Event) => {
    if (isStandActive.value) {
      handleResetCamera()
    } else {
      const validOrigin = (origin && 'originX' in origin && typeof origin.originX === 'number')
        ? (origin as { originX: number; originY: number })
        : undefined
      handleSelectValentine(validOrigin)
    }
  }

  const cycleQuote = () => {
    currentQuoteIdx.value = (currentQuoteIdx.value + 1) % valentineQuotes.length
  }

  const matchStandToIdle = () => {
    config.value.standX = config.value.aloneX
    config.value.standY = config.value.aloneY
  }

  const resetConfig = () => {
    config.value = { ...defaultValentineConfig }
    lastFocusOrigin.value = {
      originX: defaultValentineConfig.cameraOriginX,
      originY: defaultValentineConfig.cameraOriginY,
    }
    localStorage.removeItem(STORAGE_KEY)
  }

  const copyConfig = () => {
    const text = `// Funny Valentine & D4C Positioning\nconst valentineConfig = ${JSON.stringify(config.value, null, 2)};`
    navigator.clipboard.writeText(text).then(() => {
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    })
  }

  return {
    config,
    isStandActive,
    showValentineAdjuster,
    editorTab,
    currentQuoteIdx,
    currentQuote,
    copySuccess,
    lastFocusOrigin,
    handleSelectValentine,
    handleResetCamera,
    toggleStandMode,
    cycleQuote,
    matchStandToIdle,
    resetConfig,
    copyConfig,
  }
}
