<template>
  <div>
    <!-- UNIVERSAL VIRTUAL CAMERA STAGE (ACTIVE ZOOM CUT-IN) -->
    <transition
      enter-active-class="transition-opacity duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isStandActive"
        class="fixed inset-0 z-[9900] overflow-hidden select-none"
        @click="closeStandMode"
      >
        <!-- Dark Vignette Backdrop (Click to Dismiss) -->
        <div
          class="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity duration-500"
          :class="isZoomedIn ? 'opacity-100' : 'opacity-0'"
        ></div>

        <!-- Stand Speedlines FX (Burst from Center) -->
        <div
          class="absolute inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-700"
          :class="showSpeedlineBurst ? 'opacity-85' : 'opacity-25'"
        >
          <svg class="w-full h-full" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none">
            <g :class="showSpeedlineBurst ? 'animate-pulse' : ''">
              <line x1="0" y1="0" x2="800" y2="300" stroke="currentColor" stroke-width="2.5" class="text-cyan-400/50" />
              <line x1="200" y1="0" x2="800" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
              <line x1="400" y1="0" x2="800" y2="300" stroke="currentColor" stroke-width="2" class="text-cyan-400/40" />
              <line x1="600" y1="0" x2="800" y2="300" stroke="currentColor" stroke-width="2.5" class="text-white/50" />
              <line x1="800" y1="0" x2="800" y2="300" stroke="currentColor" stroke-width="1.5" class="text-cyan-400/40" />
              <line x1="1000" y1="0" x2="800" y2="300" stroke="currentColor" stroke-width="3" class="text-cyan-400/60" />

              <line x1="1000" y1="200" x2="800" y2="300" stroke="currentColor" stroke-width="2.5" class="text-cyan-400/50" />
              <line x1="1000" y1="400" x2="800" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
              <line x1="1000" y1="600" x2="800" y2="300" stroke="currentColor" stroke-width="3" class="text-cyan-400/60" />

              <line x1="800" y1="600" x2="800" y2="300" stroke="currentColor" stroke-width="2.5" class="text-white/50" />
              <line x1="500" y1="600" x2="800" y2="300" stroke="currentColor" stroke-width="2" class="text-cyan-400/40" />
              <line x1="200" y1="600" x2="800" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
              <line x1="0" y1="600" x2="800" y2="300" stroke="currentColor" stroke-width="3" class="text-cyan-400/60" />

              <line x1="0" y1="400" x2="800" y2="300" stroke="currentColor" stroke-width="2.5" class="text-cyan-400/50" />
              <line x1="0" y1="200" x2="800" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
            </g>
          </svg>
        </div>

        <!-- Stand Typography Aura Watermark -->
        <div class="absolute inset-0 pointer-events-none z-15 flex items-center justify-end pr-8 md:pr-24 overflow-hidden">
          <span
            class="font-serif font-black text-[18vw] leading-none select-none text-cyan-400 transition-opacity duration-700 tracking-tighter"
            :style="{ opacity: config.watermarkOpacity / 100 }"
          >
            D4C
          </span>
        </div>

        <!-- DOLLY-ZOOM CAMERA CONTAINER (FLIP Transition from Anchor) -->
        <div
          class="pointer-events-auto will-change-transform flex items-end justify-center"
          :style="cameraStageStyle"
          @click.stop
        >
          <!-- Contact Floor Shadow -->
          <div
            class="absolute bottom-2 w-56 h-6 rounded-full bg-black/60 blur-md pointer-events-none transition-all duration-500"
          ></div>

          <!-- JoJo Menacing FX (ゴゴゴ...) Floating Beside Valentine -->
          <div
            class="absolute z-35 pointer-events-none select-none animate-menacing-float"
            :style="menacingWrapperStyle"
          >
            <img
              src="/images/jojo-menacing.png"
              alt="JoJo Menacing Effect"
              class="w-32 sm:w-40 md:w-52 h-auto pointer-events-none select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
              :style="menacingImageStyle"
            />
          </div>

          <!-- Manga Speech Bubble (Clickable to Cycle Quote) -->
          <div
            @click.stop="cycleQuote"
            class="absolute z-40 cursor-pointer pointer-events-auto select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            :style="bubbleStyle"
            title="Click to cycle quote / Klik untuk ganti quote"
          >
            <div class="relative bg-brand-bg text-brand-primary border-2 border-brand-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4 max-w-[240px] sm:max-w-[290px]">
              <div class="flex items-center justify-between gap-2 border-b border-brand-primary/30 pb-0.5 mb-1.5">
                <span class="font-mono text-[0.58rem] font-black tracking-widest uppercase text-cyan-600">FUNNY VALENTINE</span>
                <span class="text-[0.58rem] font-mono opacity-50">#0{{ currentQuoteIdx + 1 }}</span>
              </div>
              <p class="font-serif font-bold text-xs sm:text-sm leading-snug tracking-tight text-neutral-900">
                "{{ currentQuote }}"
              </p>
              <div class="absolute -bottom-3 left-6 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[11px] border-t-brand-primary"></div>
              <div class="absolute -bottom-2.5 left-[25px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-brand-bg"></div>
            </div>
          </div>

          <!-- Active Character Sprite: Funny Valentine with D4C Stand -->
          <div
            class="relative h-full w-full flex items-end justify-center origin-bottom cursor-pointer group"
            :style="valentineStandSpriteStyle"
            @click.stop="cycleQuote"
            title="Click to cycle quote / Click background to dismiss"
          >
            <img
              src="/images/funny-valentine-stand.png"
              alt="Funny Valentine & D4C Stand"
              class="h-full w-auto max-h-[460px] xl:max-h-[520px] object-contain object-bottom filter contrast-110 brightness-105 drop-shadow-[0_16px_48px_rgba(6,182,212,0.4)] pointer-events-none select-none transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>

          <!-- Dismiss Hint Badge -->
          <div
            class="absolute -bottom-9 z-30 transition-all duration-300 cursor-pointer"
            @click="closeStandMode"
          >
            <div class="flex items-center gap-1.5 bg-black/90 text-white border border-cyan-400/60 px-3 py-1 font-mono text-[0.62rem] tracking-wider uppercase backdrop-blur-xs shadow-xl hover:bg-neutral-900">
              <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
              <span>✕ DISMISS FOCUS (ESC)</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- LIVE CALIBRATOR DRAWER (FLOATING TOOL PANEL) -->
    <div
      v-if="showValentineAdjuster"
      class="fixed bottom-4 right-4 z-[9995] w-[330px] sm:w-[370px] bg-neutral-950/95 text-neutral-100 border border-neutral-700 shadow-2xl backdrop-blur-md p-4 font-mono text-xs select-none max-h-[88vh] overflow-y-auto no-scrollbar"
    >
      <!-- Panel Header -->
      <div class="flex items-center justify-between pb-2.5 border-b border-neutral-800">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span class="font-bold tracking-wider uppercase text-[0.72rem] text-cyan-300 font-mono">
            Valentine & D4C Calibrator
          </span>
        </div>
        <button
          type="button"
          @click="showValentineAdjuster = false"
          class="text-neutral-400 hover:text-white p-1 text-sm font-bold leading-none cursor-pointer"
          title="Close editor"
        >
          ✕
        </button>
      </div>

      <!-- Tab Selector -->
      <div class="flex items-center bg-neutral-900 border border-neutral-800 p-0.5 mt-3">
        <button
          type="button"
          @click="editorTab = 'idle'"
          class="flex-1 py-1 text-[0.62rem] font-mono uppercase font-bold transition-colors cursor-pointer"
          :class="editorTab === 'idle' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'"
        >
          1. Idle (Alone)
        </button>
        <button
          type="button"
          @click="editorTab = 'stand'"
          class="flex-1 py-1 text-[0.62rem] font-mono uppercase font-bold transition-colors cursor-pointer"
          :class="editorTab === 'stand' ? 'bg-cyan-400 text-neutral-950' : 'text-neutral-400 hover:text-white'"
        >
          2. Stand & Camera
        </button>
      </div>

      <!-- TAB 1: IDLE ALONE (Capsules Section Placement) -->
      <div v-if="editorTab === 'idle'" class="mt-3 space-y-3">
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
              <input type="range" min="-150" max="150" step="1" v-model.number="config.aloneX" class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos Y (Overlap)</span>
                <span class="text-amber-300 font-bold font-mono text-[0.62rem]">{{ config.aloneY }}px</span>
              </div>
              <input type="range" min="-400" max="150" step="1" v-model.number="config.aloneY" class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
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
            <input type="range" min="0.6" max="2.6" step="0.02" v-model.number="config.aloneScale" class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
          </div>

          <!-- Launch Stand Mode Button -->
          <button
            type="button"
            @click="openStandMode(); editorTab = 'stand'"
            class="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 font-bold text-[0.65rem] tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md mt-2"
          >
            <span>✦ TEST CAMERA ZOOM FOCUS</span>
          </button>
        </div>
      </div>

      <!-- TAB 2: STAND D4C & CAMERA FOCUS -->
      <div v-else class="mt-3 space-y-3">
        <!-- Toggle Stand Mode Button -->
        <button
          type="button"
          @click="toggleStandMode"
          class="w-full py-2 font-bold text-[0.65rem] tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md border"
          :class="isStandActive ? 'bg-red-950/80 hover:bg-red-900 text-red-200 border-red-500/60' : 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950 border-cyan-300'"
        >
          <span>{{ isStandActive ? '✕ MATIKAN D4C STAND' : '▶ PANGGIL D4C STAND' }}</span>
        </button>

        <!-- CAMERA FOCUS ZOOM -->
        <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
          <div class="flex justify-between items-center">
            <span class="text-[0.65rem] text-cyan-400 uppercase tracking-widest font-bold">
              📷 Camera Dolly Zoom
            </span>
            <span class="text-neutral-400 font-mono text-[0.58rem]">Zoom Lensa</span>
          </div>

          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.62rem] font-bold uppercase">Camera Zoom</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.65rem]">{{ config.cameraZoom.toFixed(2) }}x</span>
            </div>
            <input type="range" min="1.0" max="2.6" step="0.05" v-model.number="config.cameraZoom" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
          </div>
        </div>

        <!-- VALENTINE & STAND SPRITE ALIGNMENT -->
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

          <!-- Position X & Y -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Stand X</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.standX }}px</span>
              </div>
              <input type="range" min="-150" max="150" step="1" v-model.number="config.standX" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Stand Y</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.standY }}px</span>
              </div>
              <input type="range" min="-400" max="150" step="1" v-model.number="config.standY" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>

          <!-- Scale -->
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.62rem] font-bold uppercase">Stand Scale</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.65rem]">{{ config.standScale.toFixed(2) }}x</span>
            </div>
            <input type="range" min="0.6" max="2.6" step="0.02" v-model.number="config.standScale" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
          </div>
        </div>

        <!-- JOJO MENACING FX CONTROLS -->
        <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
          <div class="flex justify-between items-center">
            <span class="text-[0.65rem] text-purple-400 uppercase tracking-widest font-bold">
              ⚡ JoJo Menacing FX (ゴゴゴ)
            </span>
            <span class="text-neutral-500 font-mono text-[0.58rem]">Aura Stand</span>
          </div>

          <!-- FLIP HORISONTAL TOGGLE BUTTON -->
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

          <!-- Menacing Position X & Y -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos X</span>
                <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ config.menacingX }}%</span>
              </div>
              <input type="range" min="-10" max="90" step="1" v-model.number="config.menacingX" class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos Y</span>
                <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ config.menacingY }}%</span>
              </div>
              <input type="range" min="0" max="90" step="1" v-model.number="config.menacingY" class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>

          <!-- Menacing Scale & Opacity -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Scale</span>
                <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ config.menacingScale.toFixed(2) }}x</span>
              </div>
              <input type="range" min="0.4" max="2.5" step="0.05" v-model.number="config.menacingScale" class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Opacity</span>
                <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ config.menacingOpacity }}%</span>
              </div>
              <input type="range" min="10" max="100" step="5" v-model.number="config.menacingOpacity" class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>
        </div>

        <!-- Speech Bubble Controls -->
        <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
          <div class="text-[0.65rem] text-cyan-400 uppercase tracking-widest font-bold">
            💬 Manga Speech Bubble
          </div>

          <!-- Bubble X & Y -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Bubble X</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.bubbleX }}%</span>
              </div>
              <input type="range" min="0" max="85" step="1" v-model.number="config.bubbleX" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Bubble Y</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.bubbleY }}%</span>
              </div>
              <input type="range" min="0" max="80" step="1" v-model.number="config.bubbleY" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>

          <!-- Bubble Scale & Rotate -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Scale</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.bubbleScale.toFixed(2) }}x</span>
              </div>
              <input type="range" min="0.6" max="1.5" step="0.02" v-model.number="config.bubbleScale" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Rotate</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.bubbleRotate }}°</span>
              </div>
              <input type="range" min="-25" max="25" step="1" v-model.number="config.bubbleRotate" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>

          <!-- Cycle Quote in Editor -->
          <button
            type="button"
            @click="cycleQuote"
            class="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-cyan-800/60 text-cyan-300 text-[0.62rem] uppercase font-bold tracking-wider cursor-pointer"
          >
            Ganti Quote (Saat ini: "{{ currentQuote.substring(0, 24) }}...")
          </button>
        </div>

        <!-- Watermark Opacity -->
        <div class="bg-neutral-900/90 p-2 border border-neutral-800">
          <div class="flex justify-between items-center mb-1">
            <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">D4C Watermark Opacity</span>
            <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ config.watermarkOpacity }}%</span>
          </div>
          <input type="range" min="0" max="35" step="1" v-model.number="config.watermarkOpacity" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
        </div>
      </div>

      <!-- Reset & Copy Buttons for Valentine -->
      <div class="mt-3 flex gap-2 pt-2 border-t border-neutral-800">
        <button
          type="button"
          @click="resetConfig"
          class="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[0.62rem] text-neutral-300 uppercase tracking-wider cursor-pointer"
        >
          Reset Valentine
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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useValentineStage } from '@/composables/useValentineStage'

