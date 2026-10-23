<script setup lang="ts">
import dealership from '~/config/dealership'

withDefaults(
  defineProps<{
    tone?: 'light' | 'dark'
    compact?: boolean
  }>(),
  { tone: 'light', compact: false },
)
</script>

<template>
  <aside
    class="flex items-start gap-3 border px-4 py-3 text-[11px] leading-relaxed"
    :class="tone === 'dark'
      ? 'border-white/15 bg-white/5 text-white/65'
      : 'border-gold/30 bg-gold-50 text-charcoal'"
    aria-label="Demonstration notice"
  >
    <UIcon name="i-lucide-info" class="mt-0.5 size-3.5 shrink-0 text-gold-dark" aria-hidden="true" />
    <p>
      <span class="font-semibold text-ink">Demo build.</span>
      {{ compact ? 'Sample inventory and placeholder business details.' : dealership.demoNotice }}
    </p>
  </aside>
</template>
