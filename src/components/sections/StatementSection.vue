<template>
  <section
    id="statement"
    ref="statementRoot"
    class="border-b border-grid text-brand-primary overflow-hidden"
  >
    <div class="grid grid-cols-4 md:grid-cols-12">
      <!-- 10 Columns Centered Container (Offset by 1 col on desktop) -->
      <div
        class="col-span-4 md:col-span-10 md:col-start-2 border-x border-grid pt-12 sm:pt-16 md:pt-32"
      >
        <!-- Section Header -->
        <div class="border-b border-grid p-4 md:p-6 overflow-hidden">
          <p class="mb-3 text-[0.68rem] font-bold tracking-[0.2em] uppercase font-mono opacity-70">
            the
          </p>
          <div class="overflow-hidden">
            <h2
              ref="headingRef"
              class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.06em] leading-[0.85] will-change-transform"
            >
              aesthetic.
            </h2>
          </div>
        </div>

        <!-- Content Grid: Bio / Thesis on Left, Quote / Fact on Right -->
        <div class="grid grid-cols-1 md:grid-cols-10 border-b border-grid">
          <!-- Left 4 Columns: Philosophy Paragraph & Rolling CTA -->
          <div
            ref="leftColRef"
            class="md:col-span-4 border-b md:border-b-0 md:border-r border-grid p-4 md:p-6 flex flex-col items-start gap-8 py-8 sm:py-12 md:py-16 justify-between"
          >
            <p class="max-w-[44ch] text-base md:text-lg leading-relaxed opacity-90">
              Hirohiko Araki’s work stands alone in comic history by treating the human frame not as a mere vessel for action, but as a runway silhouette. Drawing heavily from Michelangelo's <em>contrapposto</em>, Antonio Lopez's 1980s fashion sketches, and Roman classical sculpture, every frame is a curated editorial spread.
            </p>

            <a
              href="#capsules"
              class="group/cta relative inline-block overflow-hidden border border-grid px-5 py-2.5 text-sm md:text-base font-mono tracking-[0.14em] uppercase transition-colors hover:bg-brand-primary hover:text-brand-bg select-none"
            >
              <RollingText text="explore capsules →" />
            </a>
          </div>

          <!-- Right 6 Columns: Highlights & Runway DNA Breakdown -->
          <div
            ref="rightColRef"
            class="md:col-span-6 p-4 md:p-6 py-8 sm:py-12 md:py-16 flex flex-col justify-between gap-8 bg-brand-primary/[0.02]"
          >
            <div class="flex flex-col gap-6">
              <span class="text-[0.65rem] font-mono tracking-widest uppercase opacity-60">
                // PILLARS OF ARAKI COUTURE
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div class="pillar-card border-t border-grid pt-3">
                  <span class="font-mono text-xs opacity-50 block mb-1">01 / SCULPTURE</span>
                  <p class="font-serif italic text-lg leading-snug">
                    Muscular tension derived from Hellenistic Greco-Roman marbles.
                  </p>
                </div>
                <div class="pillar-card border-t border-grid pt-3">
                  <span class="font-mono text-xs opacity-50 block mb-1">02 / COLOR THEORY</span>
                  <p class="font-serif italic text-lg leading-snug">
                    Zero canonical colors: palettes shift according to emotional tension.
                  </p>
                </div>
                <div class="pillar-card border-t border-grid pt-3">
                  <span class="font-mono text-xs opacity-50 block mb-1">03 / GUCCI HERITAGE</span>
                  <p class="font-serif italic text-lg leading-snug">
                    Global 90th anniversary window takeovers across 70 flagship stores.
                  </p>
                </div>
                <div class="pillar-card border-t border-grid pt-3">
                  <span class="font-mono text-xs opacity-50 block mb-1">04 / LOUVRE BD</span>
                  <p class="font-serif italic text-lg leading-snug">
                    The first-ever manga featured in the Louvre's permanent graphic art collection.
                  </p>
                </div>
              </div>
            </div>

            <div class="text-xs font-mono opacity-50 text-right">
              MILANO · FIRENZE · PARIS · TOKYO
            </div>
          </div>
        </div>

        <!-- Full-Width Panoramic Visual Banner (Authentic Full Color) -->
        <div
          ref="bannerContainerRef"
          class="aspect-[16/9] md:aspect-[21/9] overflow-hidden relative group"
        >
          <img
            ref="bannerImgRef"
            src="/images/manga-stand-battle-on-a-roadside.png"
            alt="JoJo Magazine Haute Couture Panoramic Spread"
            class="w-full h-full object-cover filter contrast-105 transition-all duration-700 will-change-transform"
            style="object-position: 50% 12%;"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import RollingText from '@/components/common/RollingText.vue'
import { gsap } from '@/lenis'

const statementRoot = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const leftColRef = ref<HTMLElement | null>(null)
const rightColRef = ref<HTMLElement | null>(null)
const bannerContainerRef = ref<HTMLElement | null>(null)
const bannerImgRef = ref<HTMLImageElement | null>(null)


let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    if (!statementRoot.value) return

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

    // Content fade and stagger
    if (leftColRef.value && rightColRef.value) {
      gsap.fromTo(
        [leftColRef.value, '.pillar-card'],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out', 
          scrollTrigger: {
            trigger: leftColRef.value,
            start: 'top 80%',
          },
        }
      )
    }

    // Panoramic banner scrub parallax & scale
    if (bannerContainerRef.value && bannerImgRef.value) {
      gsap.fromTo(
        bannerImgRef.value,
        { scale: 1.15, yPercent: -8 },
        {
          scale: 1,
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerContainerRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }
  }, statementRoot.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
