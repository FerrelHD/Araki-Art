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
        class="relative col-span-4 md:col-span-8 aspect-[16/10] sm:aspect-[4/3] md:aspect-auto md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-grid bg-black/10 group"
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
        class="relative col-span-4 md:col-span-4 aspect-[16/10] sm:aspect-[3/4] md:aspect-auto md:h-full overflow-hidden bg-brand-bg"
      >
        <img
          src="/images/jojo-fashion.jpg"
          alt="Araki Haute-Couture Muse"
          class="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
    </div>

    <!-- Bottom Row: Monumental Wordmark & Discipline Badges -->
    <div class="grid grid-cols-4 md:grid-cols-12 items-stretch overflow-hidden">
      <!-- 7 Cols: Massive 'araki.' Title -->
      <div
        class="col-span-4 md:col-span-7 flex items-end px-3 py-3 md:px-5 md:py-6 overflow-visible"
      >
        <div class="overflow-hidden w-full pb-4 md:pb-6 pr-8 md:pr-14 pl-1">
          <h1
            id="hero-title"
            ref="titleRef"
            class="text-[clamp(3.2rem,18vw,15.5rem)] leading-[0.88] font-bold tracking-[-0.08em] select-none uppercase md:normal-case will-change-transform pb-1 pr-6"
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
        <div
          id="hero-star-slot"
          class="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
        >
          <!-- JoJo Star Birthmark Emblem (SVG) -->
          <svg
            id="hero-star-svg"
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
const videoContainerRef = ref<HTMLElement | null>(null)
const videoElRef = ref<HTMLVideoElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const starIconRef = ref<SVGElement | null>(null)

let ctx: gsap.Context | null = null

function playHandoverEntrance() {
  if (!heroRoot.value) return

  const tl = gsap.timeline()

  // Video container curtain mask reveal (bottom-to-top luxury wipe)
  if (videoContainerRef.value && videoElRef.value) {
    tl.fromTo(
      videoContainerRef.value,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.35,
        ease: 'power4.inOut',
        clearProps: 'clipPath',
      },
      0
    ).fromTo(
      videoElRef.value,
      { scale: 1.15, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' },
      0
    )
  }

  // Disciplines stagger
  tl.fromTo(
    '.discipline-item',
    { opacity: 0, x: -25 },
    { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
    0.65
  )
}

function finalizeHandover() {
  if (titleRef.value) {
    gsap.set(titleRef.value, { opacity: 1, yPercent: 0, clearProps: 'transform' })
  }
  if (starIconRef.value) {
    gsap.set(starIconRef.value, { opacity: 1, scale: 1, rotate: 0, clearProps: 'transform' })
  }
}

// Fallback method
function playIntroAnimation() {
  playHandoverEntrance()
  finalizeHandover()
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
  playHandoverEntrance,
  finalizeHandover,
})
</script>
