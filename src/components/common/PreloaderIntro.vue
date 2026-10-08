<template>
  <div
    v-if="!isFinished"
    ref="preloaderRoot"
    class="fixed inset-0 z-[999] pointer-events-auto flex flex-col justify-between overflow-hidden bg-brand-primary text-brand-bg select-none"
  >
    <!-- 12-Column Slats for Curtain Lift -->
    <div class="absolute inset-0 grid grid-cols-4 md:grid-cols-12 pointer-events-none z-0">
      <div
        v-for="i in 12"
        :key="i"
        class="preloader-slat h-full w-full bg-brand-primary border-r border-brand-bg/15 last:border-r-0 origin-top"
      ></div>
    </div>

    <!-- Top Metadata Bar -->
    <div class="relative z-10 flex items-center justify-between p-4 md:p-8 font-mono text-[0.65rem] md:text-xs tracking-[0.2em] uppercase opacity-75">
      <div class="flex items-center gap-3">
        <span class="inline-block w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
        <span>ARCHIVE PRELOADER</span>
      </div>
      <div>
        <span>SENDAI / FLORENCE / PARIS</span>
      </div>
    </div>

    <!-- Center Monogram & Kinetic Wordmark -->
    <div class="relative z-10 flex flex-col items-center justify-center gap-4 text-center px-4">
      <!-- Star Birthmark Subtle Vector -->
      <div ref="starEl" class="w-10 h-10 opacity-70">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-brand-accent">
          <polygon points="12,1.5 14.8,8.5 22.3,9.2 16.6,14.2 18.3,21.5 12,17.7 5.7,21.5 7.4,14.2 1.7,9.2 9.2,8.5" />
        </svg>
      </div>

      <!-- Masked Monumental Title -->
      <div class="overflow-hidden">
        <h1
          ref="titleEl"
          class="text-6xl sm:text-8xl md:text-9xl font-bold tracking-[-0.06em] leading-none"
        >
          araki.
        </h1>
      </div>

      <p ref="subEl" class="font-mono text-xs md:text-sm tracking-[0.25em] uppercase opacity-60">
        haute-couture lookbook // vol. 2026
      </p>
    </div>

    <!-- Bottom Counter & Progress Bar -->
    <div class="relative z-10 p-4 md:p-8 flex flex-col gap-3 font-mono">
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
  (e: 'complete'): void
}>()

const preloaderRoot = ref<HTMLElement | null>(null)
const starEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const subEl = ref<HTMLElement | null>(null)

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

  // Initial states
  gsap.set(titleEl.value, { yPercent: 100, opacity: 0 })
  gsap.set(subEl.value, { y: 20, opacity: 0 })
  gsap.set(starEl.value, { scale: 0.5, rotate: -45, opacity: 0 })

  // Entry timeline
  const tl = gsap.timeline()

  tl.to(starEl.value, {
    scale: 1,
    rotate: 0,
    opacity: 0.9,
    duration: 0.8,
    ease: 'power3.out',
  })
    .to(
      titleEl.value,
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
      },
      '-=0.5'
    )
    .to(
      subEl.value,
      {
        y: 0,
        opacity: 0.7,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.4'
    )

  // Counter tween
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

  const exitTl = gsap.timeline({
    onComplete: () => {
      finishPreloader()
    },
  })

  // Fade out center text first
  exitTl.to([titleEl.value, subEl.value, starEl.value], {
    y: -30,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
  })

  // Lift 12 slats with staggered curtain reveal
  exitTl.to(
    slats,
    {
      scaleY: 0,
      duration: 0.9,
      stagger: {
        amount: 0.35,
        from: 'center',
      },
      ease: 'expo.inOut',
    },
    '-=0.1'
  )

  // Fade out wrapper background
  exitTl.to(
    preloaderRoot.value,
    {
      opacity: 0,
      duration: 0.2,
      ease: 'none',
    },
    '-=0.2'
  )
}

function finishPreloader() {
  isFinished.value = true
  lenis.start()
  emit('complete')
}
</script>

