<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'
import dealership from '~/config/dealership'
import { formatMileage, formatNaira } from '~/utils/currency'
import { conditionLabel, statusDescription } from '~/utils/vehicle'

const props = defineProps<{
  vehicle: Vehicle
}>()

const { phoneHref } = useWhatsApp()
const { shareVehicle, sharing } = useShare()

const testDriveUrl = computed(() => `/test-drive?vehicle=${encodeURIComponent(props.vehicle.slug)}`)
const mileage = computed(() => formatMileage(props.vehicle.mileage))
const isSold = computed(() => props.vehicle.status === 'sold')
const isReserved = computed(() => props.vehicle.status === 'reserved')

const statusTone = computed(() => {
  if (isSold.value) return 'border-obsidian bg-obsidian text-white'
  if (isReserved.value) return 'border-amber-300 bg-amber-50 text-amber-900'
  return 'border-emerald-200 bg-emerald-50 text-emerald-900'
})

const quickFacts = computed(() => [
  { label: 'Condition', value: conditionLabel(props.vehicle.condition) },
  props.vehicle.transmission ? { label: 'Transmission', value: props.vehicle.transmission } : null,
  props.vehicle.fuelType ? { label: 'Fuel', value: props.vehicle.fuelType } : null,
  mileage.value ? { label: 'Mileage', value: mileage.value } : null,
].filter((item): item is { label: string, value: string } => Boolean(item)))
</script>

<template>
  <aside class="border border-line bg-white" aria-labelledby="enquiry-panel-heading">
    <div class="border-b border-line p-5 sm:p-6">
      <div class="flex items-center justify-between gap-3">
        <p class="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">Listed price</p>
        <span class="border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em]" :class="statusTone">
          {{ isSold ? 'Sold' : isReserved ? 'Reserved' : 'Available' }}
        </span>
      </div>

      <p class="mt-3 font-display text-[2rem] font-medium tracking-tight text-ink">{{ formatNaira(vehicle.price) }}</p>
      <p class="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted">{{ vehicle.stockNumber }}</p>

      <dl class="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
        <div v-for="fact in quickFacts" :key="fact.label" class="bg-white px-3 py-2.5">
          <dt class="text-[9px] uppercase tracking-[0.1em] text-muted">{{ fact.label }}</dt>
          <dd class="mt-1 text-[12px] font-medium text-ink">{{ fact.value }}</dd>
        </div>
      </dl>

      <p
        class="mt-4 border-l-2 pl-3 text-[11px] leading-relaxed"
        :class="isSold
          ? 'border-muted text-muted'
          : isReserved
            ? 'border-amber-500 text-amber-900'
            : 'border-emerald-600 text-charcoal/70'"
      >
        {{ statusDescription(vehicle) }}
      </p>
    </div>

    <div class="space-y-3 p-5 sm:p-6">
      <h2 id="enquiry-panel-heading" class="sr-only">Enquire about this vehicle</h2>

      <WhatsAppButton
        :vehicle="vehicle"
        :label="isSold ? 'Ask about similar vehicles' : 'Enquire on WhatsApp'"
        variant="gold"
        size="lg"
        block
      />

      <AppButton :href="phoneHref" variant="outline" size="md" block icon="i-lucide-phone">
        Call {{ dealership.contact.phone.display }}
      </AppButton>

      <AppButton
        v-if="!isSold"
        :to="testDriveUrl"
        variant="ghost"
        size="md"
        block
        trailing-icon="i-lucide-arrow-up-right"
      >
        Request a test drive
      </AppButton>

      <button
        type="button"
        class="flex w-full items-center justify-center gap-2 border-t border-line pt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
        :disabled="sharing"
        @click="shareVehicle(vehicle)"
      >
        <UIcon :name="sharing ? 'i-lucide-loader-circle' : 'i-lucide-share-2'" class="size-3.5" :class="sharing ? 'animate-spin' : ''" aria-hidden="true" />
        {{ sharing ? 'Preparing link' : 'Share this listing' }}
      </button>
    </div>

    <div class="border-t border-line bg-ivory p-5 sm:p-6">
      <p class="text-[10px] leading-relaxed text-muted">
        {{ dealership.policies.priceNotice }}
      </p>
      <p class="mt-2 text-[10px] leading-relaxed text-muted">
        {{ dealership.policies.demoInventoryNotice }}
      </p>
    </div>
  </aside>
</template>
