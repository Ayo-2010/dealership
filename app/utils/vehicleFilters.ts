import type {
  Vehicle,
  VehicleFilters,
  VehicleSearchResult,
  VehicleSortKey,
} from '~/types/vehicle'
import {
  VEHICLE_BODY_TYPES,
  VEHICLE_CONDITIONS,
  VEHICLE_DRIVETRAINS,
  VEHICLE_FUEL_TYPES,
  VEHICLE_SORT_KEYS,
  VEHICLE_TRANSMISSIONS,
} from '~/types/vehicle'
import { conditionLabel, statusLabel, vehicleTitle } from '~/utils/vehicle'
import { formatMileage, formatNaira, formatNumber } from '~/utils/currency'
import dealership from '~/config/dealership'

export const DEFAULT_SORT: VehicleSortKey = dealership.defaultSort
export const DEFAULT_PER_PAGE = dealership.inventoryPerPage

export const SORT_OPTIONS: Array<{ label: string; value: VehicleSortKey }> = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Newest listings', value: 'newest' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Newest model year', value: 'year-desc' },
  { label: 'Lowest mileage', value: 'mileage-asc' },
]

const FILTER_QUERY_KEYS = [
  'q',
  'make',
  'model',
  'condition',
  'minPrice',
  'maxPrice',
  'minYear',
  'maxYear',
  'bodyType',
  'transmission',
  'fuelType',
  'minMileage',
  'maxMileage',
  'exteriorColor',
  'drivetrain',
  'sort',
  'page',
  'perPage',
] as const satisfies ReadonlyArray<keyof VehicleFilters>

export function createDefaultFilters(overrides: Partial<VehicleFilters> = {}): VehicleFilters {
  return {
    sort: DEFAULT_SORT,
    page: 1,
    perPage: DEFAULT_PER_PAGE,
    ...overrides,
  }
}

