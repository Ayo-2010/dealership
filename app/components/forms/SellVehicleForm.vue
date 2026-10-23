<script setup lang="ts">
import type { SellVehicleEnquiry } from '~/types/enquiry'
import { formatNaira, parsePriceInput } from '~/utils/currency'
import {
  isValidEmail,
  isValidNigerianPhone,
  isValidYear,
  parseOptionalInteger,
  requiredText,
} from '~/utils/validation'

type VehicleCondition = SellVehicleEnquiry['condition']

const { submitting, result, submitError, submit, reset } = useDemoEnquiry()

const fullName = ref('')
const phone = ref('')
const email = ref('')
const make = ref('')
const model = ref('')
const year = ref('')
const mileage = ref('')
const condition = ref<VehicleCondition | ''>('')
const expectedPrice = ref('')
const details = ref('')
const errors = ref<Record<string, string>>({})

const conditionOptions: Array<{ label: string; value: VehicleCondition }> = [
  { label: 'Excellent — well maintained, no known issues', value: 'excellent' },
  { label: 'Good — used regularly, minor wear', value: 'good' },
  { label: 'Fair — visible wear or repairs needed', value: 'fair' },
  { label: 'Needs work — significant repairs required', value: 'needs-work' },
]

const yearCeiling = new Date().getFullYear() + 1

function clearError(field: string) {
  if (!errors.value[field]) return
  errors.value = Object.fromEntries(Object.entries(errors.value).filter(([key]) => key !== field))
}

function validate(): boolean {
  const next: Record<string, string> = {}
  const mileageValue = parseOptionalInteger(mileage.value)
  const priceValue = parsePriceInput(expectedPrice.value)

  if (!requiredText(fullName.value)) next.fullName = 'Please enter your full name.'
  if (!isValidNigerianPhone(phone.value)) next.phone = 'Enter a Nigerian phone number, for example 0801 234 5678.'
  if (email.value.trim() && !isValidEmail(email.value)) next.email = 'Enter a valid email address, or leave this field blank.'
  if (!requiredText(make.value, 1)) next.make = 'Enter the vehicle make.'
  if (!requiredText(model.value, 1)) next.model = 'Enter the vehicle model.'
  if (!year.value || !isValidYear(year.value)) next.year = `Enter a model year between 1950 and ${yearCeiling}.`
  if (mileageValue === undefined) next.mileage = 'Enter the current mileage in kilometres.'
  if (condition.value === '') next.condition = 'Please choose the vehicle’s condition.'
  if (expectedPrice.value.trim() && priceValue === undefined) next.expectedPrice = 'Enter a valid expected price, or leave this field blank.'

  errors.value = next
  if (Object.keys(next).length === 0) return true

  const first = Object.keys(next)[0]!
  const focusId = first === 'expectedPrice' ? 'sell-expectedPrice' : `sell-${first}`
  void nextTick(() => document.getElementById(focusId)?.focus())
  return false
}

async function onSubmit() {
  if (!validate()) return

  const payload: SellVehicleEnquiry = {
    kind: 'sell-vehicle',
    fullName: fullName.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim() || undefined,
    make: make.value.trim(),
    model: model.value.trim(),
    year: Number(year.value),
    mileage: parseOptionalInteger(mileage.value) ?? 0,
    condition: condition.value as VehicleCondition,
    expectedPrice: parsePriceInput(expectedPrice.value),
    details: details.value.trim() || undefined,
  }

  await submit(payload)
}

function prepareAnother() {
  reset()
  nextTick(() => document.getElementById('sell-full-name')?.focus())
}

const pricePreview = computed(() => {
  const value = parsePriceInput(expectedPrice.value)
  return value !== undefined ? formatNaira(value) : ''
})
</script>

