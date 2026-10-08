<template>
  <div class="relative min-h-screen bg-brand-bg text-brand-primary overflow-x-hidden selection:bg-brand-primary selection:text-brand-bg">
    <!-- Cinematic 12-Slat Preloader Intro -->
    <PreloaderIntro @complete="onIntroComplete" />

    <!-- 12-Column Blueprint Grid Overlay -->
    <GridOverlay />

    <!-- Top Fixed Header & Marquee -->
    <HeaderNav />

    <!-- Main Content Area -->
    <main class="relative z-10 pt-14 md:pt-16">
      <!-- 01 Hero Section -->
      <HeroSection ref="heroSectionRef" />

      <!-- 02 Statement / Aesthetic Thesis -->
      <StatementSection />

      <!-- 03 Selected Capsules (Mijobello Slider) -->
      <CapsulesSlider />

      <!-- 04 Anatomy (Mijobello Expanding Accordion) -->
      <AnatomyAccordion />
    </main>

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
import { ScrollTrigger } from '@/lenis'

const heroSectionRef = ref<any>(null)

function onIntroComplete() {
  ScrollTrigger.refresh()
  if (heroSectionRef.value?.playIntroAnimation) {
    heroSectionRef.value.playIntroAnimation()
  }
}
</script>
