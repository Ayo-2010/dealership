<script setup lang="ts">
import dealership from '~/config/dealership'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const route = useRoute()
const panelRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
let previouslyFocused: HTMLElement | null = null
let previousBodyOverflow = ''

watch(
  () => props.open,
  async (open) => {
    if (!import.meta.client) return

    if (open) {
      previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      await nextTick()
      closeButtonRef.value?.focus()
    }
    else {
      document.body.style.overflow = previousBodyOverflow
      if (previouslyFocused?.isConnected) previouslyFocused.focus()
      previouslyFocused = null
    }
  },
)

watch(
  () => route.fullPath,
  () => {
    if (props.open) emit('close')
  },
)

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = previousBodyOverflow
})

function close() {
  emit('close')
}

function getFocusable(): HTMLElement[] {
  if (!panelRef.value) return []
  return Array.from(
    panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.offsetParent !== null)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key !== 'Tab') return
  const focusable = getFocusable()
  if (focusable.length === 0) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  const active = document.activeElement

  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

const secondaryLinks = [
  { label: 'Test Drive', to: '/test-drive' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms', to: '/terms' },
]
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="open"
        class="fixed inset-0 z-50 lg:hidden"
        @keydown="onKeydown"
      >
        <button
          type="button"
          class="absolute inset-0 h-full w-full cursor-default bg-obsidian/65"
          tabindex="-1"
          aria-label="Close menu"
          @click="close"
        />

        <div
          id="mobile-navigation"
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          class="drawer-panel absolute inset-y-0 right-0 flex w-full max-w-[24rem] flex-col bg-ivory shadow-2xl"
        >
          <div class="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-5">
            <NuxtLink to="/" :aria-label="`${dealership.name} home`" @click="close">
              <AppLogo />
            </NuxtLink>
            <button
              ref="closeButtonRef"
              type="button"
              class="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
              aria-label="Close menu"
              @click="close"
            >
              <UIcon name="i-lucide-x" class="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav class="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile navigation">
            <ul class="space-y-1">
              <li v-for="(item, index) in dealership.navigation" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="group flex items-center justify-between border-b border-line/80 py-3.5 text-[15px] font-medium tracking-tight text-ink transition-colors hover:text-gold-dark"
                  :aria-current="route.path === item.to ? 'page' : undefined"
                  @click="close"
                >
                  <span class="flex items-baseline gap-3">
                    <span class="font-display text-[9px] tracking-[0.16em] text-gold-dark">{{ String(index + 1).padStart(2, '0') }}</span>
                    {{ item.label }}
                  </span>
                  <UIcon name="i-lucide-arrow-up-right" class="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </NuxtLink>
              </li>
            </ul>

            <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
              <NuxtLink
                v-for="item in secondaryLinks"
                :key="item.to"
                :to="item.to"
                class="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink"
                @click="close"
              >
                {{ item.label }}
              </NuxtLink>
            </div>

            <div class="mt-8 border border-line bg-white p-5">
              <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">Speak with the team</p>
              <a
                :href="`tel:${dealership.contact.phone.e164}`"
                class="mt-3 block font-display text-base font-medium text-ink"
              >
                {{ dealership.contact.phone.display }}
              </a>
              <a
                :href="`mailto:${dealership.contact.email}`"
                class="mt-1 block break-all text-xs text-muted hover:text-ink"
              >
                {{ dealership.contact.email }}
              </a>
              <p class="mt-3 text-[11px] leading-relaxed text-muted">
                {{ dealership.address.display }}
              </p>
              <div class="mt-5 grid gap-2">
                <WhatsAppButton label="WhatsApp the team" size="sm" block />
                <AppButton :to="dealership.enquiryCta.to" variant="outline" size="sm" block @click="close">
                  {{ dealership.enquiryCta.label }}
                </AppButton>
              </div>
            </div>

            <p class="mt-6 text-[10px] leading-relaxed text-muted">
              Demonstration website. Placeholder contact details and sample inventory.
            </p>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 220ms ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>
