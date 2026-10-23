<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
    label?: string
  }>(),
  { count: 6, label: 'Loading vehicles' },
)
</script>

<template>
  <div role="status" :aria-label="label" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    <div v-for="index in count" :key="index" class="animate-pulse border border-line bg-white">
      <div class="aspect-[4/3] bg-line/70" />
      <div class="space-y-3 p-5">
        <div class="h-2.5 w-24 bg-line" />
        <div class="h-5 w-3/4 bg-line" />
        <div class="h-3 w-1/2 bg-line" />
        <div class="mt-6 h-6 w-32 bg-line" />
      </div>
    </div>
    <span class="sr-only">{{ label }}…</span>
  </div>
</template>
