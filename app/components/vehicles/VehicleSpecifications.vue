<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'
import { formatMileage } from '~/utils/currency'
import { conditionLabel } from '~/utils/vehicle'

const props = defineProps<{
  vehicle: Vehicle
}>()

interface SpecItem {
  label: string
  value: string
}

const specs = computed<SpecItem[]>(() => {
  const v = props.vehicle
  const items: Array<SpecItem | null> = [
    { label: 'Model year', value: String(v.year) },
    { label: 'Condition', value: conditionLabel(v.condition) },
    v.mileage !== undefined ? { label: 'Mileage', value: formatMileage(v.mileage) ?? `${v.mileage} km` } : null,
    v.transmission ? { label: 'Transmission', value: v.transmission } : null,
    v.fuelType ? { label: 'Fuel type', value: v.fuelType } : null,
    v.drivetrain ? { label: 'Drivetrain', value: v.drivetrain } : null,
    v.bodyType ? { label: 'Body style', value: v.bodyType } : null,
    v.engine ? { label: 'Engine', value: v.engine } : null,
    v.exteriorColor ? { label: 'Exterior colour', value: v.exteriorColor } : null,
    v.interiorColor ? { label: 'Interior', value: v.interiorColor } : null,
    v.seatingCapacity ? { label: 'Seating capacity', value: `${v.seatingCapacity} seats` } : null,
    v.doors ? { label: 'Doors', value: String(v.doors) } : null,
    { label: 'Stock number', value: v.stockNumber },
  ]

  return items.filter((item): item is SpecItem => Boolean(item))
})
</script>

<template>
  <section aria-labelledby="specifications-heading">
    <div class="flex items-center justify-between gap-4 border-b border-line pb-4">
      <h2 id="specifications-heading" class="font-display text-2xl font-medium tracking-tight text-ink">
        Specifications
      </h2>
      <span class="text-[9px] uppercase tracking-[0.14em] text-muted">As listed</span>
    </div>

    <dl class="mt-5 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
      <div v-for="item in specs" :key="item.label" class="flex items-baseline justify-between gap-4 bg-white px-4 py-3">
        <dt class="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{{ item.label }}</dt>
        <dd class="text-right text-[13px] font-medium text-ink">{{ item.value }}</dd>
      </div>
    </dl>

    <p class="mt-3 text-[10px] leading-relaxed text-muted">
      Specifications are demonstration data. Confirm the exact specification, condition and history with the dealership before purchase.
    </p>
  </section>
</template>
