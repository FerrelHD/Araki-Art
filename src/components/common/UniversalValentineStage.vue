<template>
  <!-- TACTICAL POSITION & CAMERA CALIBRATOR DRAWER (ACCESSIBLE VIA SHIFT + C OR BUTTON) -->
  <div
    v-if="showValentineAdjuster"
    class="fixed bottom-4 right-4 z-[9995] w-[340px] sm:w-[380px] bg-neutral-950/95 text-neutral-100 border border-neutral-700 shadow-2xl backdrop-blur-md p-4 font-mono text-xs select-none max-h-[88vh] overflow-y-auto no-scrollbar"
  >
    <!-- Panel Header -->
    <div class="flex items-center justify-between pb-2.5 border-b border-neutral-800">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span class="font-bold tracking-wider uppercase text-[0.72rem] text-cyan-300 font-mono">
          Valentine & Camera Calibrator
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[0.55rem] text-neutral-500 font-mono hidden sm:inline">[SHIFT + C]</span>
        <button
          type="button"
          @click="showValentineAdjuster = false"
          class="text-neutral-400 hover:text-white p-1 text-sm font-bold leading-none cursor-pointer"
          title="Close editor (Shift+C)"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- 4 Tabs Navigation (Persona 5 Calibrator Style) -->
    <div class="grid grid-cols-4 bg-neutral-900 border border-neutral-800 p-0.5 mt-3 gap-0.5">
      <button
        type="button"
        @click="editorTab = 'char'"
        class="py-1 text-[0.58rem] font-mono uppercase font-bold transition-colors cursor-pointer text-center"
        :class="editorTab === 'char' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'"
      >
        1. Idle
      </button>
      <button
        type="button"
        @click="editorTab = 'camera'"
        class="py-1 text-[0.58rem] font-mono uppercase font-bold transition-colors cursor-pointer text-center"
        :class="editorTab === 'camera' ? 'bg-cyan-400 text-neutral-950' : 'text-neutral-400 hover:text-white'"
      >
        2. Camera
      </button>
      <button
        type="button"
        @click="editorTab = 'kanji'"
        class="py-1 text-[0.58rem] font-mono uppercase font-bold transition-colors cursor-pointer text-center"
        :class="editorTab === 'kanji' ? 'bg-purple-400 text-neutral-950' : 'text-neutral-400 hover:text-white'"
      >
        3. Stand
      </button>
      <button
        type="button"
        @click="editorTab = 'bubble'"
        class="py-1 text-[0.58rem] font-mono uppercase font-bold transition-colors cursor-pointer text-center"
        :class="editorTab === 'bubble' ? 'bg-emerald-400 text-neutral-950' : 'text-neutral-400 hover:text-white'"
      >
        4. Bubble
      </button>
    </div>

    <!-- ── TAB 1: IDLE ALONE (Capsules Section Placement) ── -->
    <div v-if="editorTab === 'char'" class="mt-3 space-y-3">
      <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
        <div class="flex justify-between items-center">
          <span class="text-[0.65rem] text-amber-400 uppercase tracking-widest font-bold">
            Valentine (Idle State)
          </span>
          <span class="text-amber-400/80 font-mono text-[0.58rem]">Overlap Banner Atas</span>
        </div>

        <!-- Position X & Y -->
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos X</span>
              <span class="text-amber-300 font-bold font-mono text-[0.62rem]">{{ config.aloneX }}px</span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              step="1"
              v-model.number="config.aloneX"
              class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos Y (Overlap)</span>
              <span class="text-amber-300 font-bold font-mono text-[0.62rem]">{{ config.aloneY }}px</span>
            </div>
            <input
              type="range"
              min="-400"
              max="150"
              step="1"
              v-model.number="config.aloneY"
              class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
        </div>

        <!-- Quick Overlap Presets for Alone -->
        <div class="flex gap-1">
          <button
            type="button"
            @click="config.aloneY = -151"
            class="flex-1 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-[0.55rem] text-amber-300/90 cursor-pointer"
          >
            Overlap (-151)
          </button>
          <button
            type="button"
            @click="config.aloneY = -220"
            class="flex-1 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-[0.55rem] text-amber-300/90 cursor-pointer"
          >
            Tinggi (-220)
          </button>
          <button
            type="button"
            @click="config.aloneY = -20"
            class="flex-1 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-[0.55rem] text-neutral-400 cursor-pointer"
          >
            Rata (-20)
          </button>
        </div>

        <!-- Scale -->
        <div class="bg-neutral-900/90 p-2 border border-neutral-800">
          <div class="flex justify-between items-center mb-1">
            <span class="text-neutral-300 text-[0.62rem] font-bold uppercase">Scale</span>
            <span class="text-amber-300 font-bold font-mono text-[0.65rem]">{{ config.aloneScale.toFixed(2) }}x</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="2.6"
            step="0.02"
            v-model.number="config.aloneScale"
            class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
          />
        </div>
      </div>
    </div>

    <!-- ── TAB 2: VIRTUAL CAMERA & FOCUS (PERSONA 5 CAMERA LOGIC) ── -->
    <div v-else-if="editorTab === 'camera'" class="mt-3 space-y-3">
      <!-- Toggle Stand Focus Preview -->
      <button
        type="button"
        @click="toggleStandMode()"
        class="w-full py-2 font-bold text-[0.65rem] tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md border"
        :class="isStandActive ? 'bg-red-950/80 hover:bg-red-900 text-red-200 border-red-500/60' : 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950 border-cyan-300'"
      >
        <span>{{ isStandActive ? '✕ RESET CAMERA ZOOM (ESC)' : '▶ PREVIEW CAMERA ZOOM FOCUS' }}</span>
      </button>

      <!-- Camera Zoom Scale -->
      <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
        <div class="flex justify-between items-center">
          <span class="text-[0.65rem] text-cyan-400 uppercase tracking-widest font-bold">
            📷 Camera Dolly Zoom
          </span>
          <span class="text-neutral-400 font-mono text-[0.58rem]">Lensa Zoom</span>
        </div>

        <div class="bg-neutral-900/90 p-2 border border-neutral-800">
          <div class="flex justify-between items-center mb-1">
            <span class="text-neutral-300 text-[0.62rem] font-bold uppercase">Zoom Level</span>
            <span class="text-cyan-300 font-bold font-mono text-[0.65rem]">{{ config.cameraZoom.toFixed(2) }}x</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="2.6"
            step="0.05"
            v-model.number="config.cameraZoom"
            class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
          />
        </div>

        <!-- Camera Focus Origin X & Y -->
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Origin X</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.cameraOriginX }}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="1"
              v-model.number="config.cameraOriginX"
              @input="onCameraOriginChange"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Origin Y</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.cameraOriginY }}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="1"
              v-model.number="config.cameraOriginY"
              @input="onCameraOriginChange"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
        </div>

        <button
          type="button"
          @click="resetCameraOrigin"
          class="w-full py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-[0.6rem] cursor-pointer"
        >
          [🎯 Reset Titik Tumpu (84%, 36%)]
        </button>
      </div>
    </div>

    <!-- ── TAB 3: STAND D4C & MENACING KANJI ── -->
    <div v-else-if="editorTab === 'kanji'" class="mt-3 space-y-3">
      <!-- Stand Sprite Placement -->
      <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
        <div class="flex justify-between items-center">
          <span class="text-[0.65rem] text-cyan-400 uppercase tracking-widest font-bold">
            Figur Valentine & D4C
          </span>
          <button
            type="button"
            @click="matchStandToIdle"
            class="text-[0.55rem] font-mono text-cyan-300 hover:text-white underline cursor-pointer"
          >
            [Salin Pos X/Y Idle]
          </button>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Stand X</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.standX }}px</span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              step="1"
              v-model.number="config.standX"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Stand Y</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.standY }}px</span>
            </div>
            <input
              type="range"
              min="-400"
              max="150"
              step="1"
              v-model.number="config.standY"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
        </div>

        <div class="bg-neutral-900/90 p-2 border border-neutral-800">
          <div class="flex justify-between items-center mb-1">
            <span class="text-neutral-300 text-[0.62rem] font-bold uppercase">Stand Scale</span>
            <span class="text-cyan-300 font-bold font-mono text-[0.65rem]">{{ config.standScale.toFixed(2) }}x</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="2.6"
            step="0.02"
            v-model.number="config.standScale"
            class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
          />
        </div>
      </div>

      <!-- JoJo Menacing Kanji FX -->
      <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
        <div class="flex justify-between items-center">
          <span class="text-[0.65rem] text-purple-400 uppercase tracking-widest font-bold">
            ⚡ JoJo Menacing FX (ゴゴゴ)
          </span>
          <span class="text-neutral-500 font-mono text-[0.58rem]">Kanji Stand</span>
        </div>

        <button
          type="button"
          @click="config.menacingFlip = !config.menacingFlip"
          class="w-full py-1.5 font-mono text-[0.65rem] tracking-wider uppercase font-bold border transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          :class="config.menacingFlip ? 'bg-purple-700 hover:bg-purple-600 text-white border-purple-400' : 'bg-neutral-900 hover:bg-neutral-800 text-purple-300 border-neutral-700'"
        >
          <span>ARAH KANJI (FLIP):</span>
          <span class="px-2 py-0.5 rounded text-[0.62rem] font-bold" :class="config.menacingFlip ? 'bg-yellow-400 text-neutral-950' : 'bg-neutral-800 text-purple-300 border border-purple-500/30'">
            {{ config.menacingFlip ? 'FLIPPED (MIRROR) ⇌' : 'NORMAL ⇋' }}
          </span>
        </button>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos X</span>
              <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ config.menacingX }}%</span>
            </div>
            <input
              type="range"
              min="-10"
              max="90"
              step="1"
              v-model.number="config.menacingX"
              class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos Y</span>
              <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ config.menacingY }}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="1"
              v-model.number="config.menacingY"
              class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Scale</span>
              <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ config.menacingScale.toFixed(2) }}x</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.5"
              step="0.05"
              v-model.number="config.menacingScale"
              class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Opacity</span>
              <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ config.menacingOpacity }}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              v-model.number="config.menacingOpacity"
              class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
        </div>
      </div>

      <!-- Stand Manifestation Flash FX (Anime Burst) -->
      <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
        <div class="flex justify-between items-center">
          <span class="text-[0.65rem] text-cyan-400 uppercase tracking-widest font-bold">
            ✨ Manifestation Flash FX
          </span>
          <button
            type="button"
            @click="triggerFlash(600)"
            class="px-2 py-0.5 text-[0.58rem] font-mono bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold uppercase cursor-pointer shadow-sm transition-colors"
            title="Preview flash animation"
          >
            ⚡ Test Flash
          </button>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Flash X</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.flashX ?? -84 }}px</span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              step="1"
              v-model.number="config.flashX"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Flash Y</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.flashY ?? -200 }}px</span>
            </div>
            <input
              type="range"
              min="-350"
              max="50"
              step="1"
              v-model.number="config.flashY"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
        </div>

        <div class="bg-neutral-900/90 p-2 border border-neutral-800">
          <div class="flex justify-between items-center mb-1">
            <span class="text-neutral-300 text-[0.62rem] font-bold uppercase">Flash Scale / Size</span>
            <span class="text-cyan-300 font-bold font-mono text-[0.65rem]">{{ (config.flashScale ?? 1.25).toFixed(2) }}x</span>
          </div>
          <input
            type="range"
            min="0.3"
            max="2.0"
            step="0.05"
            v-model.number="config.flashScale"
            class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
          />
        </div>
      </div>
    </div>

    <!-- ── TAB 4: MANGA SPEECH BUBBLE ── -->
    <div v-else class="mt-3 space-y-3">
      <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
        <div class="text-[0.65rem] text-cyan-400 uppercase tracking-widest font-bold">
          💬 Manga Speech Bubble
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Bubble X</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.bubbleX }}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="85"
              step="1"
              v-model.number="config.bubbleX"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Bubble Y</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.bubbleY }}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="1"
              v-model.number="config.bubbleY"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Scale</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.bubbleScale.toFixed(2) }}x</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.5"
              step="0.02"
              v-model.number="config.bubbleScale"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Rotate</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.bubbleRotate }}°</span>
            </div>
            <input
              type="range"
              min="-25"
              max="25"
              step="1"
              v-model.number="config.bubbleRotate"
              class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none"
            />
          </div>
        </div>

        <button
          type="button"
          @click="cycleQuote"
          class="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-cyan-800/60 text-cyan-300 text-[0.62rem] uppercase font-bold tracking-wider cursor-pointer"
        >
          Ganti Quote (Saat ini: "{{ currentQuote.substring(0, 24) }}...")
        </button>
      </div>
    </div>

    <!-- Panel Footer: Reset & Copy Buttons -->
    <div class="mt-3 flex gap-2 pt-2 border-t border-neutral-800">
      <button
        type="button"
        @click="resetConfig"
        class="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[0.62rem] text-neutral-300 uppercase tracking-wider cursor-pointer"
      >
        Reset Default
      </button>
      <button
        type="button"
        @click="copyConfig"
        class="flex-1 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-[0.65rem] tracking-wider uppercase transition-colors cursor-pointer"
      >
        {{ copySuccess ? '✓ COPIED!' : '📋 COPY CONFIG (TS)' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useValentineStage, defaultValentineConfig } from '@/composables/useValentineStage'

const {
  config,
  isStandActive,
  triggerFlash,
  showValentineAdjuster,
  editorTab,
  currentQuote,
  copySuccess,
  lastFocusOrigin,
  toggleStandMode,
  cycleQuote,
  matchStandToIdle,
  resetConfig,
  copyConfig,
} = useValentineStage()

const onCameraOriginChange = () => {
  if (isStandActive.value) {
    lastFocusOrigin.value = {
      originX: config.value.cameraOriginX,
      originY: config.value.cameraOriginY,
    }
  }
}

const resetCameraOrigin = () => {
  config.value.cameraOriginX = defaultValentineConfig.cameraOriginX
  config.value.cameraOriginY = defaultValentineConfig.cameraOriginY
  lastFocusOrigin.value = {
    originX: defaultValentineConfig.cameraOriginX,
    originY: defaultValentineConfig.cameraOriginY,
  }
}
</script>
