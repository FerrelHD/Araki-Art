<template>
  <section
    id="capsules"
    ref="capsulesRoot"
    class="border-b border-grid text-brand-primary overflow-visible relative z-20 min-h-screen flex flex-col justify-between"
  >
    <div class="grid grid-cols-4 md:grid-cols-12 flex-1 min-h-0">
      <!-- 10 Columns Centered Container -->
      <div
        class="col-span-4 md:col-span-10 md:col-start-2 border-x border-grid flex flex-col justify-between min-h-0 pt-16 md:pt-24 lg:pt-28"
      >
        <!-- Section Title (Generous Editorial Spacing & Gap) -->
        <div class="border-b border-grid px-4 py-5 md:px-6 md:py-7 overflow-hidden flex items-baseline justify-between shrink-0">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <p class="text-[0.62rem] font-bold tracking-[0.2em] uppercase font-mono opacity-60">
                selected
              </p>
              <span class="text-xs opacity-20">/</span>
              <span class="font-mono text-[0.62rem] tracking-widest uppercase opacity-40">
                MANGA COVER ARCHIVE · 01-09
              </span>
            </div>
            <div class="overflow-hidden">
              <h2
                ref="headingRef"
                class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.06em] leading-none will-change-transform"
              >
                capsules.
              </h2>
            </div>
          </div>
        </div>

        <!-- Slider Main Grid: Left 6 cols interactive + Right 4 cols Flamboyant Duo Pop-Out -->
        <div class="grid grid-cols-4 md:grid-cols-10 flex-1 min-h-0 overflow-visible">
          <!-- Left 6 Columns: Interactive Capsule Card & Vertical Thumbnails (Higher z-index) -->
          <div
            class="relative z-30 col-span-4 md:col-span-10 lg:col-span-6 lg:border-r border-grid flex flex-col justify-between min-h-0"
          >
            <!-- Top Container: Vertical Thumbnails Strip + Active Project Showcase (Stretched to PREV/NEXT) -->
            <div class="flex flex-1 border-b border-grid min-h-0">
              
              <!-- Left Vertical Thumbnail Strip (Hover to switch 9 Parts) -->
              <div
                class="flex w-14 sm:w-16 md:w-20 shrink-0 flex-col border-r border-grid select-none overflow-y-auto no-scrollbar max-h-full"
              >
                <button
                  v-for="(capsule, idx) in capsules"
                  :key="capsule.id"
                  type="button"
                  @mouseenter="goToSlide(idx)"
                  @click="goToSlide(idx)"
                  class="relative w-full flex-1 min-h-[46px] cursor-pointer overflow-hidden border-b last:border-b-0 border-grid transition-all duration-300 group"
                  :class="activeIdx === idx ? 'opacity-100 ring-2 ring-inset ring-brand-primary' : 'opacity-40 hover:opacity-90'"
                  :aria-label="'Select ' + capsule.title"
                >
                  <img
                    :src="capsule.image"
                    :alt="capsule.title"
                    class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <!-- Small number index on thumbnail -->
                  <span class="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[0.52rem] font-mono px-1 font-bold">
                    0{{ idx + 1 }}
                  </span>
                </button>
              </div>

              <!-- Right: Active Slide Content Card (Stacked: Clean Minimalist Bar on Top + Full Bleed Cover Below) -->
              <div class="min-w-0 flex-1 flex flex-col justify-between bg-brand-bg min-h-0">
                <!-- Capsule Information Block (Simple & Clean editorial bar like reference) -->
                <div class="w-full bg-brand-primary text-brand-bg px-4 py-2.5 md:px-6 md:py-3.5 flex flex-col gap-2.5 border-b border-grid shrink-0">
                  <!-- Row 1: Title on left, Category & Year on right -->
                  <div class="flex items-baseline justify-between gap-3">
                    <h3 class="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight truncate">
                      {{ currentCapsule.title }}
                    </h3>
                    <span class="text-[0.62rem] sm:text-[0.68rem] font-mono uppercase tracking-[0.18em] opacity-65 shrink-0">
                      {{ currentCapsule.category }} · {{ currentCapsule.year }}
                    </span>
                  </div>

                  <!-- Row 2: Outline Tag Badges on left, VIEW ARCHIVE > on right -->
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex flex-wrap gap-1.5 sm:gap-2">
                      <span
                        v-for="(tag, tIdx) in currentCapsule.tags"
                        :key="tIdx"
                        class="border border-brand-bg/40 px-2 py-0.5 text-[0.6rem] sm:text-[0.65rem] font-mono uppercase tracking-wider text-brand-bg/90"
                      >
                        {{ tag }}
                      </span>
                    </div>

                    <a
                      :href="currentCapsule.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group/roll shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-wider uppercase text-brand-bg hover:opacity-80"
                    >
                      <RollingText text="view archive" />
                      <span class="transition-transform group-hover/roll:translate-x-1">></span>
                    </a>
                  </div>
                </div>

                <!-- Large Visual Container (Full Bleed Cover Filling All Remaining Space Down to PREV/NEXT) -->
                <div class="relative block w-full flex-1 overflow-hidden bg-black/10 group select-none min-h-0">
                 <!-- Base Outgoing Layer -->
