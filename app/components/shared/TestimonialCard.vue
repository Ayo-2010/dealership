<script setup lang="ts">
import type { Testimonial } from '~/data/testimonials'

defineProps<{
  testimonial: Testimonial
}>()
</script>

<template>
  <figure class="flex h-full flex-col justify-between border border-white/10 bg-white/[0.035] p-6">
    <div>
      <div class="flex items-center justify-between gap-3">
        <UIcon name="i-lucide-quote" class="size-5 text-gold" aria-hidden="true" />
        <span class="border border-white/15 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55">
          Demo content
        </span>
      </div>
      <blockquote class="mt-5 text-[0.95rem] leading-relaxed text-white/75">
        “{{ testimonial.quote }}”
      </blockquote>
    </div>
    <figcaption class="mt-8 border-t border-white/10 pt-4">
      <p class="font-display text-sm font-medium text-ivory">{{ testimonial.name }}</p>
      <p class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{{ testimonial.context }}</p>
    </figcaption>
  </figure>
</template>
