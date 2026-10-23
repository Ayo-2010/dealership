<script setup lang="ts">
import dealership from '~/config/dealership'

const tradeInEnabled = computed(() => dealership.isServiceEnabled('trade-in'))

const steps = [
  {
    number: '01',
    title: 'Share the basics',
    description: 'Tell us the make, model, year, mileage and condition. Add any service history or known faults.',
  },
  {
    number: '02',
    title: 'The team reviews the details',
    description: 'The dealership can assess whether a purchase or trade-in arrangement is worth exploring. No offer is created automatically.',
  },
  {
    number: '03',
    title: 'A direct conversation',
    description: 'If there is a possible next step, the team contacts you to discuss an inspection, valuation and any documentation.',
  },
]

const checklist = [
  'Model year, make, model and trim',
  'Current mileage in kilometres',
  'Condition and any known faults',
  'Service history or recent repairs, if available',
  'Your expected price, if you have one in mind',
  'Any outstanding finance or documentation questions',
]

useSeoMeta({
  title: 'Sell or trade in your car',
  description:
    'Tell Vantage Motors about your current vehicle. Prepare a sale or trade-in enquiry with its make, model, year, mileage and condition. An enquiry is not an offer.',
  ogTitle: 'Sell or trade in your car · Vantage Motors',
  ogDescription: 'Share your vehicle details and prepare a sale or trade-in enquiry. No offer is created automatically.',
})
</script>

<template>
  <div>
    <PageHeader
      title="Sell or trade in your car."
      eyebrow="Your current vehicle"
      description="Share the details of your car and prepare an enquiry for the team. This is a conversation starter, not an instant valuation or a guaranteed offer."
      :crumbs="[{ label: 'Sell your car' }]"
      image="/images/showroom/showroom-1.jpg"
      image-alt="Illustrative showroom with cars on display"
    >
      <template #actions>
        <WhatsAppButton label="Ask about selling" variant="gold" size="lg" />
        <AppButton to="/cars" variant="light-outline" size="lg">Browse inventory</AppButton>
      </template>
    </PageHeader>

    <section class="section-space bg-ivory" aria-labelledby="sell-heading">
      <div class="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-5">
          <p class="eyebrow text-gold-dark">How it works</p>
          <h2 id="sell-heading" class="section-title mt-4">
            A straightforward first step.
          </h2>
          <p class="mt-4 max-w-lg text-[13px] leading-relaxed text-muted">
            A website form cannot value a car properly. What it can do is give the team enough information to decide whether a conversation is worthwhile.
          </p>

          <ol class="mt-8 border-y border-line">
            <li v-for="step in steps" :key="step.number" class="flex gap-4 border-b border-line py-5 last:border-b-0">
              <span class="font-display text-[10px] tracking-[0.16em] text-gold-dark">{{ step.number }}</span>
              <div>
                <h3 class="font-display text-sm font-medium tracking-tight text-ink">{{ step.title }}</h3>
                <p class="mt-1.5 text-[11px] leading-relaxed text-muted">{{ step.description }}</p>
              </div>
            </li>
          </ol>

          <div class="mt-6 border border-line bg-white p-5">
            <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Useful details</p>
            <ul class="mt-3 space-y-2">
              <li v-for="item in checklist" :key="item" class="flex items-start gap-2 text-[11px] leading-relaxed text-charcoal/70">
                <UIcon name="i-lucide-check" class="mt-0.5 size-3.5 shrink-0 text-gold-dark" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>
          </div>

          <p class="mt-5 border-l-2 border-gold pl-3 text-[11px] leading-relaxed text-muted">
            No offer, valuation or acceptance is created by preparing or sending this enquiry. Any arrangement must be discussed and confirmed directly with the dealership.
          </p>
        </div>

        <div class="lg:col-span-7">
          <SellVehicleForm v-if="tradeInEnabled" />
          <div v-else class="border border-line bg-white p-6">
            <p class="font-display text-lg font-medium text-ink">Trade-in enquiries are currently unavailable.</p>
            <p class="mt-2 text-[12px] leading-relaxed text-muted">Contact the team directly to discuss selling your vehicle.</p>
            <AppButton to="/contact" variant="dark" size="md" class="mt-4">Contact the team</AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