<img
  :src="outgoingImage"
  :alt="currentCapsule.title"
  class="absolute inset-0 h-full w-full object-cover transition-all duration-300"
  :style="{ objectPosition: currentCapsule.objectPosition || '50% 12%' }"
/>

<!-- Top Incoming Layer -->
<img
  ref="incomingImgRef"
  :src="currentCapsule.image"
  :alt="currentCapsule.title"
  class="absolute inset-0 h-full w-full object-cover will-change-[opacity] transition-all duration-300"
  :style="{ objectPosition: currentCapsule.objectPosition || '50% 12%' }"
/>
                  <div class="absolute inset-0 bg-brand-primary/5 pointer-events-none z-10"></div>
                </div>
              </div>
            </div>

            <!-- Bottom Prev / Next Nav Buttons (50% / 50% split) -->
            <div class="flex h-11 md:h-13 border-b border-grid shrink-0">
              <button
                type="button"
                @click="prevSlide"
                aria-label="Previous capsule"
                class="flex flex-1 cursor-pointer items-center justify-center border-r border-grid text-sm md:text-base font-mono tracking-wider transition-colors hover:bg-brand-primary hover:text-brand-bg select-none"
              >
                ← PREV
              </button>
              <button
                type="button"
                @click="nextSlide"
                aria-label="Next capsule"
                class="flex flex-1 cursor-pointer items-center justify-center text-sm md:text-base font-mono tracking-wider transition-colors hover:bg-brand-primary hover:text-brand-bg select-none"
              >
                NEXT →
              </button>
            </div>
          </div>

          <!-- Right 4 Columns: High-Fashion Freestanding Muse (Funny Valentine - Overlapping Banner Above) -->
          <div
            class="group/side relative z-30 hidden lg:col-span-4 lg:flex flex-col justify-end overflow-visible px-4 pb-2 bg-brand-primary/[0.015] border-b border-grid min-h-0 select-none"
          >
            <!-- Watermark Background -->
            <div class="absolute -top-10 right-4 font-mono text-[8rem] xl:text-[11rem] font-bold leading-none opacity-5 select-none pointer-events-none">
              D4C
            </div>



            <!-- Pop-out Cutout Container: Funny Valentine with D4C (Dynamic Live Overlap, NO drop-shadow) -->
            <div class="relative w-full flex-1 min-h-0 flex items-end justify-center overflow-visible pointer-events-none">
              <div
                class="relative h-full w-full flex items-end justify-center origin-bottom z-30 pointer-events-none"
                style="transform: translate(0px, -280px) scale(1.72);"
              >
                <img
                  src="/images/flamboyant-duo.png"
                  alt="Funny Valentine & D4C Runway Cutout"
                  class="h-full w-auto max-h-[580px] xl:max-h-[660px] object-contain object-bottom filter contrast-110 pointer-events-none select-none"
                />
              </div>
            </div>

            <!-- Bottom Runway Metadata -->
            <div class="relative z-10 pt-1.5 border-t border-grid/40 flex justify-between items-center text-[0.58rem] font-mono opacity-65 shrink-0 pointer-events-none">
              <span class="tracking-wider uppercase">FIGURE: FUNNY VALENTINE [D4C]</span>
              <span class="tracking-widest">STEEL BALL RUN ARCHIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Running Marquee: "VIEW FULL RUNWAY ARCHIVE / ..." -->
    <a
      href="#anatomy"
      aria-label="view runway anatomy"
      class="group/marquee relative block h-9 md:h-11 overflow-hidden border-t border-grid transition-colors hover:bg-brand-primary hover:text-brand-bg shrink-0"
    >
      <div
        class="animate-marquee-fast flex h-full w-max items-center text-[0.68rem] tracking-[0.2em] font-mono uppercase group-hover/marquee:[animation-play-state:paused]"
      >
        <span class="flex shrink-0 items-center">
          <span
            v-for="n in 12"
            :key="'m1-' + n"
            class="flex shrink-0 items-center whitespace-nowrap"
          >
            VIEW FULL RUNWAY ARCHIVE
            <span class="px-6 opacity-40">/</span>
          </span>
        </span>
        <span class="flex shrink-0 items-center">
          <span
            v-for="n in 12"
            :key="'m2-' + n"
            class="flex shrink-0 items-center whitespace-nowrap"
          >
            VIEW FULL RUNWAY ARCHIVE
            <span class="px-6 opacity-40">/</span>
          </span>
        </span>
      </div>
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import RollingText from '@/components/common/RollingText.vue'
import { gsap } from '@/lenis'

