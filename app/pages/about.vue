<script setup lang="ts">
import dealership from '~/config/dealership'

const { vehicles } = useVehicles()

const availableCount = computed(() => vehicles.value.filter((vehicle) => vehicle.status === 'available').length)
const newCount = computed(() => vehicles.value.filter((vehicle) => vehicle.condition === 'new' && vehicle.status === 'available').length)
const usedCount = computed(() => vehicles.value.filter((vehicle) => vehicle.condition === 'used' && vehicle.status === 'available').length)

const principles = [
  {
    number: '01',
    title: 'Presentation before pressure',
    description:
      'Listings are laid out to answer the practical questions first: what the vehicle is, what condition it is in, what it costs and how to ask about it.',
  },
  {
    number: '02',
    title: 'Plain prices in naira',
    description:
      'Every vehicle shows a listed price in Nigerian naira. Any fees, documentation costs or delivery arrangements must be confirmed directly and in writing.',
  },
  {
    number: '03',
    title: 'A direct conversation',
    description:
      'WhatsApp and telephone enquiries go straight to the sales team. There is no account to create and no automated approval to wait for.',
  },
]

const included = [
  'A typed inventory with new and pre-owned vehicles',
  'Detailed specifications and selected equipment lists',
  'Transparent NGN pricing and availability states',
  'WhatsApp, telephone and prepared-message enquiries',
  'Test-drive and sell-your-car request flows',
  'Search, filters, sorting and shareable inventory URLs',
]

const excluded = [
  'No real vehicle stock — every listing is sample data',
  'No live enquiry delivery or customer database',
  'No online payments, deposits or reservations',
  'No financing, insurance or warranty promises',
  'No invented awards, team profiles or founding dates',
  'No verified customer reviews or transaction claims',
]

useSeoMeta({
  title: 'About the dealership',
  description:
    'Vantage Motors is a demonstration dealership concept built around a focused collection, transparent naira pricing and direct enquiries. Placeholder business details.',
  ogTitle: 'About Vantage Motors',
  ogDescription: 'A clearer way to look for a car — focused inventory, plain pricing and direct conversation.',
})
</script>

