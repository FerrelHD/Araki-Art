<template>
  <section
    id="capsules"
    ref="capsulesRoot"
    class="border-b border-grid text-brand-primary overflow-visible relative z-30 h-screen max-h-screen flex flex-col justify-between"
  >
    <div class="grid grid-cols-4 md:grid-cols-12 flex-1 min-h-0 overflow-visible relative z-20">
      <!-- 10 Columns Centered Container -->
      <div
        class="col-span-4 md:col-span-10 md:col-start-2 border-x border-grid flex flex-col justify-between min-h-0 pt-12 md:pt-14 xl:pt-16 overflow-visible relative"
      >
        <!-- Section Title (Compact Editorial Bar) -->
        <div class="border-b border-grid px-4 py-2 sm:px-6 sm:py-2.5 overflow-hidden flex items-baseline justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2.5 mb-0.5">
              <p class="text-[0.58rem] font-bold tracking-[0.2em] uppercase font-mono opacity-60">
                selected
              </p>
              <span class="text-xs opacity-20">/</span>
              <span class="font-mono text-[0.58rem] tracking-widest uppercase opacity-40">
                MANGA COVER ARCHIVE · 01-09
              </span>
            </div>
            <div class="overflow-hidden">
              <h2
                ref="headingRef"
                class="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-[-0.06em] leading-none will-change-transform"
              >
                capsules.
              </h2>
            </div>
          </div>
          <!-- Mobile/Tablet Valentine Trigger (< lg) -->
          <div class="lg:hidden flex items-center">
            <button
              type="button"
              @click="handleValentineMobileTrigger"
              class="flex items-center gap-1.5 px-2.5 py-1 text-[0.62rem] font-mono tracking-wider uppercase border border-grid bg-brand-bg text-brand-primary hover:bg-brand-primary hover:text-brand-bg transition-colors cursor-pointer select-none"
              title="Summon Funny Valentine & D4C"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>✦ D4C MUSE</span>
            </button>
          </div>
        </div>

        <!-- Slider Main Grid (Clean Static Layout) -->
        <div
          class="grid grid-cols-4 md:grid-cols-10 flex-1 min-h-0 overflow-visible relative"
        >
          <!-- Left 6 Columns: Interactive Capsule Card & Vertical Thumbnails (snug, zero space kosong) -->
          <div
            class="relative z-10 col-span-4 md:col-span-10 lg:col-span-6 lg:border-r border-grid flex flex-col justify-between min-h-0 overflow-hidden bg-brand-bg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            :class="isStandActive ? 'opacity-20 brightness-90 cursor-pointer select-none pointer-events-none' : 'opacity-100 brightness-100'"
            :title="isStandActive ? 'Klik latar belakang untuk kembali (ESC)' : ''"
          >
            <!-- Top Container: Vertical Thumbnails Strip + Active Project Showcase (Stretched to PREV/NEXT) -->
            <div class="flex flex-1 border-b border-grid min-h-0 overflow-hidden">
              
              <!-- Left Vertical Thumbnail Strip (Hover to switch 9 Parts, compact flex-1) -->
              <div
                class="flex w-12 sm:w-14 md:w-16 shrink-0 flex-col border-r border-grid select-none overflow-hidden h-full"
              >
                <button
                  v-for="(_, idx) in capsules"
                  :key="capsules[idx].id"
                  type="button"
                  @mouseenter="goToSlide(idx)"
                  @click="goToSlide(idx)"
                  class="relative w-full flex-1 min-h-0 cursor-pointer overflow-hidden border-b last:border-b-0 border-grid transition-all duration-300 group"
                  :class="activeIdx === idx ? 'opacity-100 ring-2 ring-inset ring-brand-primary' : 'opacity-40 hover:opacity-90'"
                  :aria-label="'Select ' + capsules[idx].title"
                >
                  <img
                    :src="capsules[idx].image"
                    :alt="capsules[idx].title"
                    class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <!-- Small number index on thumbnail -->
                  <span class="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[0.48rem] font-mono px-0.5 font-bold leading-none">
                    0{{ idx + 1 }}
                  </span>
                </button>
              </div>

              <!-- Right: Sliding Carousel Viewport (Mijobello style horizontal track) -->
              <div
                class="min-w-0 flex-1 overflow-hidden relative flex flex-col bg-brand-bg min-h-0 select-none"
                @touchstart.passive="handleTouchStart"
                @touchend.passive="handleTouchEnd"
                @mousedown="handleMouseDown"
                @mouseup="handleMouseUp"
                @mouseleave="handleMouseLeave"
              >
                <!-- Horizontal Track with signature Mijobello cubic-bezier easing -->
                <div
                  class="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
                  :style="{ transform: `translateX(-${activeIdx * 100}%)` }"
                >
                  <div
                    v-for="(capsule, idx) in capsules"
                    :key="capsule.id"
                    class="w-full h-full shrink-0 flex flex-col sm:flex-row min-h-0 overflow-hidden"
                  >
                    <!-- SISI KIRI: Cover Manga Pas (Snug Framing, Zero Space Kosong) -->
                    <div class="capsule-cover-wrapper relative h-1/2 sm:h-full w-full sm:w-[48%] md:w-[46%] shrink-0 border-b sm:border-b-0 sm:border-r border-grid overflow-hidden bg-black/5 select-none min-h-0">
                      <div class="capsule-cover-inner w-full h-full overflow-hidden flex items-center justify-center">
                        <img
                          :src="capsule.image"
                          :alt="capsule.title"
                          class="h-full w-full object-cover transition-transform duration-500 ease-out select-none"
                          :style="getCoverStyle(idx)"
                        />
                      </div>
                      <div class="absolute inset-0 bg-brand-primary/[0.03] pointer-events-none z-10"></div>
                    </div>

                    <!-- SISI KANAN: Capsule Information Panel (Gaya A: Dark Editorial, Clean, Breathing Room) -->
                    <div
                      class="flex-1 bg-brand-primary text-brand-bg p-4 sm:p-5 lg:p-5 xl:p-7 2xl:p-8 flex flex-col justify-between min-h-0 overflow-y-auto no-scrollbar"
                    >
                      <!-- Bagian Atas: Metadata, Judul, Kategori & Sinopsis dengan Spasi Bernapas -->
                      <div class="flex flex-col gap-2 sm:gap-2.5 lg:gap-2.5 xl:gap-3.5">
                        <!-- Label Arsip Monospace -->
                        <div class="flex items-center gap-2 opacity-50 font-mono text-[0.55rem] sm:text-[0.62rem] tracking-[0.2em] uppercase">
                          <span>ARCHIVE COLLECTION</span>
                          <span>·</span>
                          <span>VOL. 0{{ idx + 1 }}</span>
                        </div>

                        <!-- Judul Part (Clean Display Typography) -->
                        <h3 class="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold tracking-tight leading-[1.15] text-brand-bg">
                          {{ capsule.title }}
                        </h3>

                        <!-- Era & Kategori (Clean Monospace, Tanpa Badge/Card) -->
                        <p class="font-mono text-[0.6rem] sm:text-[0.68rem] tracking-[0.16em] uppercase opacity-75">
                          {{ capsule.category }} · {{ capsule.year }}
                        </p>

                        <!-- Sinopsis Editorial dengan Breathing Room Lega -->
                        <p class="text-xs sm:text-[0.82rem] md:text-sm lg:text-[0.82rem] xl:text-sm leading-relaxed opacity-85 font-sans font-light max-w-[42ch]">
                          {{ capsule.summary }}
                        </p>

                        <!-- Tags Karakter & Motif (Clean Slash-Separated, Tanpa Badge/Pill) -->
                        <div
                          v-if="capsule.tags && capsule.tags.length"
                          class="pt-1 sm:pt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.58rem] sm:text-[0.65rem] tracking-wider opacity-60"
                        >
                          <span v-for="(tag, tIdx) in capsule.tags" :key="tag">
                            {{ tag }}<span v-if="tIdx < capsule.tags.length - 1" class="ml-2 opacity-35">/</span>
                          </span>
                        </div>
                      </div>

                      <!-- Bagian Bawah: Tombol View Archive di Paling Bawah Rata Kanan -->
                      <div class="pt-3 sm:pt-3.5 xl:pt-4 border-t border-brand-bg/15 flex items-center justify-between shrink-0 mt-2.5 sm:mt-3 xl:mt-4">
                        <span class="font-mono text-[0.55rem] sm:text-[0.58rem] tracking-widest uppercase opacity-40 hidden sm:inline">
                          OFFICIAL ARCHIVE
                        </span>
                        <a
                          :href="capsule.link"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group/roll inline-flex items-center gap-1.5 sm:gap-2 text-[0.68rem] sm:text-xs xl:text-[0.78rem] font-mono font-medium tracking-[0.16em] uppercase text-brand-bg hover:opacity-75 transition-opacity cursor-pointer ml-auto"
                        >
                          <RollingText text="view archive" />
                          <span class="text-xs xl:text-[0.78rem] transition-transform duration-300 group-hover/roll:translate-x-1">></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Prev / Next Nav Buttons (50% / 50% split) -->
            <div class="flex h-9 sm:h-10 md:h-11 border-b border-grid shrink-0">
              <button
                type="button"
                @click="prevSlide"
                aria-label="Previous capsule"
                class="flex flex-1 cursor-pointer items-center justify-center border-r border-grid text-xs sm:text-sm font-mono tracking-wider transition-colors hover:bg-brand-primary hover:text-brand-bg select-none"
              >
                ← PREV
              </button>
              <button
                type="button"
                @click="nextSlide"
                aria-label="Next capsule"
                class="flex flex-1 cursor-pointer items-center justify-center text-xs sm:text-sm font-mono tracking-wider transition-colors hover:bg-brand-primary hover:text-brand-bg select-none"
              >
                NEXT →
              </button>
            </div>
          </div>

          <!-- Right 4 Columns: High-Fashion Freestanding Muse (Funny Valentine & D4C) -->
          <div
            class="group/side relative z-[55] overflow-visible px-4 pb-2 select-none"
            :class="isStandActive ? 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs lg:relative lg:inset-auto lg:z-[55] lg:col-span-4 lg:flex lg:flex-col lg:justify-end lg:p-0 lg:px-4 lg:pb-2 lg:bg-brand-primary/[0.015] lg:border-b lg:border-grid min-h-0' : 'hidden lg:col-span-4 lg:flex lg:flex-col lg:justify-end bg-brand-primary/[0.015] border-b border-grid min-h-0'"
          >


            <!-- Watermark Background ("D4C") -->
            <div
              class="valentine-watermark absolute font-mono font-bold leading-none select-none pointer-events-none transition-opacity duration-500"
              :class="isStandActive ? 'opacity-15 text-cyan-400' : 'opacity-5 text-current'"
              :style="{ top: '-24px', right: '8px', fontSize: '8rem' }"
            >
              D4C
            </div>

            <!-- Freestanding Muse Stage -->
            <div
              class="relative z-20 w-full flex-1 min-h-0 flex items-end justify-center overflow-visible pointer-events-auto cursor-pointer group/muse"
              @click="handleValentineClick"
              :title="isStandActive ? 'Click to cycle quote / Klik untuk ganti quote' : 'Click to summon D4C // Anime Snap Zoom'"
            >

              <!-- Mode 1: Alone - Funny Valentine Idle -->
              <div
                class="relative h-full w-full flex items-end justify-center origin-bottom transition-opacity duration-300 ease-out will-change-opacity"
                :class="isStandActive ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-none group-hover/muse:brightness-105'"
                :style="getValentineAloneStyle()"
              >
                <img
                  src="/images/funny-valentine-alone.png"
                  alt="Funny Valentine (President)"
                  loading="eager"
                  decoding="async"
                  class="valentine-idle-img h-[85%] max-h-[65vh] xl:max-h-[75vh] w-auto object-contain object-bottom filter contrast-105 pointer-events-none select-none"
                />
              </div>

              <!-- Mode 2: Stand - Funny Valentine with D4C Manifestation -->
              <div
                class="absolute inset-0 h-full w-full flex items-end justify-center origin-bottom transition-opacity duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-opacity"
                :class="isStandActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
                :style="{ ...getValentineStandStyle(), transitionDelay: isStandActive ? '80ms' : '0ms' }"
              >
                <img
                  src="/images/funny-valentine-stand.png"
                  alt="Funny Valentine & D4C Stand"
                  loading="eager"
                  decoding="async"
                  class="relative z-10 h-[85%] max-h-[65vh] xl:max-h-[75vh] w-auto object-contain object-bottom filter contrast-105 pointer-events-none select-none"
                />
              </div>

              <!-- ── D4C ETHEREAL MANIFESTATION BLOOM (SILKY SMOOTH ANIME FX) ── -->
              <div
                v-if="isManifesting"
                class="stand-bloom-wrapper absolute inset-0 z-25 pointer-events-none flex items-center justify-center overflow-visible select-none"
                :style="flashContainerStyle"
              >
                <!-- Outer Cyan Stand Mist (Soft Diffused Aura) -->
                <div class="stand-bloom-outer absolute w-[80%] h-[80%] rounded-full"></div>
                <!-- Inner Pure White Silk Core (Luminous Radiant Heart) -->
                <div class="stand-bloom-core absolute w-[55%] h-[55%] rounded-full"></div>
              </div>

              <!-- ── GIANT JOJO MENACING KANJI FX (ゴゴゴ) ── -->
              <div
                v-if="isStandActive"
                class="absolute z-35 pointer-events-none select-none animate-fx-in transition-all duration-500"
                :style="menacingStyle"
              >
                <div class="animate-menacing-float">
                  <img
                    src="/images/jojo-menacing.png"
                    alt="JoJo Menacing Effect"
                    class="w-32 sm:w-40 md:w-52 h-auto pointer-events-none select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
                    :style="menacingImageStyle"
                  />
                </div>
              </div>

              <!-- ── MANGA DIALOGUE SPEECH BUBBLE (POP-IN WITH QUOTE) ── -->
              <div
                v-if="isStandActive"
                @click.stop="cycleQuote"
                class="absolute z-40 cursor-pointer pointer-events-auto select-none animate-bubble-in transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                :style="bubbleStyle"
                title="Click to cycle quote / Klik untuk ganti quote"
              >
                <div class="relative bg-brand-bg text-brand-primary border-2 border-brand-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4 max-w-[240px] sm:max-w-[290px]">
                  <div class="flex items-center justify-between gap-2 border-b border-brand-primary/30 pb-0.5 mb-1.5">
                    <span class="font-mono text-[0.58rem] font-black tracking-widest uppercase text-brand-stand">FUNNY VALENTINE</span>
                    <span class="text-[0.58rem] font-mono opacity-60">#0{{ currentQuoteIdx + 1 }}</span>
                  </div>
                  <p class="font-serif font-bold text-xs sm:text-sm leading-snug tracking-tight text-brand-primary">
                    "{{ currentQuote }}"
                  </p>
                  <div class="absolute -bottom-3 left-6 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[11px] border-t-brand-primary"></div>
                  <div class="absolute -bottom-2.5 left-[25px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-brand-bg"></div>
                </div>
              </div>

            </div>

            <!-- Bottom Runway Metadata -->
            <div class="valentine-meta-bar relative z-10 pt-1 border-t border-grid/40 flex justify-between items-center text-[0.55rem] font-mono opacity-65 shrink-0 select-none">
              <span class="tracking-wider uppercase">
                FIGURE: FUNNY VALENTINE
              </span>
              <span class="tracking-widest">
                STEEL BALL RUN ARCHIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Running Marquee: "VIEW FULL RUNWAY ARCHIVE / ..." -->
    <a
      href="#anatomy"
      aria-label="view runway anatomy"
      class="group/marquee relative block h-8 md:h-9 overflow-hidden border-t border-grid transition-colors hover:bg-brand-primary hover:text-brand-bg shrink-0"
    >
      <div
        class="animate-marquee-fast flex h-full w-max items-center text-[0.62rem] tracking-[0.2em] font-mono uppercase group-hover/marquee:[animation-play-state:paused]"
      >
        <span class="flex shrink-0 items-center">
          <span
            v-for="n in 12"
            :key="'m1-' + n"
            class="flex shrink-0 items-center whitespace-nowrap"
          >
            VIEW FULL RUNWAY ARCHIVE
            <span class="px-6 opacity-40">/</span>
          </span>
        </span>
        <span class="flex shrink-0 items-center">
          <span
            v-for="n in 12"
            :key="'m2-' + n"
            class="flex shrink-0 items-center whitespace-nowrap"
          >
            VIEW FULL RUNWAY ARCHIVE
            <span class="px-6 opacity-40">/</span>
          </span>
        </span>
      </div>
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import RollingText from '@/components/common/RollingText.vue'
import { gsap, lenis } from '@/lenis'
import { useValentineStage } from '@/composables/useValentineStage'

