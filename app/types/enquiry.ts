/**
 * Enquiry contracts for the frontend-only phase.
 *
 * A future implementation will post these payloads to a server endpoint and
 * return a persisted enquiry reference. The demo implementation returns an
 * explicit `demo-prepared` result: nothing is transmitted or stored.
 */

export type EnquiryKind = 'contact' | 'test-drive' | 'sell-vehicle' | 'vehicle'

export interface ContactEnquiry {
  kind: 'contact'
  fullName: string
  phone: string
  email?: string
  subject: string
  message: string
}

export interface TestDriveEnquiry {
  kind: 'test-drive'
  fullName: string
  phone: string
  vehicleSlug: string
  vehicleLabel: string
  preferredDate: string
  preferredTime: string
  message?: string
}

export interface SellVehicleEnquiry {
  kind: 'sell-vehicle'
  fullName: string
  phone: string
  email?: string
  make: string
  model: string
  year: number
  mileage: number
  condition: 'excellent' | 'good' | 'fair' | 'needs-work'
  expectedPrice?: number
  details?: string
}

export type EnquiryPayload = ContactEnquiry | TestDriveEnquiry | SellVehicleEnquiry

export interface DemoEnquiryResult {
  status: 'demo-prepared'
  preparedMessage: string
  whatsappUrl: string
  emailHref?: string
  notice: string
}

export interface EnquiryService {
  submit(payload: EnquiryPayload): Promise<DemoEnquiryResult>
}
