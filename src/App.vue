<template>
  <div class="relative min-h-screen bg-brand-bg text-brand-primary overflow-x-hidden selection:bg-brand-primary selection:text-brand-bg">
    <!-- ── 00. EDITORIAL RUNWAY CURTAIN TRANSITION (Between LookBook & Case Study) ── -->
    <div
      v-show="isCurtainActive"
      ref="curtainRef"
      class="fixed inset-0 z-[500] pointer-events-none flex flex-col justify-between overflow-hidden"
    >
      <div class="absolute inset-0 grid grid-cols-4 md:grid-cols-12 pointer-events-none z-10">
        <div
          v-for="i in 12"
          :key="i"
          class="curtain-slat h-full w-full bg-brand-primary border-r border-brand-bg/15 last:border-r-0"
        ></div>
      </div>
    </div>

    <!-- Cinematic 12-Slat Preloader Intro (Only on cold initial visit) -->
    <PreloaderIntro
      v-if="!hasCompletedIntro"
      @start-transition="onIntroStartTransition"
      @complete="onIntroComplete"
    />

    <!-- ── 01. SPECIAL CASE STUDY VIEW (#/project/...) ── -->
    <template v-if="isProjectRoute">
      <ProjectCaseStudyView />
    </template>

    <!-- ── 02. MAIN EDITORIAL LOOKBOOK (#/) - 100% ISOLATED VIRTUAL CAMERA STAGE ── -->
    <template v-else>
      <!-- Top Fixed Header & Marquee -->
      <HeaderNav />

      <!-- ── VIRTUAL 2.5D CAMERA STAGE (EXACT PERSONA 5 / SKILLSSCREEN ARCHITECTURE) ── -->
      <div
        id="camera-world"
        ref="cameraWorldRef"
        class="relative w-full select-none will-change-transform"
        :style="cameraStageStyle"
      >
        <!-- Ambient Dark Dim Overlay (active when zoomed in, clickable to reset) -->
        <div
          @click="handleResetCamera"
          class="fixed inset-0 bg-black/60 transition-opacity duration-700 z-20"
          :class="isStandActive ? 'opacity-100 pointer-events-auto cursor-pointer' : 'opacity-0 pointer-events-none'"
        />

        <!-- Main Content Area -->
        <main class="relative pt-14 md:pt-16">
          <!-- 01 Hero Section -->
          <HeroSection
            ref="heroSectionRef"
            :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-600' : 'opacity-100 transition-opacity duration-600'"
          />

          <!-- 02 Statement / Aesthetic Thesis -->
          <StatementSection
            :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-600' : 'opacity-100 transition-opacity duration-600'"
          />

          <!-- 03 Selected Capsules (Mijobello Slider + Funny Valentine) -->
          <CapsulesSlider />

          <!-- 04 Anatomy (Mijobello Expanding Accordion) -->
          <AnatomyAccordion
            :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-600' : 'opacity-100 transition-opacity duration-600'"
          />
        </main>
      </div>

      <!-- 05 Footer & Monumental Watermark -->
      <FooterSection
        :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-600' : 'opacity-100 transition-opacity duration-600'"
      />

      <!-- Tactical Position Calibrator Drawer (Shift + C / button) -->
      <UniversalValentineStage />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import PreloaderIntro from '@/components/common/PreloaderIntro.vue'
import HeaderNav from '@/components/layout/HeaderNav.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatementSection from '@/components/sections/StatementSection.vue'
import CapsulesSlider from '@/components/sections/CapsulesSlider.vue'
import AnatomyAccordion from '@/components/sections/AnatomyAccordion.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import UniversalValentineStage from '@/components/common/UniversalValentineStage.vue'
import ProjectCaseStudyView from '@/components/views/ProjectCaseStudyView.vue'
import { useValentineStage } from '@/composables/useValentineStage'
import { ScrollTrigger, lenis, gsap } from '@/lenis'

// Simple Hash Router: Completely isolates the new Kerimov case study page from the LookBook camera stage
const currentRoute = ref(typeof window !== 'undefined' ? window.location.hash || '#/' : '#/')
const isProjectRoute = computed(() => currentRoute.value.startsWith('#/project'))
const hasCompletedIntro = ref(isProjectRoute.value)

// ── Editorial Runway Curtain Transition ──
const isCurtainActive = ref(false)
const curtainRef = ref<HTMLElement | null>(null)
let isCurtainAnimating = false

const playCurtainTransition = (targetRoute: string) => {
  if (isCurtainAnimating) return
  isCurtainAnimating = true
  isCurtainActive.value = true

  nextTick(() => {
    const slats = curtainRef.value?.querySelectorAll('.curtain-slat')
    if (!slats || slats.length === 0) {
      currentRoute.value = targetRoute
      window.scrollTo(0, 0)
      if (lenis) lenis.scrollTo(0, { immediate: true })
      isCurtainActive.value = false
      isCurtainAnimating = false
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isCurtainActive.value = false
        isCurtainAnimating = false
        if (!isProjectRoute.value) {
          setTimeout(() => {
            ScrollTrigger.refresh()
          }, 100)
        }
      },
    })

    // Slat sweep down
    tl.set(slats, { scaleY: 0, transformOrigin: 'top' })
      .to(slats, {
        scaleY: 1,
        duration: 0.32,
        stagger: 0.02,
        ease: 'power3.inOut',
      })
      // Swap route & reset scroll while completely covered
      .add(() => {
        currentRoute.value = targetRoute
        window.scrollTo(0, 0)
        if (lenis) lenis.scrollTo(0, { immediate: true })
      })
      // Slat lift away
      .set(slats, { transformOrigin: 'bottom' })
      .to(slats, {
        scaleY: 0,
        duration: 0.32,
        stagger: 0.02,
        ease: 'power3.inOut',
        delay: 0.04,
      })
  })
}

