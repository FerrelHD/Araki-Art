<template>
  <div class="min-h-screen bg-brand-bg text-brand-primary selection:bg-brand-primary selection:text-brand-bg relative overflow-x-hidden">
    <!-- ── 00. THREE.JS FULLSCREEN WEBGL 3D TILT CANVAS ── -->
    <KerimovWebGLGallery :items="galleryItems" anchor-selector=".webgl-plate-anchor" />

    <!-- ── 01. KERIMOV MINIMAL TOP NAV BAR ── -->
    <header class="fixed top-0 inset-x-0 z-50 h-14 md:h-16 border-b border-grid bg-brand-bg/95 backdrop-blur-md px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-colors">
      <!-- Left: Minimal Metadata Badges (Name / Exhibition / Locations) -->
      <div class="flex items-center gap-4 sm:gap-8 font-mono text-[0.62rem] sm:text-xs tracking-widest uppercase opacity-80">
        <a href="#/" class="font-bold tracking-tighter text-base sm:text-lg lowercase font-sans opacity-100 hover:opacity-75 transition-opacity">
          araki.
        </a>
        <span class="hidden md:inline-block opacity-30">/</span>
        <span class="hidden md:inline-block">EXHIBITION: HAUTE-COUTURE ARCHIVE</span>
        <span class="hidden lg:inline-block opacity-30">/</span>
        <span class="hidden lg:inline-block">TOKYO · FLORENCE · PARIS</span>
      </div>

      <!-- Right: Kinetic Back Button -->
      <a
        href="#/"
        class="group/link inline-flex items-center gap-2 text-[0.65rem] sm:text-xs font-mono tracking-[0.22em] uppercase opacity-70 hover:opacity-100 transition-opacity select-none cursor-pointer"
      >
        <span class="transition-transform duration-300 group-hover/link:-translate-x-1">←</span>
        <RollingText text="RETURN TO LOOKBOOK" />
      </a>
    </header>

    <!-- ── 02. PROJECT HERO & CURATORIAL META ── -->
    <main class="relative z-20 pt-20 sm:pt-24 lg:pt-32 pb-24 max-w-[1140px] mx-auto px-4 sm:px-8 lg:px-12">
      <!-- Monumental Project Header -->
      <div class="border-b border-grid pb-10 sm:pb-14">
        <!-- Case Index / Breadcrumb -->
        <div class="flex items-center gap-3 mb-4 text-[0.62rem] sm:text-xs font-mono tracking-[0.28em] uppercase opacity-60">
          <span class="inline-block w-1.5 h-1.5 bg-brand-primary"></span>
          <span>SPECIAL ARCHIVE CASE // 01</span>
          <span class="opacity-30">/</span>
          <span>TOKYO · PARIS · FLORENCE</span>
        </div>

        <!-- Refined Single-Line Title -->
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold tracking-[-0.03em] leading-tight uppercase mb-8">
          {{ project.title }}
        </h1>

        <!-- High-Fashion 4-Column Metadata Strip with Visual Swatches -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-grid text-xs font-mono uppercase tracking-wider">
          <div>
            <span class="block opacity-40 text-[0.58rem] sm:text-[0.62rem] mb-1.5 tracking-widest">[01 // CHRONOLOGY]</span>
            <span class="font-bold text-sm sm:text-base tracking-tight">{{ project.year }}</span>
          </div>
          <div>
            <span class="block opacity-40 text-[0.58rem] sm:text-[0.62rem] mb-1.5 tracking-widest">[02 // COLLABORATION]</span>
            <span class="font-bold text-sm sm:text-base tracking-tight">{{ project.collaboration }}</span>
          </div>
          <div>
            <span class="block opacity-40 text-[0.58rem] sm:text-[0.62rem] mb-1.5 tracking-widest">[03 // DISCIPLINE]</span>
            <span class="font-bold text-sm sm:text-base tracking-tight">{{ project.discipline }}</span>
          </div>
          <div>
            <span class="block opacity-40 text-[0.58rem] sm:text-[0.62rem] mb-1.5 tracking-widest">[04 // COLOR ARCHIVE]</span>
            <div class="flex items-center gap-2 mt-1">
              <span class="w-3.5 h-3.5 rounded-full border border-grid shadow-xs" style="background-color: #181C14;" title="Ink Noir"></span>
              <span class="w-3.5 h-3.5 rounded-full border border-grid shadow-xs" style="background-color: #FAF5EE;" title="Warm Pergament"></span>
              <span class="w-3.5 h-3.5 rounded-full border border-grid shadow-xs" style="background-color: #FF5E36;" title="Araki Vermilion"></span>
              <span class="text-[0.62rem] font-mono opacity-60 ml-1">3 PIGMENTS</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Lead Italic Thesis & Curatorial Narrative & Milestones -->
      <div class="py-10 sm:py-16 border-b border-grid grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Left: Editorial Pull-Quote and Multi-column Narrative (8 Cols) -->
        <div class="lg:col-span-8 space-y-6">
          <!-- Pull-Quote with Vertical Accent -->
          <div class="border-l-2 border-brand-primary/40 pl-5 py-0.5">
            <p class="font-serif italic text-lg sm:text-xl md:text-2xl leading-relaxed text-brand-primary opacity-90">
              “{{ project.leadQuote }}”
            </p>
            <span class="block font-mono text-[0.58rem] sm:text-[0.62rem] tracking-[0.22em] uppercase opacity-40 mt-2.5">
              — HIROHIKO ARAKI // MUSÉE DU LOUVRE INTERVIEW ARCHIVE
            </span>
          </div>

          <!-- Expandable 2-Column Curatorial Narrative -->
          <div
            class="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            :style="{ maxHeight: isEssayExpanded ? '800px' : '0px', opacity: isEssayExpanded ? 1 : 0 }"
          >
            <div class="pt-4 pb-4 md:columns-2 gap-8 text-xs sm:text-sm leading-relaxed opacity-85 font-sans font-light">
              <p v-for="(para, pIdx) in project.essay" :key="pIdx" class="mb-4 first-letter:text-3xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                {{ para }}
              </p>
            </div>
          </div>

          <!-- Pure Typographic Expand/Collapse Button -->
          <button
            type="button"
            @click="isEssayExpanded = !isEssayExpanded"
            class="group inline-flex items-center gap-2.5 font-mono text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase opacity-60 hover:opacity-100 transition-opacity cursor-pointer select-none pt-2"
          >
            <span class="text-sm font-light leading-none transition-transform duration-300 group-hover:scale-125">
              {{ isEssayExpanded ? '−' : '+' }}
            </span>
            <span>{{ isEssayExpanded ? 'COLLAPSE ESSAY' : 'READ CURATORIAL ESSAY' }}</span>
          </button>
        </div>

        <!-- Right: Exhibition Milestones Index Cards (4 Cols) -->
        <div class="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-grid pt-8 lg:pt-0 pl-0 lg:pl-6 space-y-4">
          <div class="flex items-center justify-between border-b border-grid pb-2">
            <p class="font-mono text-xs font-bold tracking-widest uppercase opacity-100">// EXHIBITION MILESTONES</p>
            <span class="font-mono text-[0.6rem] opacity-40">[4 ENTRIES]</span>
          </div>
          <div class="space-y-4 font-mono text-xs">
            <div v-for="(milestone, mIdx) in project.milestones" :key="mIdx" class="group pb-3 border-b border-grid/50 last:border-b-0">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-[0.65rem] font-bold text-brand-primary opacity-90 tracking-wider">[{{ milestone.tag }}]</span>
                <span class="text-[0.68rem] opacity-50 uppercase tracking-widest">{{ milestone.year }}</span>
              </div>
              <p class="text-[0.72rem] leading-snug opacity-80 uppercase tracking-wider font-sans font-normal">
                {{ milestone.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ── 03. PINNED HORIZONTAL EXHIBITION RUNWAY (RANDOMIZED SCATTERED ZERO-CROP) ── -->
    <section
      ref="gallerySectionRef"
      class="relative z-20 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-center select-none border-y border-grid bg-brand-bg -mt-8 sm:-mt-12"
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
            <span class="font-serif italic text-xl sm:text-3xl md:text-4xl text-brand-primary opacity-90 leading-tight">
              The Haute-Couture Plates
            </span>
            <span class="font-mono text-[0.58rem] sm:text-xs opacity-40 uppercase tracking-widest">
              [SCROLL TO EXPLORE ARCHIVE] →
            </span>
          </div>
        </div>

        <!-- 01. PLATE 01: Bucciarati, Jolyne & Abbacchio [ELEVATED HIGH] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 -translate-y-7 sm:-translate-y-12 md:-translate-y-16">
            <!-- Top label: Left-aligned with photo -->
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 01</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">GUCCI '13</span>
            </div>
            <!-- Frameless plate anchor: natural aspect ratio, zero crop -->
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

        <!-- 02. FLOATING EDITORIAL QUOTE [FLOATING LOW WITH GENEROUS BREATHING ROOM] -->
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
            <!-- Top label: Left-aligned with photo -->
            <div class="flex items-center gap-2 text-[0.56rem] sm:text-[0.62rem] font-mono tracking-widest uppercase opacity-65 pb-0.5 select-none self-start text-left">
              <span class="font-bold text-brand-primary">PLATE 02</span>
              <span class="opacity-40">/</span>
              <span class="opacity-80">MILANO INSTALLATION · 2013</span>
            </div>
            <!-- Frameless plate anchor: natural landscape aspect ratio -->
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
            <!-- Top label: Left-aligned with photo -->
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
            <!-- Top label: Left-aligned with photo -->
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

        <!-- 06. FLOATING CURATORIAL NOTATION [MID-HIGH] -->
        <div class="hidden md:flex flex-col gap-1 text-[0.55rem] font-mono tracking-widest uppercase opacity-35 select-none -translate-y-12 shrink-0 px-4 sm:px-8">
          <span>[FIG. 05 // MONUMENTAL ENSEMBLE]</span>
          <span>L'ANATOMIE DU MOUVEMENT</span>
        </div>

        <!-- 07. PLATE 05: The Monumental Ensemble [OFF-CENTER SLIGHTLY HIGH] -->
        <div class="relative h-full flex flex-col justify-center items-start shrink-0">
          <div class="flex flex-col items-start gap-1.5 shrink-0 -translate-y-3 sm:-translate-y-5 md:-translate-y-8">
            <!-- Top label: Left-aligned with photo -->
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
            <!-- Top label: Left-aligned with photo -->
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
            <!-- Top label: Left-aligned with photo -->
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
              Continue to Epilogue ↓
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 04. FOOTER & RETURN NAVIGATION ── -->
    <footer class="relative z-20 max-w-[1140px] mx-auto px-4 sm:px-8 lg:px-12 py-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-grid">
      <div>
        <span class="block text-[0.62rem] font-mono tracking-widest uppercase opacity-40 mb-1">
          END OF CASE STUDY
        </span>
        <p class="font-serif italic text-2xl sm:text-3xl text-brand-primary">
          "Beauty is born from posture, courage, and chromatic tension."
        </p>
      </div>

      <a
        href="#/"
        class="group/link inline-flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.22em] uppercase opacity-70 hover:opacity-100 transition-opacity shrink-0 select-none cursor-pointer"
      >
        <span class="transition-transform duration-300 group-hover/link:-translate-x-1.5">←</span>
        <RollingText text="RETURN TO MAIN LOOKBOOK" />
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import RollingText from '@/components/common/RollingText.vue'
import KerimovWebGLGallery, { type GalleryItem } from '@/components/common/KerimovWebGLGallery.vue'
import { lenis, gsap, ScrollTrigger } from '@/lenis'

defineProps<{
  projectId?: string
}>()

const isEssayExpanded = ref(false)
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

const project = {
  title: 'Gucci × Rohan at the Louvre',
  year: '2009 — 2013',
  collaboration: 'Musée du Louvre & Gucci 90th',
  discipline: 'Haute-Couture & Comics',
  palette: '#181C14 · #FAF5EE · #FF5E36',
  leadQuote:
    'Araki treats the human frame not as a mere vessel for action, but as a runway silhouette sculpted by Michelangelo and dressed by Milanese tailors.',
  essay: [
    'In 2009, Hirohiko Araki made history as the first manga artist in the history of the Musée du Louvre in Paris to have his original full-color artworks exhibited inside the museum halls. Titled "Rohan au Louvre", Araki utilized traditional French watercolor pigments, merging classical Renaissance chiaroscuro with kinetic Japanese linework.',
    'Two years later, in celebration of Gucci’s 90th anniversary and Araki’s 30th anniversary in cartooning, Araki collaborated with former Gucci Creative Director Frida Giannini. His characters—most notably Rohan Kishibe and Jolyne Cujoh—were outfitted in Gucci’s Cruise 2013 collection, adorning the display windows of more than 70 flagship boutiques across Tokyo, Milan, Paris, London, and New York.',
    'Every fold of cloth, belt buckle, and dynamic anatomy reflects Araki’s lifelong devotion to Antonio Lopez’s 1980s fashion sketches, Gianni Versace’s daring tailoring, and classical Hellenistic marble sculptures.'
  ],
  milestones: [
    { tag: '01 / LOUVRE', year: '2009', text: 'First manga artist exhibited at Musée du Louvre permanent collection halls.' },
    { tag: '02 / GUCCI 90TH', year: '2011 — 2013', text: 'Global Cruise collection campaign adorning 70+ flagship boutiques worldwide.' },
    { tag: '03 / JOLYNE CUJOH', year: '2013', text: 'Original Cruise 2013 couture apparel custom-drawn for Spur magazine & Milan.' },
    { tag: '04 / BULGARI MOTIFS', year: '2018', text: 'Capsule collection featuring Killer Queen stand emblems on fine Italian silk.' }
  ]
}

onMounted(() => {
  window.scrollTo(0, 0)
  if (lenis) {
    lenis.scrollTo(0, { immediate: true })
  }

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