interface Capsule {
  id: string
  year: string
  title: string
  category: string
  tags: string[]
  summary: string
  image: string
  link: string
  objectPosition?: string
}

interface CoverAdjustment {
  posX: number
  posY: number
  scale: number
  fitMode: 'contain' | 'cover'
}

const {
  config,
  isStandActive,
  isManifesting,
  currentQuoteIdx,
  currentQuote,
  handleSelectValentine,
  cycleQuote,
} = useValentineStage()

const flashContainerStyle = computed(() => {
  return {
    transform: `translate3d(${config.value.flashX ?? -84}px, ${config.value.flashY ?? -246}px, 0) scale(${config.value.flashScale ?? 1.35})`,
    transformOrigin: 'center center',
  }
})

const handleValentineClick = () => {
  if (isStandActive.value) {
    cycleQuote()
    return
  }

  // 1. Gently align scroll only if #capsules is substantially off-center, avoiding instant teleport jumps
  const capsulesEl = document.getElementById('capsules')
  if (capsulesEl) {
    const rect = capsulesEl.getBoundingClientRect()
    if (Math.abs(rect.top) > 80) {
      try {
        lenis?.scrollTo(capsulesEl, { duration: 0.75, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      } catch {
        // ignore
      }
    }
  }

  // 2. Use calibrated camera origin from config (supports live tuning via Shift + C)
  handleSelectValentine({
    originX: config.value.cameraOriginX,
    originY: config.value.cameraOriginY,
  })
}

const handleValentineMobileTrigger = () => {
  if (isStandActive.value) {
    cycleQuote()
    return
  }
  const capsulesEl = document.getElementById('capsules')
  if (capsulesEl) {
    const rect = capsulesEl.getBoundingClientRect()
    if (Math.abs(rect.top) > 80) {
      try {
        lenis?.scrollTo(capsulesEl, { duration: 0.75, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      } catch {
        // ignore
      }
    }
  }
  handleSelectValentine({ originX: 50, originY: 50 })
}

const getValentineAloneStyle = () => {
  return {
    transform: `translate3d(${config.value.aloneX}px, ${config.value.aloneY}px, 0) scale(${config.value.aloneScale})`,
    transformOrigin: 'bottom center',
  }
}

const getValentineStandStyle = () => {
  return {
    transform: `translate3d(${config.value.standX}px, ${config.value.standY}px, 0) scale(${config.value.standScale})`,
    transformOrigin: 'bottom center',
  }
}

const menacingStyle = computed(() => {
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

const defaultAdjustments: Record<number, CoverAdjustment> = {
  0: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 1
  1: { posX: 50, posY: 12, scale: 1.0, fitMode: 'cover' }, // Part 2
  2: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 3
  3: { posX: 50, posY: 18, scale: 1.0, fitMode: 'cover' }, // Part 4
  4: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 5
  5: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 6
  6: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 7
  7: { posX: 50, posY: 20, scale: 1.0, fitMode: 'cover' }, // Part 8 (JoJolion)
  8: { posX: 50, posY: 30, scale: 1.0, fitMode: 'cover' }, // Part 9 (The JOJOLands)
}

const STORAGE_KEY = 'araki_cover_adjustments_v3'

const loadSavedAdjustments = (): Record<number, CoverAdjustment> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return { ...defaultAdjustments, ...parsed(raw) }
    }
  } catch {
    // ignore
  }
  return { ...defaultAdjustments }
}

function parsed(str: string) {
  try { return JSON.parse(str) } catch { return {} }
}

const adjustments = ref<Record<number, CoverAdjustment>>(loadSavedAdjustments())

const capsules = ref<Capsule[]>([
  {
    id: 'part-1-phantom-blood',
    year: '1987',
    title: 'Part 1: Phantom Blood',
    category: 'Victorian Gothic & Hamon Era',
    tags: ['Jonathan Joestar', 'Dio Brando', 'London 1888'],
    summary:
      'The legendary inception of the Joestar bloodline. Set in 1880s Victorian England, exploring classic aristocratic tailoring, high-collar coats, and gothic dark romance.',
    image: '/images/cover-part-1.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-2-battle-tendency',
    year: '1987 – 1989',
    title: 'Part 2: Battle Tendency',
    category: '1930s Art Deco & Pulp Adventure',
    tags: ['Joseph Joestar', 'Caesar Zeppeli', 'New York to Rome'],
    summary:
      'Fast-paced pulp globetrotting across 1930s New York, Mexico, and Rome. Characterized by aviator scarves, bandana patterns, and sculpted muscular contrapposto.',
    image: '/images/cover-part-2.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-3-stardust-crusaders',
    year: '1989 – 1992',
    title: 'Part 3: Stardust Crusaders',
    category: 'Gakuran Uniform & Stand Odyssey',
    tags: ['Jotaro Kujo', 'Star Platinum', 'Tokyo to Cairo'],
    summary:
      'Araki introduces the revolutionary concept of Stands. Jotaro Kujo’s iconic customized gakuran coat, gold chain collar, and torn cap redefined manga fashion iconography.',
    image: '/images/cover-part-3.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-4-diamond-is-unbreakable',
    year: '1992 – 1995',
    title: 'Part 4: Diamond is Unbreakable',
    category: 'Pastel Pop & 90s Italian Glamour',
    tags: ['Josuke Higashikata', 'Morioh 1999', 'Versace Motifs'],
    summary:
      'A stylistic paradigm shift into vibrant suburban mystery in Morioh. Josuke’s pompadour, peace/heart badges, and Kira’s tailored suits evoke 90s Moschino and Versace aesthetics.',
    image: '/images/cover-part-4.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-5-golden-wind',
    year: '1995 – 1999',
    title: 'Part 5: Golden Wind',
    category: 'Italian Haute Couture & Cutouts',
    tags: ['Giorno Giovanna', 'Passione', 'Naples & Venice'],
    summary:
      'Araki’s definitive tribute to Italian high fashion. Giorno and the Passione squad wear bespoke sartorial suits with chest cutouts, zipper motifs, and Michelangelo sculpture poses.',
    image: '/images/cover-part-5.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-6-stone-ocean',
    year: '2000 – 2003',
    title: 'Part 6: Stone Ocean',
    category: 'Y2K High-Fashion & Runway Muse',
    tags: ['Jolyne Cujoh', 'Green Dolphin St', 'Gucci Campaign Face'],
    summary:
      'Starring Jolyne Cujoh, who later became the face of Gucci’s worldwide 2013 Cruise Campaign. Characterized by spiderweb textiles, butterfly tattoos, and bold Y2K edge.',
    image: '/images/cover-part-6.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-7-steel-ball-run',
    year: '2004 – 2011',
    title: 'Part 7: Steel Ball Run',
    category: 'Seinen Frontier & Western Couture',
    tags: ['Johnny Joestar', 'Gyro Zeppeli', 'Trans-American Race'],
    summary:
      'Widely celebrated as Araki’s magnum opus. A cross-country horse race in 1890s America combining frontier leathercraft, equestrian chic, and celestial geometric patterns.',
    image: '/images/cover-part-7.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-8-jojolion',
    year: '2011 – 2021',
    title: 'Part 8: JoJolion',
    category: 'Avant-Garde Nautical & Morioh',
    tags: ['Josuke (Gappy)', 'Sailor Sartorial', 'Seinen Modernity'],
    summary:
      'Set in post-quake Morioh, blending nautical sailor tailoring, layered jewelry, and surrealist high fashion with profound existential mystery.',
    image: '/images/cover-part-8.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-9-the-jojolands',
    year: '2023 – Present',
    title: 'Part 9: The JOJOLands',
    category: 'Contemporary Pacific Island Luxury',
    tags: ['Jodio Joestar', 'Oahu Hawaii', 'Streetwear Luxury'],
    summary:
      'Set in subtropical Oahu, Hawaii. Jodio Joestar navigates high-stakes heists and stand battles clad in contemporary island luxury and avant-garde streetwear.',
    image: '/images/cover-part-9.jpg',
    link: 'https://jojo-portal.com',
  },
])

const capsulesRoot = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const activeIdx = ref(0)

const getCoverStyle = (idx: number) => {
  const adj = adjustments.value[idx] || defaultAdjustments[idx] || { posX: 50, posY: 50, scale: 1.0, fitMode: 'contain' }
  return {
    objectPosition: `${adj.posX}% ${adj.posY}%`,
    objectFit: (adj.fitMode || 'contain') as 'contain' | 'cover',
    transform: `scale(${adj.scale})`,
  }
}

// Touch & Mouse gestures for swipe sliding
let touchStartX = 0
let mouseStartX = 0
let isMouseDown = false

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
}

const handleTouchEnd = (e: TouchEvent) => {
  const touchEndX = e.changedTouches[0].clientX
  const diff = touchEndX - touchStartX
  if (Math.abs(diff) > 45) {
    if (diff < 0) nextSlide()
    else prevSlide()
  }
}

const handleMouseDown = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('button, a, input')) return
  isMouseDown = true
  mouseStartX = e.clientX
}

