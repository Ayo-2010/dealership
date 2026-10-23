import type { Vehicle } from '~/types/vehicle'
import dealership from '~/config/dealership'
import { formatNaira } from '~/utils/currency'
import { vehicleTitle } from '~/utils/vehicle'

/**
 * Nigerian numbers are stored in international format for WhatsApp links.
 * Accepts +234…, 234… or local 0… formats and returns digits only.
 */
export function normalizeWhatsAppNumber(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.startsWith('234')) return digits
  if (digits.startsWith('0')) return `234${digits.slice(1)}`
  return digits
}

export function buildWhatsAppUrl(message: string, number: string = dealership.contact.whatsapp.international): string {
  const normalized = normalizeWhatsAppNumber(number)
  const text = encodeURIComponent(message)
  return `https://wa.me/${normalized}?text=${text}`
}

export function buildGeneralEnquiryMessage(): string {
  return `Hello ${dealership.name}, I would like to enquire about a vehicle in your inventory.`
}

export function vehicleListingUrl(vehicle: Vehicle, baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}/cars/${vehicle.slug}`
}

export function buildVehicleEnquiryMessage(vehicle: Vehicle, baseUrl: string): string {
  const listingUrl = vehicleListingUrl(vehicle, baseUrl)
  const identity = `${vehicleTitle(vehicle)} (${vehicle.stockNumber})`

  if (vehicle.status === 'sold') {
    return `Hello ${dealership.name}, I saw that the ${identity} is marked as sold on your website. Could you suggest similar available vehicles? Listing: ${listingUrl}`
  }

  if (vehicle.status === 'reserved') {
    return `Hello ${dealership.name}, I am interested in the ${identity}, currently marked as reserved. Could you confirm whether it is still available? Listing: ${listingUrl}`
  }

  return `Hello ${dealership.name}, I am interested in the ${identity}, listed at ${formatNaira(vehicle.price)}. Could you share more details? Listing: ${listingUrl}`
}

export function buildVehicleEnquiryUrl(vehicle: Vehicle, baseUrl: string): string {
  return buildWhatsAppUrl(buildVehicleEnquiryMessage(vehicle, baseUrl))
}

export function buildTestDriveMessage(input: {
  vehicleLabel: string
  preferredDate: string
  preferredTime: string
  fullName: string
  phone: string
  message?: string
}): string {
  return [
    `Hello ${dealership.name}, I would like to request a test drive.`,
    '',
    `Vehicle: ${input.vehicleLabel}`,
    `Name: ${input.fullName}`,
    `Phone: ${input.phone}`,
    `Preferred date: ${input.preferredDate}`,
    `Preferred time: ${input.preferredTime}`,
    input.message ? `Notes: ${input.message}` : null,
    '',
    'Please note this is a request, not a confirmed appointment.',
  ]
    .filter((line): line is string => line !== null)
    .join('\n')
}
