<script setup lang="ts">
import dealership from '~/config/dealership'
import { formatNaira } from '~/utils/currency'

import type { Vehicle } from '~/types/vehicle'

defineProps<{
  vehicles: Vehicle[]
}>()

const thresholdLabel = computed(() => formatNaira(dealership.luxuryPriceThreshold))</script>

<template>
  <section v-if="vehicles.length" class="section-space bg-ivory" aria-labelledby="premium-heading">
    <div class="shell">
      <div class="grid gap-6 lg:grid-cols-12 lg:gap-7">
        <div class="flex flex-col justify-between bg-obsidian p-7 sm:p-9 lg:col-span-4">
          <div>
            <p class="eyebrow text-gold-light">Premium &amp; luxury</p>
            <h2 id="premium-heading" class="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-ivory sm:text-[2.35rem]">
              The upper end of the collection.
            </h2>
            <p class="mt-4 text-[13px] leading-relaxed text-white/50">
              High-specification vehicles selected for presence, performance and a more considered interior.
            </p>
          </div>

          <div class="mt-10 border-t border-white/10 pt-5">
            <p class="text-[10px] uppercase tracking-[0.14em] text-white/35">Price guide</p>
            <p class="mt-2 font-display text-lg text-ivory">From {{ thresholdLabel }}</p>
            <AppButton :to="`/cars?minPrice=${dealership.luxuryPriceThreshold}`" variant="light-outline" size="md" class="mt-5" trailing-icon="i-lucide-arrow-right">
              View luxury inventory
            </AppButton>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          <VehicleCard
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            :vehicle="vehicle"
          />
        </div>
      </div>
    </div>
  </section>
</template>
