<script setup lang="ts">
import type { Vehicle, VehicleFilters } from '~/types/vehicle'
import type { getFilterFacets } from '~/utils/vehicleFilters'

type Facets = ReturnType<typeof getFilterFacets>

const props = defineProps<{
  open: boolean
  filters: VehicleFilters
  vehicles: Vehicle[]
  facets?: Facets
}>()

const emit = defineEmits<{
  close: []
  apply: [filters: VehicleFilters]
}>()

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

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = previousBodyOverflow
})

function close() {
  emit('close')
}

function apply(next: VehicleFilters) {
  emit('apply', next)
  emit('close')
}

function getFocusable(): HTMLElement[] {
  if (!panelRef.value) return []
  return Array.from(
    panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
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
</script>

<template>
  <Teleport to="body">
    <Transition name="filter-drawer">
      <div v-if="open" class="fixed inset-0 z-50 lg:hidden" @keydown="onKeydown">
        <button
          type="button"
          class="absolute inset-0 h-full w-full cursor-default bg-obsidian/65"
          tabindex="-1"
          aria-label="Close filters"
          @click="close"
        />

        <div
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          aria-label="Filter inventory"
          class="filter-drawer-panel absolute inset-y-0 right-0 flex w-full max-w-[25rem] flex-col bg-ivory shadow-2xl"
        >
          <div class="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-5">
            <p class="font-display text-base font-medium tracking-tight text-ink">Filter inventory</p>
            <button
              ref="closeButtonRef"
              type="button"
              class="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
              aria-label="Close filters"
              @click="close"
            >
              <UIcon name="i-lucide-x" class="size-5" aria-hidden="true" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <VehicleFilters
              :filters="filters"
              :vehicles="vehicles"
              :facets="facets"
              id-prefix="mobile-filter"
              @apply="apply"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.filter-drawer-enter-active,
.filter-drawer-leave-active {
  transition: opacity 220ms ease;
}

.filter-drawer-enter-from,
.filter-drawer-leave-to {
  opacity: 0;
}

.filter-drawer-enter-active .filter-drawer-panel,
.filter-drawer-leave-active .filter-drawer-panel {
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.filter-drawer-enter-from .filter-drawer-panel,
.filter-drawer-leave-to .filter-drawer-panel {
  transform: translateX(100%);
}
</style>
