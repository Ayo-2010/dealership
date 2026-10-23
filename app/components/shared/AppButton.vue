<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type ButtonVariant = 'gold' | 'dark' | 'outline' | 'light-outline' | 'ghost' | 'white'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
    size?: ButtonSize
    block?: boolean
    disabled?: boolean
    loading?: boolean
    icon?: string
    trailingIcon?: string
  }>(),
  {
    type: 'button',
    variant: 'gold',
    size: 'md',
    block: false,
    disabled: false,
    loading: false,
  },
)

const NuxtLinkComponent = resolveComponent('NuxtLink')

const isHttpLink = computed(() => Boolean(props.href && /^https?:\/\//.test(props.href)))

const component = computed(() => {
  if (props.to) return NuxtLinkComponent
  if (props.href) return 'a'
  return 'button'
})

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-[10px] gap-1.5',
  md: 'px-5 py-2.5 text-[11px] gap-2',
  lg: 'px-7 py-3.5 text-xs gap-2.5',
}

const variantClasses: Record<ButtonVariant, string> = {
  gold: 'border-gold bg-gold text-obsidian hover:border-gold-light hover:bg-gold-light',
  dark: 'border-obsidian bg-obsidian text-white hover:border-charcoal hover:bg-charcoal',
  outline: 'border-line bg-transparent text-ink hover:border-ink',
  'light-outline': 'border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-obsidian',
  ghost: 'border-transparent bg-transparent text-ink hover:text-gold-dark',
  white: 'border-white bg-white text-obsidian hover:border-ivory hover:bg-ivory',
}

const classes = computed(() => [
  'inline-flex select-none items-center justify-center rounded-[2px] border font-sans font-semibold uppercase tracking-[0.12em] transition-colors duration-200',
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold',
  'disabled:cursor-not-allowed disabled:opacity-50',
  sizeClasses[props.size],
  variantClasses[props.variant],
  props.block ? 'w-full' : '',
  props.variant === 'ghost' ? 'px-0' : '',
])

const linkProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return {
      href: props.href,
      target: isHttpLink.value ? '_blank' : undefined,
      rel: isHttpLink.value ? 'noopener noreferrer' : undefined,
    }
  }
  return {
    type: props.type,
    disabled: props.disabled || props.loading,
  }
})
</script>

<template>
  <component
    :is="component"
    v-bind="linkProps"
    :class="classes"
    :aria-disabled="disabled || loading ? 'true' : undefined"
  >
    <UIcon
      v-if="loading"
      name="i-lucide-loader-circle"
      class="size-4 shrink-0 animate-spin"
      aria-hidden="true"
    />
    <UIcon v-else-if="icon" :name="icon" class="size-4 shrink-0" aria-hidden="true" />
    <slot name="leading" />
    <span class="truncate"><slot /></span>
    <UIcon v-if="trailingIcon" :name="trailingIcon" class="size-4 shrink-0" aria-hidden="true" />
    <slot name="trailing" />
  </component>
</template>
