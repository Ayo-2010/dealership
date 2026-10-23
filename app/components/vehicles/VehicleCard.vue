<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'
import { conditionLabel, statusLabel, vehicleShortTitle, vehicleTitle } from '~/utils/vehicle'
import { formatDate, formatMileage, formatNaira } from '~/utils/currency'

const props = withDefaults(
  defineProps<{
    vehicle: Vehicle
    variant?: 'default' | 'compact'
    eager?: boolean
    showListedDate?: boolean
  }>(),
  { variant: 'default', eager: false, showListedDate: false },
)

const imageFailed = ref(false)

const title = computed(() => vehicleShortTitle(props.vehicle))
const fullTitle = computed(() => vehicleTitle(props.vehicle))
const mileage = computed(() => formatMileage(props.vehicle.mileage))
const price = computed(() => formatNaira(props.vehicle.price))
const condition = computed(() => conditionLabel(props.vehicle.condition))
const status = computed(() => statusLabel(props.vehicle.status))
const detailLink = computed(() => `/cars/${props.vehicle.slug}`)

const specItems = computed(() => {
  const items = [
    { icon: 'i-lucide-gauge', label: mileage.value },
    { icon: 'i-lucide-cog', label: props.vehicle.transmission },
    { icon: 'i-lucide-fuel', label: props.vehicle.fuelType },
  ]
  return items.filter((item): item is { icon: string, label: string } => Boolean(item.label))
})

const statusDotClass = computed(() => {
  switch (props.vehicle.status) {
    case 'reserved':
      return 'bg-amber-500'
    case 'sold':
      return 'bg-muted'
    default:
      return 'bg-emerald-600'
  }
})

const imageAlt = computed(
  () => `${fullTitle.value} — illustrative automotive photograph (${condition.value.toLowerCase()} vehicle demonstration listing)`,
)
</script>

<template>
  <article
    class="group surface-card flex h-full flex-col overflow-hidden"
    :class="variant === 'compact' ? 'sm:flex-row' : ''"
  >
    <NuxtLink
      :to="detailLink"
      class="relative block shrink-0 overflow-hidden bg-line focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold"
      :class="variant === 'compact'
        ? 'aspect-[4/3] sm:aspect-auto sm:min-h-[13rem] sm:w-[42%]'
        : 'aspect-[4/3]'"
      :aria-label="`View details for the ${fullTitle}`"
    >
      <NuxtImg
        v-if="!imageFailed"
        :src="vehicle.images[0]"
        :alt="imageAlt"
        width="800"
        height="600"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        sizes="sm:100vw xxl:33vw"
        class="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        @error="imageFailed = true"
      />
      <div
        v-else
        class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-charcoal text-white/40"
        role="img"
        :aria-label="`Image unavailable for the ${fullTitle}`"
      >
        <UIcon name="i-lucide-car-front" class="size-8" aria-hidden="true" />
        <span class="text-[10px] uppercase tracking-[0.16em]">Image unavailable</span>
      </div>

      <div class="absolute left-3 top-3 flex flex-wrap items-center gap-2">
        <span
          class="border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
          :class="vehicle.condition === 'new'
            ? 'border-gold bg-gold text-obsidian'
            : 'border-white/60 bg-white/95 text-ink'"
        >
          {{ condition }}
        </span>
        <span
          v-if="vehicle.status !== 'available'"
          class="border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
          :class="vehicle.status === 'sold'
            ? 'border-obsidian bg-obsidian text-white'
            : 'border-amber-300 bg-amber-50 text-amber-900'"
        >
          {{ status }}
        </span>
      </div>

      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
    </NuxtLink>

    <div class="flex flex-1 flex-col p-5" :class="variant === 'compact' ? 'sm:p-5' : ''">
      <div class="flex items-center justify-between gap-3">
        <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          {{ vehicle.year }} · {{ vehicle.bodyType ?? 'Vehicle' }}
        </p>
        <span class="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
          <span class="size-1.5 rounded-full" :class="statusDotClass" aria-hidden="true" />
          {{ status }}
        </span>
      </div>

      <h3 class="mt-2.5 min-h-[1.65rem] font-display text-[19px] font-medium leading-snug tracking-tight text-ink">
        <NuxtLink :to="detailLink" class="transition-colors hover:text-gold-dark">
          {{ title }}
        </NuxtLink>
      </h3>
      <p v-if="vehicle.trim" class="mt-1 truncate text-[12px] text-muted">{{ vehicle.trim }}</p>

      <ul v-if="specItems.length" class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <li
          v-for="item in specItems"
          :key="item.icon"
          class="flex items-center gap-1.5 text-[11px] text-charcoal/75"
        >
          <UIcon :name="item.icon" class="size-3.5 text-gold-dark" aria-hidden="true" />
          {{ item.label }}
        </li>
      </ul>

      <div class="mt-auto pt-5">
        <div class="flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <p class="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">Listed price</p>
            <p class="mt-1 font-display text-[20px] font-medium tracking-tight text-ink">{{ price }}</p>
          </div>
          <span class="mb-0.5 text-right text-[9px] uppercase tracking-[0.1em] text-muted">
            {{ vehicle.stockNumber }}
            <template v-if="showListedDate">
              <br>
              <span class="normal-case tracking-normal">Listed {{ formatDate(vehicle.createdAt) }}</span>
            </template>
          </span>
        </div>

        <div class="mt-4 flex items-center gap-2">
          <AppButton :to="detailLink" variant="outline" size="sm" class="flex-1">
            View details
          </AppButton>
          <WhatsAppButton
            :vehicle="vehicle"
            label="WhatsApp"
            variant="ghost"
            size="sm"
            class="shrink-0 text-[10px]! tracking-[0.08em]! text-muted hover:text-gold-dark!"
          />
        </div>
      </div>
    </div>
  </article>
</template>
