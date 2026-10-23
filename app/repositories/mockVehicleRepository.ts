import type { Vehicle, VehicleFilters, VehicleSearchResult } from '~/types/vehicle'
import { vehicles as demoVehicles } from '~/data/vehicles'
import { searchVehicles } from '~/utils/vehicleFilters'
import type { VehicleRepository } from './vehicleRepository'

/**
 * Phase 1 repository. The demo array is imported here and nowhere else in the
 * UI, keeping a single seam for the Phase 2 API implementation.
 */
class MockVehicleRepository implements VehicleRepository {
  private readonly inventory: Vehicle[]

  constructor(inventory: Vehicle[]) {
    this.inventory = inventory
  }

  async getAll(): Promise<Vehicle[]> {
    return [...this.inventory]
  }

  async getBySlug(slug: string): Promise<Vehicle | null> {
    return this.inventory.find((vehicle) => vehicle.slug === slug) ?? null
  }

  async search(filters: VehicleFilters): Promise<VehicleSearchResult> {
    return searchVehicles(this.inventory, filters)
  }

  async getRelated(slug: string, limit = 3): Promise<Vehicle[]> {
    const current = this.inventory.find((vehicle) => vehicle.slug === slug)
    if (!current) return []

    const scored = this.inventory
      .filter((vehicle) => vehicle.slug !== slug)
      .map((vehicle) => {
        let score = 0
        if (vehicle.make === current.make) score += 4
        if (vehicle.bodyType && vehicle.bodyType === current.bodyType) score += 3
        if (vehicle.condition === current.condition) score += 1
        if (vehicle.status === 'available') score += 3
        if (current.price > 0) {
          const priceDifference = Math.abs(vehicle.price - current.price) / current.price
          if (priceDifference <= 0.25) score += 3
          else if (priceDifference <= 0.5) score += 1
        }
        return { vehicle, score }
      })
      .sort((a, b) => b.score - a.score || b.vehicle.year - a.vehicle.year)

    return scored.slice(0, limit).map((entry) => entry.vehicle)
  }
}

export const mockVehicleRepository: VehicleRepository = new MockVehicleRepository(demoVehicles)
