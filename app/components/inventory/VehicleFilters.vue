<script setup lang="ts">
import type {
  Vehicle,
  VehicleBodyType,
  VehicleCondition,
  VehicleDrivetrain,
  VehicleFilters,
  VehicleFuelType,
  VehicleTransmission,
} from '~/types/vehicle'
import {
  VEHICLE_BODY_TYPES,
  VEHICLE_DRIVETRAINS,
  VEHICLE_FUEL_TYPES,
  VEHICLE_TRANSMISSIONS,
} from '~/types/vehicle'
import {
  createDefaultFilters,
  getFilterFacets,
  getModelOptionsForMake,
  searchVehicles,
} from '~/utils/vehicleFilters'
import { parsePriceInput } from '~/utils/currency'
import { parseOptionalInteger } from '~/utils/validation'

type Facets = ReturnType<typeof getFilterFacets>

const props = withDefaults(
  defineProps<{
    filters: VehicleFilters
    vehicles: Vehicle[]
    facets?: Facets
    idPrefix?: string
  }>(),
  { idPrefix: 'filter' },
)

const emit = defineEmits<{
  apply: [filters: VehicleFilters]
}>()

const q = ref(props.filters.q ?? '')
const make = ref(props.filters.make ?? '')
const model = ref(props.filters.model ?? '')
const condition = ref<VehicleCondition | ''>(props.filters.condition ?? '')
const minPrice = ref(props.filters.minPrice !== undefined ? String(props.filters.minPrice) : '')
const maxPrice = ref(props.filters.maxPrice !== undefined ? String(props.filters.maxPrice) : '')
const minYear = ref(props.filters.minYear !== undefined ? String(props.filters.minYear) : '')
const maxYear = ref(props.filters.maxYear !== undefined ? String(props.filters.maxYear) : '')
const bodyType = ref<VehicleBodyType | ''>(props.filters.bodyType ?? '')
const transmission = ref<VehicleTransmission | ''>(props.filters.transmission ?? '')
const fuelType = ref<VehicleFuelType | ''>(props.filters.fuelType ?? '')
const minMileage = ref(props.filters.minMileage !== undefined ? String(props.filters.minMileage) : '')
const maxMileage = ref(props.filters.maxMileage !== undefined ? String(props.filters.maxMileage) : '')
const exteriorColor = ref(props.filters.exteriorColor ?? '')
const drivetrain = ref<VehicleDrivetrain | ''>(props.filters.drivetrain ?? '')

const validationErrors = ref<string[]>([])