const {
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
  openStandMode,
  closeStandMode,
  toggleStandMode,
  cycleQuote,
  matchStandToIdle,
  resetConfig,
  copyConfig,
} = useValentineStage()

const cameraStageStyle = computed(() => {
  if (!targetRect.value) {
    return {
      position: 'fixed' as const,
      right: '8%',
      bottom: '12%',
      width: '420px',
      height: '520px',
      transform: isZoomedIn.value ? `scale(${config.value.cameraZoom})` : 'scale(1)',
      transformOrigin: `${config.value.cameraOriginX}% ${config.value.cameraOriginY}%`,
      transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease',
    }
  }

  return {
    position: 'fixed' as const,
    left: `${targetRect.value.left}px`,
    top: `${targetRect.value.top}px`,
    width: `${targetRect.value.width}px`,
    height: `${targetRect.value.height}px`,
    transform: isZoomedIn.value ? `scale(${config.value.cameraZoom})` : 'scale(1)',
    transformOrigin: `${config.value.cameraOriginX}% ${config.value.cameraOriginY}%`,
    transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease',
  }
})

const valentineStandSpriteStyle = computed(() => {
  return {
    transform: `translate(${config.value.standX}px, ${config.value.standY}px) scale(${config.value.standScale})`,
  }
})

const menacingWrapperStyle = computed(() => {
  return {
    left: `${config.value.menacingX}%`,
    top: `${config.value.menacingY}%`,
  }
})

const menacingImageStyle = computed(() => {
  const flipFactor = config.value.menacingFlip ? -1 : 1
  return {
    transform: `scale(${config.value.menacingScale}) scaleX(${flipFactor})`,
    opacity: config.value.menacingOpacity / 100,
    transformOrigin: 'center center',
  }
})

const bubbleStyle = computed(() => {
  return {
    left: `${config.value.bubbleX}%`,
    top: `${config.value.bubbleY}%`,
    transform: `rotate(${config.value.bubbleRotate}deg) scale(${config.value.bubbleScale})`,
    transformOrigin: 'bottom left',
  }
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (isStandActive.value) {
      closeStandMode()
    } else if (showValentineAdjuster.value) {
      showValentineAdjuster.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
@keyframes menacingFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(-1.5deg);
  }
}

.animate-menacing-float {
  animation: menacingFloat 2.4s ease-in-out infinite;
}
</style>
