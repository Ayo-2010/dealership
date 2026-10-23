/**
 * Core vehicle types.
 *
 * This file is intentionally framework-agnostic so the same contracts can be
 * shared by the Phase 1 mock repository and a future API-backed repository.
 */

export const VEHICLE_CONDITIONS = ['new', 'used'] as const
export type VehicleCondition = (typeof VEHICLE_CONDITIONS)[number]

export const VEHICLE_STATUSES = ['available', 'reserved', 'sold'] as const
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number]

export const VEHICLE_BODY_TYPES = ['SUV', 'Sedan', 'Coupe', 'Hatchback', 'Pickup', 'Wagon'] as const
export type VehicleBodyType = (typeof VEHICLE_BODY_TYPES)[number]

export const VEHICLE_TRANSMISSIONS = ['Automatic', 'Manual'] as const
export type VehicleTransmission = (typeof VEHICLE_TRANSMISSIONS)[number]

export const VEHICLE_FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'] as const
export type VehicleFuelType = (typeof VEHICLE_FUEL_TYPES)[number]

export const VEHICLE_DRIVETRAINS = ['RWD', 'FWD', 'AWD', '4WD'] as const
export type VehicleDrivetrain = (typeof VEHICLE_DRIVETRAINS)[number]

export type CurrencyCode = 'NGN'

export interface VehicleFeatureGroups {
  safety: string[]
  interior: string[]
  exterior: string[]
  comfort: string[]
  infotainment: string[]
  driverAssistance: string[]
}

export interface Vehicle {
  id: string
  slug: string
  stockNumber: string

  make: string
  model: string
  trim?: string
  year: number

  condition: VehicleCondition
  status: VehicleStatus

  price: number
  currency: CurrencyCode

  mileage?: number
  transmission?: VehicleTransmission
  fuelType?: VehicleFuelType
  drivetrain?: VehicleDrivetrain
  bodyType?: VehicleBodyType

  exteriorColor?: string
  interiorColor?: string
  engine?: string

  seatingCapacity?: number
  doors?: number

  description: string
  images: string[]
  features: VehicleFeatureGroups

  /** ISO date on which this demonstration listing was published. */
  createdAt: string
  featured: boolean
}

export const VEHICLE_SORT_KEYS = [
  'recommended',
  'newest',
  'price-asc',
  'price-desc',
  'year-desc',
  'mileage-asc',
] as const

export type VehicleSortKey = (typeof VEHICLE_SORT_KEYS)[number]

export interface VehicleFilters {
  q?: string
  make?: string
  model?: string
  condition?: VehicleCondition
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  bodyType?: VehicleBodyType
  transmission?: VehicleTransmission
  fuelType?: VehicleFuelType
  minMileage?: number
  maxMileage?: number
  exteriorColor?: string
  drivetrain?: VehicleDrivetrain
  sort: VehicleSortKey
  page: number
  perPage: number
}

export interface VehicleSearchResult {
  items: Vehicle[]
  total: number
  page: number
  perPage: number
  pageCount: number
  filters: VehicleFilters
}

export interface VehicleFilterOption {
  label: string
  value: string
}
