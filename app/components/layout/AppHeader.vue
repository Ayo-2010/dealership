<script setup lang="ts">
import dealership from '~/config/dealership'

const route = useRoute()
const mobileOpen = ref(false)

function isActive(to: string): boolean {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-ivory">
    <div class="shell flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
      <NuxtLink
        to="/"
        class="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        :aria-label="`${dealership.name} home`"
      >
        <AppLogo />
      </NuxtLink>

      <nav class="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        <NuxtLink
          v-for="item in dealership.navigation"
          :key="item.to"
          :to="item.to"
          class="relative py-2 text-[12px] font-semibold tracking-[0.035em] transition-colors"
          :class="isActive(item.to) ? 'text-ink' : 'text-muted hover:text-ink'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
          <span
            class="absolute -bottom-0.5 left-0 h-px bg-gold transition-transform duration-200"
            :class="isActive(item.to) ? 'w-full scale-x-100' : 'w-full scale-x-0'"
            aria-hidden="true"
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <a
          :href="`tel:${dealership.contact.phone.e164}`"
          class="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.02em] text-muted transition-colors hover:text-ink xl:flex"
        >
          <UIcon name="i-lucide-phone" class="size-3.5 text-gold-dark" aria-hidden="true" />
          {{ dealership.contact.phone.display }}
        </a>
        <span class="hidden h-4 w-px bg-line xl:block" aria-hidden="true" />
        <AppButton :to="dealership.enquiryCta.to" variant="dark" size="sm" class="hidden sm:inline-flex">
          {{ dealership.enquiryCta.label }}
        </AppButton>

        <button
          type="button"
          class="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink lg:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-navigation"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          @click="mobileOpen = true"
        >
          <span class="flex w-4 flex-col gap-[5px]" aria-hidden="true">
            <span class="h-px w-full bg-current" />
            <span class="h-px w-full bg-current" />
            <span class="h-px w-3/4 bg-current" />
          </span>
        </button>
      </div>
    </div>

    <MobileNavigation :open="mobileOpen" @close="closeMobile" />
  </header>
</template>
