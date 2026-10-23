<script setup lang="ts">
import type { TestDriveEnquiry } from '~/types/enquiry'
import type { Vehicle } from '~/types/vehicle'
import dealership from '~/config/dealership'
import { isValidNigerianPhone, isPastDate, requiredText, todayISODate } from '~/utils/validation'
import { vehicleTitle } from '~/utils/vehicle'

const props = withDefaults(
  defineProps<{
    vehicles: Vehicle[]
    initialSlug?: string
  }>(),
  { initialSlug: '' },
)

const { submitting, result, submitError, submit, reset } = useDemoEnquiry()

const fullName = ref('')
const phone = ref('')
const vehicleSlug = ref('')
const preferredDate = ref('')
const preferredTime = ref('')
const message = ref('')
const errors = ref<Record<string, string>>({})

const minDate = todayISODate()

const timeOptions = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
]

const selectableVehicles = computed(() =>
  props.vehicles
    .filter((vehicle) => vehicle.status !== 'sold')
    .sort((a, b) => vehicleTitle(a).localeCompare(vehicleTitle(b), 'en')),
)

const selectedVehicle = computed(() =>
  selectableVehicles.value.find((vehicle) => vehicle.slug === vehicleSlug.value) ?? null,
)

watch(
  () => [props.vehicles, props.initialSlug] as const,
  () => {
    if (!props.initialSlug) return
    const match = selectableVehicles.value.find((vehicle) => vehicle.slug === props.initialSlug)
    if (match) vehicleSlug.value = match.slug
  },
  { immediate: true },
)

function clearError(field: string) {
  if (!errors.value[field]) return
  errors.value = Object.fromEntries(Object.entries(errors.value).filter(([key]) => key !== field))
}

function validate(): boolean {
  const next: Record<string, string> = {}

  if (!requiredText(fullName.value)) next.fullName = 'Please enter your full name.'
  if (!isValidNigerianPhone(phone.value)) next.phone = 'Enter a Nigerian phone number, for example 0801 234 5678.'
  if (!vehicleSlug.value) next.vehicleSlug = 'Please choose a vehicle for the test drive.'
  if (!preferredDate.value) next.preferredDate = 'Please choose a preferred date.'
  else if (isPastDate(preferredDate.value)) next.preferredDate = 'Choose today or a future date.'
  if (!preferredTime.value) next.preferredTime = 'Please choose a preferred time.'

  errors.value = next
  if (Object.keys(next).length === 0) return true

  const first = Object.keys(next)[0]
  void nextTick(() => document.getElementById(`test-drive-${first}`)?.focus())
  return false
}

async function onSubmit() {
  if (!validate()) return
  const vehicle = selectedVehicle.value
  if (!vehicle) {
    errors.value = { ...errors.value, vehicleSlug: 'Please choose a vehicle for the test drive.' }
    return
  }

  const payload: TestDriveEnquiry = {
    kind: 'test-drive',
    fullName: fullName.value.trim(),
    phone: phone.value.trim(),
    vehicleSlug: vehicle.slug,
    vehicleLabel: `${vehicleTitle(vehicle)} (${vehicle.stockNumber})`,
    preferredDate: preferredDate.value,
    preferredTime: preferredTime.value,
    message: message.value.trim() || undefined,
  }

  await submit(payload)
}

function prepareAnother() {
  reset()
  nextTick(() => document.getElementById('test-drive-full-name')?.focus())
}
</script>

