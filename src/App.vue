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
    <HeaderNav />

    <!-- Main Content Area: smoothly blurs with Depth of Field when Valentine Stand is focused -->
    <main
      class="relative z-10 pt-14 md:pt-16 transition-[filter,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      :class="isStandActive ? 'filter blur-[7px] brightness-[0.7] select-none pointer-events-none' : 'filter blur-0 brightness-100'"
    >
      <!-- 01 Hero Section -->
      <HeroSection ref="heroSectionRef" />

      <!-- 02 Statement / Aesthetic Thesis -->
      <StatementSection />

      <!-- 03 Selected Capsules (Mijobello Slider) -->
      <CapsulesSlider />

      <!-- 04 Anatomy (Mijobello Expanding Accordion) -->
      <AnatomyAccordion />
    </main>

    <!-- Universal Virtual Camera Stage for Funny Valentine & D4C -->
    <UniversalValentineStage />

    <!-- 05 Footer & Monumental Watermark -->
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
const { isStandActive } = useValentineStage()

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
</script>
