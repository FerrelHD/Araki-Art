<template>
  <header
    class="fixed inset-x-0 top-0 z-40 h-14 md:h-16 border-b border-grid bg-brand-bg grid grid-cols-4 md:grid-cols-12 transition-colors duration-500"
  >
    <!-- Col 1-3: Wordmark Logo -->
    <a
      href="#"
      class="col-span-2 md:col-span-3 flex items-center justify-between border-r border-grid px-4 md:px-6 font-bold tracking-[-0.06em] transition-colors hover:opacity-80"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl md:text-3xl leading-none">araki.</span>
      </div>
    </a>

    <!-- Col 4-9: Live Fashion Capitals Clock Marquee (Desktop) -->
    <div
      class="hidden md:col-span-6 md:block border-r border-grid overflow-hidden group relative"
      role="status"
      aria-label="Fashion capital timezones"
    >
      <div
        class="animate-marquee flex h-full w-max items-center text-[0.68rem] tracking-[0.16em] uppercase font-mono group-hover:[animation-play-state:paused] cursor-default select-none"
      >
        <!-- First Loop -->
        <span class="flex shrink-0 items-center">
          <span
            v-for="(city, index) in cities"
            :key="'a-' + index"
            class="flex shrink-0 items-center whitespace-nowrap"
          >
            <span
              class="flex items-center gap-2 px-3 py-1 font-semibold"
              :class="city.active ? 'bg-brand-primary text-brand-bg' : 'text-brand-primary'"
            >
              <span>{{ city.name }}</span>
              <span class="tabular-nums opacity-90">{{ city.time }}</span>
              <span class="text-[0.55rem] opacity-60">[{{ city.zone }}]</span>
            </span>
            <span aria-hidden="true" class="px-4 opacity-30">/</span>
          </span>
        </span>

        <!-- Second Loop (for infinite seamless marquee) -->
        <span class="flex shrink-0 items-center">
          <span
            v-for="(city, index) in cities"
            :key="'b-' + index"
            class="flex shrink-0 items-center whitespace-nowrap"
          >
            <span
              class="flex items-center gap-2 px-3 py-1 font-semibold"
              :class="city.active ? 'bg-brand-primary text-brand-bg' : 'text-brand-primary'"
            >
              <span>{{ city.name }}</span>
              <span class="tabular-nums opacity-90">{{ city.time }}</span>
              <span class="text-[0.55rem] opacity-60">[{{ city.zone }}]</span>
            </span>
            <span aria-hidden="true" class="px-4 opacity-30">/</span>
          </span>
        </span>
      </div>
    </div>

    <!-- Col 10-12: Chromatic Palette Toggle -->
    <div class="col-span-2 md:col-span-3 flex items-stretch justify-end">
      <button
        type="button"
        @click="toggleTheme"
        :aria-label="isShiftMode ? 'Switch to Concrete Palette' : 'Switch to Graphite Palette'"
        class="group/roll flex h-full cursor-pointer items-center gap-2.5 px-4 md:px-5 transition-colors hover:bg-brand-primary hover:text-brand-bg mr-14 md:mr-16 outline-none"
      >
        <span class="relative block shrink-0 overflow-hidden leading-[1.3] text-[0.65rem] tracking-[0.16em] uppercase font-mono font-medium">
          <span class="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full">
            {{ isShiftMode ? 'GRAPHITE' : 'CONCRETE' }}
          </span>
          <span
            aria-hidden="true"
            class="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
          >
            {{ isShiftMode ? 'CONCRETE' : 'GRAPHITE' }}
          </span>
        </span>
        <!-- Indicator square dot -->
        <span
          class="relative block h-2.5 w-2.5 overflow-hidden border border-brand-primary transition-colors group-hover:border-brand-bg"
          aria-hidden="true"
        >
          <span
            class="absolute inset-0 bg-brand-primary transition-transform duration-300 group-hover:bg-brand-bg"
            :class="isShiftMode ? 'translate-x-0 bg-brand-accent' : 'translate-x-full'"
          ></span>
        </span>
      </button>
    </div>
  </header>

  <!-- Fixed Square Menu Button in the Top-Right Grid Cell (Mijobello Signature) -->
  <button
    type="button"
    @click="isMenuOpen = !isMenuOpen"
    :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
    class="group fixed top-0 right-0 z-50 flex h-14 md:h-16 w-14 md:w-16 cursor-pointer items-center justify-center border-b border-l border-grid bg-brand-bg transition-colors hover:bg-brand-primary hover:text-brand-bg outline-none"
  >
    <div class="relative flex flex-col justify-center gap-1.5 w-5 h-4">
      <span
        class="block h-px w-full bg-brand-primary transition-all duration-300 group-hover:bg-brand-bg"
        :class="isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''"
      ></span>
      <span
        class="block h-px w-full bg-brand-primary transition-all duration-300 group-hover:bg-brand-bg"
        :class="isMenuOpen ? 'opacity-0' : ''"
      ></span>
      <span
        class="block h-px w-full bg-brand-primary transition-all duration-300 group-hover:bg-brand-bg"
        :class="isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''"
      ></span>
    </div>
  </button>

  <!-- Fullscreen Navigation Overlay -->
  <transition
    enter-active-class="transition duration-400 ease-out"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-40 bg-brand-bg/98 backdrop-blur-md pt-20 px-6 md:px-16 flex flex-col justify-between pb-12"
    >
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 border-t border-grid pt-10">
        <div class="md:col-span-4">
          <span class="text-[0.7rem] uppercase tracking-[0.2em] opacity-60 font-mono block mb-4">
            Navigation Index
          </span>
          <p class="text-sm md:text-base max-w-xs leading-relaxed opacity-80">
            A tribute to the intersection of Hirohiko Araki, Italian Renaissance sculpture, and international haute-couture fashion.
          </p>
        </div>

        <nav class="md:col-span-8 flex flex-col gap-4 text-3xl md:text-6xl font-bold tracking-tight">
          <a
            v-for="(item, i) in menuItems"
            :key="i"
            :href="item.href"
            @click="isMenuOpen = false"
            class="group flex items-baseline gap-4 hover:translate-x-2 transition-transform duration-300"
          >
            <span class="text-xs md:text-sm font-mono opacity-40">0{{ i + 1 }}</span>
            <span class="group-hover:text-amber-500 transition-colors">{{ item.label }}</span>
            <span class="text-xs font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
          </a>
        </nav>
      </div>

      <div class="border-t border-grid pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-60">
        <span>HIROHIKO ARAKI HAUTE-COUTURE ARCHIVE</span>
        <span>TOKYO · FLORENCE · PARIS</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isShiftMode = ref(false)
