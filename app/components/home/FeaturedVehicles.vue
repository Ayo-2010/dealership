<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

const props = withDefaults(
  defineProps<{
    vehicles: Vehicle[]
    title?: string
    description?: string
    eyebrow?: string
    index?: string
    viewAllTo?: string
  }>(),
  {
    title: 'The featured collection',
    description: 'A short list of vehicles that best represent the selection this week — each with its details, condition and listed price in one place.',
    eyebrow: 'Selected inventory',
    index: '01',
    viewAllTo: '/cars',
  },
)

const leadVehicle = computed(() => props.vehicles[0])
const supportingVehicles = computed(() => props.vehicles.slice(1, 3))
</script>

<template>
  <section v-if="vehicles.length" class="section-space bg-ivory" aria-labelledby="featured-heading">
    <div class="shell">
      <SectionHeading
        :eyebrow="eyebrow"
        :title="title"
        :description="description"
        :index="index"
      >
        <template #action>
          <AppButton :to="viewAllTo" variant="outline" size="md" trailing-icon="i-lucide-arrow-right">
            View all cars
          </AppButton>
        </template>
      </SectionHeading>

      <div class="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-7">
        <div v-if="leadVehicle" class="lg:col-span-7">
          <VehicleCard :vehicle="leadVehicle" eager />
        </div>
        <div v-if="supportingVehicles.length" class="grid gap-6 lg:col-span-5">
          <VehicleCard
            v-for="vehicle in supportingVehicles"
            :key="vehicle.id"
            :vehicle="vehicle"
            variant="compact"
          />
        </div>
        <div v-else class="hidden lg:col-span-5 lg:block">
          <div class="flex h-full flex-col justify-between border border-line bg-white p-7">
            <div>
              <p class="eyebrow text-gold-dark">Curated, not crowded</p>
              <p class="mt-5 font-display text-2xl font-medium leading-snug tracking-tight text-ink">
                Every listing is presented with the detail you need to shortlist with confidence.
              </p>
            </div>
            <AppButton to="/cars" variant="dark" size="md" trailing-icon="i-lucide-arrow-right" class="mt-8 self-start">
              Browse the collection
            </AppButton>
          </div>
        </div>
      </div>

      <p class="mt-6 text-[10px] uppercase tracking-[0.12em] text-muted">
        Demonstration inventory · Photography is illustrative
      </p>
    </div>
  </section>
</template>
