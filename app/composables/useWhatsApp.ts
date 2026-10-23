import type { Vehicle } from '~/types/vehicle'
import dealership from '~/config/dealership'
import {
  buildGeneralEnquiryMessage,
  buildVehicleEnquiryMessage,
  buildVehicleEnquiryUrl,
  buildWhatsAppUrl,
  normalizeWhatsAppNumber,
} from '~/utils/whatsapp'

export function useWhatsApp() {
  const requestUrl = useRequestURL()
  const config = useRuntimeConfig()
  const origin = computed(() => requestUrl.origin || String(config.public.siteUrl))

  const phoneHref = `tel:${dealership.contact.phone.e164}`
  const emailHref = `mailto:${dealership.contact.email}`
  const whatsappNumber = normalizeWhatsAppNumber(dealership.contact.whatsapp.international)

  function generalMessage(): string {
    return buildGeneralEnquiryMessage()
  }

  function generalUrl(message?: string): string {
    return buildWhatsAppUrl(message ?? generalMessage(), whatsappNumber)
  }

  function vehicleMessage(vehicle: Vehicle): string {
    return buildVehicleEnquiryMessage(vehicle, origin.value)
  }

  function vehicleUrl(vehicle: Vehicle): string {
    return buildVehicleEnquiryUrl(vehicle, origin.value)
  }

  return {
    config: dealership,
    origin,
    phoneHref,
    emailHref,
    whatsappNumber,
    whatsappDisplay: dealership.contact.whatsapp.display,
    phoneDisplay: dealership.contact.phone.display,
    email: dealership.contact.email,
    generalMessage,
    generalUrl,
    vehicleMessage,
    vehicleUrl,
  }
}
