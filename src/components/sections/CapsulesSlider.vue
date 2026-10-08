<template>
  <section
    id="capsules"
    ref="capsulesRoot"
    class="border-b border-grid text-brand-primary overflow-hidden"
  >
    <div class="grid grid-cols-4 md:grid-cols-12">
      <!-- 10 Columns Centered Container -->
      <div
        class="col-span-4 md:col-span-10 md:col-start-2 border-x border-grid pt-16 md:pt-32"
      >
        <!-- Section Title -->
        <div class="border-b border-grid p-4 md:p-6 overflow-hidden">
          <p class="mb-2 text-[0.68rem] font-bold tracking-[0.2em] uppercase font-mono opacity-70">
            selected
          </p>
          <div class="overflow-hidden">
            <h2
              ref="headingRef"
              class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.06em] leading-[0.85] will-change-transform"
            >
              capsules.
            </h2>
          </div>
        </div>

        <!-- Slider Main Grid: Left 6 cols interactive + Right 4 cols Silhouette -->
        <div class="grid grid-cols-4 md:grid-cols-10">
          <!-- Left 6 Columns: Interactive Capsule Card & Vertical Thumbnails -->
          <div
            class="relative z-10 col-span-4 md:col-span-10 lg:col-span-6 lg:border-r border-grid flex flex-col justify-between"
          >
            <!-- Top Container: Vertical Thumbnails Strip + Active Project Showcase -->
            <div class="flex border-b border-grid min-h-[460px] md:min-h-[560px]">
              
              <!-- Left Vertical Thumbnail Strip (Hover to switch) -->
              <div
                class="flex w-20 sm:w-28 md:w-32 lg:w-36 shrink-0 flex-col border-r border-grid select-none"
              >
                <button
                  v-for="(capsule, idx) in capsules"
                  :key="capsule.id"
                  type="button"
                  @mouseenter="goToSlide(idx)"
                  @click="goToSlide(idx)"
                  class="relative w-full flex-1 cursor-pointer overflow-hidden border-b last:border-b-0 border-grid transition-all duration-300 group"
                  :class="activeIdx === idx ? 'opacity-100 ring-2 ring-inset ring-brand-primary' : 'opacity-40 hover:opacity-90'"
                  :aria-label="'Select ' + capsule.title"
                >
                  <img
                    :src="capsule.image"
                    :alt="capsule.title"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <!-- Small number index on thumbnail -->
                  <span class="absolute bottom-1 right-1 bg-black/60 text-white text-[0.6rem] font-mono px-1">
                    0{{ idx + 1 }}
                  </span>
                </button>
              </div>

              <!-- Right: Active Slide Content Card -->
              <div class="min-w-0 flex-1 flex flex-col justify-between bg-brand-bg overflow-hidden">
                <!-- Capsule Information Block (Dark contrast pill header) -->
                <div
                  ref="infoCardRef"
                  class="bg-brand-primary text-brand-bg p-4 md:p-6 flex flex-col gap-4 will-change-transform"
                >
                  <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span class="font-mono text-xs opacity-75 tabular-nums">
                          0{{ activeIdx + 1 }} / 0{{ capsules.length }}
                        </span>
                        <span class="opacity-40">|</span>
                        <span class="font-mono text-xs opacity-75">
                          {{ currentCapsule.year }}
                        </span>
                      </div>
                      <h3 class="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                        {{ currentCapsule.title }}
                      </h3>
                    </div>

                    <!-- Category tag -->
                    <span class="inline-block px-2 py-0.5 self-start text-[0.65rem] font-mono uppercase tracking-widest border border-brand-bg/30 bg-brand-bg/10">
                      {{ currentCapsule.category }}
                    </span>
                  </div>

                  <!-- Summary narrative -->
                  <p class="text-xs sm:text-sm font-sans leading-relaxed opacity-90 line-clamp-3 md:line-clamp-none">
                    {{ currentCapsule.summary }}
                  </p>

                  <!-- Tags and External Link -->
                  <div class="flex flex-wrap items-center justify-between gap-3 border-t border-brand-bg/20 pt-3">
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="(tag, tIdx) in currentCapsule.tags"
                        :key="tIdx"
                        class="text-[0.65rem] font-mono opacity-75 bg-brand-bg/10 px-2 py-0.5 rounded-none"
                      >
                        #{{ tag }}
                      </span>
                    </div>

                    <a
                      :href="currentCapsule.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group/roll inline-flex items-center gap-2 text-sm sm:text-base font-mono tracking-wider uppercase text-brand-bg"
                    >
                      <RollingText text="view archive" />
                      <span class="transition-transform group-hover/roll:translate-x-1">→</span>
                    </a>
                  </div>
                </div>

                <!-- Large Visual Container with Bello Editorial Curtain Wipe -->
                <div class="relative block w-full flex-1 overflow-hidden min-h-[260px] md:min-h-[320px] bg-black/10 group select-none">
                  <!-- Base Outgoing Image Layer -->
                  <img
                    ref="outgoingImgRef"
                    :src="outgoingImage"
                    :alt="currentCapsule.title"
                    class="absolute inset-0 h-full w-full object-cover will-change-transform"
                  />

                  <!-- Top Incoming Curtain Wipe Layer -->
                  <div
                    ref="curtainMaskRef"
                    class="absolute inset-0 overflow-hidden will-change-transform z-10"
                    style="clip-path: inset(0% 0% 0% 0%);"
                  >
                    <img
                      ref="incomingImgRef"
                      :src="currentCapsule.image"
                      :alt="currentCapsule.title"
                      class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                    />
                  </div>

                  <div class="absolute inset-0 bg-brand-primary/5 pointer-events-none z-20"></div>
                </div>
              </div>
            </div>

            <!-- Bottom Prev / Next Nav Buttons (50% / 50% split) -->
            <div class="flex h-14 md:h-16 border-b border-grid">
              <button
                type="button"
                @click="prevSlide"
                aria-label="Previous capsule"
                class="flex flex-1 cursor-pointer items-center justify-center border-r border-grid text-lg font-mono transition-colors hover:bg-brand-primary hover:text-brand-bg select-none"
              >
                ← PREV
              </button>
              <button
                type="button"
                @click="nextSlide"
                aria-label="Next capsule"
                class="flex flex-1 cursor-pointer items-center justify-center text-lg font-mono transition-colors hover:bg-brand-primary hover:text-brand-bg select-none"
              >
                NEXT →
              </button>
            </div>
          </div>

          <!-- Right 4 Columns: High-Fashion Silhouette Muse Anchor (Mijobello Signature) -->
          <div
            class="group/side relative z-0 hidden lg:col-span-4 lg:flex flex-col justify-end overflow-hidden p-6 bg-brand-primary/[0.02]"
          >
            <!-- Background Typography Watermark -->
            <div class="absolute top-10 right-4 font-mono text-[10rem] font-bold leading-none opacity-5 select-none pointer-events-none">
              J
            </div>

            <!-- Pose Quote / Annotation -->
            <div class="mb-auto pt-6">
              <span class="text-[0.65rem] font-mono tracking-widest uppercase opacity-50 block mb-2">
                RUNWAY ARCHIVE NOTE
              </span>
              <p class="font-serif italic text-xl leading-snug opacity-80">
                "Fashion is an armor to survive the reality of everyday life."
              </p>
            </div>

            <!-- Silhouette Cutout (Translucent & Translating smoothly on hover / scroll parallax) -->
            <div class="relative w-full aspect-[3/4] overflow-hidden flex items-end justify-center">
              <img
                ref="silhouetteImgRef"
                src="/images/jotaro.jpg"
                alt="Runway JoJo Muse Cutout"
                class="w-full h-full object-cover object-top filter grayscale contrast-150 transition-transform duration-700 ease-out group-hover/side:-translate-x-2 group-hover/side:scale-105 will-change-transform"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
            </div>

            <div class="mt-4 flex justify-between items-center text-[0.65rem] font-mono opacity-60">
              <span>CONTRAPPOSTO POSE 04</span>
              <span>FIGURE ARCHIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Running Marquee: "VIEW FULL RUNWAY ARCHIVE / ..." -->
    <a
      href="#anatomy"
      aria-label="view runway anatomy"
      class="group/marquee relative block h-12 md:h-14 overflow-hidden border-t border-grid transition-colors hover:bg-brand-primary hover:text-brand-bg"
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
}

