<script setup lang="ts">
import dealership from '~/config/dealership'

const year = new Date().getFullYear()

const exploreLinks = computed(() => [
  { label: 'Browse all cars', to: '/cars' },
  { label: 'New arrivals', to: '/new-arrivals' },
  { label: 'SUVs', to: '/cars?bodyType=SUV' },
  { label: 'Sedans', to: '/cars?bodyType=Sedan' },
  { label: 'Luxury collection', to: `/cars?minPrice=${dealership.luxuryPriceThreshold}` },
  { label: 'Sell your car', to: '/sell-your-car' },
])

const companyLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Test drive', to: '/test-drive' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Privacy policy', to: '/privacy-policy' },
  { label: 'Terms & conditions', to: '/terms' },
]

const socialIcons: Record<string, string> = {
  Instagram: 'i-lucide-instagram',
  Facebook: 'i-lucide-facebook',
}
</script>

<template>
  <footer class="bg-obsidian text-ivory">
    <div class="shell py-14 md:py-20">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-4">
          <NuxtLink to="/" :aria-label="`${dealership.name} home`" class="inline-block">
            <AppLogo variant="light" />
          </NuxtLink>
          <p class="mt-6 max-w-sm font-display text-lg font-normal leading-snug tracking-tight text-ivory">
            {{ dealership.tagline }}
          </p>
          <p class="mt-4 max-w-sm text-[13px] leading-relaxed text-white/50">
            {{ dealership.description }}
          </p>
          <div class="mt-6 flex items-center gap-3">
            <a
              v-for="social in dealership.socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-9 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-gold hover:text-gold-light"
              :aria-label="`${social.label} — ${social.handle}`"
            >
              <UIcon :name="socialIcons[social.label] ?? 'i-lucide-link'" class="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div class="lg:col-span-2">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">Explore</h2>
          <ul class="mt-5 space-y-3">
            <li v-for="link in exploreLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-[13px] text-white/55 transition-colors hover:text-white">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">Dealership</h2>
          <ul class="mt-5 space-y-3">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-[13px] text-white/55 transition-colors hover:text-white">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">Visit & contact</h2>
          <address class="mt-5 not-italic">
            <p class="text-[13px] leading-relaxed text-white/55">
              {{ dealership.address.line1 }}<br>
              {{ dealership.address.area }}, {{ dealership.address.city }}<br>
              {{ dealership.address.state }}, {{ dealership.address.country }}
            </p>
          </address>
          <div class="mt-4 space-y-2">
            <a
              :href="`tel:${dealership.contact.phone.e164}`"
              class="flex items-center gap-2 text-[13px] text-white/75 transition-colors hover:text-gold-light"
            >
              <UIcon name="i-lucide-phone" class="size-3.5 text-gold" aria-hidden="true" />
              {{ dealership.contact.phone.display }}
            </a>
            <a
              :href="`mailto:${dealership.contact.email}`"
              class="flex items-center gap-2 break-all text-[13px] text-white/75 transition-colors hover:text-gold-light"
            >
              <UIcon name="i-lucide-mail" class="size-3.5 shrink-0 text-gold" aria-hidden="true" />
              {{ dealership.contact.email }}
            </a>
          </div>

          <div class="mt-5 border-t border-white/10 pt-4">
            <p class="text-[10px] uppercase tracking-[0.16em] text-white/35">Opening hours</p>
            <ul class="mt-2 space-y-1">
              <li
                v-for="entry in dealership.hours"
                :key="entry.days"
                class="flex items-baseline justify-between gap-4 text-[11px]"
              >
                <span class="text-white/45">{{ entry.days }}</span>
                <span class="text-white/70">{{ entry.hours }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-5">
            <WhatsAppButton label="WhatsApp the team" size="sm" variant="outline" class="border-white/20! text-white! hover:border-gold! hover:text-gold-light!" />
          </div>
        </div>
      </div>

      <DemoNotice tone="dark" compact class="mt-12" />

      <div class="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ dealership.name }}. Placeholder brand for demonstration.</p>
        <p class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Prices in Nigerian naira (NGN)</span>
          <span class="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true" />
          <span>Photography: Unsplash &amp; Pexels</span>
        </p>
      </div>
    </div>
  </footer>
</template>
