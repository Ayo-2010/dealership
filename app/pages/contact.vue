<script setup lang="ts">
import dealership from '~/config/dealership'

const { generalUrl, phoneHref, emailHref } = useWhatsApp()
const whatsappHref = computed(() => generalUrl())

useSeoMeta({
  title: 'Contact',
  description:
    'Contact Vantage Motors by WhatsApp, telephone or email, or prepare a local enquiry message. Placeholder contact details for the demonstration build.',
  ogTitle: 'Contact Vantage Motors',
  ogDescription: 'Reach the sales team by WhatsApp, telephone or email, or prepare an enquiry on the website.',
})

const channels = computed(() => [
  {
    label: 'WhatsApp',
    value: dealership.contact.whatsapp.display,
    href: whatsappHref.value,
    icon: 'i-lucide-message-circle',
    external: true,
    note: 'Fastest for vehicle-specific questions.',
  },
  {
    label: 'Telephone',
    value: dealership.contact.phone.display,
    href: phoneHref,
    icon: 'i-lucide-phone',
    external: false,
    note: 'Call during showroom hours.',
  },
  {
    label: 'Email',
    value: dealership.contact.email,
    href: emailHref,
    icon: 'i-lucide-mail',
    external: false,
    note: 'For longer or document-related enquiries.',
  },
])
</script>

<template>
  <div>
    <PageHeader
      title="Start a conversation."
      eyebrow="Contact"
      description="Ask about a specific vehicle, arrange a viewing or simply tell us what you are looking for. The contact details below are placeholders for this demonstration build."
      :crumbs="[{ label: 'Contact' }]"
    >
      <template #actions>
        <AppButton :href="whatsappHref" variant="gold" size="lg">
          <template #leading>
            <BrandWhatsAppIcon class="size-4 shrink-0" />
          </template>
          WhatsApp the team
        </AppButton>
        <AppButton :href="phoneHref" variant="light-outline" size="lg" icon="i-lucide-phone">
          Call the showroom
        </AppButton>
      </template>
    </PageHeader>

    <section class="section-space bg-ivory" aria-labelledby="contact-details-heading">
      <div class="shell">
        <h2 id="contact-details-heading" class="sr-only">Contact details and enquiry form</h2>

        <div class="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div class="space-y-6 lg:col-span-5">
            <div class="border border-line bg-white">
              <div class="border-b border-line p-5">
                <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Direct channels</p>
                <p class="mt-2 text-[12px] leading-relaxed text-muted">
                  These are demonstration contact details. They do not reach a real dealership.
                </p>
              </div>
              <ul class="divide-y divide-line">
                <li v-for="channel in channels" :key="channel.label">
                  <a
                    :href="channel.href"
                    :target="channel.external ? '_blank' : undefined"
                    :rel="channel.external ? 'noopener noreferrer' : undefined"
                    class="group flex items-start gap-3 p-5 transition-colors hover:bg-ivory"
                  >
                    <span class="flex size-9 shrink-0 items-center justify-center border border-line text-gold-dark transition-colors group-hover:border-gold">
                      <UIcon :name="channel.icon" class="size-4" aria-hidden="true" />
                    </span>
                    <span class="min-w-0">
                      <span class="block text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">{{ channel.label }}</span>
                      <span class="mt-1 block break-words text-[13px] font-medium text-ink">{{ channel.value }}</span>
                      <span class="mt-1 block text-[10px] text-muted">{{ channel.note }}</span>
                    </span>
                    <UIcon name="i-lucide-arrow-up-right" class="ml-auto mt-1 size-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>

            <div class="border border-line bg-white p-5">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Showroom</p>
              <address class="mt-3 not-italic">
                <p class="text-[13px] leading-relaxed text-ink">
                  {{ dealership.address.line1 }}<br>
                  {{ dealership.address.area }}, {{ dealership.address.city }}<br>
                  {{ dealership.address.state }}, {{ dealership.address.country }}
                </p>
              </address>
              <p class="mt-3 border-t border-line pt-3 text-[10px] leading-relaxed text-muted">
                Placeholder address. Confirm the showroom location before travelling.
              </p>
            </div>

            <div class="border border-line bg-white p-5">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Opening hours</p>
              <dl class="mt-3 space-y-2">
                <div v-for="entry in dealership.hours" :key="entry.days" class="flex items-baseline justify-between gap-4">
                  <dt class="text-[11px] text-charcoal/65">{{ entry.days }}</dt>
                  <dd class="text-[11px] font-medium text-ink">{{ entry.hours }}</dd>
                </div>
              </dl>
            </div>

            <DemoNotice />
          </div>

          <div class="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        <div class="mt-10">
          <div v-if="dealership.mapEmbedUrl" class="overflow-hidden border border-line bg-white">
            <iframe
              :src="dealership.mapEmbedUrl"
              title="Map showing the Vantage Motors showroom location"
              width="100%"
              height="420"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="block w-full"
            />
          </div>
          <div v-else class="border border-line bg-white p-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div class="flex items-start gap-3">
                <span class="flex size-9 shrink-0 items-center justify-center border border-line text-muted">
                  <UIcon name="i-lucide-map" class="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p class="font-display text-sm font-medium text-ink">Map not configured</p>
                  <p class="mt-1 max-w-xl text-[11px] leading-relaxed text-muted">
                    No map is shown because the showroom address is still a placeholder and no embed URL has been configured. Add a verified address and map embed in the central dealership configuration before launch.
                  </p>
                </div>
              </div>
              <NuxtLink to="/about" class="shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark underline-offset-4 hover:text-ink hover:underline">
                About the showroom
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
