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
        <div class="lg:col-span-4 border-l border-grid pl-6 space-y-4">
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

      <!-- ── 03. EDITORIAL GALLERY (ASYMMETRICAL RHYTHM, BORDERLESS 3D TILT, ZERO CROP) ── -->
      <section class="py-16 sm:py-24 space-y-28 sm:space-y-36 relative">
        <!-- Plate 01: Centered Haute-Couture Portrait Folio (Full 1032x1500) -->
        <div class="max-w-xl sm:max-w-2xl mx-auto space-y-3">
          <div
            class="webgl-plate-anchor relative w-full aspect-[1032/1500] select-none cursor-pointer"
            role="img"
            aria-label="Plate 01: High-Fashion Runway Archive"
          >
            <img
              src="/images/jojo-fashion.jpg"
              alt="High-Fashion Runway Archive"
              class="opacity-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
          <div class="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-2 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider opacity-70 border-b border-grid pb-2">
            <div class="flex items-center gap-2">
              <span class="font-sans font-medium text-brand-primary">HIGH-FASHION RUNWAY ARCHIVE</span>
            </div>
            <span class="opacity-50 text-[0.6rem]">[FLORENCE RUNWAY · 2013]</span>
          </div>
        </div>

        <!-- Plate 02: Staggered Right with Negative Space on Left (Full 1659x948) -->
        <div class="flex justify-end">
          <div class="w-full sm:w-[75%] lg:w-[65%] sm:translate-x-2 space-y-3">
            <div
              class="webgl-plate-anchor relative w-full aspect-[1659/948] select-none cursor-pointer"
              role="img"
              aria-label="Plate 02: Jolyne Fly High With Gucci"
            >
              <img
                src="/images/jolyne-horizontal.jpg"
                alt="Jolyne x Gucci Window Campaign"
                class="opacity-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div class="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-2 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider opacity-70 border-b border-grid pb-2">
              <div class="flex items-center gap-2">
                <span class="font-sans font-medium text-brand-primary">“JOLYNE, FLY HIGH WITH GUCCI”</span>
              </div>
              <span class="opacity-50 text-[0.6rem]">[MILANO & TOKYO BOUTIQUES]</span>
            </div>
          </div>
        </div>

        <!-- Plate 03: Asymmetrical Diptych (Full Uncropped Folios) -->
        <div class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 items-start">
          <!-- Left: Rohan in Shinjuku Gucci (828x1181) -->
          <div class="space-y-3">
            <div
              class="webgl-plate-anchor relative w-full aspect-[828/1181] select-none cursor-pointer"
              role="img"
              aria-label="Plate 03A: Rohan in Shinjuku Gucci"
            >
              <img
                src="/images/rohan-style.jpg"
                alt="Rohan Kishibe at Gucci"
                class="opacity-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div class="relative z-20 flex flex-col gap-1 pt-2 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider opacity-70 border-b border-grid pb-2">
              <span class="font-sans font-medium text-brand-primary">ROHAN IN SHINJUKU GUCCI</span>
              <span class="opacity-50 text-[0.6rem]">[TOKYO FLAGSHIP]</span>
            </div>
          </div>

          <!-- Right: Louvre Folio (728x1024, slightly staggered downward for dynamic flow) -->
          <div class="sm:translate-y-12 space-y-3">
            <div
              class="webgl-plate-anchor relative w-full aspect-[728/1024] select-none cursor-pointer"
              role="img"
              aria-label="Plate 03B: Musee du Louvre Exhibition Folio"
            >
              <img
                src="/images/rohan-jojo-part5.jpg"
                alt="Rohan Graphic Arts"
                class="opacity-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div class="relative z-20 flex flex-col gap-1 pt-2 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider opacity-70 border-b border-grid pb-2">
              <span class="font-sans font-medium text-brand-primary">MUSÉE DU LOUVRE EXHIBITION FOLIO</span>
              <span class="opacity-50 text-[0.6rem]">[PARIS · FRENCH WATERCOLOR]</span>
            </div>
          </div>
        </div>

        <!-- Plate 04: The Monumental Contrapposto (Full 1457x1080) -->
        <div class="flex justify-start">
          <div class="w-full sm:w-[82%] lg:w-[70%] sm:-translate-x-2 space-y-3">
            <div
              class="webgl-plate-anchor relative w-full aspect-[1457/1080] select-none cursor-pointer"
              role="img"
              aria-label="Plate 04: The Monumental Contrapposto"
            >
              <img
                src="/images/jojo-horizontal.jpg"
                alt="Araki Haute Couture Legacy"
                class="opacity-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div class="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-2 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider opacity-70 border-b border-grid pb-2">
              <div class="flex items-center gap-2">
                <span class="opacity-40">/</span>
                <span class="font-sans font-medium text-brand-primary">“THE MONUMENTAL CONTRAPPOSTO”</span>
              </div>
              <span class="opacity-50 text-[0.6rem]">[CLASSICAL FORM & MODERN RUNWAY]</span>
            </div>
          </div>
        </div>

        <!-- Plate 05: Editorial Climax (Diego & Hot Pants + Giorno Giovanna) -->
        <div class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 items-start">
          <!-- Left: Diego & Hot Pants (736x1192) -->
          <div class="space-y-3">
            <div
              class="webgl-plate-anchor relative w-full aspect-[736/1192] select-none cursor-pointer"
              role="img"
              aria-label="Plate 05A: Diego Brando & Hot Pants"
            >
              <img
                src="/images/Diego and HotPants.jpg"
                alt="Diego Brando & Hot Pants"
                class="opacity-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div class="relative z-20 flex flex-col gap-1 pt-2 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider opacity-70 border-b border-grid pb-2">
              <span class="font-sans font-medium text-brand-primary">DIEGO BRANDO & HOT PANTS</span>
              <span class="opacity-50 text-[0.6rem]">[STEEL BALL RUN · EQUESTRIAN COUTURE]</span>
            </div>
          </div>

          <!-- Right: Giorno Giovanna Sartoriale (773x1093, downward vertical stagger) -->
          <div class="sm:translate-y-16 space-y-3">
            <div
              class="webgl-plate-anchor relative w-full aspect-[773/1093] select-none cursor-pointer"
              role="img"
              aria-label="Plate 05B: Giorno Giovanna Sartoriale"
            >
              <img
                src="/images/giorno.jpg"
                alt="Giorno Giovanna Sartoriale"
                class="opacity-0 w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div class="relative z-20 flex flex-col gap-1 pt-2 text-[0.65rem] sm:text-xs font-mono uppercase tracking-wider opacity-70 border-b border-grid pb-2">
              <span class="font-sans font-medium text-brand-primary">GIORNO GIOVANNA SARTORIALE</span>
              <span class="opacity-50 text-[0.6rem]">[PASSIONE NEAPOLITAN TAILORING]</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ── 04. FOOTER & RETURN NAVIGATION ── -->
      <footer class="pt-16 border-t border-grid flex flex-col sm:flex-row items-center justify-between gap-6">
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RollingText from '@/components/common/RollingText.vue'
import KerimovWebGLGallery, { type GalleryItem } from '@/components/common/KerimovWebGLGallery.vue'
import { lenis } from '@/lenis'

defineProps<{
  projectId?: string
}>()

const isEssayExpanded = ref(false)

const galleryItems: GalleryItem[] = [
  { id: 'plate-1', src: '/images/jojo-fashion.jpg' },
  { id: 'plate-2', src: '/images/jolyne-horizontal.jpg' },
  { id: 'plate-3a', src: '/images/rohan-style.jpg' },
  { id: 'plate-3b', src: '/images/rohan-jojo-part5.jpg' },
  { id: 'plate-4', src: '/images/jojo-horizontal.jpg' },
  { id: 'plate-5a', src: '/images/Diego and HotPants.jpg' },
  { id: 'plate-5b', src: '/images/giorno.jpg' },
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
})
</script>
