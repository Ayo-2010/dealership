<script setup lang="ts">
import dealership from '~/config/dealership'

const dismissed = useCookie<boolean>('vm-announcement-dismissed', {
  default: () => false,
  maxAge: 60 * 60 * 24 * 7,
  sameSite: 'lax',
})

const visible = computed(() => dealership.announcement.enabled && !dismissed.value)
</script>

<template>
  <div v-if="visible" class="relative bg-obsidian text-ivory">
    <div class="shell flex min-h-10 items-center justify-center gap-3 py-2 pr-10 text-center">
      <span class="hidden shrink-0 border border-gold/40 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-light sm:inline-block">
        {{ dealership.announcement.label }}
      </span>
      <p class="text-[11px] leading-snug text-white/75 sm:text-xs">
        {{ dealership.announcement.text }}
        <NuxtLink
          :to="dealership.announcement.href"
          class="ml-1 inline-flex items-center gap-1 font-semibold text-gold-light underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          {{ dealership.announcement.linkLabel }}
          <UIcon name="i-lucide-arrow-right" class="size-3" aria-hidden="true" />
        </NuxtLink>
      </p>
    </div>
    <button
      type="button"
      class="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      aria-label="Dismiss announcement"
      @click="dismissed = true"
    >
      <UIcon name="i-lucide-x" class="size-4" aria-hidden="true" />
    </button>
  </div>
</template>
