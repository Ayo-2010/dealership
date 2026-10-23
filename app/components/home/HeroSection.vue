<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'
import { formatNaira, formatNumber } from '~/utils/currency'
import { vehicleTitle } from '~/utils/vehicle'

const props = defineProps<{
  vehicles: Vehicle[]
  spotlight?: Vehicle
}>()

const availableCount = computed(() => props.vehicles.filter((vehicle) => vehicle.status === 'available').length)
const newCount = computed(() => props.vehicles.filter((vehicle) => vehicle.condition === 'new' && vehicle.status === 'available').length)
</script>

<template>
  <section class="bg-obsidian" aria-labelledby="hero-heading">
    <div class="grid lg:min-h-[41rem] lg:grid-cols-[0.88fr_1.12fr] xl:min-h-[45rem]">
      <div class="relative flex items-center border-b border-white/10 px-5 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-16 xl:px-16">
        <div class="absolute inset-y-0 left-5 hidden w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent sm:left-8 lg:block lg:left-12 xl:left-16" aria-hidden="true" />
        <div class="w-full max-w-xl">
          <p class="eyebrow text-gold-light">
            Lagos, Nigeria
            <span class="mx-1 text-white/25" aria-hidden="true">/</span>
            New &amp; pre-owned
          </p>

          <h1 id="hero-heading" class="display-title mt-6 text-[2.7rem] text-ivory sm:text-6xl lg:text-[4.35rem] xl:text-[4.9rem]">
            Your Next Drive<br>
            Starts Here.
          </h1>

          <p class="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-white/60 sm:text-base">
            Discover a curated selection of brand-new and pre-owned vehicles, with straightforward enquiries and a more confident way to buy your next car.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton to="/cars" variant="gold" size="lg" trailing-icon="i-lucide-arrow-right">
              Explore inventory
            </AppButton>
            <AppButton to="/contact" variant="light-outline" size="lg">
              Speak to our team
            </AppButton>
          </div>

          <dl class="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <dt class="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">Available</dt>
              <dd class="mt-1.5 font-display text-lg font-medium text-ivory">{{ formatNumber(availableCount) }}</dd>
            </div>
            <div>
              <dt class="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">New stock</dt>
              <dd class="mt-1.5 font-display text-lg font-medium text-ivory">{{ formatNumber(newCount) }}</dd>
            </div>
            <div>
              <dt class="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">Pricing</dt>
              <dd class="mt-1.5 font-display text-lg font-medium text-ivory">NGN</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="relative min-h-[20rem] overflow-hidden bg-charcoal sm:min-h-[26rem] lg:min-h-full">
        <NuxtImg
          src="/images/hero-showroom.jpg"
          alt="Silver Audi RS7 Sportback on a mountain road — illustrative automotive photography"
          width="2400"
          height="1350"
          preload
          fetchpriority="high"
          sizes="sm:100vw xxl:56vw"
          class="absolute inset-0 size-full object-cover object-[58%_center]"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-obsidian/55 via-transparent to-transparent" aria-hidden="true" />

        <NuxtLink
          v-if="spotlight"
          :to="`/cars/${spotlight.slug}`"
          class="group absolute bottom-4 left-4 right-4 border border-white/15 bg-ivory p-4 transition-colors hover:bg-white sm:bottom-6 sm:left-6 sm:right-auto sm:w-[19rem]"
        >
          <p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-dark">In the collection</p>
          <p class="mt-2 font-display text-[15px] font-medium leading-snug tracking-tight text-ink">
            {{ vehicleTitle(spotlight) }}
          </p>
          <div class="mt-2 flex items-center justify-between gap-3">
            <span class="text-[13px] font-semibold text-ink">{{ formatNaira(spotlight.price) }}</span>
            <span class="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-gold-dark">
              View listing
              <UIcon name="i-lucide-arrow-right" class="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </NuxtLink>

        <p class="absolute right-4 top-4 hidden border border-white/20 bg-obsidian/45 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-white/65 sm:block">
          Illustrative photography
        </p>
      </div>
    </div>

    <div class="shell pb-10 pt-8 lg:pb-14 lg:pt-10">
      <VehicleSearchForm :vehicles="vehicles" />
    </div>
  </section>
</template>