<template>
  <div>
    <EnquiryResultPanel
      v-if="result"
      :result="result"
      title="Your test-drive request is ready"
      @reset="prepareAnother"
    />

    <form v-else class="border border-line bg-white p-5 sm:p-7" novalidate aria-labelledby="test-drive-form-heading" @submit.prevent="onSubmit">
      <div class="border-b border-line pb-5">
        <p class="eyebrow text-gold-dark">Request a test drive</p>
        <h2 id="test-drive-form-heading" class="mt-4 font-display text-2xl font-medium tracking-tight text-ink">
          Choose a car and a preferred time.
        </h2>
        <p class="mt-2 text-[12px] leading-relaxed text-muted">
          This is a request, not a confirmed appointment. The team will contact you to confirm availability and timing.
        </p>
      </div>

      <div v-if="selectedVehicle" class="mt-5 flex items-center gap-3 border border-line bg-ivory p-3">
        <NuxtImg
          :src="selectedVehicle.images[0]"
          :alt="`${vehicleTitle(selectedVehicle)} — illustrative photograph`"
          width="160"
          height="120"
          class="size-16 shrink-0 object-cover"
        />
        <div class="min-w-0">
          <p class="text-[9px] uppercase tracking-[0.12em] text-muted">Selected vehicle</p>
          <p class="mt-1 truncate font-display text-sm font-medium text-ink">{{ vehicleTitle(selectedVehicle) }}</p>
          <p class="mt-0.5 text-[10px] text-muted">{{ selectedVehicle.stockNumber }} · {{ selectedVehicle.status === 'reserved' ? 'Reserved' : 'Available' }}</p>
        </div>
        <NuxtLink :to="`/cars/${selectedVehicle.slug}`" class="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-dark hover:text-ink">
          View
        </NuxtLink>
      </div>

      <div v-if="Object.keys(errors).length" class="mt-5 border border-red-200 bg-red-50 p-3" role="alert">
        <p class="flex items-start gap-2 text-[12px] font-medium text-red-800">
          <UIcon name="i-lucide-alert-circle" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Please check the highlighted fields below.
        </p>
      </div>

      <div class="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label for="test-drive-full-name" class="form-label">Full name <span class="text-gold-dark">*</span></label>
          <input
            id="test-drive-full-name"
            v-model="fullName"
            type="text"
            class="form-input"
            autocomplete="name"
            placeholder="Your full name"
            :aria-invalid="Boolean(errors.fullName)"
            :aria-describedby="errors.fullName ? 'test-drive-full-name-error' : undefined"
            @input="clearError('fullName')"
          >
          <p v-if="errors.fullName" id="test-drive-full-name-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.fullName }}
          </p>
        </div>

        <div>
          <label for="test-drive-phone" class="form-label">Phone number <span class="text-gold-dark">*</span></label>
          <input
            id="test-drive-phone"
            v-model="phone"
            type="tel"
            class="form-input"
            autocomplete="tel"
            inputmode="tel"
            placeholder="0801 234 5678"
            :aria-invalid="Boolean(errors.phone)"
            :aria-describedby="errors.phone ? 'test-drive-phone-error' : undefined"
            @input="clearError('phone')"
          >
          <p v-if="errors.phone" id="test-drive-phone-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.phone }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label for="test-drive-vehicleSlug" class="form-label">Vehicle <span class="text-gold-dark">*</span></label>
          <select
            id="test-drive-vehicleSlug"
            v-model="vehicleSlug"
            class="form-select"
            :aria-invalid="Boolean(errors.vehicleSlug)"
            :aria-describedby="errors.vehicleSlug ? 'test-drive-vehicleSlug-error' : undefined"
            @change="clearError('vehicleSlug')"
          >
            <option value="">Select a vehicle</option>
            <option v-for="vehicle in selectableVehicles" :key="vehicle.id" :value="vehicle.slug">
              {{ vehicleTitle(vehicle) }}{{ vehicle.status === 'reserved' ? ' — reserved' : '' }}
            </option>
          </select>
          <p v-if="errors.vehicleSlug" id="test-drive-vehicleSlug-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.vehicleSlug }}
          </p>
          <p v-else class="form-hint">Sold vehicles cannot be selected. Reserved vehicles require availability confirmation.</p>
        </div>

        <div>
          <label for="test-drive-preferredDate" class="form-label">Preferred date <span class="text-gold-dark">*</span></label>
          <input
            id="test-drive-preferredDate"
            v-model="preferredDate"
            type="date"
            class="form-input"
            :min="minDate"
            :aria-invalid="Boolean(errors.preferredDate)"
            :aria-describedby="errors.preferredDate ? 'test-drive-preferredDate-error' : undefined"
            @input="clearError('preferredDate')"
          >
          <p v-if="errors.preferredDate" id="test-drive-preferredDate-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.preferredDate }}
          </p>
        </div>

        <div>
          <label for="test-drive-preferredTime" class="form-label">Preferred time <span class="text-gold-dark">*</span></label>
          <select
            id="test-drive-preferredTime"
            v-model="preferredTime"
            class="form-select"
            :aria-invalid="Boolean(errors.preferredTime)"
            :aria-describedby="errors.preferredTime ? 'test-drive-preferredTime-error' : undefined"
            @change="clearError('preferredTime')"
          >
            <option value="">Select a time</option>
            <option v-for="option in timeOptions" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="errors.preferredTime" id="test-drive-preferredTime-error" class="form-error">
            <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
            {{ errors.preferredTime }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label for="test-drive-message" class="form-label">Notes <span class="normal-case tracking-normal text-muted">(optional)</span></label>
          <textarea
            id="test-drive-message"
            v-model="message"
            class="form-textarea"
            rows="4"
            placeholder="Anything the team should know before confirming, such as accessibility needs or a preferred location."
          />
        </div>
      </div>

      <div class="mt-5 border border-line bg-ivory p-4">
        <p class="flex items-start gap-2 text-[11px] leading-relaxed text-charcoal/70">
          <UIcon name="i-lucide-info" class="mt-0.5 size-3.5 shrink-0 text-gold-dark" aria-hidden="true" />
          {{ dealership.testDrive.confirmationNotice }}
        </p>
      </div>

      <p v-if="submitError" class="form-error mt-4" role="alert">
        <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
        {{ submitError }}
      </p>

      <div class="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-xs text-[10px] leading-relaxed text-muted">
          No appointment is booked by this form. Nothing is sent or stored automatically.
        </p>
        <AppButton type="submit" variant="dark" size="lg" :loading="submitting" trailing-icon="i-lucide-arrow-right">
          Prepare request
        </AppButton>
      </div>
    </form>
  </div>
</template>
