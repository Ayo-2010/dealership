<script setup lang="ts">
import dealership from '~/config/dealership'

const lastUpdated = '22 October 2026'

const sections = [
  { id: 'demo-website', label: 'Demonstration website' },
  { id: 'listings', label: 'Vehicle listings' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'availability', label: 'Availability' },
  { id: 'enquiries', label: 'Enquiries & forms' },
  { id: 'test-drives', label: 'Test drives' },
  { id: 'selling', label: 'Selling or trade-in' },
  { id: 'no-payments', label: 'No online payments' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'third-party-links', label: 'Third-party links' },
  { id: 'liability', label: 'Liability' },
  { id: 'governing-law', label: 'Governing law' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
]

useSeoMeta({
  title: 'Terms & conditions',
  description:
    'Terms for using the Vantage Motors demonstration website, including sample listings, prepared enquiries, test-drive requests and limitations.',
  ogTitle: 'Terms & conditions · Vantage Motors',
  ogDescription: 'Terms for using this demonstration website, including sample listings and prepared enquiries.',
})
</script>

<template>
  <div>
    <PageHeader
      title="Terms & conditions."
      eyebrow="Legal"
      description="The terms that apply to this demonstration website. Placeholder terms must be reviewed and replaced before a live launch."
      :crumbs="[{ label: 'Terms & conditions' }]"
    />

    <section class="section-space bg-ivory" aria-labelledby="terms-heading">
      <div class="shell">
        <h2 id="terms-heading" class="sr-only">Terms and conditions</h2>

        <div class="mb-8 border border-gold/40 bg-gold-50 p-5">
          <p class="flex items-start gap-2 text-[11px] leading-relaxed text-charcoal">
            <UIcon name="i-lucide-triangle-alert" class="mt-0.5 size-4 shrink-0 text-gold-dark" aria-hidden="true" />
            <span>
              <strong class="font-semibold">Template draft.</strong>
              These terms describe the current demonstration build. They are not legal advice and must be reviewed, completed with verified business details and adapted to the final commercial model before launch.
            </span>
          </p>
        </div>

        <div class="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside>
            <div class="lg:sticky lg:top-24">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">On this page</p>
              <nav class="mt-3 border-t border-line pt-3" aria-label="Terms sections">
                <ul class="space-y-2">
                  <li v-for="section in sections" :key="section.id">
                    <a :href="`#${section.id}`" class="text-[11px] text-muted transition-colors hover:text-ink">{{ section.label }}</a>
                  </li>
                </ul>
              </nav>
              <p class="mt-5 text-[10px] leading-relaxed text-muted">Last updated: {{ lastUpdated }}</p>
            </div>
          </aside>

          <article class="legal-prose">
            <h2 id="demo-website">1. Demonstration website</h2>
            <p>
              This website is a frontend demonstration for a car dealership concept. It is not a live commercial service. By using the site, you accept that the content is illustrative, that no vehicle is genuinely offered for sale through it, and that no transaction can be completed through it.
            </p>

            <h2 id="listings">2. Vehicle listings</h2>
            <p>
              All vehicles, prices, mileage figures, specifications, features, stock numbers and listing dates are sample data. Photography is illustrative stock imagery and does not show the specific vehicle described. Listings must not be treated as an offer, representation or warranty about any real vehicle.
            </p>

            <h2 id="pricing">3. Pricing</h2>
            <p>
              Prices are displayed in Nigerian naira (NGN) for demonstration purposes. In a live deployment, listed prices would be subject to confirmation and might exclude third-party fees, registration costs or delivery unless expressly stated in writing. Nothing on this site constitutes a binding quotation.
            </p>

            <h2 id="availability">4. Availability</h2>
            <p>
              Availability states such as “available”, “reserved” and “sold” are sample interface states. No vehicle is held or reserved through this website. In a live service, availability could change and would only be confirmed directly by the dealership.
            </p>

            <h2 id="enquiries">5. Enquiries and forms</h2>
            <p>
              The contact, test-drive and sell-your-car forms prepare a message locally in your browser. Nothing is submitted, transmitted or stored by this demonstration. You are responsible for reviewing any prepared message before choosing to send it through WhatsApp or email.
            </p>
            <p>
              Preparing a message does not create a contract, reservation, offer, valuation or customer relationship.
            </p>

            <h2 id="test-drives">6. Test drives</h2>
            <p>
              A test-drive request is not a confirmed appointment. In a live service, the dealership would need to confirm vehicle availability, timing, location and any licence, age or insurance requirements. Do not travel to a showroom on the basis of a demonstration request.
            </p>

            <h2 id="selling">7. Selling or trade-in</h2>
            <p>
              A sell-your-car enquiry is not an offer to purchase your vehicle and does not guarantee acceptance. Any valuation, inspection, price or trade-in arrangement would need to be agreed directly with the dealership and documented appropriately.
            </p>

            <h2 id="no-payments">8. No online payments</h2>
            <p>
              This website does not collect payments, card details, bank information or deposits. Never send money to an account that has not been independently verified through a direct conversation with the dealership.
            </p>

            <h2 id="intellectual-property">9. Intellectual property</h2>
            <p>
              The Vantage Motors name, logo and site design are placeholder demonstration assets. Stock photography is used under the terms of its respective source licences. You may not reuse the branding or content as if it belonged to a real business without replacing or licensing the relevant assets.
            </p>

            <h2 id="third-party-links">10. Third-party links</h2>
            <p>
              The site links to external services such as WhatsApp and social media platforms. Those services are operated by third parties under their own terms. The demonstration does not control or endorse their content or availability.
            </p>

            <h2 id="liability">11. Liability</h2>
            <p>
              To the extent permitted by applicable law, the demonstration is provided “as is” without warranties of any kind. No reliance should be placed on its sample inventory, placeholder contact details or prepared messages. A live deployment would require a properly reviewed limitation-of-liability clause.
            </p>

            <h2 id="governing-law">12. Governing law</h2>
            <p>
              For a live Nigerian dealership, these terms would ordinarily be governed by the laws of the Federal Republic of Nigeria, with a named venue for disputes. That jurisdiction and venue must be confirmed with legal advisers before launch.
            </p>

            <h2 id="changes">13. Changes to these terms</h2>
            <p>
              These terms will need to be replaced when real inventory, enquiries, accounts, payments or other services are introduced. The “last updated” date should be revised whenever the terms change.
            </p>

            <h2 id="contact">14. Contact</h2>
            <p>
              Placeholder contact for this demonstration:
            </p>
            <ul>
              <li>Email: <a :href="`mailto:${dealership.contact.email}`">{{ dealership.contact.email }}</a></li>
              <li>Telephone: <a :href="`tel:${dealership.contact.phone.e164}`">{{ dealership.contact.phone.display }}</a></li>
              <li>Address: {{ dealership.address.display }}</li>
            </ul>
            <p>
              These details are not monitored. Replace them with verified dealership contact information before launch.
            </p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
