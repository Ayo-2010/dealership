<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

defineProps<{
  vehicles: Vehicle[]
}>()
</script>

<template>
  <section v-if="vehicles.length" class="section-space border-t border-line bg-ivory" aria-labelledby="related-heading">
    <div class="shell">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow text-gold-dark">Keep exploring</p>
          <h2 id="related-heading" class="mt-4 font-display text-3xl font-medium tracking-tight text-ink">
            Similar vehicles
          </h2>
        </div>
        <AppButton to="/cars" variant="outline" size="md" trailing-icon="i-lucide-arrow-right">
          Browse all cars
        </AppButton>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <VehicleCard
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
        />
      </div>
    </div>
  </section>
</template>