const capsules = ref<Capsule[]>([
  {
    id: 'rohan-gucci',
    year: '2011',
    title: 'Rohan Kishibe Goes to Gucci',
    category: 'Haute Couture Manga',
    tags: ['Gucci 90th Anniv', 'Florence', 'Spur Magazine'],
    summary:
      'Created to celebrate Gucci’s 90th anniversary and Araki’s 30th year as an artist. Manga protagonist Rohan Kishibe travels to Florence with a magical heirloom bag, published exclusively in Japanese luxury magazine Spur.',
    image: '/images/rohan-style.jpg',
    link: 'https://www.gucci.com',
  },
  {
    id: 'jolyne-gucci',
    year: '2013',
    title: 'Jolyne, Fly High with Gucci',
    category: 'Cruise Collection Takeover',
    tags: ['Cruise 2013', 'Frida Giannini', 'Global Boutiques'],
    summary:
      'A worldwide visual takeover of over 70 Gucci flagship stores from Fifth Avenue to Ginza. Jolyne Cujoh was illustrated wearing creative director Frida Giannini’s cruise collection alongside magical unicorn motifs.',
    image: '/images/jolyne.jpg',
    link: 'https://www.gucci.com',
  },
  {
    id: 'rohan-louvre',
    year: '2009',
    title: 'Rohan at the Louvre',
    category: 'Musée du Louvre Graphic Novel',
    tags: ['Musée du Louvre', 'Futuropolis', 'Permanent Fine Art'],
    summary:
      'Araki became the very first manga creator to exhibit and produce a dedicated graphic novel commissioned directly by the Louvre Museum. Rendered in full color, delving into a cursed pitch-black pigment.',
    image: '/images/rohan-jojo-part5.jpg',
    link: 'https://www.louvre.fr',
  },
  {
    id: 'bulgari-killer-queen',
    year: '2017',
    title: 'Bulgari x Killer Queen',
    category: 'Italian Leather & Silk Goods',
    tags: ['Bulgari Roma', 'Deadly Queen', 'Capsule Accessories'],
    summary:
      'A collaboration with Italian luxury powerhouse Bulgari, featuring iconic motifs of the Stand Killer Queen across tote bags, silk scarves, and leather wallets, blurring manga villainy with Roman opulence.',
    image: '/images/kira-yoshikage.jpg',
    link: 'https://www.bulgari.com',
  },
])

