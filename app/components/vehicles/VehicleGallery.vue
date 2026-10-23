<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    images: string[]
    label: string
    status?: 'available' | 'reserved' | 'sold'
  }>(),
  { status: 'available' },
)

const activeIndex = ref(0)
const lightboxOpen = ref(false)
const failedIndexes = ref<number[]>([])
const closeButtonRef = ref<HTMLButtonElement | null>(null)
let previouslyFocused: HTMLElement | null = null
let previousBodyOverflow = ''

const slides = computed(() => (props.images.length ? props.images : []))
const currentImage = computed(() => slides.value[activeIndex.value])
const total = computed(() => slides.value.length)

const statusLabel = computed(() => {
  if (props.status === 'sold') return 'Sold'
  if (props.status === 'reserved') return 'Reserved'
  return ''
})

function isFailed(index: number): boolean {
  return failedIndexes.value.includes(index)
}

function markFailed(index: number) {
  if (!failedIndexes.value.includes(index)) failedIndexes.value = [...failedIndexes.value, index]
}

function select(index: number) {
  if (index < 0 || index >= total.value) return
  activeIndex.value = index
}

function next() {
  if (total.value < 2) return
  activeIndex.value = (activeIndex.value + 1) % total.value
}

function previous() {
  if (total.value < 2) return
  activeIndex.value = (activeIndex.value - 1 + total.value) % total.value
}

async function openLightbox(index = activeIndex.value) {
  select(index)
  lightboxOpen.value = true
  if (!import.meta.client) return
  previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  closeButtonRef.value?.focus()
}

