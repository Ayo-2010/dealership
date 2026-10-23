import type { Vehicle, VehicleFilters, VehicleSearchResult } from '~/types/vehicle'
import { mockVehicleRepository as mockRepository } from './mockVehicleRepository'

/**
 * Repository boundary for vehicle inventory.
 *
 * Phase 1 uses `mockVehicleRepository`. A Phase 2 API repository can implement
 * this same interface — pages, cards, filters and the detail layout continue to
 * work without knowing where the data came from.
 */
export interface VehicleRepository {
  getAll(): Promise<Vehicle[]>
  getBySlug(slug: string): Promise<Vehicle | null>
  search(filters: VehicleFilters): Promise<VehicleSearchResult>
  getRelated(slug: string, limit?: number): Promise<Vehicle[]>
}

/**
 * The active repository. Swap this single binding for an API-backed
 * implementation during Phase 2.
 */
export const vehicleRepository: VehicleRepository = mockRepository
export { mockRepository as mockVehicleRepository }
