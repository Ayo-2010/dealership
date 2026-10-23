<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'

const props = withDefaults(
  defineProps<{
    vehicles: Vehicle[]
    currentSlug?: string
  }>(),
  { currentSlug: '' },
)

const { slugs, hydrated, clear } = useRecentlyViewedVehicles()

const recentlyViewed = computed(() => {
  if (!hydrated.value) return []
  return slugs.value
    .filter((slug) => slug !== props.currentSlug)
    .map((slug) => props.vehicles.find((vehicle) => vehicle.slug === slug))
    .filter((vehicle): vehicle is Vehicle => Boolean(vehicle))
    .slice(0, 3)
})
</script>

<template>
  <section v-if="recentlyViewed.length" class="section-space border-t border-line bg-white" aria-labelledby="recently-viewed-heading">
    <div class="shell">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow text-gold-dark">On this device</p>
          <h2 id="recently-viewed-heading" class="mt-4 font-display text-2xl font-medium tracking-tight text-ink">
            Recently viewed
          </h2>
        </div>
        <button
          type="button"
          class="self-start text-[10px] font-semibold uppercase tracking-[0.1em] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline sm:self-auto"
          @click="clear"
        >
          Clear history
        </button>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <VehicleCard
          v-for="vehicle in recentlyViewed"
          :key="vehicle.id"
          :vehicle="vehicle"
        />
      </div>

      <p class="mt-5 text-[10px] text-muted">
        Stored only in this browser. No account or server record is created.
      </p>
    </div>
  </section>
</template>
