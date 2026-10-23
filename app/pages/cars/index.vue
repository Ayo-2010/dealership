<script setup lang="ts">
import type { VehicleFilters } from '~/types/vehicle'
import dealership from '~/config/dealership'
import { describeResultCount, getFilterFacets } from '~/utils/vehicleFilters'

const {
  filters,
  activeChips,
  hasActive,
  applyFilters,
  updateFilters,
  removeFilter,
  clearFilters,
  setSort,
  setPage,
} = useVehicleFilters()

const { result, vehicles, pending, error, refresh } = useVehicleSearch(filters)

const facets = computed(() => getFilterFacets(vehicles.value))
const drawerOpen = ref(false)
const searchTerm = ref(filters.value.q ?? '')
const resultsRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

watch(
  () => filters.value.q,
  (value) => {
    searchTerm.value = value ?? ''
  },
)

const resultCountLabel = computed(() => describeResultCount(result.value.total))
const availableCount = computed(() => vehicles.value.filter((vehicle) => vehicle.status === 'available').length)
const newCount = computed(() => vehicles.value.filter((vehicle) => vehicle.condition === 'new' && vehicle.status === 'available').length)
const usedCount = computed(() => vehicles.value.filter((vehicle) => vehicle.condition === 'used' && vehicle.status === 'available').length)

useSeoMeta({
  title: 'Cars for sale in Nigeria',
  description:
    'Browse new and pre-owned cars with transparent naira prices, detailed specifications and direct WhatsApp enquiries. Filter by make, body style, price, year and mileage.',
  ogTitle: 'Cars for sale · Vantage Motors',
  ogDescription:
    'Browse new and pre-owned cars with transparent naira prices, detailed specifications and direct WhatsApp enquiries.',
})

function applyAll(next: VehicleFilters) {
  applyFilters(next)
}

function applySearch() {
  updateFilters({ q: searchTerm.value.trim() || undefined })
}

function clearSearch() {
  searchTerm.value = ''
  updateFilters({ q: undefined })
  nextTick(() => searchInputRef.value?.focus())
}

function clearAll() {
  clearFilters()
  nextTick(() => searchInputRef.value?.focus())
}

function changePage(page: number) {
  setPage(page)
  nextTick(() => {
    resultsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
</script>

<template>
  <div>
    <PageHeader
      title="The collection."
      eyebrow="Browse inventory"
      description="New and pre-owned vehicles, each presented with its listed price, condition and key specification. Filter the full inventory to find the cars worth a closer look."
      :crumbs="[{ label: 'Cars' }]"
    >
      <template #meta>
        <dl class="grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-5">
          <div>
            <dt class="text-[9px] uppercase tracking-[0.16em] text-white/35">Available</dt>
            <dd class="mt-1 font-display text-lg text-ivory">{{ availableCount }}</dd>
          </div>
          <div>
            <dt class="text-[9px] uppercase tracking-[0.16em] text-white/35">New</dt>
            <dd class="mt-1 font-display text-lg text-ivory">{{ newCount }}</dd>
          </div>
          <div>
            <dt class="text-[9px] uppercase tracking-[0.16em] text-white/35">Pre-owned</dt>
            <dd class="mt-1 font-display text-lg text-ivory">{{ usedCount }}</dd>
          </div>
        </dl>
      </template>
    </PageHeader>

    <section class="section-space bg-ivory" aria-labelledby="inventory-heading">
      <div class="shell">
        <h2 id="inventory-heading" class="sr-only">Inventory results</h2>

        <div class="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="w-full max-w-xl">
            <form role="search" class="flex gap-2" @submit.prevent="applySearch">
              <div class="relative flex-1">
                <label for="inventory-search" class="sr-only">Search inventory</label>
                <UIcon
                  name="i-lucide-search"
                  class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="inventory-search"
                  ref="searchInputRef"
                  v-model="searchTerm"
                  type="search"
                  class="form-input pl-9!"
                  placeholder="Search make, model, colour or stock number"
                  autocomplete="off"
                  enterkeyhint="search"
                >
                <button
                  v-if="searchTerm"
                  type="button"
                  class="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-muted transition-colors hover:text-ink"
                  aria-label="Clear search"
                  @click="clearSearch"
                >
                  <UIcon name="i-lucide-x" class="size-4" aria-hidden="true" />
                </button>
              </div>
              <AppButton type="submit" variant="dark" size="md">Search</AppButton>
            </form>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 sm:justify-start">
            <p class="text-[11px] text-muted" role="status" aria-live="polite">
              <span class="font-semibold text-ink">{{ resultCountLabel }}</span>
              <span v-if="hasActive"> match your filters</span>
            </p>
            <button
              type="button"
              class="inline-flex items-center gap-2 border border-line bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink lg:hidden"
              @click="drawerOpen = true"
            >
              <UIcon name="i-lucide-sliders-horizontal" class="size-3.5" aria-hidden="true" />
              Filters
              <span v-if="activeChips.length" class="flex size-4 items-center justify-center rounded-full bg-gold text-[9px] text-obsidian">
                {{ activeChips.length }}
              </span>
            </button>
            <VehicleSort
              id="inventory-sort"
              :model-value="filters.sort"
              @update:model-value="setSort"
            />
          </div>
        </div>

        <div v-if="hasActive" class="border-b border-line py-4">
          <ActiveFilterChips
            :chips="activeChips"
            @remove="removeFilter"
            @clear="clearAll"
          />
        </div>

        <div class="mt-8 grid gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-10">
          <aside class="hidden lg:block" aria-label="Inventory filters">
            <div class="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
              <VehicleFilters
                :filters="filters"
                :vehicles="vehicles"
                :facets="facets"
                id-prefix="desktop-filter"
                @apply="applyAll"
              />
            </div>
          </aside>

          <div ref="resultsRef" class="min-w-0 scroll-mt-28">
            <div v-if="error" class="border border-red-200 bg-red-50 p-6" role="alert">
              <p class="font-display text-lg text-ink">Inventory could not be loaded.</p>
              <p class="mt-2 text-sm text-charcoal/70">Please refresh the page or try again.</p>
              <AppButton variant="dark" size="md" class="mt-4" @click="refresh()">Try again</AppButton>
            </div>

            <LoadingState v-else-if="pending && !vehicles.length" :count="6" />

            <template v-else>
              <VehicleGrid
                v-if="result.items.length"
                :vehicles="result.items"
                :eager-count="3"
              />

              <EmptyState
                v-else
                title="No vehicles match these filters"
                description="Try widening the price or year range, removing a filter, or searching for a different make or model."
                icon="i-lucide-search-x"
              >
                <div class="mt-6 flex flex-col gap-2 sm:flex-row">
                  <AppButton variant="dark" size="md" @click="clearAll">Clear all filters</AppButton>
                  <AppButton to="/new-arrivals" variant="outline" size="md">Browse new arrivals</AppButton>
                </div>
              </EmptyState>

              <Pagination
                v-if="result.items.length"
                class="mt-10"
                :page="result.page"
                :page-count="result.pageCount"
                :total="result.total"
                @change="changePage"
              />

              <p v-if="result.items.length" class="mt-5 text-[10px] leading-relaxed text-muted">
                {{ dealership.policies.priceNotice }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </section>

    <VehicleFilterDrawer
      :open="drawerOpen"
      :filters="filters"
      :vehicles="vehicles"
      :facets="facets"
      @close="drawerOpen = false"
      @apply="applyAll"
    />
  </div>
</template>
