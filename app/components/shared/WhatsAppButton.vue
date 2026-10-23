<script setup lang="ts">
import type { Vehicle } from '~/types/vehicle'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    vehicle?: Vehicle
    message?: string
    label?: string
    variant?: 'gold' | 'dark' | 'outline' | 'light-outline' | 'ghost' | 'white'
    size?: 'sm' | 'md' | 'lg'
    block?: boolean
    to?: RouteLocationRaw
  }>(),
  {
    label: 'WhatsApp enquiry',
    variant: 'gold',
    size: 'md',
    block: false,
  },
)

const { vehicleUrl, generalUrl } = useWhatsApp()

const href = computed(() => (props.vehicle ? vehicleUrl(props.vehicle) : generalUrl(props.message)))
const accessibleLabel = computed(() => {
  if (props.vehicle) {
    return props.vehicle.status === 'sold'
      ? `Ask about similar vehicles to the ${props.vehicle.make} ${props.vehicle.model} on WhatsApp`
      : `Enquire about the ${props.vehicle.make} ${props.vehicle.model} on WhatsApp`
  }
  return props.label
})
</script>

<template>
  <AppButton
    :href="href"
    :variant="variant"
    :size="size"
    :block="block"
    :to="to"
    :aria-label="accessibleLabel"
  >
    <template #leading>
      <BrandWhatsAppIcon class="size-4 shrink-0" />
    </template>
    <slot>{{ label }}</slot>
  </AppButton>
</template>
