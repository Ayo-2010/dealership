<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'
import { vehicleCategories } from '~/data/categories'
import { parseVehicleFilters, searchVehicles } from '~/utils/vehicleFilters'

const props = defineProps<{
  vehicles: Vehicle[]
}>()

function categoryCount(href: string): number {
  const queryIndex = href.indexOf('?')
  const params = new URLSearchParams(queryIndex >= 0 ? href.slice(queryIndex + 1) : '')
  const filters = parseVehicleFilters(Object.fromEntries(params.entries()))
  return searchVehicles(props.vehicles, { ...filters, page: 1, perPage: 100 }).total
}

const categoryCounts = computed<Record<string, number>>(() =>
  Object.fromEntries(vehicleCategories.map((category) => [category.href, categoryCount(category.href)])),
)
</script>

<template>
  <section class="section-space border-t border-line bg-white" aria-labelledby="categories-heading">
    <div class="shell">
      <SectionHeading
        eyebrow="Browse by category"
        title="Start with the shape of your next car."
        description="From everyday practicality to weekend performance, explore the collection by body style."
        index="02"
      >
        <template #action>
          <AppButton to="/cars" variant="ghost" size="md" trailing-icon="i-lucide-arrow-right">
            All inventory
          </AppButton>
        </template>
      </SectionHeading>

      <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="category in vehicleCategories"
          :key="category.label"
          :to="category.href"
          class="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden bg-charcoal p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <NuxtImg
            :src="category.image"
            :alt="`${category.label} — illustrative category photography`"
            width="1200"
            height="900"
            loading="lazy"
            sizes="sm:100vw xxl:33vw"
            class="absolute inset-0 size-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.035]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/25 to-transparent" aria-hidden="true" />

          <div class="relative flex items-end justify-between gap-4">
            <div>
              <p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                {{ categoryCounts[category.href] }} {{ categoryCounts[category.href] === 1 ? 'vehicle' : 'vehicles' }}
              </p>
              <h3 class="mt-2 font-display text-2xl font-medium tracking-tight text-ivory">{{ category.label }}</h3>
              <p class="mt-1 max-w-[16rem] text-[11px] leading-relaxed text-white/60">{{ category.description }}</p>
            </div>
            <span class="mb-1 flex size-8 shrink-0 items-center justify-center border border-white/25 text-white/80 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian">
              <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
