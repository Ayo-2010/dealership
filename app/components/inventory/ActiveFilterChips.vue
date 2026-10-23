<script setup lang="ts">
import type { VehicleFilters } from '~/types/vehicle'
import type { ActiveFilterChip } from '~/utils/vehicleFilters'

defineProps<{
  chips: ActiveFilterChip[]
}>()

const emit = defineEmits<{
  remove: [keys: Array<keyof VehicleFilters>]
  clear: []
}>()
</script>

<template>
  <div v-if="chips.length" class="flex flex-wrap items-center gap-2">
    <span class="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Active</span>
    <button
      v-for="chip in chips"
      :key="chip.key"
      type="button"
      class="group inline-flex items-center gap-2 border border-line bg-white px-2.5 py-1.5 text-[11px] text-charcoal transition-colors hover:border-ink"
      :aria-label="`Remove ${chip.label} filter: ${chip.value}`"
      @click="emit('remove', chip.clearKeys)"
    >
      <span class="text-muted">{{ chip.label }}:</span>
      <span class="font-medium">{{ chip.value }}</span>
      <UIcon
        name="i-lucide-x"
        class="size-3 text-muted transition-colors group-hover:text-ink"
        aria-hidden="true"
      />
    </button>
    <button
      type="button"
      class="ml-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark underline-offset-4 transition-colors hover:text-ink hover:underline"
      @click="emit('clear')"
    >
      Clear all
    </button>
  </div>
</template>
