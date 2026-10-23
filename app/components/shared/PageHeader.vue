<script setup lang="ts">
export interface PageHeaderCrumb {
  label: string
  to?: string
}

withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    description?: string
    crumbs?: PageHeaderCrumb[]
    image?: string
    imageAlt?: string
    imageNote?: string
  }>(),
  {
    crumbs: () => [],
    imageNote: 'Illustrative photography',
  },
)
</script>

<template>
  <section class="relative overflow-hidden border-b border-white/10 bg-obsidian" aria-labelledby="page-heading">
    <div class="absolute inset-y-0 right-0 hidden w-1/2 border-l border-white/5 lg:block" aria-hidden="true" />
    <div class="shell relative py-10 sm:py-14 lg:py-16">
      <Breadcrumbs v-if="crumbs.length" :items="crumbs" tone="dark" />

      <div class="mt-8 grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
        <div :class="image ? 'lg:col-span-7' : 'lg:col-span-9'">
          <p v-if="eyebrow" class="eyebrow text-gold-light">{{ eyebrow }}</p>
          <h1
            id="page-heading"
            class="display-title mt-5 max-w-4xl text-[2.45rem] text-ivory sm:text-5xl lg:text-[3.9rem]"
          >
            {{ title }}
          </h1>
          <p v-if="description" class="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-white/55">
            {{ description }}
          </p>
          <div v-if="$slots.actions" class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <slot name="actions" />
          </div>
          <div v-if="$slots.meta" class="mt-8">
            <slot name="meta" />
          </div>
        </div>

        <div v-if="image" class="lg:col-span-5">
          <div class="relative overflow-hidden bg-charcoal">
            <NuxtImg
              :src="image"
              :alt="imageAlt ?? 'Illustrative automotive photography'"
              width="1200"
              height="900"
              loading="eager"
              sizes="sm:100vw xxl:42vw"
              class="aspect-[4/3] w-full object-cover"
            />
            <div class="absolute inset-0 bg-obsidian/10" aria-hidden="true" />
            <p class="absolute bottom-3 left-3 border border-white/20 bg-obsidian/50 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-white/70">
              {{ imageNote }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
