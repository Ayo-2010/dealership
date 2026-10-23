<script setup lang="ts">
import type { VehicleSortKey } from '~/types/vehicle'
import { SORT_OPTIONS } from '~/utils/vehicleFilters'

defineProps<{
  modelValue: VehicleSortKey
  id?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: VehicleSortKey]
}>()

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value as VehicleSortKey
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <label :for="id ?? 'vehicle-sort'" class="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted sm:block">
      Sort
    </label>
    <select
      :id="id ?? 'vehicle-sort'"
      :value="modelValue"
      class="form-select w-auto! min-w-[11.5rem] py-2! text-[11px]!"
      @change="onChange"
    >
      <option v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
