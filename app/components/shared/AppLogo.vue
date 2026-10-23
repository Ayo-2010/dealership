<script setup lang="ts">
import dealership from '~/config/dealership'

withDefaults(
  defineProps<{
    variant?: 'primary' | 'light'
    compact?: boolean
  }>(),
  { variant: 'primary', compact: false },
)

const wordmark = computed(() => {
  const parts = dealership.name.trim().split(/\s+/)
  return {
    primary: parts[0] ?? dealership.name,
    secondary: parts.slice(1).join(' '),
  }
})
</script>

<template>
  <span class="inline-flex items-center gap-2.5" aria-hidden="true">
    <img
      :src="dealership.logo.mark"
      alt=""
      width="36"
      height="36"
      class="size-8 shrink-0 sm:size-9"
      decoding="async"
    >
    <span v-if="!compact" class="flex flex-col leading-none">
      <span
        class="font-display text-[13px] font-semibold uppercase tracking-[0.3em] sm:text-[14px]"
        :class="variant === 'light' ? 'text-ivory' : 'text-ink'"
      >{{ wordmark.primary }}</span>
      <span
        v-if="wordmark.secondary"
        class="mt-1.5 text-[6.5px] font-semibold uppercase tracking-[0.5em] text-gold"
      >{{ wordmark.secondary }}</span>
    </span>
  </span>
</template>