interface Capsule {
  id: string
  year: string
  title: string
  category: string
  tags: string[]
  summary: string
  image: string
  link: string
  objectPosition?: string
}

const capsules = ref<Capsule[]>([
  {
    id: 'part-1-phantom-blood',
    year: '1987',
    title: 'Part 1: Phantom Blood',
    category: 'Victorian Gothic & Hamon Era',
    tags: ['Jonathan Joestar', 'Dio Brando', 'London 1888'],
    summary:
      'The legendary inception of the Joestar bloodline. Set in 1880s Victorian England, exploring classic aristocratic tailoring, high-collar coats, and gothic dark romance.',
    image: '/images/cover-part-1.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-2-battle-tendency',
    year: '1987 – 1989',
    title: 'Part 2: Battle Tendency',
    category: '1930s Art Deco & Pulp Adventure',
    tags: ['Joseph Joestar', 'Caesar Zeppeli', 'New York to Rome'],
    summary:
      'Fast-paced pulp globetrotting across 1930s New York, Mexico, and Rome. Characterized by aviator scarves, bandana patterns, and sculpted muscular contrapposto.',
    image: '/images/cover-part-2.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-3-stardust-crusaders',
    year: '1989 – 1992',
    title: 'Part 3: Stardust Crusaders',
    category: 'Gakuran Uniform & Stand Odyssey',
    tags: ['Jotaro Kujo', 'Star Platinum', 'Tokyo to Cairo'],
    summary:
      'Araki introduces the revolutionary concept of Stands. Jotaro Kujo’s iconic customized gakuran coat, gold chain collar, and torn cap redefined manga fashion iconography.',
    image: '/images/cover-part-3.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-4-diamond-is-unbreakable',
    year: '1992 – 1995',
    title: 'Part 4: Diamond is Unbreakable',
    category: 'Pastel Pop & 90s Italian Glamour',
    tags: ['Josuke Higashikata', 'Morioh 1999', 'Versace Motifs'],
    summary:
      'A stylistic paradigm shift into vibrant suburban mystery in Morioh. Josuke’s pompadour, peace/heart badges, and Kira’s tailored suits evoke 90s Moschino and Versace aesthetics.',
    image: '/images/cover-part-4.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-5-golden-wind',
    year: '1995 – 1999',
    title: 'Part 5: Golden Wind',
    category: 'Italian Haute Couture & Cutouts',
    tags: ['Giorno Giovanna', 'Passione', 'Naples & Venice'],
    summary:
      'Araki’s definitive tribute to Italian high fashion. Giorno and the Passione squad wear bespoke sartorial suits with chest cutouts, zipper motifs, and Michelangelo sculpture poses.',
    image: '/images/cover-part-5.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-6-stone-ocean',
    year: '2000 – 2003',
    title: 'Part 6: Stone Ocean',
    category: 'Y2K High-Fashion & Runway Muse',
    tags: ['Jolyne Cujoh', 'Green Dolphin St', 'Gucci Campaign Face'],
    summary:
      'Starring Jolyne Cujoh, who later became the face of Gucci’s worldwide 2013 Cruise Campaign. Characterized by spiderweb textiles, butterfly tattoos, and bold Y2K edge.',
    image: '/images/cover-part-6.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-7-steel-ball-run',
    year: '2004 – 2011',
    title: 'Part 7: Steel Ball Run',
    category: 'Seinen Frontier & Western Couture',
    tags: ['Johnny Joestar', 'Gyro Zeppeli', 'Trans-American Race'],
    summary:
      'Widely celebrated as Araki’s magnum opus. A cross-country horse race in 1890s America combining frontier leathercraft, equestrian chic, and celestial geometric patterns.',
    image: '/images/cover-part-7.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-8-jojolion',
    year: '2011 – 2021',
    title: 'Part 8: JoJolion',
    category: 'Avant-Garde Nautical & Morioh',
    tags: ['Josuke (Gappy)', 'Sailor Sartorial', 'Seinen Modernity'],
    summary:
      'Set in post-quake Morioh, blending nautical sailor tailoring, layered jewelry, and surrealist high fashion with profound existential mystery.',
    image: '/images/cover-part-8.jpg',
    link: 'https://jojo-portal.com',
  },
  {
  id: 'part-9-the-jojolands',
  year: '2023 – Present',
  title: 'Part 9: The JOJOLands',
  category: 'Contemporary Pacific Island Luxury',
  tags: ['Jodio Joestar', 'Oahu Hawaii', 'Streetwear Luxury'],
  summary: '...',
  image: '/images/cover-part-9.jpg',
  link: 'https://jojo-portal.com',
  objectPosition: '50% 50%', // Atur di sini: 0%, 5%, atau nilai negatif seperti '50% -15px'
},
])

const capsulesRoot = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const incomingImgRef = ref<HTMLImageElement | null>(null)


const activeIdx = ref(0)
const outgoingImage = ref(capsules.value[0].image)
const currentCapsule = computed(() => capsules.value[activeIdx.value])

let ctx: gsap.Context | null = null

const goToSlide = (idx: number) => {
  if (activeIdx.value === idx) return
  outgoingImage.value = capsules.value[activeIdx.value].image
  activeIdx.value = idx

  nextTick(() => {
    if (incomingImgRef.value) {
      gsap.killTweensOf(incomingImgRef.value)
      gsap.fromTo(
        incomingImgRef.value,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            outgoingImage.value = currentCapsule.value.image
          },
        }
      )
    }
  })
}

const prevSlide = () => {
  const newIdx = (activeIdx.value - 1 + capsules.value.length) % capsules.value.length
  goToSlide(newIdx)
}

const nextSlide = () => {
  const newIdx = (activeIdx.value + 1) % capsules.value.length
  goToSlide(newIdx)
}

onMounted(() => {
  ctx = gsap.context(() => {
    if (!capsulesRoot.value) return

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
  }, capsulesRoot.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
