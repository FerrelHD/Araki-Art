<template>
  <div class="relative min-h-screen bg-brand-bg text-brand-primary overflow-x-hidden selection:bg-brand-primary selection:text-brand-bg">
    <!-- Cinematic 12-Slat Preloader Intro -->
    <PreloaderIntro
      @start-transition="onIntroStartTransition"
      @complete="onIntroComplete"
    />

    <!-- 12-Column Blueprint Grid Overlay -->
    <GridOverlay />

    <!-- Top Fixed Header & Marquee -->
    <HeaderNav
      :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-400' : 'opacity-100 transition-opacity duration-400'"
    />

    <!-- ── CINEMATIC LETTERBOX BLACK BARS (FOREGROUND LAYER - Z-INDEX 60) ── -->
    <!-- Top Black Bar -->
    <div
      class="fixed top-0 inset-x-0 z-[60] bg-black pointer-events-none transition-all duration-500 h-10 sm:h-12 md:h-14 lg:h-16"
      :class="isStandActive ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'"
      style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1)"
    />

    <!-- Bottom Black Bar -->
    <div
      class="fixed bottom-0 inset-x-0 z-[60] bg-black pointer-events-none transition-all duration-500 h-10 sm:h-12 md:h-14 lg:h-16"
      :class="isStandActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
      style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1)"
    />

    <!-- ── ANIME SPEED LINES FLASH IMPACT OVERLAY (Z-INDEX 50) ── -->
    <div
      v-if="showSpeedlines"
      class="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <svg class="w-full h-full opacity-70" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <line
          v-for="line in speedlineLines"
          :key="line.id"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :stroke="line.stroke"
          :stroke-width="line.width"
          stroke-dasharray="80 160"
        />
      </svg>
    </div>

    <!-- Main Content Area -->
    <main class="relative z-10 pt-14 md:pt-16">
      <!-- Ambient Dark Dim Overlay (active when zoomed in, clickable to reset) -->
      <div
        @click="handleResetCamera"
        class="fixed inset-0 bg-black/60 transition-opacity duration-500 z-20"
        :class="isStandActive ? 'opacity-100 pointer-events-auto cursor-pointer' : 'opacity-0 pointer-events-none'"
      />
        <!-- 01 Hero Section -->
        <HeroSection
          ref="heroSectionRef"
          :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-400' : 'opacity-100 transition-opacity duration-400'"
        />

        <!-- 02 Statement / Aesthetic Thesis -->
        <StatementSection
          :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-400' : 'opacity-100 transition-opacity duration-400'"
        />

        <!-- 03 Selected Capsules (Mijobello Slider + Funny Valentine) -->
        <CapsulesSlider />

        <!-- 04 Anatomy (Mijobello Expanding Accordion) -->
        <AnatomyAccordion
          :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-400' : 'opacity-100 transition-opacity duration-400'"
        />
      </main>

    <!-- 05 Footer & Monumental Watermark -->
    <FooterSection
      :class="isStandActive ? 'opacity-20 pointer-events-none transition-opacity duration-400' : 'opacity-100 transition-opacity duration-400'"
    />

    <!-- Tactical Position Calibrator Drawer (Shift + C / button) -->
    <UniversalValentineStage />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PreloaderIntro from '@/components/common/PreloaderIntro.vue'
import GridOverlay from '@/components/common/GridOverlay.vue'
import HeaderNav from '@/components/layout/HeaderNav.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatementSection from '@/components/sections/StatementSection.vue'
import CapsulesSlider from '@/components/sections/CapsulesSlider.vue'
import AnatomyAccordion from '@/components/sections/AnatomyAccordion.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import UniversalValentineStage from '@/components/common/UniversalValentineStage.vue'
import { useValentineStage } from '@/composables/useValentineStage'
import { ScrollTrigger, lenis } from '@/lenis'

const heroSectionRef = ref<any>(null)
const {
  isStandActive,
  showSpeedlines,
  showValentineAdjuster,
  lastFocusOrigin,
  handleResetCamera,
} = useValentineStage()

// Dynamic radial speedlines shooting outward from Valentine's focal coordinates
const speedlineLines = computed(() => {
  const cx = lastFocusOrigin.value.originX * 10
  const cy = lastFocusOrigin.value.originY * 10
  const count = 28
  const lines = []
  for (let i = 0; i < count; i++) {
    const angle = (i * (360 / count) * Math.PI) / 180
    const x2 = cx + Math.cos(angle) * 1200
    const y2 = cy + Math.sin(angle) * 1200
    lines.push({
      id: i,
      x1: cx,
      y1: cy,
      x2,
      y2,
      stroke: i % 2 === 0 ? '#06b6d4' : '#ffffff',
      width: i % 4 === 0 ? '3.5' : '1.8',
    })
  }
  return lines
})

function onIntroStartTransition() {
  if (heroSectionRef.value?.playHandoverEntrance) {
    heroSectionRef.value.playHandoverEntrance()
  }
}

function onIntroComplete() {
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
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
