<script setup lang="ts">
import dealership from '~/config/dealership'

const route = useRoute()
const { vehicles } = useVehicles()

const initialSlug = computed(() => (typeof route.query.vehicle === 'string' ? route.query.vehicle : ''))

const selectedVehicle = computed(() =>
  initialSlug.value ? vehicles.value.find((vehicle) => vehicle.slug === initialSlug.value) ?? null : null,
)

const steps = [
  {
    title: 'Choose a vehicle and time',
    description: 'Pick a listed vehicle and a preferred date and time. Reserved vehicles are still selectable, but availability must be confirmed.',
  },
  {
    title: 'Review the prepared message',
    description: 'The form prepares a request locally. Nothing is sent automatically. You can copy it, open WhatsApp or email it yourself.',
  },
  {
    title: 'Wait for confirmation',
    description: 'A request is not a booking. The team must confirm the vehicle, appointment time, location and any requirements with you directly.',
  },
]

useSeoMeta({
  title: 'Request a test drive',
  description:
    'Request a test drive at Vantage Motors. Choose a vehicle and preferred time, then prepare a local request. An appointment is only confirmed directly by the dealership.',
  ogTitle: 'Request a test drive · Vantage Motors',
  ogDescription: 'Choose a vehicle and preferred time, then prepare a test-drive request. Nothing is booked automatically.',
})
</script>

<template>
  <div>
    <PageHeader
      title="Request a test drive."
      eyebrow="Behind the wheel"
      description="Choose a vehicle and a preferred time. The request is prepared locally for you to review and send — the dealership must confirm the appointment directly."
      :crumbs="[{ label: 'Test drive' }]"
    >
      <template #actions>
        <WhatsAppButton label="Ask about test drives" variant="gold" size="lg" />
        <AppButton to="/cars" variant="light-outline" size="lg" trailing-icon="i-lucide-arrow-right">
          Browse vehicles
        </AppButton>
      </template>
    </PageHeader>

    <section class="section-space bg-ivory" aria-labelledby="test-drive-heading">
      <div class="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-5">
          <p class="eyebrow text-gold-dark">Before you request</p>
          <h2 id="test-drive-heading" class="section-title mt-4">
            A request, not a reservation.
          </h2>
          <p class="mt-4 max-w-lg text-[13px] leading-relaxed text-muted">
            {{ dealership.testDrive.confirmationNotice }}
          </p>

          <ol class="mt-8 border-y border-line">
            <li v-for="(step, index) in steps" :key="step.title" class="flex gap-4 border-b border-line py-5 last:border-b-0">
              <span class="font-display text-[10px] tracking-[0.16em] text-gold-dark">{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <h3 class="font-display text-sm font-medium tracking-tight text-ink">{{ step.title }}</h3>
                <p class="mt-1.5 text-[11px] leading-relaxed text-muted">{{ step.description }}</p>
              </div>
            </li>
          </ol>

          <div v-if="selectedVehicle" class="mt-6 border border-gold/40 bg-gold-50 p-4">
            <p class="text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Vehicle from listing</p>
            <p class="mt-1.5 font-display text-sm font-medium text-ink">
              {{ selectedVehicle.year }} {{ selectedVehicle.make }} {{ selectedVehicle.model }}
            </p>
            <p v-if="selectedVehicle.status === 'reserved'" class="mt-1 text-[10px] leading-relaxed text-amber-800">
              This vehicle is currently marked as reserved. The form allows the request, but availability must be confirmed.
            </p>
            <NuxtLink :to="`/cars/${selectedVehicle.slug}`" class="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink hover:text-gold-dark">
              View listing
              <UIcon name="i-lucide-arrow-right" class="size-3" aria-hidden="true" />
            </NuxtLink>
          </div>

          <div class="mt-6 border border-line bg-white p-5">
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">What to bring</p>
            <p class="mt-2 text-[11px] leading-relaxed text-muted">
              The dealership will explain its requirements before the appointment, including any licence, age or insurance conditions. Requirements can vary by vehicle. Ask before travelling.
            </p>
            <NuxtLink to="/faq" class="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark hover:text-ink">
              Read the FAQ
              <UIcon name="i-lucide-arrow-right" class="size-3" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>

        <div class="lg:col-span-7">
          <TestDriveForm
            v-if="dealership.testDrive.enabled"
            :vehicles="vehicles"
            :initial-slug="initialSlug"
          />
          <div v-else class="border border-line bg-white p-6">
            <p class="font-display text-lg font-medium text-ink">Test-drive requests are currently unavailable.</p>
            <p class="mt-2 text-[12px] leading-relaxed text-muted">Please contact the team directly to discuss viewing a vehicle.</p>
            <AppButton to="/contact" variant="dark" size="md" class="mt-4">Contact the team</AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
