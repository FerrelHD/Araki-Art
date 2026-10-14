<template>
  <div
    ref="cardWrapperRef"
    class="tilt-card-wrapper w-full select-none will-change-transform transition-opacity duration-500"
    :class="[offsetClass, isDimmed ? 'opacity-40' : 'opacity-100']"
    style="perspective: 1200px;"
    @pointerenter="handlePointerEnter"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <!-- 3D Transformable Inner Card Box -->
    <div
      ref="cardInnerRef"
      class="tilt-card-inner relative overflow-hidden border border-grid bg-black/10 transition-colors duration-300 will-change-transform shadow-md hover:shadow-2xl hover:border-brand-primary"
      :style="{ aspectRatio: aspectRatio || '16/10', transformStyle: 'preserve-3d' }"
    >
      <!-- Media: Video or Image -->
      <video
        v-if="isVideo && videoSrc"
        ref="mediaRef"
        class="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 pointer-events-none will-change-transform transition-[filter] duration-700"
        autoplay
        muted
        loop
        playsinline
        :poster="src"
      >
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <img
        v-else
        ref="mediaRef"
        :src="src"
        :alt="alt || 'Editorial Look'"
        class="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 pointer-events-none will-change-transform transition-[filter] duration-700"
      />

      <!-- Subtle 3D Glass Light Sheen Overlay that tracks cursor -->
      <div
        ref="glareRef"
        class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 mix-blend-overlay"
        style="background: radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.4) 0%, transparent 65%);"
      />

      <!-- Plate Badge -->
      <div
        v-if="badge"
        class="absolute bottom-3 left-3 z-10 font-mono text-[0.55rem] sm:text-[0.62rem] tracking-widest uppercase bg-brand-bg/90 backdrop-blur-xs px-2.5 py-1 border border-grid"
      >
        {{ badge }}
      </div>
    </div>

    <!-- Caption Under Plate -->
    <div
      v-if="caption"
      class="flex items-center justify-between pt-3 text-[0.62rem] sm:text-xs font-mono uppercase tracking-wider opacity-60 border-b border-grid pb-2"
    >
      <span>{{ caption }}</span>
      <span v-if="subcaption">{{ subcaption }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from '@/lenis'

defineProps<{
  src?: string
  alt?: string
  caption?: string
  subcaption?: string
  badge?: string
  aspectRatio?: string
  offsetClass?: string
  isVideo?: boolean
  videoSrc?: string
  isDimmed?: boolean
}>()

const emit = defineEmits<{
  (e: 'hover', active: boolean): void
}>()

const cardWrapperRef = ref<HTMLElement | null>(null)
const cardInnerRef = ref<HTMLElement | null>(null)
const mediaRef = ref<HTMLElement | null>(null)
const glareRef = ref<HTMLElement | null>(null)

function handlePointerEnter() {
  emit('hover', true)
  if (glareRef.value) {
    glareRef.value.style.opacity = '1'
  }
}

function handlePointerMove(e: PointerEvent) {
  if (!cardWrapperRef.value || !cardInnerRef.value) return

  const rect = cardWrapperRef.value.getBoundingClientRect()
  // Normalized coordinate from center: -0.5 to 0.5
  const normX = (e.clientX - rect.left) / rect.width - 0.5
  const normY = (e.clientY - rect.top) / rect.height - 0.5

  // 3D Tilt angles (Kerimov-inspired physics)
  const rotY = normX * 18 // -9deg to +9deg
  const rotX = -normY * 18 // -9deg to +9deg
  const transX = normX * 32 // magnetic float displacement X
  const transY = normY * 22 // magnetic float displacement Y

  gsap.to(cardInnerRef.value, {
    rotateY: rotY,
    rotateX: rotX,
    x: transX,
    y: transY,
    scale: 1.045,
    transformPerspective: 1100,
    duration: 0.38,
    ease: 'power2.out',
    overwrite: 'auto'
  })

  // Inner media counter-parallax (creates deep 3D multiplane effect)
  if (mediaRef.value) {
    gsap.to(mediaRef.value, {
      x: -normX * 22,
      y: -normY * 16,
      scale: 1.08,
      duration: 0.42,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }

  // Light reflection tracking
  if (glareRef.value) {
    const glareX = `${((normX + 0.5) * 100).toFixed(1)}%`
    const glareY = `${((normY + 0.5) * 100).toFixed(1)}%`
    glareRef.value.style.setProperty('--glare-x', glareX)
    glareRef.value.style.setProperty('--glare-y', glareY)
  }
}

function handlePointerLeave() {
  emit('hover', false)
  if (glareRef.value) {
    glareRef.value.style.opacity = '0'
  }

  if (cardInnerRef.value) {
    gsap.to(cardInnerRef.value, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.75,
      ease: 'elastic.out(1, 0.65)',
      overwrite: 'auto'
    })
  }

  if (mediaRef.value) {
    gsap.to(mediaRef.value, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }
}
</script>
