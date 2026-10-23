<script setup lang="ts">
import dealership from '~/config/dealership'
import { vehicleRepository } from '~/repositories/vehicleRepository'
import { formatMileage, formatNaira } from '~/utils/currency'
import { conditionLabel, statusDescription, vehicleTitle } from '~/utils/vehicle'

const route = useRoute()
const slugParam = route.params.slug
const slug = Array.isArray(slugParam) ? slugParam[0] ?? '' : slugParam ?? ''

const { data, error } = await useVehicle(slug)

function notFound(): never {
  throw createError({
    statusCode: 404,
    statusMessage: 'Vehicle not found',
    message: 'This vehicle listing could not be found. It may have been removed or the address may be incorrect.',
    fatal: true,
  })
}

const car = data.value ?? notFound()

if (error.value) notFound()

const title = vehicleTitle(car)
const image = car.images[0]
const runtimeConfig = useRuntimeConfig()
const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/$/, '')

const seoDescription = `${title} — ${conditionLabel(car.condition).toLowerCase()} vehicle listed at ${formatNaira(car.price)} with ${car.stockNumber}. View specifications and enquire with Vantage Motors.`

useSeoMeta({
  title,
  description: seoDescription,
  ogType: 'website',
  ogTitle: `${title} · ${dealership.name}`,
  ogDescription: seoDescription,
  ogImage: image ? `${siteUrl}${image}` : `${siteUrl}${dealership.seo.ogImage}`,
  ogImageAlt: `${title} — illustrative automotive photograph`,
  twitterCard: 'summary_large_image',
  twitterTitle: `${title} · ${dealership.name}`,
  twitterDescription: seoDescription,
  twitterImage: image ? `${siteUrl}${image}` : `${siteUrl}${dealership.seo.ogImage}`,
})

const { data: related } = await useAsyncData(
  `related-${car.slug}`,
  () => vehicleRepository.getRelated(car.slug, 3),
  { default: () => [] },
)

const { vehicles: inventoryVehicles } = useVehicles()
const { track } = useRecentlyViewedVehicles()

function trackVehicle() {
  track(car.slug)
}

onMounted(trackVehicle)

const paragraphs = computed(() => car.description.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean))
const mileage = computed(() => formatMileage(car.mileage))

const headerMeta = computed(() =>
  [
    String(car.year),
    conditionLabel(car.condition),
    car.bodyType,
    mileage.value,
  ]
    .filter(Boolean)
    .join(' · '),
)

const statusTone = computed(() => {
  if (car.status === 'sold') return 'border-muted/30 bg-white text-charcoal'
  if (car.status === 'reserved') return 'border-amber-300 bg-amber-50 text-amber-900'
  return 'border-emerald-200 bg-emerald-50 text-emerald-900'
})
</script>

<template>
  <div>
    <div class="border-b border-line bg-ivory">
      <div class="shell py-5">
        <Breadcrumbs
          :items="[
            { label: 'Cars', to: '/cars' },
            { label: vehicleTitle(car, { includeYear: false }) },
          ]"
        />
      </div>
    </div>

    <section class="bg-ivory pb-12 pt-8 sm:pt-10" aria-labelledby="vehicle-heading">
      <div class="shell">
        <div class="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="border border-gold bg-gold px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-obsidian">
                {{ conditionLabel(car.condition) }}
              </span>
              <span class="border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]" :class="statusTone">
                {{ car.status === 'available' ? 'Available' : car.status === 'reserved' ? 'Reserved' : 'Sold' }}
              </span>
              <span class="text-[10px] uppercase tracking-[0.12em] text-muted">Stock {{ car.stockNumber }}</span>
            </div>

            <h1 id="vehicle-heading" class="display-title mt-4 max-w-3xl text-[2.3rem] text-ink sm:text-5xl lg:text-[3.5rem]">
              {{ title }}
            </h1>
            <p class="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{{ headerMeta }}</p>
          </div>

          <div class="shrink-0 border-t border-line pt-4 lg:border-t-0 lg:pt-0 lg:text-right">
            <p class="text-[9px] uppercase tracking-[0.14em] text-muted">Listed price</p>
            <p class="mt-1 font-display text-2xl font-medium tracking-tight text-ink">{{ formatNaira(car.price) }}</p>
          </div>
        </div>

        <div
          v-if="car.status !== 'available'"
          class="mt-6 border-l-2 p-4"
          :class="car.status === 'sold' ? 'border-muted bg-white' : 'border-amber-500 bg-amber-50'"
        >
          <p class="flex items-start gap-3 text-[12px] leading-relaxed" :class="car.status === 'sold' ? 'text-charcoal/70' : 'text-amber-900'">
            <UIcon
              :name="car.status === 'sold' ? 'i-lucide-circle-slash' : 'i-lucide-clock'"
              class="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            {{ statusDescription(car) }}
          </p>
        </div>

        <div class="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div class="min-w-0 lg:col-span-7">
            <VehicleGallery
              :images="car.images"
              :label="title"
              :status="car.status"
            />
          </div>

          <div class="lg:col-span-5">
            <div class="lg:sticky lg:top-24">
              <VehicleEnquiryPanel :vehicle="car" />
            </div>
          </div>

          <div class="min-w-0 space-y-12 lg:col-span-7">
            <section aria-labelledby="overview-heading" class="border-t border-line pt-8">
              <div class="flex items-center justify-between gap-4">
                <h2 id="overview-heading" class="font-display text-2xl font-medium tracking-tight text-ink">Overview</h2>
                <span class="text-[9px] uppercase tracking-[0.14em] text-muted">Vehicle notes</span>
              </div>
              <div class="prose-editorial mt-5">
                <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
              </div>
            </section>

            <VehicleSpecifications :vehicle="car" />

            <VehicleFeatures :features="car.features" />

            <div class="border border-line bg-white p-5">
              <p class="flex items-start gap-2 text-[11px] leading-relaxed text-charcoal/70">
                <UIcon name="i-lucide-info" class="mt-0.5 size-3.5 shrink-0 text-gold-dark" aria-hidden="true" />
                {{ dealership.policies.availabilityNotice }}
              </p>
              <p class="mt-2 flex items-start gap-2 text-[11px] leading-relaxed text-charcoal/70">
                <UIcon name="i-lucide-image-off" class="mt-0.5 size-3.5 shrink-0 text-gold-dark" aria-hidden="true" />
                Photography is illustrative stock imagery and does not show the specific vehicle described.
              </p>
            </div>

            <div class="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
              <AppButton to="/cars" variant="outline" size="md" icon="i-lucide-arrow-left">
                Back to inventory
              </AppButton>
              <AppButton to="/contact" variant="ghost" size="md" trailing-icon="i-lucide-arrow-right">
                Ask a general question
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <RelatedVehicles :vehicles="related" />

    <RecentlyViewedVehicles :vehicles="inventoryVehicles" :current-slug="car.slug" />
  </div>
</template>