const conditionOptions: Array<{ label: string, value: VehicleCondition | '' }> = [
  { label: 'Any', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Pre-owned', value: 'used' },
]

function setCondition(value: VehicleCondition | '') {
  condition.value = value
}

const facets = computed<Facets>(() => props.facets ?? getFilterFacets(props.vehicles))
const modelOptions = computed(() => getModelOptionsForMake(props.vehicles, make.value || undefined))
const yearCeiling = new Date().getFullYear() + 1

function syncFromProps(next: VehicleFilters) {
  q.value = next.q ?? ''
  make.value = next.make ?? ''
  model.value = next.model ?? ''
  condition.value = next.condition ?? ''
  minPrice.value = next.minPrice !== undefined ? String(next.minPrice) : ''
  maxPrice.value = next.maxPrice !== undefined ? String(next.maxPrice) : ''
  minYear.value = next.minYear !== undefined ? String(next.minYear) : ''
  maxYear.value = next.maxYear !== undefined ? String(next.maxYear) : ''
  bodyType.value = next.bodyType ?? ''
  transmission.value = next.transmission ?? ''
  fuelType.value = next.fuelType ?? ''
  minMileage.value = next.minMileage !== undefined ? String(next.minMileage) : ''
  maxMileage.value = next.maxMileage !== undefined ? String(next.maxMileage) : ''
  exteriorColor.value = next.exteriorColor ?? ''
  drivetrain.value = next.drivetrain ?? ''
  validationErrors.value = []
}

watch(
  () => props.filters,
  (next) => syncFromProps(next),
  { deep: true },
)

watch(make, () => {
  if (model.value && !modelOptions.value.includes(model.value)) model.value = ''
})

const minPriceValue = computed(() => parsePriceInput(minPrice.value))
const maxPriceValue = computed(() => parsePriceInput(maxPrice.value))
const minYearValue = computed(() => parseOptionalInteger(minYear.value))
const maxYearValue = computed(() => parseOptionalInteger(maxYear.value))
const minMileageValue = computed(() => parseOptionalInteger(minMileage.value))
const maxMileageValue = computed(() => parseOptionalInteger(maxMileage.value))

function buildDraftFilters(): VehicleFilters {
  const next = createDefaultFilters({
    sort: props.filters.sort,
    perPage: props.filters.perPage,
  })

  if (q.value.trim()) next.q = q.value.trim()
  if (make.value) next.make = make.value
  if (model.value) next.model = model.value
  if (condition.value) next.condition = condition.value
  if (minPriceValue.value !== undefined) next.minPrice = minPriceValue.value
  if (maxPriceValue.value !== undefined) next.maxPrice = maxPriceValue.value
  if (minYearValue.value !== undefined) next.minYear = minYearValue.value
  if (maxYearValue.value !== undefined) next.maxYear = maxYearValue.value
  if (bodyType.value) next.bodyType = bodyType.value
  if (transmission.value) next.transmission = transmission.value
  if (fuelType.value) next.fuelType = fuelType.value
  if (minMileageValue.value !== undefined) next.minMileage = minMileageValue.value
  if (maxMileageValue.value !== undefined) next.maxMileage = maxMileageValue.value
  if (exteriorColor.value) next.exteriorColor = exteriorColor.value
  if (drivetrain.value) next.drivetrain = drivetrain.value

  return next
}

const draftFilters = computed(() => buildDraftFilters())
const previewCount = computed(() => searchVehicles(props.vehicles, draftFilters.value).total)
const previewLabel = computed(() => {
  if (previewCount.value === 1) return '1 matching vehicle'
  return `${previewCount.value.toLocaleString('en-NG')} matching vehicles`
})

function validate(): string[] {
  const messages: string[] = []

  if (minPriceValue.value !== undefined && maxPriceValue.value !== undefined && minPriceValue.value > maxPriceValue.value) {
    messages.push('Minimum price cannot be greater than maximum price.')
  }
  if (minYearValue.value !== undefined && maxYearValue.value !== undefined && minYearValue.value > maxYearValue.value) {
    messages.push('Minimum year cannot be later than maximum year.')
  }
  if (minMileageValue.value !== undefined && maxMileageValue.value !== undefined && minMileageValue.value > maxMileageValue.value) {
    messages.push('Minimum mileage cannot be greater than maximum mileage.')
  }

  return messages
}

function apply() {
  validationErrors.value = validate()
  if (validationErrors.value.length) return
  emit('apply', buildDraftFilters())
}

function reset() {
  emit(
    'apply',
    createDefaultFilters({
      sort: props.filters.sort,
      perPage: props.filters.perPage,
    }),
  )
}
</script>

<template>
  <form
    class="border border-line bg-white"
    novalidate
    :aria-labelledby="`${idPrefix}-heading`"
    @submit.prevent="apply"
  >
    <div class="flex items-start justify-between gap-4 border-b border-line p-5">
      <div>
        <h2 :id="`${idPrefix}-heading`" class="font-display text-lg font-medium tracking-tight text-ink">
          Filter inventory
        </h2>
        <p class="mt-1 text-[11px] leading-relaxed text-muted" role="status" aria-live="polite">
          {{ previewLabel }}
        </p>
      </div>
      <button
        type="button"
        class="shrink-0 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <div class="px-5 pb-5">
      <div class="filter-section">
        <label :for="`${idPrefix}-q`" class="form-label">Keyword search</label>
        <input
          :id="`${idPrefix}-q`"
          v-model="q"
          type="search"
          class="form-input"
          placeholder="Make, model, colour…"
          autocomplete="off"
          enterkeyhint="search"
        >
      </div>

      <details class="filter-section" open>
        <summary class="filter-summary">Condition</summary>
        <div class="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Vehicle condition">
          <button
            v-for="option in conditionOptions"
            :key="option.value"
            type="button"
            class="border px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors"
            :class="condition === option.value
              ? 'border-obsidian bg-obsidian text-white'
              : 'border-line bg-white text-muted hover:border-ink hover:text-ink'"
            :aria-pressed="condition === option.value"
            @click="setCondition(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </details>

      <details class="filter-section" open>
        <summary class="filter-summary">Make &amp; model</summary>
        <div class="mt-4 space-y-3">
          <div>
            <label :for="`${idPrefix}-make`" class="form-label">Make</label>
            <select :id="`${idPrefix}-make`" v-model="make" class="form-select">
              <option value="">All makes</option>
              <option v-for="option in facets.makes" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div>
            <label :for="`${idPrefix}-model`" class="form-label">Model</label>
            <select :id="`${idPrefix}-model`" v-model="model" class="form-select">
              <option value="">All models</option>
              <option v-for="option in modelOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>
      </details>

      <details class="filter-section" open>
        <summary class="filter-summary">Price (NGN)</summary>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label :for="`${idPrefix}-min-price`" class="form-label">Minimum</label>
            <input
              :id="`${idPrefix}-min-price`"
              v-model="minPrice"
              type="text"
              inputmode="numeric"
              class="form-input"
              placeholder="0"
              autocomplete="off"
              :aria-invalid="validationErrors.length > 0"
              :aria-describedby="validationErrors.length ? `${idPrefix}-validation-errors` : undefined"
            >
          </div>
          <div>
            <label :for="`${idPrefix}-max-price`" class="form-label">Maximum</label>
            <input
              :id="`${idPrefix}-max-price`"
              v-model="maxPrice"
              type="text"
              inputmode="numeric"
              class="form-input"
              placeholder="Any"
              autocomplete="off"
              :aria-invalid="validationErrors.length > 0"
              :aria-describedby="validationErrors.length ? `${idPrefix}-validation-errors` : undefined"
            >
          </div>
        </div>
      </details>

      <details class="filter-section" open>
        <summary class="filter-summary">Year</summary>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label :for="`${idPrefix}-min-year`" class="form-label">From</label>
            <input
              :id="`${idPrefix}-min-year`"
              v-model="minYear"
              type="number"
              inputmode="numeric"
              min="1950"
              :max="yearCeiling"
              class="form-input"
              placeholder="1950"
              :aria-invalid="validationErrors.length > 0"
              :aria-describedby="validationErrors.length ? `${idPrefix}-validation-errors` : undefined"
            >
          </div>
          <div>
            <label :for="`${idPrefix}-max-year`" class="form-label">To</label>
            <input
              :id="`${idPrefix}-max-year`"
              v-model="maxYear"
              type="number"
              inputmode="numeric"
              min="1950"
              :max="yearCeiling"
              class="form-input"
              :placeholder="String(yearCeiling)"
              :aria-invalid="validationErrors.length > 0"
              :aria-describedby="validationErrors.length ? `${idPrefix}-validation-errors` : undefined"
            >
          </div>
        </div>
      </details>

      <details class="filter-section">
        <summary class="filter-summary">Body style</summary>
        <div class="mt-4">
          <label :for="`${idPrefix}-body`" class="form-label">Body style</label>
          <select :id="`${idPrefix}-body`" v-model="bodyType" class="form-select">
            <option value="">All body styles</option>
            <option v-for="option in VEHICLE_BODY_TYPES" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </details>

      <details class="filter-section">
        <summary class="filter-summary">Transmission &amp; fuel</summary>
        <div class="mt-4 space-y-3">
          <div>
            <label :for="`${idPrefix}-transmission`" class="form-label">Transmission</label>
            <select :id="`${idPrefix}-transmission`" v-model="transmission" class="form-select">
              <option value="">Any transmission</option>
              <option v-for="option in VEHICLE_TRANSMISSIONS" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div>
            <label :for="`${idPrefix}-fuel`" class="form-label">Fuel type</label>
            <select :id="`${idPrefix}-fuel`" v-model="fuelType" class="form-select">
              <option value="">Any fuel type</option>
              <option v-for="option in VEHICLE_FUEL_TYPES" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div>
            <label :for="`${idPrefix}-drivetrain`" class="form-label">Drivetrain</label>
            <select :id="`${idPrefix}-drivetrain`" v-model="drivetrain" class="form-select">
              <option value="">Any drivetrain</option>
              <option v-for="option in VEHICLE_DRIVETRAINS" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>
      </details>

      <details class="filter-section">
        <summary class="filter-summary">Mileage (km)</summary>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label :for="`${idPrefix}-min-mileage`" class="form-label">Minimum</label>
            <input
              :id="`${idPrefix}-min-mileage`"
              v-model="minMileage"
              type="text"
              inputmode="numeric"
              class="form-input"
              placeholder="0"
              autocomplete="off"
              :aria-invalid="validationErrors.length > 0"
              :aria-describedby="validationErrors.length ? `${idPrefix}-validation-errors` : undefined"
            >
          </div>
          <div>
            <label :for="`${idPrefix}-max-mileage`" class="form-label">Maximum</label>
            <input
              :id="`${idPrefix}-max-mileage`"
              v-model="maxMileage"
              type="text"
              inputmode="numeric"
              class="form-input"
              placeholder="Any"
              autocomplete="off"
              :aria-invalid="validationErrors.length > 0"
              :aria-describedby="validationErrors.length ? `${idPrefix}-validation-errors` : undefined"
            >
          </div>
        </div>
      </details>

      <details class="filter-section">
        <summary class="filter-summary">Colour</summary>
        <div class="mt-4">
          <label :for="`${idPrefix}-colour`" class="form-label">Exterior colour</label>
          <select :id="`${idPrefix}-colour`" v-model="exteriorColor" class="form-select">
            <option value="">Any colour</option>
            <option v-for="option in facets.colors" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </details>

      <div v-if="validationErrors.length" :id="`${idPrefix}-validation-errors`" class="mt-4 border border-red-200 bg-red-50 p-3" role="alert">
        <p v-for="message in validationErrors" :key="message" class="form-error mt-0">
          <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
          {{ message }}
        </p>
      </div>

      <AppButton type="submit" variant="dark" size="md" block class="mt-5">
        Show {{ previewCount }} {{ previewCount === 1 ? 'vehicle' : 'vehicles' }}
      </AppButton>
    </div>
  </form>
</template>
