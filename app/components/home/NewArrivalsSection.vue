<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

defineProps<{
  vehicles: Vehicle[]
}>()
</script>

<template>
  <section v-if="vehicles.length" class="section-space border-t border-line bg-white" aria-labelledby="new-arrivals-heading">
    <div class="shell">
      <SectionHeading
        eyebrow="Recently listed"
        title="New to the collection."
        description="The latest vehicles published to the website. Listing dates reflect when a vehicle was added online, not a claim about when it arrived in the showroom."
        index="03"
      >
        <template #action>
          <AppButton to="/new-arrivals" variant="outline" size="md" trailing-icon="i-lucide-arrow-right">
            All new arrivals
          </AppButton>
        </template>
      </SectionHeading>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <VehicleCard
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
          show-listed-date
        />
      </div>
    </div>
  </section>
</template>
