<template>
  <span
    class="group/roll relative inline-flex overflow-hidden align-baseline leading-[1.3] select-none"
    :aria-label="text"
  >
    <span
      v-for="(char, idx) in characters"
      :key="idx"
      class="relative inline-block overflow-hidden"
    >
      <span
        class="block transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/roll:translate-y-full group-hover/cta:translate-y-full group-hover/link:translate-y-full group-hover:translate-y-full"
        :style="{ transitionDelay: `${idx * 15}ms` }"
        :class="customClass"
      >
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
      <span
        aria-hidden="true"
        class="absolute left-0 top-0 block -translate-y-full transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/roll:translate-y-0 group-hover/cta:translate-y-0 group-hover/link:translate-y-0 group-hover:translate-y-0"
        :style="{ transitionDelay: `${idx * 15}ms` }"
        :class="customClass"
      >
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  customClass?: string
}>()

const characters = computed(() => Array.from(props.text))
</script>