const updateRoute = () => {
  const newHash = window.location.hash || '#/'
  const wasProject = currentRoute.value.startsWith('#/project')
  const isProject = newHash.startsWith('#/project')

  if (wasProject !== isProject) {
    playCurtainTransition(newHash)
  } else {
    currentRoute.value = newHash
  }
}

const heroSectionRef = ref<any>(null)
const cameraWorldRef = ref<HTMLElement | null>(null)
let cameraTween: gsap.core.Tween | null = null

const {
  config,
  isStandActive,
  showValentineAdjuster,
  lastFocusOrigin,
  handleResetCamera,
} = useValentineStage()

// Virtual 2.5D Camera Stage Style - hardware-accelerated composition base
const cameraStageStyle = computed(() => {
  return {
    transformOrigin: `${lastFocusOrigin.value.originX}% ${lastFocusOrigin.value.originY}%`,
    backfaceVisibility: 'hidden' as const,
    WebkitBackfaceVisibility: 'hidden' as const,
    willChange: 'transform' as const,
  }
})

// GSAP Camera Engine: Physics-driven exponential glide (expo.out) for buttery smooth motion & interruptibility
watch(
  isStandActive,
  (active) => {
    if (!cameraWorldRef.value) return

    // Pin origin to current focal target
    cameraWorldRef.value.style.transformOrigin = `${lastFocusOrigin.value.originX}% ${lastFocusOrigin.value.originY}%`

    if (cameraTween) {
      cameraTween.kill()
    }

    if (active) {
      cameraTween = gsap.to(cameraWorldRef.value, {
        scale: config.value.cameraZoom,
        duration: 0.85,
        ease: 'expo.out',
        force3D: true,
        overwrite: 'auto',
      })
    } else {
      cameraTween = gsap.to(cameraWorldRef.value, {
        scale: 1,
        duration: 0.75,
        ease: 'expo.out',
        force3D: true,
        overwrite: 'auto',
      })
    }
  },
  { flush: 'post' }
)

// Live adjustment watchers when calibrating via Shift + C
watch(
  () => config.value.cameraZoom,
  (newZoom) => {
    if (isStandActive.value && cameraWorldRef.value) {
      gsap.to(cameraWorldRef.value, {
        scale: newZoom,
        duration: 0.2,
        ease: 'power2.out',
        force3D: true,
        overwrite: 'auto',
      })
    }
  }
)

watch(
  () => [lastFocusOrigin.value.originX, lastFocusOrigin.value.originY],
  ([x, y]) => {
    if (cameraWorldRef.value) {
      cameraWorldRef.value.style.transformOrigin = `${x}% ${y}%`
    }
  }
)

function onIntroStartTransition() {
  if (heroSectionRef.value?.playHandoverEntrance) {
    heroSectionRef.value.playHandoverEntrance()
  }
}

function onIntroComplete() {
  hasCompletedIntro.value = true
  ScrollTrigger.refresh()
  lenis.start()
  if (heroSectionRef.value?.finalizeHandover) {
    heroSectionRef.value.finalizeHandover()
  }
}

// Keyboard shortcuts: Escape to reset zoom, Shift+C for calibrator
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.shiftKey && (e.key === 'C' || e.key === 'c')) {
    e.preventDefault()
    showValentineAdjuster.value = !showValentineAdjuster.value
    return
  }

  if (e.key === 'Escape') {
    if (showValentineAdjuster.value) {
      showValentineAdjuster.value = false
    } else if (isStandActive.value) {
      handleResetCamera()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('hashchange', updateRoute)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('hashchange', updateRoute)
  if (cameraTween) {
    cameraTween.kill()
  }
})
</script>
