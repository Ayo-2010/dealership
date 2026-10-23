<script setup lang="ts">
import type { NuxtError } from '#app'
import dealership from '~/config/dealership'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

useHead({
  title: isNotFound.value ? 'Page not found' : 'Something went wrong',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

function goHome() {
  void clearError({ redirect: '/' })
}

function goBack() {
  if (import.meta.client && window.history.length > 1) {
    window.history.back()
    return
  }
  void clearError({ redirect: '/' })
}
</script>

<template>
  <UApp>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <AnnouncementBar />
    <AppHeader />

    <main id="main-content" class="bg-ivory">
      <section class="shell py-20 sm:py-28" aria-labelledby="error-heading">
        <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <p class="eyebrow text-gold-dark">{{ isNotFound ? '404 · Page not found' : 'Error' }}</p>
            <h1 id="error-heading" class="display-title mt-5 max-w-2xl text-[2.8rem] text-ink sm:text-6xl lg:text-[4.4rem]">
              {{ isNotFound ? 'This road ends here.' : 'Something went wrong.' }}
            </h1>
            <p class="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted">
              <template v-if="isNotFound">
                The page you were looking for may have moved, been removed, or the address may be incorrect. The collection is still where you left it.
              </template>
              <template v-else>
                The page could not be displayed. Please try again, or head back to the collection.
              </template>
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <AppButton variant="gold" size="lg" @click="goHome">
                Return home
              </AppButton>
              <AppButton to="/cars" variant="dark" size="lg" trailing-icon="i-lucide-arrow-right">
                Browse cars
              </AppButton>
              <AppButton variant="outline" size="lg" @click="goBack">Go back</AppButton>
            </div>

            <p v-if="!isNotFound && error.statusCode" class="mt-6 text-[10px] uppercase tracking-[0.14em] text-muted">
              Reference: {{ error.statusCode }}
            </p>
          </div>

          <div class="lg:col-span-5">
            <div class="border border-line bg-white p-6">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">Useful routes</p>
              <ul class="mt-4 divide-y divide-line border-y border-line">
                <li>
                  <NuxtLink to="/cars" class="group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink">
                    Full inventory
                    <UIcon name="i-lucide-arrow-up-right" class="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/new-arrivals" class="group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink">
                    New arrivals
                    <UIcon name="i-lucide-arrow-up-right" class="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/contact" class="group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink">
                    Contact the team
                    <UIcon name="i-lucide-arrow-up-right" class="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/faq" class="group flex items-center justify-between gap-4 py-3.5 text-[13px] font-medium text-ink">
                    Frequently asked questions
                    <UIcon name="i-lucide-arrow-up-right" class="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </NuxtLink>
                </li>
              </ul>
              <p class="mt-4 text-[10px] leading-relaxed text-muted">
                {{ dealership.name }} — demonstration website. Placeholder contact details and sample inventory.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </UApp>
</template>
