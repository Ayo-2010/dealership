import type { Vehicle } from '~/types/vehicle'
import { vehicleRepository } from '~/repositories/vehicleRepository'
import type { VehicleRepository } from '~/repositories/vehicleRepository'

/**
 * Returns the configured inventory repository. Phase 2 only needs to change the
 * binding in `repositories/vehicleRepository.ts`.
 */
export function useVehicleRepository(): VehicleRepository {
  return vehicleRepository
}

/**
 * SSR-friendly inventory loader. Called once per page so the payload is shared
 * across homepage sections without repeatedly fetching the same data.
 */
export function useVehicles() {
  const repository = useVehicleRepository()

  const { data, pending, error, refresh, status } = useAsyncData<Vehicle[]>(
    'vehicle-inventory',
    () => repository.getAll(),
    { default: () => [] },
  )

  const vehicles = computed(() => data.value ?? [])

  const availableVehicles = computed(() => vehicles.value.filter((vehicle) => vehicle.status === 'available'))

  const featuredVehicles = computed(() =>
    vehicles.value
      .filter((vehicle) => vehicle.featured && vehicle.status === 'available')
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
  )

  const newArrivals = computed(() =>
    [...vehicles.value].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)),
  )

  return {
    vehicles,
    availableVehicles,
    featuredVehicles,
    newArrivals,
    pending,
    error,
    refresh,
    status,
  }
}

export function useVehicle(slug: string) {
  const repository = useVehicleRepository()

  return useAsyncData<Vehicle | null>(
    `vehicle-${slug}`,
    () => repository.getBySlug(slug),
    { default: () => null },
  )
}
