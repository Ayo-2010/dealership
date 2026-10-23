<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'
import { parsePriceInput } from '~/utils/currency'
import { getModelOptionsForMake, uniqueSorted } from '~/utils/vehicleFilters'

const props = withDefaults(
  defineProps<{
    vehicles: Vehicle[]
    compact?: boolean
  }>(),
  { compact: false },
)

const make = ref('')
const model = ref('')
const condition = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const error = ref('')
const submitting = ref(false)

const makes = computed(() => uniqueSorted(props.vehicles.map((vehicle) => vehicle.make)))
const models = computed(() => getModelOptionsForMake(props.vehicles, make.value || undefined))

watch(make, () => {
  if (model.value && !models.value.includes(model.value)) model.value = ''
})

const parsedMin = computed(() => parsePriceInput(minPrice.value))
const parsedMax = computed(() => parsePriceInput(maxPrice.value))

watch([minPrice, maxPrice], () => {
  if (error.value) error.value = ''
})

function validate(): boolean {
  if (parsedMin.value !== undefined && parsedMax.value !== undefined && parsedMin.value > parsedMax.value) {
    error.value = 'Minimum price cannot be greater than maximum price.'
    return false
  }
  error.value = ''
  return true
}

async function submit() {
  if (!validate()) return
  submitting.value = true

  const query: Record<string, string> = {}
  if (make.value) query.make = make.value
  if (model.value) query.model = model.value
  if (condition.value) query.condition = condition.value
  if (parsedMin.value !== undefined) query.minPrice = String(parsedMin.value)
  if (parsedMax.value !== undefined) query.maxPrice = String(parsedMax.value)

  try {
    await navigateTo({ path: '/cars', query })
  }
  finally {
    submitting.value = false
  }
}

function reset() {
  make.value = ''
  model.value = ''
  condition.value = ''
  minPrice.value = ''
  maxPrice.value = ''
  error.value = ''
}
</script>

<template>
  <form
    class="border border-line bg-white p-5 shadow-[0_24px_60px_-40px_rgba(17,19,21,0.45)] sm:p-6"
    :class="compact ? '' : 'lg:p-7'"
    novalidate
    aria-labelledby="home-search-title"
    @submit.prevent="submit"
  >
    <div class="flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-dark">Search inventory</p>
        <h2 id="home-search-title" class="mt-1.5 font-display text-lg font-medium tracking-tight text-ink">
          Find your next car
        </h2>
      </div>
      <button
        type="button"
        class="mt-2 self-start text-[10px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-ink sm:mt-0"
        @click="reset"
      >
        Reset fields
      </button>
    </div>

    <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <div class="lg:col-span-1">
        <label for="home-make" class="form-label">Make</label>
        <select id="home-make" v-model="make" class="form-select" autocomplete="off">
          <option value="">All makes</option>
          <option v-for="option in makes" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <div class="lg:col-span-1">
        <label for="home-model" class="form-label">Model</label>
        <select id="home-model" v-model="model" class="form-select" autocomplete="off">
          <option value="">All models</option>
          <option v-for="option in models" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <div class="lg:col-span-1">
        <label for="home-condition" class="form-label">Condition</label>
        <select id="home-condition" v-model="condition" class="form-select" autocomplete="off">
          <option value="">Any condition</option>
          <option value="new">New</option>
          <option value="used">Pre-owned</option>
        </select>
      </div>

      <div class="lg:col-span-1">
        <label for="home-min-price" class="form-label">Min price</label>
        <div class="relative">
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted" aria-hidden="true">₦</span>
          <input
            id="home-min-price"
            v-model="minPrice"
            type="text"
            inputmode="numeric"
            class="form-input pl-7"
            placeholder="20,000,000"
            autocomplete="off"
            :aria-invalid="Boolean(error)"
            :aria-describedby="error ? 'home-search-error' : undefined"
          >
        </div>
      </div>

      <div class="lg:col-span-1">
        <label for="home-max-price" class="form-label">Max price</label>
        <div class="relative">
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted" aria-hidden="true">₦</span>
          <input
            id="home-max-price"
            v-model="maxPrice"
            type="text"
            inputmode="numeric"
            class="form-input pl-7"
            placeholder="75,000,000"
            autocomplete="off"
            :aria-invalid="Boolean(error)"
            :aria-describedby="error ? 'home-search-error' : undefined"
          >
        </div>
      </div>

      <div class="flex items-end sm:col-span-2 lg:col-span-1">
        <AppButton type="submit" variant="dark" size="md" block :loading="submitting" trailing-icon="i-lucide-arrow-right">
          Search
        </AppButton>
      </div>
    </div>

    <p v-if="error" id="home-search-error" class="form-error" role="alert">
      <UIcon name="i-lucide-alert-circle" class="mt-px size-3.5 shrink-0" aria-hidden="true" />
      {{ error }}
    </p>
  </form>
</template>
