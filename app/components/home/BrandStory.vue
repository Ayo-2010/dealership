<script setup lang="ts">
import dealership from '~/config/dealership'

const values = [
  {
    title: 'Curated, not crowded',
    description: 'A focused selection presented with the specification that matters.',
  },
  {
    title: 'Clear from the start',
    description: 'Listed prices in naira, with condition and availability shown on every vehicle.',
  },
  {
    title: 'Direct conversation',
    description: 'Speak with the team by WhatsApp or telephone, without a maze of forms.',
  },
]
</script>

<template>
  <section class="section-space bg-ivory" aria-labelledby="story-heading">
    <div class="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div class="relative lg:col-span-6">
        <div class="overflow-hidden bg-line">
          <NuxtImg
            src="/images/showroom/showroom-1.jpg"
            alt="An illustrative modern car showroom with several vehicles on display"
            width="1800"
            height="1200"
            loading="lazy"
            sizes="sm:100vw xxl:50vw"
            class="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div class="mt-3 flex items-center justify-between gap-4">
          <p class="text-[9px] uppercase tracking-[0.14em] text-muted">Illustrative showroom photography</p>
          <span class="hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />
        </div>
      </div>

      <div class="lg:col-span-6 lg:pl-4">
        <span class="eyebrow text-gold-dark">The dealership</span>
        <h2 id="story-heading" class="section-title mt-4">
          Car buying should feel considered, not complicated.
        </h2>
        <div class="prose-editorial mt-5 max-w-xl">
          <p>
            Vantage Motors is a demonstration dealership concept built around a simple idea: present a small, well-chosen collection clearly, and make it easy to speak with a real person.
          </p>
          <p>
            The showroom information on this build is placeholder content. Before launch, replace the business story, address, contact details and inventory with verified dealership information.
          </p>
        </div>

        <dl class="mt-8 grid gap-5 sm:grid-cols-3">
          <div v-for="value in values" :key="value.title" class="border-t border-line pt-4">
            <dt class="font-display text-[13px] font-medium tracking-tight text-ink">{{ value.title }}</dt>
            <dd class="mt-2 text-[11px] leading-relaxed text-muted">{{ value.description }}</dd>
          </div>
        </dl>

        <div class="mt-8 flex flex-wrap gap-3">
          <AppButton to="/about" variant="dark" size="md" trailing-icon="i-lucide-arrow-right">
            About the dealership
          </AppButton>
          <AppButton :href="`tel:${dealership.contact.phone.e164}`" variant="outline" size="md" icon="i-lucide-phone">
            {{ dealership.contact.phone.display }}
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
