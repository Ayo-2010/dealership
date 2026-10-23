<script setup lang="ts">
const props = defineProps<{
  page: number
  pageCount: number
  total: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

const visiblePages = computed(() => {
  const total = props.pageCount
  const current = props.page
  const pages = new Set<number>([1, total, current - 1, current, current + 1])
  return [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b)
})

function change(page: number) {
  if (page < 1 || page > props.pageCount || page === props.page) return
  emit('change', page)
}
</script>

<template>
  <nav v-if="pageCount > 1" aria-label="Inventory pagination" class="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
    <p class="text-xs text-muted">
      Page <span class="font-semibold text-ink">{{ page }}</span> of
      <span class="font-semibold text-ink">{{ pageCount }}</span>
      <span class="sr-only">, {{ total }} results</span>
    </p>

    <div class="flex items-center gap-1">
      <button
        type="button"
        class="flex size-9 items-center justify-center border border-line bg-white text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="page <= 1"
        aria-label="Previous page"
        @click="change(page - 1)"
      >
        <UIcon name="i-lucide-chevron-left" class="size-4" aria-hidden="true" />
      </button>

      <template v-for="(item, index) in visiblePages" :key="item">
        <span
          v-if="index > 0 && item - visiblePages[index - 1]! > 1"
          class="flex size-9 items-center justify-center text-xs text-muted"
          aria-hidden="true"
        >…</span>
        <button
          type="button"
          class="flex size-9 items-center justify-center border text-xs font-semibold transition-colors"
          :class="item === page
            ? 'border-obsidian bg-obsidian text-white'
            : 'border-line bg-white text-ink hover:border-ink'"
          :aria-current="item === page ? 'page' : undefined"
          :aria-label="`Page ${item}`"
          @click="change(item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        type="button"
        class="flex size-9 items-center justify-center border border-line bg-white text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="page >= pageCount"
        aria-label="Next page"
        @click="change(page + 1)"
      >
        <UIcon name="i-lucide-chevron-right" class="size-4" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>
