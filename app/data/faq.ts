import dealership from '~/config/dealership'

export interface FaqItem {
  label: string
  content: string
  icon?: string
}

export interface FaqSection {
  title: string
  items: FaqItem[]
}

const financingEnabled = dealership.isServiceEnabled('financing')
const deliveryEnabled = dealership.isServiceEnabled('delivery')
const tradeInEnabled = dealership.isServiceEnabled('trade-in')
const warrantyEnabled = dealership.isServiceEnabled('warranty')

/**
 * Editable FAQ content. Answers avoid making claims the dealership has not
 * confirmed and point visitors to direct verification where appropriate.
 */
export const faqSections: FaqSection[] = [
  {
    title: 'Buying a vehicle',
    items: [
      {
        label: 'What is the difference between a new and a pre-owned vehicle?',
        content:
          'A new vehicle has not previously been registered for road use. A pre-owned vehicle has had one or more previous owners and will usually show mileage and a usage history. Each listing states its condition clearly. The dealership can confirm the specific history and documentation for any vehicle you are considering.',
        icon: 'i-lucide-car-front',
      },
      {
        label: 'Are the listed prices negotiable or fixed?',
        content:
          'Listed prices are shown in Nigerian naira and are subject to confirmation with the dealership. Any discussion of price should take place directly with the sales team. This website does not process payments or hold a vehicle.',
        icon: 'i-lucide-badge-naira',
      },
      {
        label: 'How do I know whether a vehicle is still available?',
        content:
          'Each listing shows an availability state: available, reserved or sold. Availability can change, and a vehicle is not held for you until the dealership confirms it directly. If a listing is reserved, ask the team whether it is still open to enquiries.',
        icon: 'i-lucide-circle-check',
      },
      {
        label: 'Can I reserve a vehicle through the website?',
        content:
          'No. This phase of the website does not take reservations or payments. A WhatsApp, telephone or in-person conversation with the dealership is required to discuss holding a vehicle.',
        icon: 'i-lucide-lock',
      },
    ],
  },
  {
    title: 'Viewings and test drives',
    items: [
      {
        label: 'How do I book a test drive?',
        content:
          'Use the test-drive request page to send your preferred vehicle, date and time. The form prepares a request for the team but does not confirm an appointment. The dealership must confirm availability and timing with you directly.',
        icon: 'i-lucide-steering-wheel',
      },
      {
        label: 'Can I view a vehicle before deciding?',
        content:
          'Yes — contact the team to arrange a viewing at the showroom or another agreed location. Confirm the vehicle’s availability and the viewing address before travelling.',
        icon: 'i-lucide-map-pin',
      },
      {
        label: 'Do I need a driver’s licence for a test drive?',
        content:
          'The dealership will explain its test-drive requirements, including any licence, age or insurance conditions, before the appointment. Requirements can vary by vehicle and insurer.',
        icon: 'i-lucide-id-card',
      },
    ],
  },
  {
    title: 'Documentation and payments',
    items: [
      {
        label: 'What documentation is provided with a vehicle?',
        content:
          dealership.isServiceEnabled('documentation')
            ? 'The dealership can assist with the vehicle paperwork and ownership documents required for your purchase. The exact documents available depend on the vehicle, its history and the applicable registration process. Ask the team to confirm the documentation for your chosen car in writing.'
            : 'Documentation arrangements should be confirmed directly with the dealership for the specific vehicle you are considering.',
        icon: 'i-lucide-file-text',
      },
      {
        label: 'Which payment methods are accepted?',
        content:
          'Payment arrangements are confirmed directly with the dealership. This website does not collect payments, card details or bank information. Never send money to an account that has not been verified through a direct conversation with the dealership.',
        icon: 'i-lucide-credit-card',
      },
      {
        label: 'Do you offer financing?',
        content: financingEnabled
          ? 'Financing options may be available through the dealership or a third party. Ask the team for current terms, eligibility requirements and the total cost of credit before committing.'
          : 'Financing is not currently offered directly by the dealership. The team can tell you whether any third-party options are available, but this website makes no financing promise.',
        icon: 'i-lucide-landmark',
      },
      {
        label: 'Is a warranty included?',
        content: warrantyEnabled
          ? 'Warranty cover depends on the individual vehicle and any applicable manufacturer terms. Ask the team to confirm exactly what is covered, for how long and by whom.'
          : 'Extended warranty cover is not currently offered by the dealership. Any remaining manufacturer warranty is specific to the vehicle and should be confirmed in writing.',
        icon: 'i-lucide-shield-check',
      },
    ],
  },
  {
    title: 'Selling, trade-ins and delivery',
    items: [
      {
        label: 'Can I sell my current car to the dealership?',
        content: tradeInEnabled
          ? 'Yes — use the Sell Your Car page to share your vehicle details. The dealership can review the information and discuss whether a purchase or trade-in arrangement is possible. Submitting an enquiry does not create an offer or guarantee acceptance.'
          : 'Trade-in enquiries are not currently available. Contact the dealership directly to discuss your options.',
        icon: 'i-lucide-repeat',
      },
      {
        label: 'Is delivery available?',
        content: deliveryEnabled
          ? 'Delivery can be discussed with the dealership. Any delivery arrangement, cost and timing should be agreed in writing and is not included in the listed price unless expressly confirmed.'
          : 'Vehicle delivery is not currently offered as a standard service. Ask the team whether any arrangement can be made for your location.',
        icon: 'i-lucide-truck',
      },
      {
        label: 'Can I inspect a vehicle’s history?',
        content:
          'Ask the dealership which records are available for the specific vehicle. This demonstration website shows illustrative data only and does not provide a vehicle-history report.',
        icon: 'i-lucide-history',
      },
    ],
  },
]

export const allFaqItems: FaqItem[] = faqSections.flatMap((section) => section.items)
