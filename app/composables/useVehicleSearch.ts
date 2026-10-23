import type { ComputedRef, Ref } from 'vue'
import type { VehicleFilters } from '~/types/vehicle'
import { searchVehicles } from '~/utils/vehicleFilters'

/**
 * Applies the typed filter contract to the inventory loaded through the
 * repository. The pure `searchVehicles` utility is shared with the mock
 * repository, and can later be mirrored server-side.
 */
export function useVehicleSearch(filters: Ref<VehicleFilters> | ComputedRef<VehicleFilters>) {
  const { vehicles, pending, error, refresh } = useVehicles()

  const result = computed(() => searchVehicles(vehicles.value, filters.value))

  return {
    result,
    vehicles,
    pending,
    error,
    refresh,
  }
}