function readQueryValue(query: Record<string, unknown>, key: string): string | undefined {
  const value = query[key]
  const first = Array.isArray(value) ? value[0] : value
  if (typeof first !== 'string') return undefined
  const trimmed = first.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function readNumber(query: Record<string, unknown>, key: string, options: { min?: number; max?: number } = {}): number | undefined {
  const raw = readQueryValue(query, key)
  if (raw === undefined) return undefined
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return undefined
  if (options.min !== undefined && parsed < options.min) return options.min
  if (options.max !== undefined && parsed > options.max) return options.max
  return Math.round(parsed)
}

function readEnum<T extends string>(query: Record<string, unknown>, key: string, allowed: readonly T[]): T | undefined {
  const raw = readQueryValue(query, key)
  if (!raw) return undefined
  const match = allowed.find((value) => value.toLowerCase() === raw.toLowerCase())
  return match
}

/**
 * Parses a Nuxt route query object into typed filters. Invalid values are
 * ignored rather than thrown, so shared links never crash the inventory page.
 */
export function parseVehicleFilters(
  query: Record<string, unknown> | URLSearchParams,
  defaults: Partial<VehicleFilters> = {},
): VehicleFilters {
  const source: Record<string, unknown>
    = query instanceof URLSearchParams
      ? Object.fromEntries(query.entries())
      : query

  const filters = createDefaultFilters(defaults)

  const q = readQueryValue(source, 'q')
  if (q) filters.q = q

  const make = readQueryValue(source, 'make')
  if (make) filters.make = make

  const model = readQueryValue(source, 'model')
  if (model) filters.model = model

  const condition = readEnum(source, 'condition', VEHICLE_CONDITIONS)
  if (condition) filters.condition = condition

  const minPrice = readNumber(source, 'minPrice', { min: 0 })
  if (minPrice !== undefined) filters.minPrice = minPrice

  const maxPrice = readNumber(source, 'maxPrice', { min: 0 })
  if (maxPrice !== undefined) filters.maxPrice = maxPrice

  const minYear = readNumber(source, 'minYear', { min: 1900, max: 2100 })
  if (minYear !== undefined) filters.minYear = minYear

  const maxYear = readNumber(source, 'maxYear', { min: 1900, max: 2100 })
  if (maxYear !== undefined) filters.maxYear = maxYear

  const bodyType = readEnum(source, 'bodyType', VEHICLE_BODY_TYPES)
  if (bodyType) filters.bodyType = bodyType

  const transmission = readEnum(source, 'transmission', VEHICLE_TRANSMISSIONS)
  if (transmission) filters.transmission = transmission

  const fuelType = readEnum(source, 'fuelType', VEHICLE_FUEL_TYPES)
  if (fuelType) filters.fuelType = fuelType

  const minMileage = readNumber(source, 'minMileage', { min: 0 })
  if (minMileage !== undefined) filters.minMileage = minMileage

  const maxMileage = readNumber(source, 'maxMileage', { min: 0 })
  if (maxMileage !== undefined) filters.maxMileage = maxMileage

  const exteriorColor = readQueryValue(source, 'exteriorColor')
  if (exteriorColor) filters.exteriorColor = exteriorColor

  const drivetrain = readEnum(source, 'drivetrain', VEHICLE_DRIVETRAINS)
  if (drivetrain) filters.drivetrain = drivetrain

  const sort = readEnum(source, 'sort', VEHICLE_SORT_KEYS)
  if (sort) filters.sort = sort

  const page = readNumber(source, 'page', { min: 1, max: 9999 })
  if (page !== undefined) filters.page = page

  const perPage = readNumber(source, 'perPage', { min: 1, max: 48 })
  if (perPage !== undefined) filters.perPage = perPage

  return filters
}

/**
 * Serializes only meaningful filters so default inventory URLs stay clean.
 */
export function serializeVehicleFilters(filters: VehicleFilters): Record<string, string> {
  const query: Record<string, string> = {}
  const defaults = createDefaultFilters()

  for (const key of FILTER_QUERY_KEYS) {
    const value = filters[key]
    if (value === undefined || value === null || value === '') continue

    if (key === 'page' && value === 1) continue
    if (key === 'perPage' && value === defaults.perPage) continue
    if (key === 'sort' && value === defaults.sort) continue

    query[key] = String(value)
  }

  return query
}

export function filtersToQueryString(filters: VehicleFilters): string {
  const params = new URLSearchParams(serializeVehicleFilters(filters))
  const value = params.toString()
  return value ? `?${value}` : ''
}

function matchesText(vehicle: Vehicle, query: string): boolean {
  const haystack = [
    vehicle.make,
    vehicle.model,
    vehicle.trim,
    String(vehicle.year),
    vehicle.bodyType,
    vehicle.fuelType,
    vehicle.transmission,
    vehicle.exteriorColor,
    vehicle.interiorColor,
    vehicle.stockNumber,
    vehicle.engine,
    vehicle.condition === 'new' ? 'new' : 'used pre-owned',
    vehicle.status,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

function matchesVehicle(vehicle: Vehicle, filters: VehicleFilters): boolean {
  if (filters.q && !matchesText(vehicle, filters.q)) return false
  if (filters.make && vehicle.make.toLowerCase() !== filters.make.toLowerCase()) return false
  if (filters.model && vehicle.model.toLowerCase() !== filters.model.toLowerCase()) return false
  if (filters.condition && vehicle.condition !== filters.condition) return false
  if (filters.bodyType && vehicle.bodyType !== filters.bodyType) return false
  if (filters.transmission && vehicle.transmission !== filters.transmission) return false
  if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false
  if (filters.drivetrain && vehicle.drivetrain !== filters.drivetrain) return false
  if (filters.exteriorColor && vehicle.exteriorColor?.toLowerCase() !== filters.exteriorColor.toLowerCase()) return false

  if (filters.minPrice !== undefined && vehicle.price < filters.minPrice) return false
  if (filters.maxPrice !== undefined && vehicle.price > filters.maxPrice) return false
  if (filters.minYear !== undefined && vehicle.year < filters.minYear) return false
  if (filters.maxYear !== undefined && vehicle.year > filters.maxYear) return false

  const hasMileageFilter = filters.minMileage !== undefined || filters.maxMileage !== undefined
  if (hasMileageFilter) {
    if (vehicle.mileage === undefined) return false
    if (filters.minMileage !== undefined && vehicle.mileage < filters.minMileage) return false
    if (filters.maxMileage !== undefined && vehicle.mileage > filters.maxMileage) return false
  }

  return true
}

function statusRank(vehicle: Vehicle): number {
  switch (vehicle.status) {
    case 'available':
      return 0
    case 'reserved':
      return 1
    default:
      return 2
  }
}

export function sortVehicles(vehicles: Vehicle[], sort: VehicleSortKey): Vehicle[] {
  const copy = [...vehicles]

  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'year-desc':
      return copy.sort((a, b) => b.year - a.year || a.price - b.price)
    case 'mileage-asc':
      return copy.sort((a, b) => {
        if (a.mileage === undefined && b.mileage === undefined) return 0
        if (a.mileage === undefined) return 1
        if (b.mileage === undefined) return -1
        return a.mileage - b.mileage
      })
    case 'recommended':
    default:
      return copy.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        const statusDifference = statusRank(a) - statusRank(b)
        if (statusDifference !== 0) return statusDifference
        return Date.parse(b.createdAt) - Date.parse(a.createdAt)
      })
  }
}

