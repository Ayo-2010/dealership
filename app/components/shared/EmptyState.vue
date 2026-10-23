<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: string
    actionLabel?: string
    actionTo?: string
    compact?: boolean
  }>(),
  { icon: 'i-lucide-search-x', compact: false },
)
</script>

<template>
  <div
    class="flex flex-col items-center justify-center border border-line bg-white px-6 text-center"
    :class="compact ? 'py-12' : 'py-20'"
  >
    <span class="flex size-12 items-center justify-center rounded-full border border-line bg-ivory">
      <UIcon :name="icon" class="size-5 text-gold-dark" aria-hidden="true" />
    </span>
    <h3 class="mt-5 font-display text-xl font-medium tracking-tight text-ink">{{ title }}</h3>
    <p v-if="description" class="mt-3 max-w-md text-sm leading-relaxed text-muted">{{ description }}</p>
    <div v-if="actionLabel && actionTo" class="mt-6">
      <AppButton :to="actionTo" variant="dark" size="md">{{ actionLabel }}</AppButton>
    </div>
    <slot />
  </div>
</template>