const isMenuOpen = ref(false)

const menuItems = [
  { label: 'the opening.', href: '#hero' },
  { label: 'the aesthetic.', href: '#statement' },
  { label: 'selected capsules.', href: '#capsules' },
  { label: 'the anatomy.', href: '#anatomy' },
  { label: 'the finale.', href: '#footer' },
]

interface CityClock {
  name: string
  tz: string
  zone: string
  time: string
  active?: boolean
}

const cities = ref<CityClock[]>([
  { name: 'PARIS [LOUVRE]', tz: 'Europe/Paris', zone: 'CET', time: '--:--:--', active: true },
  { name: 'MILAN [GUCCI]', tz: 'Europe/Rome', zone: 'CET', time: '--:--:--' },
  { name: 'ROMA [BULGARI]', tz: 'Europe/Rome', zone: 'CET', time: '--:--:--' },
  { name: 'TOKYO [SHINJUKU]', tz: 'Asia/Tokyo', zone: 'JST', time: '--:--:--' },
  { name: 'NAPLES [PASSIONE]', tz: 'Europe/Rome', zone: 'CET', time: '--:--:--' },
])

const updateTimes = () => {
  const now = new Date()
  cities.value.forEach(city => {
    try {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: city.tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      city.time = formatter.format(now)
    } catch {
      city.time = now.toTimeString().slice(0, 8)
    }
  })
}

let timer: number | null = null

const toggleTheme = () => {
  isShiftMode.value = !isShiftMode.value
  if (isShiftMode.value) {
    document.documentElement.dataset.theme = 'shift'
  } else {
    delete document.documentElement.dataset.theme
  }
}

onMounted(() => {
  updateTimes()
  timer = window.setInterval(updateTimes, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

