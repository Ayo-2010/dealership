import type { Ref } from 'vue'
import type { VehicleFilters } from '~/types/vehicle'
import { createDefaultFilters, parseVehicleFilters, serializeVehicleFilters } from '~/utils/vehicleFilters'

/**
 * Keeps inventory filters in sync with URL query parameters so filtered views
 * can be shared, bookmarked and restored on refresh.
 */
export function useVehicleFilters() {
  const route = useRoute()
  const router = useRouter()

  const filters = computed<VehicleFilters>(() =>
    parseVehicleFilters(route.query as Record<string, unknown>),
  )

  const activeChips = computed(() => getActiveFilterChips(filters.value))
  const hasActive = computed(() => activeChips.value.length > 0)

  function navigate(next: VehicleFilters) {
    const query = serializeVehicleFilters(next)
    const current = serializeVehicleFilters(filters.value)
    if (JSON.stringify(query) === JSON.stringify(current)) return
    void router.push({ path: route.path, query })
  }

  function applyFilters(next: VehicleFilters) {
    navigate({
      ...next,
      sort: next.sort ?? filters.value.sort,
      perPage: next.perPage ?? filters.value.perPage,
      page: next.page ?? 1,
    })
  }

  function updateFilters(patch: Partial<VehicleFilters>) {
    navigate({ ...filters.value, ...patch, page: 1 })
  }

  function removeFilter(keys: Array<keyof VehicleFilters>) {
    navigate(clearFilterKeys(filters.value, keys))
  }

  function clearFilters() {
    navigate(createDefaultFilters({ sort: filters.value.sort, perPage: filters.value.perPage }))
  }

  function setSort(sort: VehicleFilters['sort']) {
    navigate({ ...filters.value, sort, page: 1 })
  }

  function setPage(page: number) {
    navigate({ ...filters.value, page: Math.max(1, page) })
  }

  return {
    filters,
    activeChips,
    hasActive,
    applyFilters,
    updateFilters,
    removeFilter,
    clearFilters,
    setSort,
    setPage,
  }
}

/** Convenience alias used by pages that only need a mutable filter ref. */
export type VehicleFiltersRef = Ref<VehicleFilters>
