<template>
  <span class="group/roll relative inline-block overflow-hidden leading-[1.3] select-none">
    <span
      class="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-full"
      :class="customClass"
    >
      {{ text }}
    </span>
    <span
      aria-hidden="true"
      class="absolute inset-0 block -translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/roll:translate-y-0"
      :class="customClass"
    >
      {{ text }}
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  customClass?: string
}>()
</script>