<template>
  <div>
    <PageHeader
      title="A clearer way to look for a car."
      eyebrow="About the dealership"
      description="Vantage Motors is a demonstration dealership concept built around a focused collection, plain pricing and direct conversation. The business details on this build are placeholders."
      :crumbs="[{ label: 'About us' }]"
      image="/images/showroom/showroom-1.jpg"
      image-alt="Illustrative modern showroom interior with cars on display"
    />

    <section class="section-space bg-ivory" aria-labelledby="about-story-heading">
      <div class="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <p class="eyebrow text-gold-dark">The idea</p>
          <h2 id="about-story-heading" class="section-title mt-4">
            Fewer listings.<br>
            Better information.
          </h2>
          <dl class="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-5">
            <div>
              <dt class="text-[9px] uppercase tracking-[0.14em] text-muted">Available</dt>
              <dd class="mt-1.5 font-display text-2xl font-medium text-ink">{{ availableCount }}</dd>
            </div>
            <div>
              <dt class="text-[9px] uppercase tracking-[0.14em] text-muted">New</dt>
              <dd class="mt-1.5 font-display text-2xl font-medium text-ink">{{ newCount }}</dd>
            </div>
            <div>
              <dt class="text-[9px] uppercase tracking-[0.14em] text-muted">Pre-owned</dt>
              <dd class="mt-1.5 font-display text-2xl font-medium text-ink">{{ usedCount }}</dd>
            </div>
          </dl>
          <p class="mt-3 text-[10px] uppercase tracking-[0.12em] text-muted">Demonstration inventory counts</p>
        </div>

        <div class="lg:col-span-7">
          <div class="prose-editorial max-w-2xl">
            <p>
              Most car listings ask you to work hard before you can make a decision: unclear availability, hidden prices, vague specifications and a contact form that disappears into the unknown.
            </p>
            <p>
              This concept takes the opposite approach. A smaller collection, presented properly. The information that matters on every card. A detail page you can read without hunting. And a direct line to the team when you are ready to ask a real question.
            </p>
            <p>
              This is a frontend demonstration build. The brand, address, telephone number, email, social handles and every vehicle are placeholders. There is no real inventory, no enquiry delivery and no payment flow. The purpose is to show how a dealership site could present its stock clearly before Phase 2 connects it to live systems.
            </p>
          </div>

          <div class="mt-8">
            <DemoNotice />
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <AppButton to="/cars" variant="dark" size="md" trailing-icon="i-lucide-arrow-right">
              Browse the collection
            </AppButton>
            <AppButton to="/contact" variant="outline" size="md">Contact the team</AppButton>
          </div>
        </div>
      </div>
    </section>

    <section class="section-space border-y border-line bg-white" aria-labelledby="principles-heading">
      <div class="shell">
        <div class="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <div>
            <p class="eyebrow text-gold-dark">How we present</p>
            <h2 id="principles-heading" class="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-[2.5rem]">
              Three principles.
            </h2>
          </div>
          <ol class="divide-y divide-line border-y border-line">
            <li v-for="principle in principles" :key="principle.number" class="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6">
              <span class="font-display text-[10px] tracking-[0.16em] text-gold-dark">{{ principle.number }}</span>
              <div>
                <h3 class="font-display text-lg font-medium tracking-tight text-ink">{{ principle.title }}</h3>
                <p class="mt-2 max-w-xl text-[12px] leading-relaxed text-muted">{{ principle.description }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section-space bg-ivory" aria-labelledby="scope-heading">
      <div class="shell">
        <div class="max-w-2xl">
          <p class="eyebrow text-gold-dark">Scope of this build</p>
          <h2 id="scope-heading" class="mt-4 font-display text-3xl font-medium tracking-tight text-ink sm:text-[2.5rem]">
            Clear about what is real.
          </h2>
          <p class="mt-4 text-[13px] leading-relaxed text-muted">
            A demonstration should not pretend to be a live business. This is exactly what the Phase 1 build includes — and what it deliberately leaves out.
          </p>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <div class="border border-line bg-white p-6">
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Included in Phase 1</p>
            <ul class="mt-4 space-y-3">
              <li v-for="item in included" :key="item" class="flex items-start gap-2.5 text-[12px] leading-relaxed text-charcoal/75">
                <UIcon name="i-lucide-check" class="mt-0.5 size-3.5 shrink-0 text-emerald-700" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="border border-line bg-white p-6">
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Not part of Phase 1</p>
            <ul class="mt-4 space-y-3">
              <li v-for="item in excluded" :key="item" class="flex items-start gap-2.5 text-[12px] leading-relaxed text-charcoal/75">
                <UIcon name="i-lucide-minus" class="mt-0.5 size-3.5 shrink-0 text-muted" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <DealershipAdvantages />

    <section class="section-space bg-ivory" aria-labelledby="visit-heading">
      <div class="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p class="eyebrow text-gold-dark">Visit the showroom</p>
          <h2 id="visit-heading" class="mt-4 font-display text-3xl font-medium tracking-tight text-ink">
            Placeholder location.
          </h2>
          <div class="mt-5 border border-line bg-white p-6">
            <address class="not-italic">
              <p class="text-[10px] uppercase tracking-[0.14em] text-muted">Address</p>
              <p class="mt-2 text-sm leading-relaxed text-ink">
                {{ dealership.address.line1 }}<br>
                {{ dealership.address.area }}, {{ dealership.address.city }}<br>
                {{ dealership.address.state }}, {{ dealership.address.country }}
              </p>
            </address>
            <p class="mt-4 border-t border-line pt-4 text-[11px] leading-relaxed text-muted">
              This address is a placeholder for the demonstration. Replace it with the verified showroom location before launch, and add a map only when the location is confirmed.
            </p>
          </div>
        </div>

        <div>
          <p class="eyebrow text-gold-dark">Opening hours</p>
          <h2 class="mt-4 font-display text-3xl font-medium tracking-tight text-ink">
            When to reach us.
          </h2>
          <dl class="mt-5 border border-line bg-white">
            <div v-for="entry in dealership.hours" :key="entry.days" class="flex items-baseline justify-between gap-4 border-b border-line px-5 py-4 last:border-b-0">
              <dt class="text-[12px] text-charcoal/70">{{ entry.days }}</dt>
              <dd class="text-[12px] font-medium text-ink">{{ entry.hours }}</dd>
            </div>
          </dl>
          <p class="mt-4 text-[11px] leading-relaxed text-muted">
            Hours are placeholder values. Enquiry response times depend on showroom hours and team availability.
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <AppButton :href="`tel:${dealership.contact.phone.e164}`" variant="dark" size="md" icon="i-lucide-phone">
              {{ dealership.contact.phone.display }}
            </AppButton>
            <WhatsAppButton label="WhatsApp the team" variant="outline" size="md" />
          </div>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>
