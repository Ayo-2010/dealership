<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

withDefaults(
  defineProps<{
    vehicles: Vehicle[]
    emptyTitle?: string
    emptyDescription?: string
    eagerCount?: number
  }>(),
  {
    emptyTitle: 'No vehicles to show',
    emptyDescription: 'Try adjusting your selection or browse the full inventory.',
    eagerCount: 0,
  },
)
</script>

<template>
  <div v-if="vehicles.length" class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    <VehicleCard
      v-for="(vehicle, index) in vehicles"
      :key="vehicle.id"
      :vehicle="vehicle"
      :eager="index < eagerCount"
    />
  </div>
  <EmptyState
    v-else
    :title="emptyTitle"
    :description="emptyDescription"
    action-label="Browse all cars"
    action-to="/cars"
  />
</template>