function closeLightbox() {
  lightboxOpen.value = false
  if (!import.meta.client) return
  document.body.style.overflow = previousBodyOverflow
  if (previouslyFocused?.isConnected) previouslyFocused.focus()
  previouslyFocused = null
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeLightbox()
    return
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    next()
    return
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previous()
    return
  }
  if (event.key !== 'Tab') return

  const dialog = document.getElementById('vehicle-lightbox')
  if (!dialog) return
  const focusable = Array.from(
    dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.offsetParent !== null)
  if (focusable.length === 0) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <div>
    <div class="relative overflow-hidden border border-line bg-charcoal">
      <button
        type="button"
        class="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden"
        :aria-label="`Open full-screen gallery for the ${label}, image ${activeIndex + 1} of ${total}`"
        @click="openLightbox()"
      >
        <NuxtImg
          v-if="currentImage && !isFailed(activeIndex)"
          :src="currentImage"
          :alt="`${label} — illustrative automotive photograph, image ${activeIndex + 1} of ${total}`"
          width="1400"
          height="1050"
          preload
          fetchpriority="high"
          sizes="sm:100vw xxl:58vw"
          class="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          @error="markFailed(activeIndex)"
        />
        <span
          v-else
          class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40"
          role="img"
          :aria-label="`Image unavailable for the ${label}`"
        >
          <UIcon name="i-lucide-car-front" class="size-10" aria-hidden="true" />
          <span class="text-[10px] uppercase tracking-[0.16em]">Image unavailable</span>
        </span>

        <span
          v-if="statusLabel"
          class="absolute left-4 top-4 border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
          :class="status === 'sold'
            ? 'border-obsidian bg-obsidian text-white'
            : 'border-amber-300 bg-amber-50 text-amber-900'"
        >
          {{ statusLabel }}
        </span>

        <span class="absolute bottom-4 right-4 flex items-center gap-2 border border-white/20 bg-obsidian/55 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/75">
          <UIcon name="i-lucide-expand" class="size-3" aria-hidden="true" />
          View gallery
        </span>
      </button>
    </div>

    <div v-if="total > 1" class="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
      <button
        v-for="(image, index) in slides"
        :key="`${image}-${index}`"
        type="button"
        class="relative aspect-[4/3] overflow-hidden border bg-charcoal transition-colors"
        :class="index === activeIndex ? 'border-gold' : 'border-line hover:border-ink'"
        :aria-label="`Show image ${index + 1} of ${total}`"
        :aria-current="index === activeIndex ? 'true' : undefined"
        @click="select(index)"
      >
        <NuxtImg
          v-if="!isFailed(index)"
          :src="image"
          :alt="`${label} — thumbnail ${index + 1}`"
          width="320"
          height="240"
          loading="lazy"
          class="absolute inset-0 size-full object-cover"
          @error="markFailed(index)"
        />
        <span v-else class="absolute inset-0 flex items-center justify-center bg-ivory text-muted">
          <UIcon name="i-lucide-image-off" class="size-4" aria-hidden="true" />
        </span>
      </button>
    </div>

    <p class="mt-3 text-[10px] uppercase tracking-[0.12em] text-muted">
      Illustrative photography · Not the specific vehicle pictured
    </p>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[60] flex flex-col bg-obsidian/95"
          @keydown="onKeydown"
        >
          <div
            id="vehicle-lightbox"
            role="dialog"
            aria-modal="true"
            :aria-label="`${label} image gallery`"
            class="flex h-full flex-col"
          >
            <div class="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
                {{ label }}
                <span class="ml-2 text-gold-light">{{ activeIndex + 1 }} / {{ total }}</span>
              </p>
              <button
                ref="closeButtonRef"
                type="button"
                class="flex size-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-gold hover:text-gold-light"
                aria-label="Close gallery"
                @click="closeLightbox"
              >
                <UIcon name="i-lucide-x" class="size-5" aria-hidden="true" />
              </button>
            </div>

            <div class="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
              <NuxtImg
                v-if="currentImage && !isFailed(activeIndex)"
                :src="currentImage"
                :alt="`${label} — illustrative photograph, image ${activeIndex + 1} of ${total}`"
                width="1800"
                height="1350"
                sizes="xxl:100vw"
                class="max-h-full max-w-full object-contain"
                @error="markFailed(activeIndex)"
              />
              <div v-else class="flex flex-col items-center gap-3 text-white/40">
                <UIcon name="i-lucide-image-off" class="size-10" aria-hidden="true" />
                <p class="text-xs uppercase tracking-[0.14em]">Image unavailable</p>
              </div>

              <button
                v-if="total > 1"
                type="button"
                class="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-obsidian/50 text-white transition-colors hover:border-gold hover:text-gold-light sm:left-5"
                aria-label="Previous image"
                @click="previous"
              >
                <UIcon name="i-lucide-chevron-left" class="size-5" aria-hidden="true" />
              </button>
              <button
                v-if="total > 1"
                type="button"
                class="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-obsidian/50 text-white transition-colors hover:border-gold hover:text-gold-light sm:right-5"
                aria-label="Next image"
                @click="next"
              >
                <UIcon name="i-lucide-chevron-right" class="size-5" aria-hidden="true" />
              </button>
            </div>

            <div v-if="total > 1" class="shrink-0 border-t border-white/10 px-4 py-3 sm:px-6">
              <div class="no-scrollbar flex justify-center gap-2 overflow-x-auto">
                <button
                  v-for="(image, index) in slides"
                  :key="`lightbox-${image}-${index}`"
                  type="button"
                  class="relative size-16 shrink-0 overflow-hidden border transition-colors"
                  :class="index === activeIndex ? 'border-gold' : 'border-white/15 hover:border-white/40'"
                  :aria-label="`Show image ${index + 1} of ${total}`"
                  :aria-current="index === activeIndex ? 'true' : undefined"
                  @click="select(index)"
                >
                  <NuxtImg
                    v-if="!isFailed(index)"
                    :src="image"
                    alt=""
                    width="160"
                    height="120"
                    loading="lazy"
                    class="size-full object-cover"
                  />
                  <span v-else class="flex size-full items-center justify-center bg-charcoal text-white/30">
                    <UIcon name="i-lucide-image-off" class="size-4" aria-hidden="true" />
                  </span>
                </button>
              </div>
              <p class="mt-2 text-center text-[9px] uppercase tracking-[0.14em] text-white/35">
                Use the arrow keys to browse · Escape to close
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 200ms ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
