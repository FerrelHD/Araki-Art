<template>
  <section
    id="anatomy"
    ref="anatomyRoot"
    class="border-b border-grid text-brand-primary overflow-hidden"
  >
    <!-- Section Eyebrow & Title inside 10-column container -->
    <div class="grid grid-cols-4 md:grid-cols-12">
      <div
        class="col-span-4 md:col-span-10 md:col-start-2 border-x border-grid pt-16 md:pt-32 pb-4 overflow-hidden"
      >
        <div class="p-4 md:p-6">
          <p class="mb-2 text-[0.68rem] font-bold tracking-[0.2em] uppercase font-mono opacity-70">
            the
          </p>
          <div class="overflow-hidden">
            <h2
              ref="headingRef"
              class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.06em] leading-[0.85] will-change-transform"
            >
              anatomy.
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Expanding Rows (Mijobello Signature Accordion) -->
    <div class="flex flex-col">
      <div
        v-for="(item, index) in pillars"
        :key="item.num"
        class="accordion-row group grid grid-cols-4 md:grid-cols-12 border-t border-grid transition-[min-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:min-h-[220px] md:hover:min-h-[340px] cursor-pointer"
        :class="index === pillars.length - 1 ? 'border-b' : ''"
      >
        <!-- Col 1: Number Tabular Num -->
        <span
          class="col-span-1 p-4 md:p-6 flex items-start tabular-nums opacity-60 text-xs md:text-sm font-mono tracking-[0.18em]"
        >
          {{ item.num }}
        </span>

        <!-- Col 2-7: Pillar Title -->
        <h3
          class="col-span-3 md:col-span-6 border-l border-grid md:border-r p-4 md:p-6 flex items-center text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] lowercase"
        >
          {{ item.title }}
        </h3>

        <!-- Col 8-9: Deliverables / Attributes List -->
        <ul
          class="col-span-3 col-start-2 md:col-span-2 md:col-start-auto border-l border-grid md:border-r md:border-l-0 p-4 md:p-6 flex flex-col justify-center gap-1.5 text-[0.68rem] font-mono tracking-[0.16em] uppercase opacity-80"
        >
          <li v-for="(sub, sIdx) in item.tags" :key="sIdx">
            {{ sub }}
          </li>
        </ul>

        <!-- Col 10-12: Media Container that zooms / reveals on hover -->
        <div
          class="relative col-span-4 h-48 md:h-auto md:col-span-3 overflow-hidden bg-black/10"
        >
          <div
            class="absolute inset-0 -translate-y-[4%] scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:scale-100"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="h-full w-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <!-- Corner pill tag -->
          <span class="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-[0.6rem] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            EXPLORE SPEC
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from '@/lenis'

interface Pillar {
  num: string
  title: string
  tags: string[]
  image: string
}

const pillars: Pillar[] = [
  {
    num: '01',
    title: 'the pose',
    tags: ['contrapposto', 'greek statuary', 'michelangelo', 'body tension', 'runway lines'],
    image: '/images/jotaro.jpg',
  },
  {
    num: '02',
    title: 'the palette',
    tags: ['chromatic shift', 'non-canonical', 'emotional hues', 'contrast theory', 'psychedelia'],
    image: '/images/jojo-sbr-ultra-jump.jpg',
  },
  {
    num: '03',
    title: 'the sound',
    tags: ['queen', 'david bowie', 'prince', 'pink floyd', 'glam rock runway'],
    image: '/images/kira-yoshikage.jpg',
  },
  {
    num: '04',
    title: 'the garment',
    tags: ['heart cutouts', 'golden studding', 'italian suiting', 'tailored drape', 'androgyny'],
    image: '/images/giorno.jpg',
  },
]

const anatomyRoot = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    if (!anatomyRoot.value) return

    // Heading mask reveal
    if (headingRef.value) {
      gsap.fromTo(
        headingRef.value,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.value,
            start: 'top 85%',
          },
        }
      )
    }

    // Rows stagger reveal
    const rows = anatomyRoot.value.querySelectorAll('.accordion-row')
    if (rows.length) {
      gsap.fromTo(
        rows,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rows[0],
            start: 'top 80%',
          },
        }
      )
    }
  }, anatomyRoot.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
