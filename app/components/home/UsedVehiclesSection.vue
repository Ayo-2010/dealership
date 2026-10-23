<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

defineProps<{
  vehicles: Vehicle[]
}>()
</script>

<template>
  <section v-if="vehicles.length" class="section-space bg-[#ECEAE3]" aria-labelledby="used-heading">
    <div class="shell">
      <div class="flex flex-col gap-6 border-b border-charcoal/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="eyebrow text-gold-dark">Pre-owned selection</p>
          <h2 id="used-heading" class="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-[2.5rem]">
            Proven. Pre-owned.
          </h2>
        </div>
        <div class="max-w-md">
          <p class="text-[13px] leading-relaxed text-charcoal/65">
            Pre-owned vehicles are presented with their recorded mileage and known specification. Condition and service history should always be confirmed directly with the dealership.
          </p>
          <NuxtLink to="/cars?condition=used" class="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-gold-dark">
            Browse all pre-owned
            <UIcon name="i-lucide-arrow-right" class="size-3.5" aria-hidden="true" />
          </NuxtLink>
        </div>
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
