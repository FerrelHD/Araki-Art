<template>
  <section
    id="capsules"
    ref="capsulesRoot"
    class="border-b border-grid text-brand-primary overflow-visible relative z-30 h-screen max-h-screen flex flex-col justify-between"
  >
    <div class="grid grid-cols-4 md:grid-cols-12 flex-1 min-h-0 overflow-visible">
      <!-- 10 Columns Centered Container -->
      <div
        class="col-span-4 md:col-span-10 md:col-start-2 border-x border-grid flex flex-col justify-between min-h-0 pt-14 md:pt-16 overflow-visible relative"
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
                class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.06em] leading-none will-change-transform"
              >
                capsules.
              </h2>
            </div>
          </div>
        </div>

        <!-- Slider Main Grid (Clean Static Layout) -->
        <div
          class="grid grid-cols-4 md:grid-cols-10 flex-1 min-h-0 overflow-visible relative"
        >
          <!-- Left 6 Columns: Interactive Capsule Card & Vertical Thumbnails (snug, zero space kosong) -->
          <div
            class="relative z-20 col-span-4 md:col-span-10 lg:col-span-6 lg:border-r border-grid flex flex-col justify-between min-h-0 overflow-hidden bg-brand-bg"
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
                    <div class="relative h-1/2 sm:h-full w-full sm:w-[48%] md:w-[46%] shrink-0 border-b sm:border-b-0 sm:border-r border-grid overflow-hidden bg-black/5 select-none min-h-0">
                      <div class="w-full h-full overflow-hidden flex items-center justify-center">
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
                      class="flex-1 bg-brand-primary text-brand-bg p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-between min-h-0 overflow-y-auto no-scrollbar"
                    >
                      <!-- Bagian Atas: Metadata, Judul, Kategori & Sinopsis dengan Spasi Bernapas -->
                      <div class="flex flex-col gap-3 md:gap-4">
                        <!-- Label Arsip Monospace -->
                        <div class="flex items-center gap-2 opacity-50 font-mono text-[0.58rem] sm:text-[0.62rem] tracking-[0.2em] uppercase">
                          <span>ARCHIVE COLLECTION</span>
                          <span>·</span>
                          <span>VOL. 0{{ idx + 1 }}</span>
                        </div>

                        <!-- Judul Part (Clean Display Typography) -->
                        <h3 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] text-brand-bg">
                          {{ capsule.title }}
                        </h3>

                        <!-- Era & Kategori (Clean Monospace, Tanpa Badge/Card) -->
                        <p class="font-mono text-[0.65rem] sm:text-[0.72rem] tracking-[0.16em] uppercase opacity-75">
                          {{ capsule.category }} · {{ capsule.year }}
                        </p>

                        <!-- Sinopsis Editorial dengan Breathing Room Lega -->
                        <p class="text-xs sm:text-sm md:text-base leading-relaxed opacity-85 font-sans font-light max-w-[42ch] pt-1">
                          {{ capsule.summary }}
                        </p>

                        <!-- Tags Karakter & Motif (Clean Slash-Separated, Tanpa Badge/Pill) -->
                        <div
                          v-if="capsule.tags && capsule.tags.length"
                          class="pt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.65rem] sm:text-[0.7rem] tracking-wider opacity-60"
                        >
                          <span v-for="(tag, tIdx) in capsule.tags" :key="tag">
                            {{ tag }}<span v-if="tIdx < capsule.tags.length - 1" class="ml-2.5 opacity-35">/</span>
                          </span>
                        </div>
                      </div>

                      <!-- Bagian Bawah: Tombol View Archive di Paling Bawah Rata Kanan -->
                      <div class="pt-5 border-t border-brand-bg/15 flex items-center justify-between shrink-0 mt-4">
                        <span class="font-mono text-[0.58rem] tracking-widest uppercase opacity-40 hidden sm:inline">
                          OFFICIAL ARCHIVE
                        </span>
                        <a
                          :href="capsule.link"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group/roll inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-mono font-medium tracking-wider uppercase text-brand-bg hover:opacity-75 transition-opacity cursor-pointer ml-auto"
                        >
                          <RollingText text="view archive" />
                          <span class="text-base sm:text-lg transition-transform duration-300 group-hover/roll:translate-x-1.5">></span>
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

          <!-- Right 4 Columns: High-Fashion Freestanding Muse (Funny Valentine - Idle Mode) -->
          <div
            class="group/side relative z-30 hidden lg:col-span-4 lg:flex flex-col justify-end overflow-visible px-4 pb-2 bg-brand-primary/[0.015] border-b border-grid min-h-0 select-none"
          >
            <!-- Valentine Calibrator Trigger Button -->
            <button
              type="button"
              @click.stop="showAdjuster = !showAdjuster"
              class="absolute top-3 left-3 z-40 bg-black/85 hover:bg-neutral-900 text-white/80 hover:text-white border border-white/20 px-2 py-1 text-[0.58rem] font-mono tracking-wider uppercase transition-all shadow-md backdrop-blur-xs flex items-center gap-1.5 cursor-pointer select-none"
              :class="showAdjuster ? 'ring-1 ring-cyan-400 text-cyan-300' : ''"
              title="Buka Live Calibrator Valentine & D4C"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="showAdjuster ? 'bg-cyan-400 animate-pulse' : 'bg-neutral-500'"></span>
              <span>⚙ ATUR VALENTINE</span>
            </button>

            <!-- Watermark Background -->
            <div
              class="absolute font-mono font-bold leading-none select-none pointer-events-none opacity-5 text-current"
              :style="{ top: '-24px', right: '8px', fontSize: '8rem' }"
            >
              D4C
            </div>

            <!-- Freestanding Muse Stage (Click to Launch Fullscreen Cinema Mode) -->
            <div
              class="relative w-full flex-1 min-h-0 flex items-end justify-center overflow-visible pointer-events-auto cursor-pointer group/muse"
              @click="openCinematicMode"
              title="Click to summon D4C in Fullscreen Cinema Cutscene!"
            >
              <!-- Contact Floor Shadow (Soft Optical Depth) -->
              <div
                class="absolute bottom-0 w-44 h-5 rounded-full bg-black/40 blur-md pointer-events-none transition-all duration-500 group-hover/muse:opacity-60"
              ></div>

              <!-- Mode Alone: Funny Valentine (Overlapping Statement Section) -->
              <div
                class="relative h-full w-full flex items-end justify-center origin-bottom pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/muse:brightness-105"
                :style="getValentineAloneStyle()"
              >
                <img
                  src="/images/funny-valentine-alone.png"
                  alt="Funny Valentine (President)"
                  class="h-full w-auto max-h-[440px] xl:max-h-[500px] object-contain object-bottom filter contrast-105 pointer-events-none select-none transition-transform duration-300 group-hover/muse:scale-[1.02]"
                />
              </div>

              <!-- Interactive Summon Hint Badge (Pill) -->
              <div
                class="absolute bottom-2 z-30 transition-all duration-300 opacity-85 group-hover/muse:opacity-100 group-hover/muse:scale-105"
              >
                <div class="flex items-center gap-1.5 bg-black/85 text-white border border-white/20 px-2.5 py-1 font-mono text-[0.58rem] tracking-wider uppercase backdrop-blur-xs shadow-lg">
                  <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>🎬 CLICK TO SUMMON D4C // FULLSCREEN CINEMA</span>
                </div>
              </div>
            </div>

            <!-- Bottom Runway Metadata -->
            <div class="relative z-10 pt-1 border-t border-grid/40 flex justify-between items-center text-[0.55rem] font-mono opacity-65 shrink-0 select-none">
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

    <!-- FULLSCREEN CINEMATIC CUTSCENE / DIORAMA MODE (Teleported to Body) -->
    <teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-400 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isCinemaActive"
          class="fixed inset-0 z-[9990] flex items-center justify-center overflow-hidden select-none bg-neutral-950/92 backdrop-blur-md"
          @click="closeCinematicMode"
        >
          <!-- Radial Ambient Cinema Spotlight -->
          <div
            class="absolute inset-0 pointer-events-none z-10"
            style="background: radial-gradient(circle at 50% 52%, rgba(6, 182, 212, 0.12) 0%, rgba(13, 10, 16, 0.45) 45%, rgba(0, 0, 0, 0.95) 85%);"
          ></div>

          <!-- Top Letterbox Cinema Bar (Slides down) -->
          <div
            class="fixed top-0 left-0 w-full h-14 sm:h-16 md:h-20 bg-black z-50 border-b border-white/10 flex items-center justify-between px-4 sm:px-8 md:px-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            @click.stop
          >
            <!-- Left: Production HUD -->
            <div class="flex items-center gap-3 font-mono text-[0.62rem] sm:text-xs">
              <span class="flex items-center gap-1.5 text-red-500 font-bold">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>REC 24FPS</span>
              </span>
              <span class="text-white/20">/</span>
              <span class="text-white/60 tracking-widest hidden sm:inline">
                STEEL BALL RUN · 1890
              </span>
              <span class="text-white/20 hidden sm:inline">/</span>
              <span class="text-cyan-400 font-bold tracking-wider">
                CH. 62: BREAK OF DAWN
              </span>
            </div>

            <!-- Center: Character Title (Desktop) -->
            <div class="hidden md:flex flex-col items-center">
              <span class="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-white/50">
                23RD US PRESIDENT
              </span>
              <span class="font-serif italic font-bold text-sm tracking-widest text-white">
                Funny Valentine & D4C
              </span>
            </div>

            <!-- Right: Exit Cinema Button -->
            <button
              type="button"
              @click="closeCinematicMode"
              class="flex items-center gap-2 bg-neutral-900 hover:bg-red-950/80 text-white/90 hover:text-white border border-white/20 hover:border-red-500/70 px-3 py-1.5 font-mono text-xs tracking-widest uppercase transition-all shadow-lg cursor-pointer"
              title="Keluar dari mode sinematik (ESC)"
            >
              <span class="text-red-400 font-bold">✕</span>
              <span>EXIT</span>
              <span class="text-white/40 text-[0.65rem]">(ESC)</span>
            </button>
          </div>

          <!-- Bottom Letterbox Cinema Bar (Slides up) -->
          <div
            class="fixed bottom-0 left-0 w-full h-14 sm:h-16 md:h-20 bg-black z-50 border-t border-white/10 flex items-center justify-between px-4 sm:px-8 md:px-12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            @click.stop
          >
            <!-- Left: Stand Name Tag -->
            <div class="flex items-center gap-2 font-mono text-[0.62rem] sm:text-xs text-white/60">
              <span class="text-cyan-400 font-bold">STAND:</span>
              <span class="tracking-wider">DIRTY DEEDS DONE DIRT CHEAP</span>
            </div>

            <!-- Center: Cinematic Subtitle Quote -->
            <div class="flex-1 max-w-xl mx-4 text-center">
              <p class="font-serif italic text-xs sm:text-sm md:text-base text-white/90 line-clamp-1">
                "{{ currentValentineQuote }}"
              </p>
            </div>

            <!-- Right: Dismiss Hint -->
            <div class="font-mono text-[0.58rem] sm:text-[0.65rem] tracking-wider text-white/40 uppercase hidden sm:block">
              CLICK ANYWHERE TO CLOSE
            </div>
          </div>

          <!-- Fullscreen Anime Speedlines SVG -->
          <div
            class="absolute inset-0 pointer-events-none z-20 overflow-hidden transition-opacity duration-700"
            :class="showSpeedlineBurst ? 'opacity-95' : 'opacity-40'"
          >
            <svg class="w-full h-full" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none">
              <g :class="showSpeedlineBurst ? 'animate-pulse' : ''">
                <!-- Speedlines radiating towards screen center (500, 300) -->
                <line x1="0" y1="0" x2="500" y2="300" stroke="currentColor" stroke-width="2.5" class="text-cyan-400/50" />
                <line x1="150" y1="0" x2="500" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
                <line x1="300" y1="0" x2="500" y2="300" stroke="currentColor" stroke-width="2" class="text-cyan-400/40" />
                <line x1="500" y1="0" x2="500" y2="300" stroke="currentColor" stroke-width="2.5" class="text-white/50" />
                <line x1="700" y1="0" x2="500" y2="300" stroke="currentColor" stroke-width="1.5" class="text-cyan-400/40" />
                <line x1="850" y1="0" x2="500" y2="300" stroke="currentColor" stroke-width="2" class="text-white/40" />
                <line x1="1000" y1="0" x2="500" y2="300" stroke="currentColor" stroke-width="3" class="text-cyan-400/60" />

                <line x1="1000" y1="150" x2="500" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
                <line x1="1000" y1="300" x2="500" y2="300" stroke="currentColor" stroke-width="2.5" class="text-cyan-400/50" />
                <line x1="1000" y1="450" x2="500" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
                <line x1="1000" y1="600" x2="500" y2="300" stroke="currentColor" stroke-width="3" class="text-cyan-400/60" />

                <line x1="850" y1="600" x2="500" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
                <line x1="700" y1="600" x2="500" y2="300" stroke="currentColor" stroke-width="2" class="text-cyan-400/40" />
                <line x1="500" y1="600" x2="500" y2="300" stroke="currentColor" stroke-width="2.5" class="text-white/50" />
                <line x1="300" y1="600" x2="500" y2="300" stroke="currentColor" stroke-width="2" class="text-cyan-400/40" />
                <line x1="150" y1="600" x2="500" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
                <line x1="0" y1="600" x2="500" y2="300" stroke="currentColor" stroke-width="3" class="text-cyan-400/60" />

                <line x1="0" y1="450" x2="500" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
                <line x1="0" y1="300" x2="500" y2="300" stroke="currentColor" stroke-width="2.5" class="text-cyan-400/50" />
                <line x1="0" y1="150" x2="500" y2="300" stroke="currentColor" stroke-width="1.5" class="text-white/40" />
              </g>
            </svg>
          </div>

          <!-- Giant Stand Kanji / Typography Watermark Behind Valentine -->
          <div class="absolute inset-0 pointer-events-none z-15 flex items-center justify-center overflow-hidden">
            <span
              class="font-serif font-black text-[22vw] leading-none select-none text-cyan-400 transition-opacity duration-700 tracking-tighter"
              :style="{ opacity: valAdj.watermarkOpacity / 100 }"
            >
              D4C
            </span>
          </div>

          <!-- Central 3D Diorama Stage Container -->
          <div
            class="relative z-30 max-h-[82vh] h-[82vh] w-full max-w-5xl flex items-end justify-center pointer-events-auto will-change-transform pb-8 sm:pb-12"
            :style="getCinemaStageStyle()"
            @click.stop
          >
            <!-- JoJo Menacing FX (ゴゴゴ...) -->
            <div
              class="absolute z-25 pointer-events-none select-none animate-menacing-float"
              :style="getMenacingWrapperStyle()"
            >
              <img
                src="/images/jojo-menacing.png"
                alt="JoJo Menacing Effect"
                class="w-36 sm:w-44 md:w-56 h-auto pointer-events-none select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
                :style="getMenacingImageStyle()"
              />
            </div>

            <!-- Manga Speech Bubble (Clickable to Cycle Quote) -->
            <div
              @click.stop="cycleValentineQuote"
              class="absolute z-40 cursor-pointer pointer-events-auto select-none"
              :style="getBubbleStyle()"
              title="Click to cycle quote / Klik untuk ganti quote"
            >
              <div class="relative bg-brand-bg text-brand-primary border-2 border-brand-primary shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4 max-w-[260px] sm:max-w-[320px]">
                <div class="flex items-center justify-between gap-2 border-b border-brand-primary/30 pb-1 mb-2">
                  <span class="font-mono text-[0.6rem] font-black tracking-widest uppercase text-cyan-600">FUNNY VALENTINE</span>
                  <span class="text-[0.6rem] font-mono opacity-50">#0{{ currentQuoteIdx + 1 }}</span>
                </div>
                <p class="font-serif font-bold text-xs sm:text-sm md:text-base leading-snug tracking-tight text-neutral-900">
                  "{{ currentValentineQuote }}"
                </p>
                <div class="absolute -bottom-3 left-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-brand-primary"></div>
                <div class="absolute -bottom-2.5 left-[33px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] border-t-brand-bg"></div>
              </div>
            </div>

            <!-- Contact Ground Shadow -->
            <div
              class="absolute bottom-6 sm:bottom-10 w-72 sm:w-96 h-8 rounded-full bg-black/80 blur-xl pointer-events-none"
            ></div>

            <!-- Hero Valentine With D4C Stand Sprite -->
            <div
              class="relative h-full flex items-end justify-center pointer-events-auto cursor-pointer group"
              @click.stop="cycleValentineQuote"
              title="Click quote / Click anywhere outside to close"
            >
              <img
                src="/images/funny-valentine-stand.png"
                alt="Funny Valentine with D4C Stand"
                class="h-full w-auto max-h-[64vh] sm:max-h-[70vh] object-contain object-bottom filter contrast-110 brightness-105 drop-shadow-[0_20px_60px_rgba(6,182,212,0.45)] transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </transition>
    </teleport>

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

    <!-- Live Cover Image Adjuster Widget (Floating Tool Panel) -->
    <div
      v-if="showAdjuster"
      class="fixed bottom-4 right-4 z-50 w-[330px] sm:w-[370px] bg-neutral-950/95 text-neutral-100 border border-neutral-700 shadow-2xl backdrop-blur-md p-4 font-mono text-xs select-none max-h-[88vh] overflow-y-auto no-scrollbar"
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
          @click="showAdjuster = false"
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
          1. Idle Overlap
        </button>
        <button
          type="button"
          @click="editorTab = 'cinema'"
          class="flex-1 py-1 text-[0.62rem] font-mono uppercase font-bold transition-colors cursor-pointer"
          :class="editorTab === 'cinema' ? 'bg-cyan-400 text-neutral-950' : 'text-neutral-400 hover:text-white'"
        >
          2. Cinema Diorama
        </button>
      </div>

      <!-- TAB 1: IDLE OVERLAP (Capsules Section) -->
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
                <span class="text-amber-300 font-bold font-mono text-[0.62rem]">{{ valAdj.aloneX }}px</span>
              </div>
              <input type="range" min="-150" max="150" step="1" v-model.number="valAdj.aloneX" class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos Y (Overlap)</span>
                <span class="text-amber-300 font-bold font-mono text-[0.62rem]">{{ valAdj.aloneY }}px</span>
              </div>
              <input type="range" min="-400" max="150" step="1" v-model.number="valAdj.aloneY" class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>

          <!-- Quick Overlap Presets for Alone -->
          <div class="flex gap-1">
            <button
              type="button"
              @click="valAdj.aloneY = -151"
              class="flex-1 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-[0.55rem] text-amber-300/90 cursor-pointer"
            >
              Overlap (-151)
            </button>
            <button
              type="button"
              @click="valAdj.aloneY = -220"
              class="flex-1 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-[0.55rem] text-amber-300/90 cursor-pointer"
            >
              Tinggi (-220)
            </button>
            <button
              type="button"
              @click="valAdj.aloneY = -20"
              class="flex-1 py-0.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-[0.55rem] text-neutral-400 cursor-pointer"
            >
              Rata (-20)
            </button>
          </div>

          <!-- Scale -->
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.62rem] font-bold uppercase">Scale</span>
              <span class="text-amber-300 font-bold font-mono text-[0.65rem]">{{ valAdj.aloneScale.toFixed(2) }}x</span>
            </div>
            <input type="range" min="0.6" max="2.6" step="0.02" v-model.number="valAdj.aloneScale" class="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
          </div>

          <!-- Launch Cinema Mode Button -->
          <button
            type="button"
            @click="openCinematicMode"
            class="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 font-bold text-[0.65rem] tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md mt-2"
          >
            <span>🎬 BUKA FULLSCREEN CINEMA</span>
          </button>
        </div>
      </div>

      <!-- TAB 2: CINEMA DIORAMA (Fullscreen Cutscene) -->
      <div v-else class="mt-3 space-y-3">
        <!-- Toggle Cinema Cutscene Button -->
        <button
          type="button"
          @click="isCinemaActive ? closeCinematicMode() : openCinematicMode()"
          class="w-full py-2 font-bold text-[0.65rem] tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md border"
          :class="isCinemaActive ? 'bg-red-950/80 hover:bg-red-900 text-red-200 border-red-500/60' : 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950 border-cyan-300'"
        >
          <span>{{ isCinemaActive ? '✕ TUTUP CINEMA CUTSCENE' : '▶ BUKA CINEMA CUTSCENE' }}</span>
        </button>

        <!-- DIORAMA CAMERA 3D ZOOM & POSITION -->
        <div class="space-y-2 border-b border-neutral-800/80 pb-2.5">
          <div class="flex justify-between items-center">
            <span class="text-[0.65rem] text-cyan-400 uppercase tracking-widest font-bold">
              📷 3D Diorama Stage Camera
            </span>
            <span class="text-neutral-500 font-mono text-[0.58rem]">Layar Bioskop</span>
          </div>

          <!-- Camera Zoom Scale -->
          <div class="bg-neutral-900/90 p-2 border border-neutral-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-neutral-300 text-[0.62rem] font-bold uppercase">Diorama Zoom</span>
              <span class="text-cyan-300 font-bold font-mono text-[0.65rem]">{{ valAdj.cinemaZoom.toFixed(2) }}x</span>
            </div>
            <input type="range" min="0.7" max="2.0" step="0.02" v-model.number="valAdj.cinemaZoom" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
          </div>

          <!-- Diorama Offset X & Y -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Offset X</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ valAdj.cinemaX }}px</span>
              </div>
              <input type="range" min="-150" max="150" step="1" v-model.number="valAdj.cinemaX" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Offset Y</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ valAdj.cinemaY }}px</span>
              </div>
              <input type="range" min="-150" max="150" step="1" v-model.number="valAdj.cinemaY" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
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
            @click="valAdj.menacingFlip = !valAdj.menacingFlip"
            class="w-full py-1.5 font-mono text-[0.65rem] tracking-wider uppercase font-bold border transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            :class="valAdj.menacingFlip ? 'bg-purple-700 hover:bg-purple-600 text-white border-purple-400' : 'bg-neutral-900 hover:bg-neutral-800 text-purple-300 border-neutral-700'"
          >
            <span>ARAH KANJI (FLIP):</span>
            <span class="px-2 py-0.5 rounded text-[0.62rem] font-bold" :class="valAdj.menacingFlip ? 'bg-yellow-400 text-neutral-950' : 'bg-neutral-800 text-purple-300 border border-purple-500/30'">
              {{ valAdj.menacingFlip ? 'FLIPPED (MIRROR) ⇌' : 'NORMAL ⇋' }}
            </span>
          </button>

          <!-- Menacing Position X & Y -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos X</span>
                <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ valAdj.menacingX }}%</span>
              </div>
              <input type="range" min="-10" max="90" step="1" v-model.number="valAdj.menacingX" class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Pos Y</span>
                <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ valAdj.menacingY }}%</span>
              </div>
              <input type="range" min="0" max="90" step="1" v-model.number="valAdj.menacingY" class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>

          <!-- Menacing Scale & Opacity -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Scale</span>
                <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ valAdj.menacingScale.toFixed(2) }}x</span>
              </div>
              <input type="range" min="0.4" max="2.5" step="0.05" v-model.number="valAdj.menacingScale" class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Opacity</span>
                <span class="text-purple-300 font-bold font-mono text-[0.62rem]">{{ valAdj.menacingOpacity }}%</span>
              </div>
              <input type="range" min="10" max="100" step="5" v-model.number="valAdj.menacingOpacity" class="w-full accent-purple-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
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
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ valAdj.bubbleX }}%</span>
              </div>
              <input type="range" min="0" max="85" step="1" v-model.number="valAdj.bubbleX" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Bubble Y</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ valAdj.bubbleY }}%</span>
              </div>
              <input type="range" min="0" max="80" step="1" v-model.number="valAdj.bubbleY" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>

          <!-- Bubble Scale & Rotate -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Scale</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ valAdj.bubbleScale.toFixed(2) }}x</span>
              </div>
              <input type="range" min="0.6" max="1.5" step="0.02" v-model.number="valAdj.bubbleScale" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
            <div class="bg-neutral-900/90 p-2 border border-neutral-800">
              <div class="flex justify-between items-center mb-1">
                <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">Rotate</span>
                <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ valAdj.bubbleRotate }}°</span>
              </div>
              <input type="range" min="-25" max="25" step="1" v-model.number="valAdj.bubbleRotate" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
            </div>
          </div>

          <!-- Cycle Quote in Editor -->
          <button
            type="button"
            @click="cycleValentineQuote"
            class="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-cyan-800/60 text-cyan-300 text-[0.62rem] uppercase font-bold tracking-wider cursor-pointer"
          >
            Ganti Quote (Saat ini: "{{ currentValentineQuote.substring(0, 24) }}...")
          </button>
        </div>

        <!-- Watermark Opacity -->
        <div class="bg-neutral-900/90 p-2 border border-neutral-800">
          <div class="flex justify-between items-center mb-1">
            <span class="text-neutral-300 text-[0.6rem] font-bold uppercase">D4C Watermark Opacity</span>
            <span class="text-cyan-300 font-bold font-mono text-[0.62rem]">{{ valAdj.watermarkOpacity }}%</span>
          </div>
          <input type="range" min="0" max="35" step="1" v-model.number="valAdj.watermarkOpacity" class="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-700 rounded-none" />
        </div>
      </div>

      <!-- Reset & Copy Buttons for Valentine -->
      <div class="mt-3 flex gap-2 pt-2 border-t border-neutral-800">
        <button
          type="button"
          @click="resetValentineConfig"
          class="flex-1 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[0.62rem] text-neutral-300 uppercase tracking-wider cursor-pointer"
        >
          Reset Valentine
        </button>
        <button
          type="button"
          @click="copyValentineConfig"
          class="flex-1 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-[0.65rem] tracking-wider uppercase transition-colors cursor-pointer"
        >
          {{ valCopySuccess ? '✓ COPIED!' : '📋 COPY CONFIG (TS)' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import RollingText from '@/components/common/RollingText.vue'
import { lenis, gsap } from '@/lenis'

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

interface ValentineAdjustment {
  // Idle Mode (in #capsules section)
  aloneX: number
  aloneY: number
  aloneScale: number

  // Fullscreen Cinema Diorama Mode
  cinemaZoom: number
  cinemaX: number
  cinemaY: number

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

const defaultValentineAdj: ValentineAdjustment = {
  aloneX: 0,
  aloneY: -151,
  aloneScale: 2.02,

  cinemaZoom: 1.05,
  cinemaX: 0,
  cinemaY: 0,

  menacingX: 18,
  menacingY: 18,
  menacingScale: 1.1,
  menacingOpacity: 90,
  menacingFlip: false,

  bubbleX: 10,
  bubbleY: 26,
  bubbleRotate: -2,
  bubbleScale: 1.0,

  watermarkOpacity: 8,
}

const VALENTINE_STORAGE_KEY = 'araki_valentine_cinema_v1'

const loadValentineAdjustments = (): ValentineAdjustment => {
  try {
    const raw = localStorage.getItem(VALENTINE_STORAGE_KEY)
    if (raw) {
      return { ...defaultValentineAdj, ...JSON.parse(raw) }
    }
  } catch {
    // ignore
  }
  return { ...defaultValentineAdj }
}

const valAdj = ref<ValentineAdjustment>(loadValentineAdjustments())
const editorTab = ref<'idle' | 'cinema'>('idle')
const isCinemaActive = ref(false)
const showSpeedlineBurst = ref(false)
const valCopySuccess = ref(false)

const openCinematicMode = () => {
  isCinemaActive.value = true
  showSpeedlineBurst.value = true
  try {
    lenis.stop()
  } catch {
    // ignore
  }
  setTimeout(() => {
    showSpeedlineBurst.value = false
  }, 450)
}

const closeCinematicMode = () => {
  isCinemaActive.value = false
  try {
    lenis.start()
  } catch {
    // ignore
  }
}

const valentineQuotes = [
  "Dojyaaa~~n!",
  "Suppose that you were sitting down at this table... Which napkin would you take?",
  "My heart and actions are utterly unclouded... They are all those of 'Justice'.",
  "The one who took the first napkin determines the rules.",
  "D4C! Dirty Deeds Done Dirt Cheap!",
]
const currentQuoteIdx = ref(0)
const currentValentineQuote = computed(() => valentineQuotes[currentQuoteIdx.value])

const cycleValentineQuote = () => {
  currentQuoteIdx.value = (currentQuoteIdx.value + 1) % valentineQuotes.length
}

watch(
  valAdj,
  () => {
    try {
      localStorage.setItem(VALENTINE_STORAGE_KEY, JSON.stringify(valAdj.value))
    } catch {
      // ignore
    }
  },
  { deep: true }
)

const getCinemaStageStyle = () => {
  return {
    transform: `translate(${valAdj.value.cinemaX}px, ${valAdj.value.cinemaY}px) scale(${valAdj.value.cinemaZoom})`,
    transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
  }
}

const getMenacingWrapperStyle = () => {
  return {
    left: `${valAdj.value.menacingX}%`,
    top: `${valAdj.value.menacingY}%`,
  }
}

const getMenacingImageStyle = () => {
  const flipFactor = valAdj.value.menacingFlip ? -1 : 1
  return {
    transform: `scale(${valAdj.value.menacingScale}) scaleX(${flipFactor})`,
    opacity: valAdj.value.menacingOpacity / 100,
    transformOrigin: 'center center',
  }
}

const getValentineAloneStyle = () => {
  return {
    transform: `translate(${valAdj.value.aloneX}px, ${valAdj.value.aloneY}px) scale(${valAdj.value.aloneScale})`,
  }
}

const getBubbleStyle = () => {
  return {
    left: `${valAdj.value.bubbleX}%`,
    top: `${valAdj.value.bubbleY}%`,
    transform: `rotate(${valAdj.value.bubbleRotate}deg) scale(${valAdj.value.bubbleScale})`,
    transformOrigin: 'bottom left',
  }
}

const resetValentineConfig = () => {
  valAdj.value = { ...defaultValentineAdj }
  localStorage.removeItem(VALENTINE_STORAGE_KEY)
}

const copyValentineConfig = () => {
  const text = `// Funny Valentine & D4C Positioning\nconst valentineConfig = ${JSON.stringify(valAdj.value, null, 2)};`
  navigator.clipboard.writeText(text).then(() => {
    valCopySuccess.value = true
    setTimeout(() => {
      valCopySuccess.value = false
    }, 2000)
  })
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (isCinemaActive.value) {
      closeCinematicMode()
    } else if (showAdjuster.value) {
      showAdjuster.value = false
    }
  }
}

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
const showAdjuster = ref(false)

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

let ctx: gsap.Context | null = null

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
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
  }, capsulesRoot.value ?? undefined)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
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

.animate-menacing-float {
  animation: menacingFloat 2.4s ease-in-out infinite;
}
</style>