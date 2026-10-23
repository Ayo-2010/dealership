import type { DemoEnquiryResult, EnquiryPayload, EnquiryService } from '~/types/enquiry'
import dealership from '~/config/dealership'
import { buildWhatsAppUrl } from '~/utils/whatsapp'
import { formatNaira } from '~/utils/currency'

function buildPreparedMessage(payload: EnquiryPayload): { subject: string, body: string } {
  const intro = `Hello ${dealership.name},`

  switch (payload.kind) {
    case 'contact':
      return {
        subject: payload.subject,
        body: [
          intro,
          '',
          `Subject: ${payload.subject}`,
          `Name: ${payload.fullName}`,
          `Phone: ${payload.phone}`,
          payload.email ? `Email: ${payload.email}` : null,
          '',
          payload.message,
          '',
          'This message was prepared locally on the demonstration website and has not been sent.',
        ]
          .filter((line): line is string => line !== null)
          .join('\n'),
      }

    case 'test-drive':
      return {
        subject: `Test-drive request — ${payload.vehicleLabel}`,
        body: [
          intro,
          '',
          'I would like to request a test drive.',
          `Vehicle: ${payload.vehicleLabel}`,
          `Name: ${payload.fullName}`,
          `Phone: ${payload.phone}`,
          `Preferred date: ${payload.preferredDate}`,
          `Preferred time: ${payload.preferredTime}`,
          payload.message ? `Notes: ${payload.message}` : null,
          '',
          'I understand this is a request and not a confirmed appointment.',
          'This message was prepared locally on the demonstration website and has not been sent.',
        ]
          .filter((line): line is string => line !== null)
          .join('\n'),
      }

    case 'sell-vehicle':
      return {
        subject: `Vehicle sale / trade-in enquiry — ${payload.make} ${payload.model}`,
        body: [
          intro,
          '',
          'I would like to enquire about selling or trading in my vehicle.',
          `Name: ${payload.fullName}`,
          `Phone: ${payload.phone}`,
          payload.email ? `Email: ${payload.email}` : null,
          `Vehicle: ${payload.year} ${payload.make} ${payload.model}`,
          `Mileage: ${payload.mileage.toLocaleString('en-NG')} km`,
          `Condition: ${payload.condition}`,
          payload.expectedPrice !== undefined ? `Expected price: ${formatNaira(payload.expectedPrice)}` : null,
          payload.details ? `Additional details: ${payload.details}` : null,
          '',
          'I understand this is an enquiry only and does not represent an offer or guaranteed acceptance.',
          'This message was prepared locally on the demonstration website and has not been sent.',
        ]
          .filter((line): line is string => line !== null)
          .join('\n'),
      }
  }
}

/**
 * Phase 1 enquiry service.
 *
 * IMPORTANT: this implementation never posts to a server, stores data or sends
 * an email. It returns an explicit demo result containing a locally prepared
 * message that the visitor can review and choose to send themselves.
 */
class DemoEnquiryService implements EnquiryService {
  async submit(payload: EnquiryPayload): Promise<DemoEnquiryResult> {
    const { subject, body } = buildPreparedMessage(payload)

    return {
      status: 'demo-prepared',
      preparedMessage: body,
      whatsappUrl: buildWhatsAppUrl(body),
      emailHref: `mailto:${dealership.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      notice:
        'Demo only: this message was prepared in your browser. Nothing has been sent, stored or added to a customer database.',
    }
  }
}

export const enquiryService: EnquiryService = new DemoEnquiryService()