const capsulesRoot = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const curtainMaskRef = ref<HTMLElement | null>(null)
const incomingImgRef = ref<HTMLImageElement | null>(null)
const outgoingImgRef = ref<HTMLImageElement | null>(null)
const infoCardRef = ref<HTMLElement | null>(null)
const silhouetteImgRef = ref<HTMLImageElement | null>(null)

const activeIdx = ref(0)
const outgoingImage = ref(capsules.value[0].image)
const currentCapsule = computed(() => capsules.value[activeIdx.value])

let ctx: gsap.Context | null = null

function triggerCurtainTransition() {
  nextTick(() => {
    if (!curtainMaskRef.value || !incomingImgRef.value) return

    // Cancel in-flight animations to support instant, rapid mouse hovers
    gsap.killTweensOf([curtainMaskRef.value, incomingImgRef.value, outgoingImgRef.value])

    // Mijobello signature: Clip-path Curtain Wipe from bottom to top
    gsap.fromTo(
      curtainMaskRef.value,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.75,
        ease: 'expo.out',
        onComplete: () => {
          outgoingImage.value = currentCapsule.value.image
        },
      }
    )

    // Counter scale on the incoming image (scaling down from 1.2 to 1.0)
    gsap.fromTo(
      incomingImgRef.value,
      { scale: 1.22, yPercent: 4 },
      { scale: 1, yPercent: 0, duration: 0.85, ease: 'expo.out' }
    )

    // Outgoing image subtle counter movement underneath
    if (outgoingImgRef.value) {
      gsap.fromTo(
        outgoingImgRef.value,
        { scale: 1, yPercent: 0, opacity: 1 },
        { scale: 0.96, yPercent: -4, opacity: 0.35, duration: 0.75, ease: 'expo.out' }
      )
    }

    // Refresh info card text with kinetic subtle slide
    if (infoCardRef.value) {
      gsap.fromTo(
        infoCardRef.value,
        { y: 8, opacity: 0.75 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
      )
    }
  })
}

const goToSlide = (idx: number) => {
  if (activeIdx.value === idx) return
  outgoingImage.value = capsules.value[activeIdx.value].image
  activeIdx.value = idx
  triggerCurtainTransition()
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

    // Silhouette floating inertia parallax
    if (silhouetteImgRef.value) {
      gsap.fromTo(
        silhouetteImgRef.value,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: capsulesRoot.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
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