<template>
  <div>
    <EnquiryResultPanel
      v-if="result"
      :result="result"
      title="Your vehicle details are ready"
      @reset="prepareAnother"
    />

    <form v-else class="border border-line bg-white p-5 sm:p-7" novalidate aria-labelledby="sell-form-heading" @submit.prevent="onSubmit">
      <div class="border-b border-line pb-5">
        <p class="eyebrow text-gold-dark">Sell or trade in</p>
        <h2 id="sell-form-heading" class="mt-4 font-display text-2xl font-medium tracking-tight text-ink">
          Tell us about your car.
        </h2>
        <p class="mt-2 text-[12px] leading-relaxed text-muted">
          Share the basics and the team can review whether a purchase or trade-in arrangement is possible. This is an enquiry, not an offer.
        </p>
      </div>

      <div v-if="Object.keys(errors).length" class="mt-5 border border-red-200 bg-red-50 p-3" role="alert">
        <p class="flex items-start gap-2 text-[12px] font-medium text-red-800">
          <UIcon name="i-lucide-alert-circle" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Please check the highlighted fields below.
        </p>
      </div>

      <fieldset class="mt-6">
        <legend class="font-display text-[13px] font-semibold tracking-tight text-ink">Your details</legend>
        <div class="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label for="sell-full-name" class="form-label">Full name <span class="text-gold-dark">*</span></label>
            <input
              id="sell-full-name"
              v-model="fullName"
              type="text"
              class="form-input"
              autocomplete="name"
              placeholder="Your full name"
              :aria-invalid="Boolean(errors.fullName)"
              :aria-describedby="errors.fullName ? 'sell-full-name-error' : undefined"
              @input="clearError('fullName')"
            >
            <p v-if="errors.fullName" id="sell-full-name-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.fullName }}
            </p>
          </div>

          <div>
            <label for="sell-phone" class="form-label">Phone number <span class="text-gold-dark">*</span></label>
            <input
              id="sell-phone"
              v-model="phone"
              type="tel"
              class="form-input"
              autocomplete="tel"
              inputmode="tel"
              placeholder="0801 234 5678"
              :aria-invalid="Boolean(errors.phone)"
              :aria-describedby="errors.phone ? 'sell-phone-error' : undefined"
              @input="clearError('phone')"
            >
            <p v-if="errors.phone" id="sell-phone-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.phone }}
            </p>
          </div>

          <div class="sm:col-span-2">
            <label for="sell-email" class="form-label">Email <span class="normal-case tracking-normal text-muted">(optional)</span></label>
            <input
              id="sell-email"
              v-model="email"
              type="email"
              class="form-input"
              autocomplete="email"
              placeholder="you@example.com"
              :aria-invalid="Boolean(errors.email)"
              :aria-describedby="errors.email ? 'sell-email-error' : undefined"
              @input="clearError('email')"
            >
            <p v-if="errors.email" id="sell-email-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.email }}
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset class="mt-8 border-t border-line pt-6">
        <legend class="font-display text-[13px] font-semibold tracking-tight text-ink">Vehicle details</legend>
        <div class="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label for="sell-make" class="form-label">Make <span class="text-gold-dark">*</span></label>
            <input
              id="sell-make"
              v-model="make"
              type="text"
              class="form-input"
              autocomplete="off"
              placeholder="e.g. Toyota"
              :aria-invalid="Boolean(errors.make)"
              :aria-describedby="errors.make ? 'sell-make-error' : undefined"
              @input="clearError('make')"
            >
            <p v-if="errors.make" id="sell-make-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.make }}
            </p>
          </div>

          <div>
            <label for="sell-model" class="form-label">Model <span class="text-gold-dark">*</span></label>
            <input
              id="sell-model"
              v-model="model"
              type="text"
              class="form-input"
              autocomplete="off"
              placeholder="e.g. Camry"
              :aria-invalid="Boolean(errors.model)"
              :aria-describedby="errors.model ? 'sell-model-error' : undefined"
              @input="clearError('model')"
            >
            <p v-if="errors.model" id="sell-model-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.model }}
            </p>
          </div>

          <div>
            <label for="sell-year" class="form-label">Model year <span class="text-gold-dark">*</span></label>
            <input
              id="sell-year"
              v-model="year"
              type="number"
              inputmode="numeric"
              min="1950"
              :max="yearCeiling"
              class="form-input"
              placeholder="2019"
              :aria-invalid="Boolean(errors.year)"
              :aria-describedby="errors.year ? 'sell-year-error' : undefined"
              @input="clearError('year')"
            >
            <p v-if="errors.year" id="sell-year-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.year }}
            </p>
          </div>

          <div>
            <label for="sell-mileage" class="form-label">Mileage (km) <span class="text-gold-dark">*</span></label>
            <input
              id="sell-mileage"
              v-model="mileage"
              type="text"
              inputmode="numeric"
              class="form-input"
              placeholder="45,000"
              autocomplete="off"
              :aria-invalid="Boolean(errors.mileage)"
              :aria-describedby="errors.mileage ? 'sell-mileage-error' : 'sell-mileage-hint'"
              @input="clearError('mileage')"
            >
            <p v-if="errors.mileage" id="sell-mileage-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.mileage }}
            </p>
            <p v-else id="sell-mileage-hint" class="form-hint">Use kilometres, not miles.</p>
          </div>

          <div class="sm:col-span-2">
            <label for="sell-condition" class="form-label">Condition <span class="text-gold-dark">*</span></label>
            <select
              id="sell-condition"
              v-model="condition"
              class="form-select"
              :aria-invalid="Boolean(errors.condition)"
              :aria-describedby="errors.condition ? 'sell-condition-error' : undefined"
              @change="clearError('condition')"
            >
              <option value="">Select a condition</option>
              <option v-for="option in conditionOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
            <p v-if="errors.condition" id="sell-condition-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.condition }}
            </p>
          </div>

          <div>
            <label for="sell-expectedPrice" class="form-label">Expected price <span class="normal-case tracking-normal text-muted">(optional)</span></label>
            <input
              id="sell-expectedPrice"
              v-model="expectedPrice"
              type="text"
              inputmode="numeric"
              class="form-input"
              placeholder="15,000,000"
              autocomplete="off"
              :aria-invalid="Boolean(errors.expectedPrice)"
              :aria-describedby="errors.expectedPrice ? 'sell-expectedPrice-error' : 'sell-expectedPrice-hint'"
              @input="clearError('expectedPrice')"
            >
            <p v-if="errors.expectedPrice" id="sell-expectedPrice-error" class="form-error">
              <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
              {{ errors.expectedPrice }}
            </p>
            <p v-else id="sell-expectedPrice-hint" class="form-hint">
              {{ pricePreview ? `Preview: ${pricePreview}` : 'An indication, not a valuation.' }}
            </p>
          </div>

          <div class="sm:col-span-2">
            <label for="sell-details" class="form-label">Additional details <span class="normal-case tracking-normal text-muted">(optional)</span></label>
            <textarea
              id="sell-details"
              v-model="details"
              class="form-textarea"
              rows="4"
              placeholder="Service history, known faults, specification, or anything else the team should know."
            />
          </div>
        </div>
      </fieldset>

      <p v-if="submitError" class="form-error mt-4" role="alert">
        <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
        {{ submitError }}
      </p>

      <div class="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-sm text-[10px] leading-relaxed text-muted">
          Preparing this enquiry does not create an offer, valuation or agreement. Nothing is sent or stored automatically.
        </p>
        <AppButton type="submit" variant="dark" size="lg" :loading="submitting" trailing-icon="i-lucide-arrow-right">
          Prepare vehicle details
        </AppButton>
      </div>
    </form>
  </div>
</template>
