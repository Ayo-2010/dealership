/**
 * DEMO TESTIMONIALS — NOT VERIFIED CUSTOMER REVIEWS.
 *
 * These are illustrative examples only. They must never be presented as real
 * customer statements. Replace this entire dataset with verified reviews (with
 * permission) before launch, or remove the testimonial section.
 */

export interface Testimonial {
  quote: string
  name: string
  context: string
  isDemo: true
}

export const demoTestimonials: Testimonial[] = [
  {
    quote:
      'The listing was clear about the vehicle’s specification and price, and my questions were answered without pressure. That made the shortlist much easier.',
    name: 'Adaeze O.',
    context: 'Pre-owned SUV enquiry',
    isDemo: true,
  },
  {
    quote:
      'I appreciated being able to send the exact vehicle details on WhatsApp. It kept the conversation focused on the car I was actually interested in.',
    name: 'Tunde A.',
    context: 'Luxury sedan enquiry',
    isDemo: true,
  },
  {
    quote:
      'A straightforward process: see the price, review the details, ask a question. The team was responsive and the next steps were explained clearly.',
    name: 'Ifeoma N.',
    context: 'New vehicle enquiry',
    isDemo: true,
  },
]

export const testimonialDisclaimer =
  'Illustrative demo content. These are not verified customer reviews and do not describe real transactions.'
