<template>
  <div
    v-if="!isFinished"
    ref="preloaderRoot"
    class="fixed inset-0 z-[999] pointer-events-auto flex flex-col justify-between overflow-hidden bg-transparent text-brand-bg select-none"
  >
    <!-- 12-Column Slats for Curtain Lift -->
    <div class="absolute inset-0 grid grid-cols-4 md:grid-cols-12 pointer-events-none z-0">
      <div
        v-for="i in 12"
        :key="i"
        class="preloader-slat h-full w-full bg-brand-primary border-r border-brand-bg/10 last:border-r-0 origin-top"
      ></div>
    </div>

    <!-- Top Spacer (Clean Minimalist - No Text) -->
    <div class="h-8 md:h-12"></div>

    <!-- Center Kinetic Wordmark & Star (The Handover Passengers) -->
    <div
      class="relative z-20 flex flex-col items-center justify-center gap-3 text-center my-auto w-full px-4"
    >
      <!-- JoJo Star Birthmark Emblem (Dead center aligned directly above title) -->
      <div
        ref="starEl"
        class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center will-change-transform select-none"
      >
        <svg
          viewBox="0 0 100 100"
          class="w-full h-full fill-brand-accent"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0 L58 35 L93 25 L68 52 L98 75 L62 76 L50 100 L38 76 L2 75 L32 52 L7 25 L42 35 Z"
          />
        </svg>
      </div>

      <!-- Monumental Title Matching Hero Typography (No clipping, perfectly centered) -->
      <div class="overflow-hidden pb-4 md:pb-6 px-4 flex justify-center items-center">
        <h1
          ref="titleEl"
          class="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-[-0.08em] leading-[0.9] uppercase md:normal-case will-change-transform pb-1 text-center"
        >
          araki.
        </h1>
      </div>
    </div>

    <!-- Bottom Counter & Progress Bar -->
    <div
      ref="bottomEl"
      class="relative z-10 p-4 md:p-8 flex flex-col gap-3 font-mono"
    >
      <div class="flex items-end justify-between">
        <div>
          <span class="text-[0.65rem] tracking-widest uppercase opacity-60 block">INITIALIZING RUNWAY</span>
          <span class="text-xs tracking-wider opacity-90">{{ currentPhase }}</span>
        </div>
        <div class="text-4xl md:text-6xl font-bold tabular-nums tracking-tighter">
          {{ formattedCounter }}<span class="text-xl md:text-3xl opacity-60">%</span>
        </div>
      </div>

      <!-- Linear Progress Line -->
      <div class="w-full h-0.5 bg-brand-bg/20 overflow-hidden">
        <div
          class="h-full bg-brand-accent transition-all duration-75 ease-out"
          :style="{ width: counter + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { gsap, lenis } from '@/lenis'

const emit = defineEmits<{
  (e: 'start-transition'): void
  (e: 'complete'): void
}>()

const preloaderRoot = ref<HTMLElement | null>(null)
const starEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const bottomEl = ref<HTMLElement | null>(null)

const counter = ref(0)
const isFinished = ref(false)

const formattedCounter = computed(() => {
  return counter.value.toString().padStart(3, '0')
})

const currentPhase = computed(() => {
  if (counter.value < 25) return 'LOADING 12-COLUMN BLUEPRINT GRID...'
  if (counter.value < 55) return 'SYNCING FASHION CAPITALS TIMEZONES...'
  if (counter.value < 85) return 'CALIBRATING HAUTE-COUTURE EDITORIALS...'
  return 'UNVEILING RUNWAY ARCHIVE...'
})

onMounted(async () => {
  // Pause smooth scroll during preloader
  lenis.stop()

  await nextTick()

  // Title and Star are fully visible and perfectly centered right from the start (0%)
  if (titleEl.value && starEl.value) {
    gsap.set([titleEl.value, starEl.value], {
      opacity: 1,
      yPercent: 0,
      scale: 1,
      rotate: 0,
    })
  }

  // Counter progress bar animation
  const counterObj = { val: 0 }
  gsap.to(counterObj, {
    val: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      counter.value = Math.floor(counterObj.val)
    },
    onComplete: () => {
      triggerCurtainReveal()
    },
  })
})

function triggerCurtainReveal() {
  const slats = preloaderRoot.value?.querySelectorAll('.preloader-slat')
  if (!slats) {
    finishPreloader()
    return
  }

  // Signal HeroSection to start revealing background media behind the lifting slats
  emit('start-transition')

  const exitTl = gsap.timeline({
    onComplete: () => {
      finishPreloader()
    },
  })

  // 1. Fade out progress bar immediately
  exitTl.to(
    bottomEl.value,
    {
      y: 20,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    },
    0
  )

  // 2. Lift 12 slats with staggered curtain reveal
  exitTl.to(
    slats,
    {
      scaleY: 0,
      duration: 1.15,
      stagger: {
        amount: 0.35,
        from: 'center',
      },
      ease: 'expo.inOut',
    },
    0.05
  )

  // 3. FLIP Handover: Animate "araki." title to target Hero Title slot
  const heroTitle = document.getElementById('hero-title')
  if (heroTitle && titleEl.value) {
    const r1 = titleEl.value.getBoundingClientRect()
    const r2 = heroTitle.getBoundingClientRect()

    const scale = r2.height / r1.height
    const deltaX = r2.left + r2.width / 2 - (r1.left + r1.width / 2)
    const deltaY = r2.top + r2.height / 2 - (r1.top + r1.height / 2)

    exitTl.to(
      titleEl.value,
      {
        x: deltaX,
        y: deltaY,
        scale: scale,
        color: '#12100E',
        duration: 1.15,
        ease: 'power3.inOut',
      },
      0.05
    )
  }

  // 4. FLIP Handover: Animate Star vector with pixel-perfect matching to hero-star-svg
  const heroStarSvg = document.getElementById('hero-star-svg')
  if (heroStarSvg && starEl.value) {
    const s1 = starEl.value.getBoundingClientRect()
    const s2 = heroStarSvg.getBoundingClientRect()

    const scaleStar = s2.width / s1.width
    const deltaStarX = s2.left + s2.width / 2 - (s1.left + s1.width / 2)
    const deltaStarY = s2.top + s2.height / 2 - (s1.top + s1.height / 2)

    const starPath = starEl.value.querySelector('path')
    if (starPath) {
      exitTl.to(
        starPath,
        {
          fill: '#12100E',
          duration: 1.15,
          ease: 'power3.inOut',
        },
        0.05
      )
    }

    exitTl.to(
      starEl.value,
      {
        x: deltaStarX,
        y: deltaStarY,
        scale: scaleStar,
        rotate: 0,
        duration: 1.15,
        ease: 'power3.inOut',
      },
      0.05
    )
  }

  // 5. Seamless handover crossfade: trigger hero elements reveal as travelers land
  exitTl.call(() => {
    emit('complete')
  }, [], 1.12)

  // 6. Smoothly fade out preloader overlay
  exitTl.to(
    preloaderRoot.value,
    {
      opacity: 0,
      duration: 0.25,
      ease: 'power1.out',
    },
    1.18
  )
}

function finishPreloader() {
  isFinished.value = true
  lenis.start()
}
</script>
