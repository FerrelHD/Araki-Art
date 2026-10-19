<template>
  <section
    id="exhibition"
    class="relative border-b border-grid bg-brand-bg text-brand-primary overflow-hidden"
  >
    <!-- ── 00. THREE.JS FULLSCREEN WEBGL 3D TILT CANVAS ── -->
    <KerimovWebGLGallery :items="galleryItems" anchor-selector=".webgl-plate-anchor" />

    <!-- ── 01. PINNED HORIZONTAL EXHIBITION RUNWAY (RANDOMIZED SCATTERED ZERO-CROP) ── -->
    <div
      ref="gallerySectionRef"
      class="relative z-20 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-center select-none bg-brand-bg"
    >
      <!-- Background subtle grid accent -->
      <div class="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] bg-[radial-gradient(#181C14_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <!-- Horizontal Sliding Track with Asymmetrical Random Scattered Layout -->
      <div
        ref="galleryTrackRef"
        class="flex h-full w-[max-content] items-center pt-4 sm:pt-6 pb-4 relative will-change-transform pr-24 sm:pr-40 md:pr-56 gap-16 sm:gap-24 md:gap-36 lg:gap-48"
      >
        <!-- 00. MINIMALIST ENTRANCE BUFFER (Breathing Room) -->
        <div class="w-[65vw] sm:w-[42vw] lg:w-[35vw] h-full shrink-0 flex items-center justify-start pl-6 sm:pl-12 md:pl-20 pointer-events-none select-none">
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center gap-2 text-brand-primary opacity-60 font-mono text-[0.62rem] sm:text-xs tracking-widest uppercase">
              <span class="w-1.5 h-1.5 bg-brand-primary"></span>
              <span>EXHIBITION RUNWAY // 01—07</span>
            </div>
            <span class="font-serif italic text-2xl sm:text-4xl md:text-5xl text-brand-primary opacity-90 leading-tight">
              The Haute-Couture Plates
            </span>
            <span class="font-mono text-[0.58rem] sm:text-xs opacity-40 uppercase tracking-widest">
              [SCROLL TO EXPLORE ARCHIVE] →
            </span>
          </div>
        </div>

        <!-- 01. PLATE 01: Bucciarati, Jolyne & Weather [ELEVATED HIGH] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 -translate-y-7 sm:-translate-y-12 md:-translate-y-16">
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 01</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">GUCCI '13</span>
            </div>
            <div
              class="webgl-plate-anchor relative w-fit shrink-0 cursor-pointer select-none"
              role="img"
              aria-label="Plate 01: Bucciarati & Jolyne in Gucci"
            >
              <img
                src="/images/jojo-fashion.jpg"
                alt="Bucciarati & Jolyne in Gucci Cruise 2013"
                class="h-[38vh] sm:h-[42vh] md:h-[44vh] max-h-[400px] w-auto block pointer-events-none select-none transition-opacity duration-300"
                style="aspect-ratio: 1032 / 1500;"
              />
            </div>
            <span class="text-xs font-sans font-medium text-brand-primary tracking-wide pt-1 w-full block leading-snug self-start text-left">
              BUCCIARATI & JOLYNE IN GUCCI
            </span>
          </div>
        </div>

        <!-- 02. FLOATING EDITORIAL QUOTE -->
        <div class="relative h-full flex flex-col justify-center shrink-0 px-6 sm:px-12 md:px-20">
          <div class="flex flex-col gap-2.5 translate-y-8 sm:translate-y-14 md:translate-y-20 max-w-[190px] sm:max-w-[250px] shrink-0 select-none">
            <span class="font-serif italic text-sm sm:text-lg text-brand-primary leading-snug opacity-90">
              “Araki treats the runway not as mere fabric, but as sculpted attitude.”
            </span>
            <span class="font-mono text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest opacity-40">
              — FRIDA GIANNINI // GUCCI 90TH
            </span>
          </div>
        </div>

        <!-- 03. PLATE 02: Jolyne Fly High With Gucci [GROUNDED LOW] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 translate-y-6 sm:translate-y-10 md:translate-y-14">
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 02</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">MILANO INSTALLATION · 2013</span>
            </div>
            <div
              class="webgl-plate-anchor relative w-fit shrink-0 cursor-pointer select-none"
              role="img"
              aria-label="Plate 02: Jolyne Cujoh Fly High With Gucci"
            >
              <img
                src="/images/jolyne-horizontal.jpg"
                alt="Jolyne Cujoh Fly High with Gucci Window Campaign"
                class="h-[30vh] sm:h-[34vh] md:h-[36vh] max-h-[340px] w-auto block pointer-events-none select-none transition-opacity duration-300"
                style="aspect-ratio: 1659 / 948;"
              />
            </div>
            <span class="text-xs font-sans font-medium text-brand-primary tracking-wide pt-1 w-full block leading-snug self-start text-left">
              JOLYNE CUJOH: “FLY HIGH WITH GUCCI”
            </span>
          </div>
        </div>

        <!-- 04. PLATE 03: Rohan in Shinjuku Gucci [ELEVATED HIGH] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 -translate-y-9 sm:-translate-y-14 md:-translate-y-20">
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 03</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">GUCCI SHINJUKU</span>
            </div>
            <div
              class="webgl-plate-anchor relative w-fit shrink-0 cursor-pointer select-none"
              role="img"
              aria-label="Plate 03: Rohan Kishibe Goes to Gucci"
            >
              <img
                src="/images/rohan-style.jpg"
                alt="Rohan Kishibe Goes to Gucci"
                class="h-[38vh] sm:h-[44vh] md:h-[46vh] max-h-[420px] w-auto block pointer-events-none select-none transition-opacity duration-300"
                style="aspect-ratio: 828 / 1181;"
              />
            </div>
            <span class="text-xs font-sans font-medium text-brand-primary tracking-wide pt-1 w-full block leading-snug self-start text-left">
              ROHAN KISHIBE AT GUCCI
            </span>
          </div>
        </div>

        <!-- 05. PLATE 04: Rohan au Louvre [STAGGERED LOW DIPTYCH] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 translate-y-7 sm:translate-y-12 md:translate-y-16">
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 04</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">LOUVRE PARIS</span>
            </div>
            <div
              class="webgl-plate-anchor relative w-fit shrink-0 cursor-pointer select-none"
              role="img"
              aria-label="Plate 04: Rohan au Louvre Graphic Arts Folio"
            >
              <img
                src="/images/rohan-jojo-part5.jpg"
                alt="Rohan au Louvre Graphic Arts Folio"
                class="h-[36vh] sm:h-[40vh] md:h-[42vh] max-h-[390px] w-auto block pointer-events-none select-none transition-opacity duration-300"
                style="aspect-ratio: 728 / 1024;"
              />
            </div>
            <span class="text-xs font-sans font-medium text-brand-primary tracking-wide pt-1 w-full block leading-snug self-start text-left">
              ROHAN AU LOUVRE // FOLIO
            </span>
          </div>
        </div>

        <!-- 06. FLOATING CURATORIAL NOTATION -->
        <div class="hidden md:flex flex-col gap-1 text-[0.55rem] font-mono tracking-widest uppercase opacity-35 select-none -translate-y-12 shrink-0 px-4 sm:px-8">
          <span>[FIG. 05 // MONUMENTAL ENSEMBLE]</span>
          <span>L'ANATOMIE DU MOUVEMENT</span>
        </div>

        <!-- 07. PLATE 05: The Monumental Ensemble [OFF-CENTER SLIGHTLY HIGH] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 -translate-y-3 sm:-translate-y-5 md:-translate-y-8">
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 05</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">DYNAMIC CONTRAPPOSTO</span>
            </div>
            <div
              class="webgl-plate-anchor relative w-fit shrink-0 cursor-pointer select-none"
              role="img"
              aria-label="Plate 05: The Monumental Ensemble"
            >
              <img
                src="/images/jojo-horizontal.jpg"
                alt="The Monumental Ensemble: Dynamic Anatomy"
                class="h-[32vh] sm:h-[36vh] md:h-[38vh] max-h-[360px] w-auto block pointer-events-none select-none transition-opacity duration-300"
                style="aspect-ratio: 1457 / 1080;"
              />
            </div>
            <span class="text-xs font-sans font-medium text-brand-primary tracking-wide pt-1 w-full block leading-snug self-start text-left">
              THE MONUMENTAL ENSEMBLE
            </span>
          </div>
        </div>

        <!-- 08. PLATE 06: Diego Brando & Hot Pants [DEEP LOW SCATTER] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 translate-y-9 sm:translate-y-16 md:translate-y-22">
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 06</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">SBR CH. 75</span>
            </div>
            <div
              class="webgl-plate-anchor relative w-fit shrink-0 cursor-pointer select-none"
              role="img"
              aria-label="Plate 06: Diego Brando & Hot Pants"
            >
              <img
                src="/images/Diego and HotPants.jpg"
                alt="Diego Brando & Hot Pants"
                class="h-[38vh] sm:h-[44vh] md:h-[46vh] max-h-[420px] w-auto block pointer-events-none select-none transition-opacity duration-300"
                style="aspect-ratio: 736 / 1192;"
              />
            </div>
            <span class="text-xs font-sans font-medium text-brand-primary tracking-wide pt-1 w-full block leading-snug self-start text-left">
              DIEGO BRANDO & HOT PANTS
            </span>
          </div>
        </div>

        <!-- 09. PLATE 07: Giorno Giovanna Sartoriale [ELEVATED HIGH FINALE] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 -translate-y-8 sm:-translate-y-14 md:-translate-y-18">
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 07</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">VENTO AUREO</span>
            </div>
            <div
              class="webgl-plate-anchor relative w-fit shrink-0 cursor-pointer select-none"
              role="img"
              aria-label="Plate 07: Giorno Giovanna Sartoriale"
            >
              <img
                src="/images/giorno.jpg"
                alt="Giorno Giovanna Sartoriale"
                class="h-[38vh] sm:h-[44vh] md:h-[46vh] max-h-[420px] w-auto block pointer-events-none select-none transition-opacity duration-300"
                style="aspect-ratio: 773 / 1093;"
              />
            </div>
            <span class="text-xs font-sans font-medium text-brand-primary tracking-wide pt-1 w-full block leading-snug self-start text-left">
              GIORNO GIOVANNA SARTORIALE
            </span>
          </div>
        </div>

        <!-- 10. EXIT BUFFER -->
        <div class="w-[50vw] sm:w-[32vw] lg:w-[28vw] h-full shrink-0 flex items-center justify-center pr-8 sm:pr-16 pointer-events-none select-none">
          <div class="flex flex-col gap-2 opacity-50 text-right">
            <span class="font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-widest">
              END OF RUNWAY // 07 PLATES
            </span>
            <span class="font-serif italic text-lg sm:text-2xl text-brand-primary">
              Continue to Anatomy ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import KerimovWebGLGallery, { type GalleryItem } from '@/components/common/KerimovWebGLGallery.vue'
import { gsap, ScrollTrigger } from '@/lenis'

const gallerySectionRef = ref<HTMLElement | null>(null)
const galleryTrackRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const galleryItems: GalleryItem[] = [
  { id: 'plate-1', src: '/images/jojo-fashion.jpg' },
  { id: 'plate-2', src: '/images/jolyne-horizontal.jpg' },
  { id: 'plate-3', src: '/images/rohan-style.jpg' },
  { id: 'plate-4', src: '/images/rohan-jojo-part5.jpg' },
  { id: 'plate-5', src: '/images/jojo-horizontal.jpg' },
  { id: 'plate-6', src: '/images/Diego and HotPants.jpg' },
  { id: 'plate-7', src: '/images/giorno.jpg' },
]

onMounted(() => {
  nextTick(() => {
    ctx = gsap.context(() => {
      const getScrollDistance = () => {
        if (!galleryTrackRef.value) return 0
        return Math.max(0, galleryTrackRef.value.scrollWidth - window.innerWidth + 60)
      }

      const getScrubMultiplier = () => {
        return window.innerWidth < 768 ? 0.55 : 0.7
      }

      gsap.to(galleryTrackRef.value, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: gallerySectionRef.value,
          start: 'top top',
          end: () => `+=${window.innerHeight + Math.round(getScrollDistance() * getScrubMultiplier())}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      if (galleryTrackRef.value) {
        const images = galleryTrackRef.value.querySelectorAll('img')
        images.forEach((img) => {
          if (!img.complete) {
            img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
          }
        })
      }

      if (galleryTrackRef.value && typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          ScrollTrigger.refresh()
        })
        ro.observe(galleryTrackRef.value)
      }

      setTimeout(() => ScrollTrigger.refresh(), 300)
    }, gallerySectionRef.value || undefined)
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
