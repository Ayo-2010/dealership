<script setup lang="ts">
import { faqSections } from '~/data/faq'

const query = ref('')

const filteredSections = computed(() => {
  const term = query.value.trim().toLowerCase()
  if (!term) return faqSections
  return faqSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        `${item.label} ${item.content}`.toLowerCase().includes(term),
      ),
    }))
    .filter((section) => section.items.length > 0)
})

const totalResults = computed(() => filteredSections.value.reduce((sum, section) => sum + section.items.length, 0))

function clearSearch() {
  query.value = ''
}

useSeoMeta({
  title: 'Frequently asked questions',
  description:
    'Answers about buying, viewing, test drives, documentation, payment arrangements, selling a car and delivery at Vantage Motors.',
  ogTitle: 'Frequently asked questions · Vantage Motors',
  ogDescription: 'Practical answers about buying, viewing, test drives, documentation and selling a car.',
})
</script>

<template>
  <div>
    <PageHeader
      title="Questions, answered plainly."
      eyebrow="Frequently asked"
      description="Practical answers about buying, viewing, documentation and selling. If something is not covered here, ask the team directly."
      :crumbs="[{ label: 'FAQ' }]"
    />

    <section class="section-space bg-ivory" aria-labelledby="faq-heading">
      <div class="shell">
        <h2 id="faq-heading" class="sr-only">Frequently asked questions</h2>

        <div class="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          <aside>
            <div class="lg:sticky lg:top-24">
              <label for="faq-search" class="form-label">Search the FAQ</label>
              <div class="relative">
                <UIcon name="i-lucide-search" class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  id="faq-search"
                  v-model="query"
                  type="search"
                  class="form-input pl-9!"
                  placeholder="Type a question or topic"
                  autocomplete="off"
                >
              </div>
              <p class="mt-2 text-[10px] text-muted" role="status" aria-live="polite">
                {{ totalResults }} {{ totalResults === 1 ? 'answer' : 'answers' }}
              </p>

              <nav class="mt-6 hidden border-t border-line pt-4 lg:block" aria-label="FAQ sections">
                <ul class="space-y-2.5">
                  <li v-for="section in faqSections" :key="section.title">
                    <NuxtLink
                      :to="`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`"
                      class="text-[11px] text-muted transition-colors hover:text-ink"
                    >
                      {{ section.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </nav>

              <div class="mt-6 border border-line bg-white p-5">
                <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Still unsure?</p>
                <p class="mt-2 text-[11px] leading-relaxed text-muted">Ask the team about the specific vehicle or arrangement you have in mind.</p>
                <AppButton to="/contact" variant="dark" size="sm" block class="mt-4">Contact the team</AppButton>
              </div>
            </div>
          </aside>

          <div>
            <div v-if="filteredSections.length" class="space-y-10">
              <section
                v-for="section in filteredSections"
                :id="section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')"
                :key="section.title"
                :aria-labelledby="`faq-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`"
              >
                <h2
                  :id="`faq-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`"
                  class="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl"
                >
                  {{ section.title }}
                </h2>
                <div class="mt-4 divide-y divide-line border-y border-line">
                  <details
                    v-for="(item, index) in section.items"
                    :key="item.label"
                    class="group"
                    :open="index === 0 && !query"
                  >
                    <summary class="flex cursor-pointer list-none items-start justify-between gap-5 py-4 [&::-webkit-details-marker]:hidden">
                      <span class="flex items-start gap-3">
                        <UIcon
                          v-if="item.icon"
                          :name="item.icon"
                          class="mt-0.5 size-4 shrink-0 text-gold-dark"
                          aria-hidden="true"
                        />
                        <span class="text-[13px] font-medium leading-relaxed text-ink">{{ item.label }}</span>
                      </span>
                      <span class="relative mt-1 flex size-5 shrink-0 items-center justify-center border border-line text-muted">
                        <span class="absolute h-px w-2.5 bg-current" aria-hidden="true" />
                        <span class="absolute h-2.5 w-px bg-current transition-transform duration-200 group-open:scale-y-0" aria-hidden="true" />
                      </span>
                    </summary>
                    <div class="pb-5 pl-7 pr-8">
                      <p class="text-[12px] leading-relaxed text-charcoal/70">{{ item.content }}</p>
                    </div>
                  </details>
                </div>
              </section>
            </div>

            <div v-else class="border border-line bg-white px-6 py-14 text-center">
              <UIcon name="i-lucide-search-x" class="mx-auto size-6 text-gold-dark" aria-hidden="true" />
              <p class="mt-3 font-display text-lg font-medium text-ink">No answers match “{{ query }}”.</p>
              <p class="mt-2 text-[12px] text-muted">Try a broader term, or ask the team directly.</p>
              <div class="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
                <AppButton variant="outline" size="md" @click="clearSearch">Clear search</AppButton>
                <AppButton to="/contact" variant="dark" size="md">Ask the team</AppButton>
              </div>
            </div>

            <div class="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p class="max-w-lg text-[10px] leading-relaxed text-muted">
                Answers describe current Phase 1 behaviour. Anything involving payments, documents, availability or appointments must be confirmed directly with the dealership.
              </p>
              <AppButton to="/contact" variant="outline" size="md" trailing-icon="i-lucide-arrow-right">
                Contact
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
