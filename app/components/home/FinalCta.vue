<script setup lang="ts">
import dealership from '~/config/dealership'
</script>

<template>
  <section class="bg-ivory pb-16 pt-6 md:pb-20" aria-labelledby="final-cta-heading">
    <div class="shell">
      <div class="relative isolate overflow-hidden bg-charcoal px-6 py-14 sm:px-10 md:py-20 lg:px-16">
        <img
          :src="dealership.logo.mark"
          alt=""
          width="320"
          height="320"
          class="pointer-events-none absolute -bottom-12 -right-8 w-64 opacity-[0.07] md:w-80"
          aria-hidden="true"
        >
        <div class="relative max-w-2xl">
          <p class="eyebrow text-gold-light">Next step</p>
          <h2 id="final-cta-heading" class="display-title mt-5 text-4xl text-ivory sm:text-5xl md:text-[3.6rem]">
            Find the car.<br>
            Then ask us anything.
          </h2>
          <p class="mt-5 max-w-lg text-sm leading-relaxed text-white/55">
            Browse the available inventory or speak directly with the team. We will confirm availability, specification and the next steps with you.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton to="/cars" variant="gold" size="lg" trailing-icon="i-lucide-arrow-right">
              Browse inventory
            </AppButton>
            <AppButton to="/contact" variant="light-outline" size="lg">
              Contact the team
            </AppButton>
          </div>

          <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] text-white/45">
            <a :href="`tel:${dealership.contact.phone.e164}`" class="flex items-center gap-2 transition-colors hover:text-white">
              <UIcon name="i-lucide-phone" class="size-3.5 text-gold" aria-hidden="true" />
              {{ dealership.contact.phone.display }}
            </a>
            <a :href="`mailto:${dealership.contact.email}`" class="flex items-center gap-2 break-all transition-colors hover:text-white">
              <UIcon name="i-lucide-mail" class="size-3.5 text-gold" aria-hidden="true" />
              {{ dealership.contact.email }}
            </a>
            <span class="flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="size-3.5 text-gold" aria-hidden="true" />
              {{ dealership.address.area }}, {{ dealership.address.city }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
