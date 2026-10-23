import type { Vehicle } from '~/types/vehicle'

export function vehicleTitle(vehicle: Vehicle, options: { includeYear?: boolean } = {}): string {
  const { includeYear = true } = options
  return [includeYear ? vehicle.year : null, vehicle.make, vehicle.model, vehicle.trim]
    .filter(Boolean)
    .join(' ')
}

export function vehicleShortTitle(vehicle: Vehicle): string {
  return `${vehicle.make} ${vehicle.model}`
}

export function conditionLabel(condition: Vehicle['condition']): string {
  return condition === 'new' ? 'New' : 'Pre-owned'
}

export function statusLabel(status: Vehicle['status']): string {
  switch (status) {
    case 'reserved':
      return 'Reserved'
    case 'sold':
      return 'Sold'
    default:
      return 'Available'
  }
}

export function statusDescription(vehicle: Vehicle): string {
  if (vehicle.status === 'sold') {
    return 'This vehicle has been marked as sold. Similar available vehicles are shown below.'
  }
  if (vehicle.status === 'reserved') {
    return 'This vehicle is currently marked as reserved. Enquiries are welcome, but availability must be confirmed by the dealership.'
  }
  return 'Available for enquiry. Availability is not held until confirmed directly by the dealership.'
}
