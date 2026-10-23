<script setup lang="ts">
import type { ContactEnquiry } from '~/types/enquiry'
import { isValidEmail, isValidNigerianPhone, requiredText } from '~/utils/validation'

const { submitting, result, submitError, submit, reset } = useDemoEnquiry()

const fullName = ref('')
const phone = ref('')
const email = ref('')
const subject = ref('Vehicle availability')
const message = ref('')
const errors = ref<Record<string, string>>({})

const subjects = [
  'Vehicle availability',
  'General enquiry',
  'Test-drive question',
  'Selling or trade-in',
  'Documentation question',
  'Website feedback',
]

function clearError(field: string) {
  if (!errors.value[field]) return
  errors.value = Object.fromEntries(Object.entries(errors.value).filter(([key]) => key !== field))
}

function validate(): boolean {
  const next: Record<string, string> = {}

  if (!requiredText(fullName.value)) next.fullName = 'Please enter your full name.'
  if (!isValidNigerianPhone(phone.value)) next.phone = 'Enter a Nigerian phone number, for example 0801 234 5678.'
  if (email.value.trim() && !isValidEmail(email.value)) next.email = 'Enter a valid email address, or leave this field blank.'
  if (!subject.value) next.subject = 'Please choose a subject.'
  if (!requiredText(message.value, 10)) next.message = 'Please add a short message of at least 10 characters.'

  errors.value = next
  if (Object.keys(next).length === 0) return true

  const first = Object.keys(next)[0]
  void nextTick(() => document.getElementById(`contact-${first}`)?.focus())
  return false
}

async function onSubmit() {
  if (!validate()) return

  const payload: ContactEnquiry = {
    kind: 'contact',
    fullName: fullName.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim() || undefined,
    subject: subject.value,
    message: message.value.trim(),
  }

  await submit(payload)
}

function prepareAnother() {
  reset()
  nextTick(() => document.getElementById('contact-full-name')?.focus())
}
</script>

<template>
  <div>
    <EnquiryResultPanel
      v-if="result"
      :result="result"
      title="Your enquiry message is ready"
      @reset="prepareAnother"
    />

    <form v-else class="border border-line bg-white p-5 sm:p-7" novalidate aria-labelledby="contact-form-heading" @submit.prevent="onSubmit">
      <div class="border-b border-line pb-5">
        <p class="eyebrow text-gold-dark">Send an enquiry</p>
        <h2 id="contact-form-heading" class="mt-4 font-display text-2xl font-medium tracking-tight text-ink">
          Tell us what you need.
        </h2>
        <p class="mt-2 text-[12px] leading-relaxed text-muted">
          Required fields are marked with an asterisk. This demo form prepares a message locally — it does not send or store anything.
        </p>
      </div>

      <div v-if="Object.keys(errors).length" class="mt-5 border border-red-200 bg-red-50 p-3" role="alert">
        <p class="flex items-start gap-2 text-[12px] font-medium text-red-800">
          <UIcon name="i-lucide-alert-circle" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Please check the highlighted fields below.
        </p>
      </div>

      <div class="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label for="contact-full-name" class="form-label">Full name <span class="text-gold-dark">*</span></label>
          <input
            id="contact-full-name"
            v-model="fullName"
            type="text"
            class="form-input"
            autocomplete="name"
            placeholder="Your full name"
            :aria-invalid="Boolean(errors.fullName)"
            :aria-describedby="errors.fullName ? 'contact-full-name-error' : undefined"
            @input="clearError('fullName')"
          >
          <p v-if="errors.fullName" id="contact-full-name-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.fullName }}
          </p>
        </div>

        <div>
          <label for="contact-phone" class="form-label">Phone number <span class="text-gold-dark">*</span></label>
          <input
            id="contact-phone"
            v-model="phone"
            type="tel"
            class="form-input"
            autocomplete="tel"
            inputmode="tel"
            placeholder="0801 234 5678"
            :aria-invalid="Boolean(errors.phone)"
            :aria-describedby="errors.phone ? 'contact-phone-error' : 'contact-phone-hint'"
            @input="clearError('phone')"
          >
          <p v-if="errors.phone" id="contact-phone-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.phone }}
          </p>
          <p v-else id="contact-phone-hint" class="form-hint">Nigerian mobile number. Used only for this enquiry.</p>
        </div>

        <div>
          <label for="contact-email" class="form-label">Email <span class="normal-case tracking-normal text-muted">(optional)</span></label>
          <input
            id="contact-email"
            v-model="email"
            type="email"
            class="form-input"
            autocomplete="email"
            placeholder="you@example.com"
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="errors.email ? 'contact-email-error' : undefined"
            @input="clearError('email')"
          >
          <p v-if="errors.email" id="contact-email-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label for="contact-subject" class="form-label">Subject <span class="text-gold-dark">*</span></label>
          <select
            id="contact-subject"
            v-model="subject"
            class="form-select"
            :aria-invalid="Boolean(errors.subject)"
            :aria-describedby="errors.subject ? 'contact-subject-error' : undefined"
            @change="clearError('subject')"
          >
            <option v-for="option in subjects" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="errors.subject" id="contact-subject-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.subject }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label for="contact-message" class="form-label">Message <span class="text-gold-dark">*</span></label>
          <textarea
            id="contact-message"
            v-model="message"
            class="form-textarea"
            rows="5"
            placeholder="Tell us which vehicle you are interested in, or what you would like to know."
            :aria-invalid="Boolean(errors.message)"
            :aria-describedby="errors.message ? 'contact-message-error' : 'contact-message-hint'"
            @input="clearError('message')"
          />
          <p v-if="errors.message" id="contact-message-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.message }}
          </p>
          <p v-else id="contact-message-hint" class="form-hint">Specific details help the team respond usefully.</p>
        </div>
      </div>

      <p v-if="submitError" class="form-error mt-4" role="alert">
        <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
        {{ submitError }}
      </p>

      <div class="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-xs text-[10px] leading-relaxed text-muted">
          By preparing a message you agree to the
          <NuxtLink to="/privacy-policy" class="text-ink underline decoration-gold underline-offset-2">privacy policy</NuxtLink>.
          No data leaves this page.
        </p>
        <AppButton type="submit" variant="dark" size="lg" :loading="submitting" trailing-icon="i-lucide-arrow-right">
          Prepare enquiry
        </AppButton>
      </div>
    </form>
  </div>
</template>
