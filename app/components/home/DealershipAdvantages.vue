<script setup lang="ts">
import dealership from '~/config/dealership'
import type { DealershipServiceKey } from '~/config/dealership'

const iconMap: Record<DealershipServiceKey, string> = {
  'curated-selection': 'i-lucide-gem',
  'transparent-pricing': 'i-lucide-badge-naira',
  'responsive-enquiries': 'i-lucide-messages-square',
  documentation: 'i-lucide-file-check',
  'trade-in': 'i-lucide-repeat',
  financing: 'i-lucide-landmark',
  delivery: 'i-lucide-truck',
  warranty: 'i-lucide-shield-check',
  insurance: 'i-lucide-umbrella',
}

const advantageKeys: DealershipServiceKey[] = [
  'curated-selection',
  'transparent-pricing',
  'responsive-enquiries',
  'documentation',
]

const advantages = computed(() =>
  advantageKeys
    .map((key) => dealership.services.find((service) => service.key === key))
    .filter((service): service is (typeof dealership.services)[number] => Boolean(service?.enabled)),
)
</script>

<template>
  <section class="border-y border-white/10 bg-charcoal py-14 md:py-20" aria-labelledby="advantages-heading">
    <div class="shell">
      <div class="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p class="eyebrow text-gold-light">Why Vantage</p>
          <h2 id="advantages-heading" class="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ivory md:text-[2.5rem]">
            A calmer, clearer way to choose.
          </h2>
          <p class="mt-4 max-w-sm text-[13px] leading-relaxed text-white/50">
            No pressure tactics, no invented badges. Just a focused inventory and a team you can speak to directly.
          </p>
        </div>

        <ul class="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
          <li
            v-for="(service, index) in advantages"
            :key="service.key"
            class="flex flex-col bg-charcoal p-6 md:p-7"
          >
            <div class="flex items-center justify-between">
              <UIcon :name="iconMap[service.key]" class="size-5 text-gold" aria-hidden="true" />
              <span class="font-display text-[10px] tracking-[0.16em] text-white/25">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="mt-5 font-display text-[15px] font-medium tracking-tight text-ivory">{{ service.label }}</h3>
            <p class="mt-2 text-[12px] leading-relaxed text-white/45">{{ service.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
