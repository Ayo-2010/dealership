<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
    tone?: 'light' | 'dark'
    index?: string
  }>(),
  { align: 'left', tone: 'light' },
)
</script>

<template>
  <div
    class="flex flex-col gap-5"
    :class="[
      align === 'center' ? 'items-center text-center' : 'items-start',
      tone === 'dark' ? 'text-ivory' : 'text-ink',
    ]"
  >
    <div class="flex items-center gap-4">
      <span v-if="index" class="font-display text-[10px] font-medium tracking-[0.2em] text-gold">{{ index }}</span>
      <span
        v-if="eyebrow"
        class="eyebrow"
        :class="tone === 'dark' ? 'text-gold-light' : 'text-gold-dark'"
      >{{ eyebrow }}</span>
    </div>
    <div class="flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div class="max-w-2xl">
        <h2 class="section-title">{{ title }}</h2>
        <p
          v-if="description"
          class="mt-4 max-w-xl text-[0.95rem] leading-relaxed"
          :class="tone === 'dark' ? 'text-white/65' : 'text-muted'"
        >
          {{ description }}
        </p>
      </div>
      <div v-if="$slots.action" class="shrink-0">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>
