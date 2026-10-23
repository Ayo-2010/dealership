<script setup lang="ts">
import type { DemoEnquiryResult } from '~/types/enquiry'

const props = withDefaults(
  defineProps<{
    result: DemoEnquiryResult
    title?: string
  }>(),
  { title: 'Message prepared' },
)

const emit = defineEmits<{
  reset: []
}>()

const toast = useToast()
const copying = ref(false)

async function copyMessage() {
  if (!import.meta.client || !navigator.clipboard?.writeText) {
    toast.add({
      title: 'Copy unavailable',
      description: 'Select the prepared message text and copy it manually.',
      icon: 'i-lucide-info',
      color: 'neutral',
    })
    return
  }

  copying.value = true
  try {
    await navigator.clipboard.writeText(props.result.preparedMessage)
    toast.add({
      title: 'Message copied',
      description: 'The prepared message is now on your clipboard.',
      icon: 'i-lucide-check',
      color: 'primary',
    })
  }
  catch {
    toast.add({
      title: 'Could not copy',
      description: 'Select the message text and copy it manually.',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    })
  }
  finally {
    copying.value = false
  }
}
</script>

<template>
  <div class="border border-gold/40 bg-white" aria-live="polite">
    <div class="flex items-start gap-3 border-b border-line bg-gold-50 p-5">
      <span class="flex size-9 shrink-0 items-center justify-center border border-gold/40 bg-white">
        <UIcon name="i-lucide-check" class="size-4 text-gold-dark" aria-hidden="true" />
      </span>
      <div>
        <p class="font-display text-lg font-medium tracking-tight text-ink">{{ title }}</p>
        <p class="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">Demo result · Nothing sent</p>
      </div>
    </div>

    <div class="p-5">
      <p class="text-[12px] leading-relaxed text-charcoal/75">{{ result.notice }}</p>

      <div class="mt-5">
        <div class="flex items-center justify-between gap-3">
          <p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Prepared message</p>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark transition-colors hover:text-ink"
            :disabled="copying"
            @click="copyMessage"
          >
            <UIcon :name="copying ? 'i-lucide-loader-circle' : 'i-lucide-copy'" class="size-3.5" :class="copying ? 'animate-spin' : ''" aria-hidden="true" />
            Copy
          </button>
        </div>
        <pre class="mt-2 max-h-72 overflow-auto whitespace-pre-wrap border border-line bg-ivory p-4 font-sans text-[12px] leading-relaxed text-charcoal/80">{{ result.preparedMessage }}</pre>
      </div>

      <div class="mt-5 grid gap-2 sm:grid-cols-2">
        <AppButton :href="result.whatsappUrl" variant="gold" size="md" block>
          <template #leading>
            <BrandWhatsAppIcon class="size-4 shrink-0" />
          </template>
          Send on WhatsApp
        </AppButton>
        <AppButton
          v-if="result.emailHref"
          :href="result.emailHref"
          variant="outline"
          size="md"
          block
          icon="i-lucide-mail"
        >
          Open email draft
        </AppButton>
      </div>

      <p class="mt-3 text-[10px] leading-relaxed text-muted">
        The WhatsApp and email buttons open your own app with the prepared text. Review it before choosing to send. The dealership has not received anything yet.
      </p>

      <button
        type="button"
        class="mt-5 border-t border-line pt-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        @click="emit('reset')"
      >
        Prepare another message
      </button>
    </div>
  </div>
</template>
