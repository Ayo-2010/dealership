<script setup lang="ts">
import { demoTestimonials, testimonialDisclaimer } from '~/data/testimonials'
</script>

<template>
  <section class="section-space bg-obsidian" aria-labelledby="testimonials-heading">
    <div class="shell">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="eyebrow text-gold-light">In their words</p>
          <h2 id="testimonials-heading" class="section-title mt-4 max-w-xl text-ivory">
            A good buying experience is worth talking about.
          </h2>
        </div>
        <div class="max-w-xs border border-white/15 px-4 py-3">
          <p class="flex items-start gap-2 text-[10px] leading-relaxed text-white/55">
            <UIcon name="i-lucide-triangle-alert" class="mt-px size-3.5 shrink-0 text-gold" aria-hidden="true" />
            {{ testimonialDisclaimer }}
          </p>
        </div>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <TestimonialCard
          v-for="testimonial in demoTestimonials"
          :key="testimonial.name"
          :testimonial="testimonial"
        />
      </div>

      <div class="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-[11px] leading-relaxed text-white/40">
          Replace these examples with verified reviews, shared with customer permission, before launch.
        </p>
        <AppButton to="/contact" variant="light-outline" size="sm" trailing-icon="i-lucide-arrow-right">
          Talk to the team
        </AppButton>
      </div>
    </div>
  </section>
</template>
