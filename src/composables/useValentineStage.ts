import { ref, computed, watch } from 'vue'

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
  cameraZoom: 1.85,
  cameraOriginX: 84,
  cameraOriginY: 36,

  aloneX: 0,
  aloneY: -151,
  aloneScale: 2.02,

  standX: 0,
  standY: -160,
  standScale: 1.15,

  menacingX: 12,
  menacingY: 20,
  menacingScale: 1.0,
  menacingOpacity: 85,
  menacingFlip: false,

  bubbleX: 6,
  bubbleY: 20,
  bubbleRotate: -2,
  bubbleScale: 1.0,

  watermarkOpacity: 6,
}

const STORAGE_KEY = 'araki_valentine_universal_v1'

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

// Global shared state across components
const config = ref<ValentineConfig>(loadSavedConfig())
const isStandActive = ref(false)
const isZoomedIn = ref(false)
const showSpeedlineBurst = ref(false)
const showValentineAdjuster = ref(false)
const editorTab = ref<'idle' | 'stand'>('idle')
const currentQuoteIdx = ref(0)
const copySuccess = ref(false)
const targetRect = ref<{ left: number; top: number; width: number; height: number } | null>(null)

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
  const setTargetRect = (rect: { left: number; top: number; width: number; height: number }) => {
    targetRect.value = {
      left: Math.round(rect.left),
      top: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    }
  }

  const openStandMode = () => {
    isStandActive.value = true
    showSpeedlineBurst.value = true
    
    // Animate camera zoom in next frame for FLIP transition
    requestAnimationFrame(() => {
      isZoomedIn.value = true
    })

    setTimeout(() => {
      showSpeedlineBurst.value = false
    }, 450)
  }

  const closeStandMode = () => {
    isZoomedIn.value = false
    setTimeout(() => {
      isStandActive.value = false
    }, 400)
  }

  const toggleStandMode = () => {
    if (isStandActive.value) {
      closeStandMode()
    } else {
      openStandMode()
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
    isZoomedIn,
    showSpeedlineBurst,
    showValentineAdjuster,
    editorTab,
    currentQuoteIdx,
    currentQuote,
    copySuccess,
    targetRect,
    setTargetRect,
    openStandMode,
    closeStandMode,
    toggleStandMode,
    cycleQuote,
    matchStandToIdle,
    resetConfig,
    copyConfig,
  }
}
