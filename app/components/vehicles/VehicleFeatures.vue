<script setup lang="ts">
import type { VehicleFeatureGroups } from '~/types/vehicle'

const props = defineProps<{
  features: VehicleFeatureGroups
}>()

const groups: Array<{ key: keyof VehicleFeatureGroups, label: string, icon: string }> = [
  { key: 'safety', label: 'Safety', icon: 'i-lucide-shield-check' },
  { key: 'comfort', label: 'Comfort & convenience', icon: 'i-lucide-armchair' },
  { key: 'interior', label: 'Interior', icon: 'i-lucide-layout-panel-left' },
  { key: 'exterior', label: 'Exterior', icon: 'i-lucide-car-front' },
  { key: 'infotainment', label: 'Infotainment', icon: 'i-lucide-monitor-speaker' },
  { key: 'driverAssistance', label: 'Driver assistance', icon: 'i-lucide-scan-line' },
]

const visibleGroups = computed(() =>
  groups
    .map((group) => ({ ...group, items: props.features[group.key] ?? [] }))
    .filter((group) => group.items.length > 0),
)
</script>

<template>
  <section v-if="visibleGroups.length" aria-labelledby="features-heading">
    <div class="flex items-center justify-between gap-4 border-b border-line pb-4">
      <h2 id="features-heading" class="font-display text-2xl font-medium tracking-tight text-ink">
        Features &amp; equipment
      </h2>
      <span class="text-[9px] uppercase tracking-[0.14em] text-muted">Selected highlights</span>
    </div>

    <div class="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <div v-for="group in visibleGroups" :key="group.key">
        <h3 class="flex items-center gap-2 font-display text-[13px] font-semibold tracking-tight text-ink">
          <UIcon :name="group.icon" class="size-4 text-gold-dark" aria-hidden="true" />
          {{ group.label }}
        </h3>
        <ul class="mt-3 space-y-2 border-t border-line pt-3">
          <li
            v-for="item in group.items"
            :key="item"
            class="flex items-start gap-2 text-[12px] leading-relaxed text-charcoal/75"
          >
            <span class="mt-[0.45rem] size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <p class="mt-6 text-[10px] leading-relaxed text-muted">
      Equipment lists are illustrative and may vary from the delivered vehicle. Ask the team to confirm the features that matter to you.
    </p>
  </section>
</template>