const handleMouseUp = (e: MouseEvent) => {
  if (!isMouseDown) return
  isMouseDown = false
  const diff = e.clientX - mouseStartX
  if (Math.abs(diff) > 50) {
    if (diff < 0) nextSlide()
    else prevSlide()
  }
}

const handleMouseLeave = () => {
  isMouseDown = false
}

const goToSlide = (idx: number) => {
  activeIdx.value = idx
}

const prevSlide = () => {
  activeIdx.value = (activeIdx.value - 1 + capsules.value.length) % capsules.value.length
}

const nextSlide = () => {
  activeIdx.value = (activeIdx.value + 1) % capsules.value.length
}

// Curtain wipe transition whenever active slide changes
watch(activeIdx, (newIdx) => {
  if (!capsulesRoot.value) return
  const wrappers = capsulesRoot.value.querySelectorAll('.capsule-cover-wrapper')
  const inners = capsulesRoot.value.querySelectorAll('.capsule-cover-inner')
  if (!wrappers || !wrappers[newIdx]) return

  const targetWrapper = wrappers[newIdx] as HTMLElement
  const targetInner = inners ? (inners[newIdx] as HTMLElement) : null

  gsap.killTweensOf(targetWrapper)
  if (targetInner) gsap.killTweensOf(targetInner)

  gsap.fromTo(
    targetWrapper,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.85,
      ease: 'power4.inOut',
      clearProps: 'clipPath',
    }
  )

  if (targetInner) {
    gsap.fromTo(
      targetInner,
      { scale: 1.12 },
      {
        scale: 1.0,
        duration: 1.05,
        ease: 'power3.out',
        clearProps: 'scale',
      }
    )
  }
})

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    if (!capsulesRoot.value) return

    // Heading mask reveal
    if (headingRef.value) {
      gsap.fromTo(
        headingRef.value,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.value,
            start: 'top 85%',
          },
        }
      )
    }

    // Initial entrance curtain wipe on scroll for first capsule cover
    const firstWrapper = capsulesRoot.value.querySelector('.capsule-cover-wrapper')
    const firstInner = capsulesRoot.value.querySelector('.capsule-cover-inner')
    if (firstWrapper) {
      gsap.fromTo(
        firstWrapper,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.25,
          ease: 'power4.inOut',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: capsulesRoot.value,
            start: 'top 75%',
          },
        }
      )
    }
    if (firstInner) {
      gsap.fromTo(
        firstInner,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          clearProps: 'scale',
          scrollTrigger: {
            trigger: capsulesRoot.value,
            start: 'top 75%',
          },
        }
      )
    }

    // The Presidential Rise: Valentine Runway Float-Up Entrance (Option A)
    const valentineImg = capsulesRoot.value.querySelector('.valentine-idle-img')
    if (valentineImg) {
      gsap.fromTo(
        valentineImg,
        {
          y: 55,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          delay: 0.2,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: capsulesRoot.value,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }

    // Watermark D4C subtle fade entrance
    const d4cWatermark = capsulesRoot.value.querySelector('.valentine-watermark')
    if (d4cWatermark) {
      gsap.fromTo(
        d4cWatermark,
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.35,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: capsulesRoot.value,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }

    // Bottom Runway Metadata subtle slide-up
    const runwayMeta = capsulesRoot.value.querySelector('.valentine-meta-bar')
    if (runwayMeta) {
      gsap.fromTo(
        runwayMeta,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.45,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: capsulesRoot.value,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }
  }, capsulesRoot.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
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

@keyframes fxPopIn {
  0% {
    opacity: 0;
    transform: scale(0.78);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bubblePopIn {
  0% {
    opacity: 0;
    transform: scale(0.82) translateY(6px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes standBloomAnim {
  0% {
    opacity: 0;
    transform: scale(0.72);
  }
  14% {
    opacity: 1;
    transform: scale(1.0);
  }
  100% {
    opacity: 0;
    transform: scale(1.18);
  }
}

.stand-bloom-wrapper {
  filter: drop-shadow(0 0 28px rgba(56, 189, 248, 0.85));
}

.stand-bloom-outer {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(56, 189, 248, 0.9) 0%,
    rgba(6, 182, 212, 0.55) 40%,
    rgba(8, 145, 178, 0.22) 65%,
    transparent 80%
  );
  filter: blur(24px);
  will-change: transform, opacity;
  animation: standBloomAnim 580ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.stand-bloom-core {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.95) 28%,
    rgba(224, 242, 254, 0.65) 55%,
    transparent 75%
  );
  filter: blur(12px);
  mix-blend-mode: screen;
  will-change: transform, opacity;
  animation: standBloomAnim 520ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-menacing-float {
  animation: menacingFloat 2.4s ease-in-out infinite;
}

.animate-fx-in {
  animation: fxPopIn 450ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
}

.animate-bubble-in {
  animation: bubblePopIn 420ms cubic-bezier(0.22, 1, 0.36, 1) 160ms both;
}
</style>