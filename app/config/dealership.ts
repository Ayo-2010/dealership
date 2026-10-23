/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VANTAGE MOTORS — CENTRAL DEALERSHIP CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  ⚠ PLACEHOLDER NOTICE
 *  Every business fact in this file — name, telephone number, WhatsApp number,
 *  email, address, opening hours and social handles — is a placeholder for the
 *  demonstration build. Replace these values with verified dealership details
 *  before launch and remove `demoMode`.
 *
 *  The site does not invent awards, founding dates, certifications, customer
 *  reviews or staff identities. Testimonials are explicitly labelled as demo
 *  content in `app/data/testimonials.ts`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type DealershipServiceKey =
  | 'curated-selection'
  | 'transparent-pricing'
  | 'responsive-enquiries'
  | 'documentation'
  | 'trade-in'
  | 'financing'
  | 'delivery'
  | 'warranty'
  | 'insurance'

export interface DealershipService {
  key: DealershipServiceKey
  label: string
  description: string
  enabled: boolean
}

export const dealership = {
  name: 'Vantage Motors',
  shortName: 'Vantage',
  legalName: 'Vantage Motors (placeholder business name)',
  tagline: 'Exceptional Cars. Exceptional Confidence.',
  description:
    'A curated selection of brand-new and pre-owned vehicles, presented with transparent listed prices and straightforward enquiries.',

  /** Update this before launch. `.example` domains are reserved for documentation. */
  url: 'https://vantagemotors.example',

  logo: {
    primary: '/images/branding/vantage-logo.svg',
    light: '/images/branding/vantage-logo-light.svg',
    mark: '/images/branding/vantage-mark.svg',
  },

  contact: {
    whatsapp: {
      /** International format, digits only. Used to build wa.me links. */
      international: '2348012345678',
      /** Human-readable placeholder. */
      display: '+234 801 234 5678',
    },
    phone: {
      /** E.164 format for `tel:` links. */
      e164: '+2348012345678',
      display: '+234 801 234 5678',
    },
    email: 'hello@vantagemotors.example',
  },

  address: {
    line1: '12 Example Close',
    area: 'Victoria Island',
    city: 'Lagos',
    state: 'Lagos',
    postalCode: '101241',
    country: 'Nigeria',
    /** Display-ready placeholder address. */
    get display() {
      return '12 Example Close, Victoria Island, Lagos, Nigeria'
    },
    isPlaceholder: true,
  },

  hours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '10:00 AM – 4:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
    { days: 'Public holidays', hours: 'By appointment' },
  ],

  socials: [
    {
      label: 'Instagram',
      handle: '@vantagemotors (placeholder)',
      href: 'https://www.instagram.com/',
      placeholder: true,
    },
    {
      label: 'Facebook',
      handle: 'Vantage Motors (placeholder)',
      href: 'https://www.facebook.com/',
      placeholder: true,
    },
  ],

  currency: {
    code: 'NGN' as const,
    symbol: '₦',
    locale: 'en-NG',
  },

  locale: 'en-NG',

  /** Business facts that are not yet verified. */
  facts: {
    yearFounded: null,
    team: [] as Array<{ name: string; role: string; image?: string }>,
    awards: [] as string[],
  },

  services: [
    {
      key: 'curated-selection',
      label: 'Curated vehicle selection',
      description:
        'A focused inventory of new and pre-owned vehicles, chosen for condition, specification and presentation.',
      enabled: true,
    },
    {
      key: 'transparent-pricing',
      label: 'Transparent listed prices',
      description:
        'Every listing displays its price in Nigerian naira, so you can compare vehicles without guesswork.',
      enabled: true,
    },
    {
      key: 'responsive-enquiries',
      label: 'Responsive customer enquiries',
      description:
        'Contact the sales team directly by WhatsApp or telephone. Enquiry response times depend on showroom hours and team availability.',
      enabled: true,
    },
    {
      key: 'documentation',
      label: 'Documentation assistance',
      description:
        'Guidance with the vehicle paperwork and ownership documents required for your purchase. Availability and requirements vary by vehicle.',
      enabled: true,
    },
    {
      key: 'trade-in',
      label: 'Trade-in enquiries',
      description:
        'Tell us about your current vehicle. The team can review the details and discuss whether a trade-in arrangement is possible.',
      enabled: true,
    },
    {
      key: 'financing',
      label: 'Vehicle financing',
      description:
        'Financing is not offered directly by this dealership. Ask the team about any third-party options that may be available.',
      enabled: false,
    },
    {
      key: 'delivery',
      label: 'Vehicle delivery',
      description:
        'Delivery is arranged case by case and is not included in the listed price unless confirmed in writing.',
      enabled: false,
    },
    {
      key: 'warranty',
      label: 'Extended warranty',
      description:
        'Extended warranty cover is not currently offered by the dealership. Any manufacturer warranty is vehicle-specific.',
      enabled: false,
    },
    {
      key: 'insurance',
      label: 'Insurance',
      description:
        'The dealership does not currently arrange insurance. Buyers should arrange cover with a licensed insurer.',
      enabled: false,
    },
  ] satisfies DealershipService[],

  serviceByKey(key: DealershipServiceKey): DealershipService | undefined {
    return dealership.services.find((service) => service.key === key)
  },

  isServiceEnabled(key: DealershipServiceKey): boolean {
    return dealership.services.some((service) => service.key === key && service.enabled)
  },

  theme: {
    colors: {
      obsidian: '#111315',
      charcoal: '#1B1E21',
      gold: '#B69A63',
      ivory: '#F5F5F3',
      white: '#FFFFFF',
      ink: '#17191C',
      muted: '#6B7075',
      line: '#E6E5E1',
    },
    radius: '0.25rem',
  },

  /**
   * Frontend demonstration mode. When true, forms prepare a local message and
   * never claim to submit, send or store data.
   */
  demoMode: true,
  demoNotice:
    'Demonstration website. Sample inventory, placeholder business details and demo-only form results. No enquiry is transmitted or stored.',

  defaultSort: 'recommended',
  inventoryPerPage: 9,

  /** Price threshold used for the "Luxury" category shortcut. */
  luxuryPriceThreshold: 70_000_000,

  mapEmbedUrl: '',

  testDrive: {
    enabled: true,
    confirmationNotice:
      'A test-drive request is not a confirmed appointment. The dealership will contact you to confirm availability, timing and location.',
  },

  announcement: {
    enabled: true,
    label: 'New arrivals',
    text: 'Freshly listed vehicles have joined the collection.',
    href: '/new-arrivals',
    linkLabel: 'View new arrivals',
  },

  navigation: [
    { label: 'Home', to: '/' },
    { label: 'Browse Cars', to: '/cars' },
    { label: 'New Arrivals', to: '/new-arrivals' },
    { label: 'Sell Your Car', to: '/sell-your-car' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  enquiryCta: {
    label: 'Enquire Now',
    to: '/contact',
  },

  seo: {
    titleTemplate: '%s · Vantage Motors',
    defaultTitle: 'Vantage Motors — Exceptional Cars. Exceptional Confidence.',
    defaultDescription:
      'Browse brand-new and pre-owned cars in Nigeria. Transparent naira pricing, detailed specifications and direct WhatsApp enquiries.',
    ogImage: '/images/og-vantage-motors.jpg',
  },

  /** Clear, editable policy statements used across the site. */
  policies: {
    priceNotice:
      'Listed prices are in Nigerian naira and are subject to confirmation with the dealership. They do not include third-party fees unless stated in writing.',
    availabilityNotice:
      'Availability can change. A listing marked available is not reserved until the dealership confirms it directly.',
    demoInventoryNotice:
      'All vehicles on this demonstration site are sample listings. They are not real cars currently offered for sale.',
  },
} as const

export type Dealership = typeof dealership

export default dealership
