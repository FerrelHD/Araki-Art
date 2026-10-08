<template>
  <footer
    id="footer"
    ref="footerRoot"
    class="border-t border-grid bg-brand-primary text-brand-bg select-none overflow-hidden"
  >
    <!-- Atmospheric Runway / City Video Banner -->
    <div class="relative h-36 md:h-56 overflow-hidden border-b border-brand-bg/25">
      <img
        src="/images/jojo-horizontal.jpg"
        alt="JoJo High Fashion Atmosphere"
        class="h-full w-full object-cover filter contrast-125 brightness-75"
      />
      <!-- JoJo Iconic Sound Effect Overlay -->
      <div class="absolute inset-0 flex items-center justify-between px-8 md:px-16 pointer-events-none">
        <span class="font-serif italic text-3xl md:text-5xl text-brand-bg/30">
          "ゴゴゴ... MENACING"
        </span>
        <span class="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-brand-bg/60">
          MILANO · PARIGI · TOKYO
        </span>
      </div>
    </div>

    <!-- 3-Column Navigation Grid (Rolling Hover Effect) -->
    <nav class="grid grid-cols-1 md:grid-cols-3 border-b border-brand-bg/25">
      <a
        href="#hero"
        class="group/roll flex items-center justify-center border-b md:border-b-0 md:border-r border-brand-bg/25 p-4 py-8 md:py-12 text-lg md:text-xl font-mono tracking-[0.14em] uppercase transition-colors hover:bg-brand-bg hover:text-brand-primary"
      >
        <RollingText text="the opening" />
      </a>
      <a
        href="#capsules"
        class="group/roll flex items-center justify-center border-b md:border-b-0 md:border-r border-brand-bg/25 p-4 py-8 md:py-12 text-lg md:text-xl font-mono tracking-[0.14em] uppercase transition-colors hover:bg-brand-bg hover:text-brand-primary"
      >
        <RollingText text="capsules" />
      </a>
      <a
        href="#anatomy"
        class="group/roll flex items-center justify-center p-4 py-8 md:py-12 text-lg md:text-xl font-mono tracking-[0.14em] uppercase transition-colors hover:bg-brand-bg hover:text-brand-primary"
      >
        <RollingText text="anatomy" />
      </a>
    </nav>

    <!-- Center 10-Column Content: Elsewhere & Colophon -->
    <div class="grid grid-cols-4 md:grid-cols-12">
      <div class="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-bg/25">
        <div class="grid grid-cols-1 md:grid-cols-10 border-b border-brand-bg/25">
          
          <!-- Left 6 Columns: Elsewhere External Links -->
          <div class="md:col-span-6 p-6 md:p-10 flex flex-col justify-between gap-8 md:min-h-[16rem]">
            <p class="text-[0.68rem] font-bold tracking-[0.2em] uppercase font-mono opacity-70">
              elsewhere
            </p>
            <ul class="flex flex-col gap-3 font-mono text-sm md:text-base">
              <li>
                <a
                  href="https://www.gucci.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group/link inline-flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <RollingText text="GUCCI OFFICIAL ARCHIVE" />
                  <span class="transition-transform group-link:translate-x-1">→</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.louvre.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group/link inline-flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <RollingText text="MUSÉE DU LOUVRE GRAPHIC ARTS" />
                  <span class="transition-transform group-link:translate-x-1">→</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.bulgari.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group/link inline-flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <RollingText text="BULGARI ROMA CAPSULE ARCHIVE" />
                  <span class="transition-transform group-link:translate-x-1">→</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Right 4 Columns: Colophon & To Be Continued Prompt -->
          <div class="md:col-span-4 p-6 md:p-10 flex flex-col justify-between gap-8 border-t md:border-t-0 md:border-l border-brand-bg/25">
            <div>
              <p class="text-[0.68rem] font-bold tracking-[0.2em] uppercase font-mono opacity-70 mb-3">
                colophon
              </p>
              <p class="text-xs font-mono opacity-80 leading-relaxed">
                Tribute web architecture inspired by Swiss grid design. Curated for fashion enthusiasts & creative technologists.
              </p>
            </div>

            <!-- "← To Be Continued" Trigger Button (Scroll to top) -->
            <button
              type="button"
              @click="scrollToTop"
              class="group flex items-center justify-between border border-brand-bg/40 px-4 py-3 font-mono text-xs tracking-widest uppercase hover:bg-brand-bg hover:text-brand-primary transition-colors cursor-pointer select-none"
            >
              <span>← TO BE CONTINUED</span>
              <span class="text-sm transition-transform duration-300 group-hover:-translate-y-1">↑</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Monumental 30vw Watermark Typographic Anchor -->
    <div class="grid grid-cols-4 md:grid-cols-12 overflow-hidden">
      <div class="col-span-4 md:col-span-10 md:col-start-2 border-x border-brand-bg/25 overflow-hidden">
        <p
          ref="watermarkRef"
          class="-mb-[0.14em] px-3 text-center text-[28vw] md:text-[30vw] leading-[0.7] font-bold tracking-[-0.13em] select-none text-brand-bg will-change-transform"
        >
          araki.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import RollingText from '@/components/common/RollingText.vue'
import { lenis, gsap } from '@/lenis'

const footerRoot = ref<HTMLElement | null>(null)
const watermarkRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

const scrollToTop = () => {
  lenis.scrollTo(0, {
    duration: 1.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
}

onMounted(() => {
  ctx = gsap.context(() => {
    if (watermarkRef.value && footerRoot.value) {
      gsap.fromTo(
        watermarkRef.value,
        { yPercent: 25, opacity: 0.4 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRoot.value,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      )
    }
  }, footerRoot.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>
