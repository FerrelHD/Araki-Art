<template>
  <section
    id="hero"
    ref="heroRoot"
    class="flex flex-col border-b border-grid md:min-h-[calc(100svh-4rem)] select-none overflow-hidden"
  >
    <!-- Top Row: Split Media Cards (8 Cols Cinematic + 4 Cols Editorial Portrait) -->
    <div
      class="grid grid-cols-4 md:grid-cols-12 md:min-h-[44svh] md:flex-1 border-b border-grid overflow-hidden"
    >
      <!-- 8 Cols: Runway / Visual Showreel Container -->
      <div
        ref="videoContainerRef"
        class="relative col-span-4 md:col-span-8 aspect-[4/3] md:aspect-auto md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-grid bg-black/10 group"
      >
        <!-- Atmospheric Motion / Runway Canvas or Video -->
        <video
          ref="videoElRef"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          muted
          loop
          playsinline
          autoplay
          poster="/images/jojo-fashion.jpg"
        >
          <source
            src="/videos/hero-runway.mp4"
            type="video/mp4"
          />
        </video>

        <!-- Subtle Gradient Overlay -->
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        ></div>

               <!-- Bottom Left Runway Meta -->
        <div class="absolute bottom-4 left-4 z-10 text-white font-mono text-[0.65rem] tracking-widest uppercase">
          <span class="opacity-75">CREDITS: ©Shueisha Inc. All rights reserved</span>
        </div>
      </div>

      <!-- 4 Cols: Editorial Portrait (Rohan / Araki in High-Fashion) -->
<div
  ref="portraitContainerRef"
  class="relative col-span-4 md:col-span-4 aspect-[3/4] md:aspect-auto md:h-full overflow-hidden bg-brand-bg group"
>
  <img
    ref="portraitImgRef"
    src="/images/jojo-fashion.jpg"
    alt="Araki Haute-Couture Muse"
    class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
  />
</div>
    </div>

    <!-- Bottom Row: Monumental Wordmark & Discipline Badges -->
    <div class="grid grid-cols-4 md:grid-cols-12 items-stretch overflow-hidden">
      <!-- 7 Cols: Massive 'araki.' Title -->
      <div
        class="col-span-4 md:col-span-7 flex items-end px-3 py-3 md:px-5 md:py-6 overflow-hidden"
      >
        <div class="overflow-hidden w-full">
          <h1
            ref="titleRef"
            class="text-[clamp(3.8rem,19vw,15.5rem)] leading-[0.8] font-bold tracking-[-0.12em] select-none uppercase md:normal-case will-change-transform"
          >
            araki.
          </h1>
        </div>
      </div>

      <!-- 3 Cols: Vertical Disciplines List -->
      <ul
        ref="disciplinesRef"
        class="col-span-3 md:col-span-3 border-t md:border-t-0 md:border-l border-grid p-4 md:p-6 flex flex-col justify-end gap-1.5 text-base md:text-lg lg:text-xl font-medium tracking-tight leading-snug"
      >
        <li class="discipline-item flex items-center gap-2">
          <span class="text-xs font-mono opacity-40">01</span>
          <span>Manga Iconoclast</span>
        </li>
        <li class="discipline-item flex items-center gap-2">
          <span class="text-xs font-mono opacity-40">02</span>
          <span>Haute Couture Collaborator</span>
        </li>
        <li class="discipline-item flex items-center gap-2">
          <span class="text-xs font-mono opacity-40">03</span>
          <span>Musée du Louvre Exhibitor</span>
        </li>
      </ul>

      <!-- 2 Cols: Star Birthmark Emblem -->
      <div
        class="col-span-1 md:col-span-2 border-t md:border-t-0 md:border-l border-grid p-4 flex items-center justify-center group"
      >
        <div class="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <!-- JoJo Star Birthmark Emblem (SVG) -->
          <svg
            ref="starIconRef"
            viewBox="0 0 100 100"
            class="w-full h-full fill-brand-primary transition-transform duration-700 ease-out group-hover:rotate-45"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 0 L58 35 L93 25 L68 52 L98 75 L62 76 L50 100 L38 76 L2 75 L32 52 L7 25 L42 35 Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from '@/lenis'

const heroRoot = ref<HTMLElement | null>(null)
const videoElRef = ref<HTMLVideoElement | null>(null)
const portraitImgRef = ref<HTMLImageElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const starIconRef = ref<SVGElement | null>(null)

let ctx: gsap.Context | null = null

function playIntroAnimation() {
  if (!heroRoot.value) return

  const tl = gsap.timeline()

  // Video container & portrait reveal
  tl.fromTo(
    [videoElRef.value, portraitImgRef.value],
    { scale: 1.1, opacity: 0.6 },
    { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
  )
    // Title mask reveal
    .fromTo(
      titleRef.value,
      { yPercent: 100 },
      { yPercent: 0, duration: 1, ease: 'power4.out' },
      '-=0.8'
    )
    // Disciplines stagger
    .fromTo(
      '.discipline-item',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
      '-=0.6'
    )
    // Star emblem spin reveal
    .fromTo(
      starIconRef.value,
      { scale: 0, rotate: -90, opacity: 0 },
      { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    )
}

onMounted(() => {
  ctx = gsap.context(() => {
    // Parallax scrolling on hero elements
    if (heroRoot.value) {
      // Split media parallax
      if (videoElRef.value) {
        gsap.to(videoElRef.value, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRoot.value,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (portraitImgRef.value) {
        gsap.to(portraitImgRef.value, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRoot.value,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Title subtle horizontal shift and fade on scroll
      if (titleRef.value) {
        gsap.to(titleRef.value, {
          xPercent: -4,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRoot.value,
            start: 'center top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }
  }, heroRoot.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
})

defineExpose({
  playIntroAnimation,
})
</script>