/**
 * Pure search implementation used by the mock repository. A future server
 * repository can apply the same filter contract against the database.
 */
export function searchVehicles(vehicles: Vehicle[], filters: VehicleFilters): VehicleSearchResult {
  const filtered = vehicles.filter((vehicle) => matchesVehicle(vehicle, filters))
  const sorted = sortVehicles(filtered, filters.sort)
  const perPage = Math.max(1, filters.perPage)
  const pageCount = Math.max(1, Math.ceil(sorted.length / perPage))
  const page = Math.min(Math.max(1, filters.page), pageCount)
  const start = (page - 1) * perPage
  const items = sorted.slice(start, start + perPage)

  return {
    items,
    total: sorted.length,
    page,
    perPage,
    pageCount,
    filters: { ...filters, page },
  }
}

type ActiveFilterKey =
  | 'q'
  | 'make'
  | 'model'
  | 'condition'
  | 'priceRange'
  | 'yearRange'
  | 'bodyType'
  | 'transmission'
  | 'fuelType'
  | 'mileageRange'
  | 'exteriorColor'
  | 'drivetrain'

export interface ActiveFilterChip {
  key: ActiveFilterKey
  label: string
  value: string
  clearKeys: Array<keyof VehicleFilters>
}

export function getActiveFilterChips(filters: VehicleFilters): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = []

  if (filters.q) chips.push({ key: 'q', label: 'Search', value: filters.q, clearKeys: ['q'] })
  if (filters.make) chips.push({ key: 'make', label: 'Make', value: filters.make, clearKeys: ['make', 'model'] })
  if (filters.model) chips.push({ key: 'model', label: 'Model', value: filters.model, clearKeys: ['model'] })
  if (filters.condition) {
    chips.push({
      key: 'condition',
      label: 'Condition',
      value: conditionLabel(filters.condition),
      clearKeys: ['condition'],
    })
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const value
      = filters.minPrice !== undefined && filters.maxPrice !== undefined
        ? `${formatNaira(filters.minPrice)} – ${formatNaira(filters.maxPrice)}`
        : filters.minPrice !== undefined
          ? `From ${formatNaira(filters.minPrice)}`
          : `Up to ${formatNaira(filters.maxPrice!)}`
    chips.push({ key: 'priceRange', label: 'Price', value, clearKeys: ['minPrice', 'maxPrice'] })
  }

  if (filters.minYear !== undefined || filters.maxYear !== undefined) {
    const value
      = filters.minYear !== undefined && filters.maxYear !== undefined
        ? `${filters.minYear} – ${filters.maxYear}`
        : filters.minYear !== undefined
          ? `From ${filters.minYear}`
          : `Up to ${filters.maxYear}`
    chips.push({ key: 'yearRange', label: 'Year', value, clearKeys: ['minYear', 'maxYear'] })
  }

  if (filters.bodyType) {
    chips.push({ key: 'bodyType', label: 'Body style', value: filters.bodyType, clearKeys: ['bodyType'] })
  }
  if (filters.transmission) {
    chips.push({ key: 'transmission', label: 'Transmission', value: filters.transmission, clearKeys: ['transmission'] })
  }
  if (filters.fuelType) {
    chips.push({ key: 'fuelType', label: 'Fuel', value: filters.fuelType, clearKeys: ['fuelType'] })
  }

  if (filters.minMileage !== undefined || filters.maxMileage !== undefined) {
    const value
      = filters.minMileage !== undefined && filters.maxMileage !== undefined
        ? `${formatMileage(filters.minMileage)} – ${formatMileage(filters.maxMileage)}`
        : filters.minMileage !== undefined
          ? `From ${formatMileage(filters.minMileage)}`
          : `Up to ${formatMileage(filters.maxMileage)}`
    chips.push({ key: 'mileageRange', label: 'Mileage', value, clearKeys: ['minMileage', 'maxMileage'] })
  }

  if (filters.exteriorColor) {
    chips.push({ key: 'exteriorColor', label: 'Colour', value: filters.exteriorColor, clearKeys: ['exteriorColor'] })
  }
  if (filters.drivetrain) {
    chips.push({ key: 'drivetrain', label: 'Drivetrain', value: filters.drivetrain, clearKeys: ['drivetrain'] })
  }

  return chips
}

