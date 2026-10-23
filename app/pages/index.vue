<script setup lang="ts">
import dealership from '~/config/dealership'

const {
  vehicles,
  availableVehicles,
  featuredVehicles,
  pending,
  error,
  refresh,
} = useVehicles()

const featured = computed(() => featuredVehicles.value.slice(0, 3))

const usedSlugs = computed(() => new Set(featured.value.map((vehicle) => vehicle.slug)))

const newArrivalSelection = computed(() =>
  [...availableVehicles.value]
    .filter((vehicle) => !usedSlugs.value.has(vehicle.slug))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 3),
)

const premiumSelection = computed(() => {
  const excluded = new Set([...usedSlugs.value, ...newArrivalSelection.value.map((vehicle) => vehicle.slug)])
  return availableVehicles.value
    .filter((vehicle) => vehicle.price >= dealership.luxuryPriceThreshold && !excluded.has(vehicle.slug))
    .sort((a, b) => b.price - a.price)
    .slice(0, 2)
})

const usedSelection = computed(() => {
  const excluded = new Set([
    ...usedSlugs.value,
    ...newArrivalSelection.value.map((vehicle) => vehicle.slug),
    ...premiumSelection.value.map((vehicle) => vehicle.slug),
  ])
  return availableVehicles.value
    .filter((vehicle) => vehicle.condition === 'used' && !excluded.has(vehicle.slug))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 3)
})

const spotlight = computed(() => featured.value[0] ?? availableVehicles.value[0])

useSeoMeta({
  description: dealership.seo.defaultDescription,
  ogTitle: `${dealership.name} — ${dealership.tagline}`,
  ogDescription: dealership.seo.defaultDescription,
  twitterTitle: `${dealership.name} — ${dealership.tagline}`,
  twitterDescription: dealership.seo.defaultDescription,
})

function retry() {
  void refresh()
}
</script>

<template>
  <div>
    <HeroSection :vehicles="vehicles" :spotlight="spotlight" />

    <div v-if="error" class="shell py-12">
      <div class="border border-red-200 bg-red-50 p-6" role="alert">
        <p class="font-display text-lg text-ink">The inventory could not be loaded.</p>
        <p class="mt-2 text-sm text-charcoal/70">Please refresh the page or try again.</p>
        <AppButton variant="dark" size="md" class="mt-4" @click="retry">Try again</AppButton>
      </div>
    </div>

    <template v-else>
      <FeaturedVehicles
        v-if="featured.length"
        :vehicles="featured"
        :title="`The featured collection`"
        :description="`A short list of vehicles that best represent the selection this week — each with its details, condition and listed price in one place.`"
      />

      <VehicleCategories v-if="vehicles.length" :vehicles="vehicles" />

      <DealershipAdvantages />

      <NewArrivalsSection v-if="newArrivalSelection.length" :vehicles="newArrivalSelection" />

      <PremiumVehiclesSection v-if="premiumSelection.length" :vehicles="premiumSelection" />

      <UsedVehiclesSection v-if="usedSelection.length" :vehicles="usedSelection" />

      <BrandStory />

      <TestimonialsSection />

      <FinalCta />
    </template>

    <LoadingState v-if="pending && !vehicles.length" class="shell py-12" :count="3" label="Loading the collection" />
  </div>
</template>
