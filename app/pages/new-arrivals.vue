<script setup lang="ts">
import { formatDate } from '~/utils/currency'

const { vehicles, pending, error, refresh } = useVehicles()

const latest = computed(() =>
  [...vehicles.value]
    .filter((vehicle) => vehicle.status !== 'sold')
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 9),
)

const latestDate = computed(() => (latest.value[0] ? formatDate(latest.value[0].createdAt) : ''))

useSeoMeta({
  title: 'New arrivals',
  description:
    'The latest vehicles added to the Vantage Motors collection, with listed prices, condition and key specifications. New and pre-owned cars in Nigeria.',
  ogTitle: 'New arrivals · Vantage Motors',
  ogDescription: 'The latest vehicles added to the collection, with transparent naira pricing and direct enquiries.',
})
</script>

<template>
  <div>
    <PageHeader
      title="New to the collection."
      eyebrow="Recently listed"
      description="The latest vehicles published to the website. Listing dates show when a vehicle was added online — not a claim about when it physically arrived in the showroom."
      :crumbs="[{ label: 'New arrivals' }]"
      image="/images/showroom/showroom-1.jpg"
      image-alt="Illustrative modern car showroom with vehicles on display"
    >
      <template #actions>
        <AppButton to="/cars?sort=newest" variant="gold" size="lg" trailing-icon="i-lucide-arrow-right">
          Browse newest first
        </AppButton>
        <AppButton to="/cars" variant="light-outline" size="lg">
          View full inventory
        </AppButton>
      </template>
    </PageHeader>

    <section class="section-space bg-ivory" aria-labelledby="latest-heading">
      <div class="shell">
        <div class="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="eyebrow text-gold-dark">Latest listings</p>
            <h2 id="latest-heading" class="mt-4 font-display text-3xl font-medium tracking-tight text-ink">
              Freshly added.
            </h2>
          </div>
          <p v-if="latestDate" class="text-[11px] text-muted">
            Most recent listing: <span class="font-semibold text-ink">{{ latestDate }}</span>
          </p>
        </div>

        <div v-if="error" class="mt-8 border border-red-200 bg-red-50 p-6" role="alert">
          <p class="font-display text-lg text-ink">New arrivals could not be loaded.</p>
          <p class="mt-2 text-sm text-charcoal/70">Please refresh the page or try again.</p>
          <AppButton variant="dark" size="md" class="mt-4" @click="refresh()">Try again</AppButton>
        </div>

        <LoadingState v-else-if="pending && !vehicles.length" class="mt-8" :count="6" />

        <div v-else-if="latest.length" class="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <VehicleCard
            v-for="(vehicle, index) in latest"
            :key="vehicle.id"
            :vehicle="vehicle"
            :eager="index < 3"
            show-listed-date
          />
        </div>

        <EmptyState
          v-else
          class="mt-8"
          title="No new arrivals yet"
          description="New listings will appear here as they are published. Browse the full inventory in the meantime."
          icon="i-lucide-calendar-clock"
        />

        <div class="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p class="max-w-xl text-[10px] leading-relaxed text-muted">
            Demonstration inventory. Listing dates are sample data, and photography is illustrative rather than a photograph of the specific vehicle.
          </p>
          <AppButton to="/cars" variant="outline" size="md" trailing-icon="i-lucide-arrow-right">
            See all available cars
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>