export function hasActiveFilters(filters: VehicleFilters): boolean {
  return getActiveFilterChips(filters).length > 0
}

export function clearFilterKeys(filters: VehicleFilters, keys: Array<keyof VehicleFilters>): VehicleFilters {
  const next: VehicleFilters = { ...filters, page: 1 }
  for (const key of keys) {
    if (key === 'sort' || key === 'page' || key === 'perPage') continue
    Reflect.deleteProperty(next, key)
  }
  return next
}

export function uniqueSorted(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))].sort((a, b) =>
    a.localeCompare(b, 'en'),
  )
}

export function getFilterFacets(vehicles: Vehicle[]) {
  return {
    makes: uniqueSorted(vehicles.map((vehicle) => vehicle.make)),
    models: uniqueSorted(vehicles.map((vehicle) => vehicle.model)),
    bodyTypes: uniqueSorted(vehicles.map((vehicle) => vehicle.bodyType)),
    transmissions: uniqueSorted(vehicles.map((vehicle) => vehicle.transmission)),
    fuelTypes: uniqueSorted(vehicles.map((vehicle) => vehicle.fuelType)),
    drivetrains: uniqueSorted(vehicles.map((vehicle) => vehicle.drivetrain)),
    colors: uniqueSorted(vehicles.map((vehicle) => vehicle.exteriorColor)),
  }
}

export function getModelOptionsForMake(vehicles: Vehicle[], make?: string): string[] {
  const source = make ? vehicles.filter((vehicle) => vehicle.make.toLowerCase() === make.toLowerCase()) : vehicles
  return uniqueSorted(source.map((vehicle) => vehicle.model))
}

export function describeResultCount(total: number): string {
  if (total === 0) return 'No vehicles'
  if (total === 1) return '1 vehicle'
  return `${formatNumber(total)} vehicles`
}

export function describeVehicleMeta(vehicle: Vehicle): string {
  const parts = [
    String(vehicle.year),
    conditionLabel(vehicle.condition),
    vehicle.mileage !== undefined ? formatMileage(vehicle.mileage) : null,
    vehicle.status !== 'available' ? statusLabel(vehicle.status) : null,
  ]
  return parts.filter(Boolean).join(' · ')
}

export function recommendedAlternativeSort(vehicle: Vehicle): VehicleSortKey {
  return vehicle.status === 'sold' ? 'newest' : 'recommended'
}

export function summarizeVehicle(vehicle: Vehicle): string {
  return `${vehicleTitle(vehicle)} (${vehicle.stockNumber})`
}
