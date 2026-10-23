<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
}

const props = withDefaults(
  defineProps<{
    items: BreadcrumbItem[]
    tone?: 'light' | 'dark'
  }>(),
  { tone: 'light' },
)

const allItems = computed(() => [{ label: 'Home', to: '/' }, ...props.items])
</script>

<template>
  <nav aria-label="Breadcrumb" class="text-[11px]">
    <ol
      class="flex flex-wrap items-center gap-x-2 gap-y-1"
      :class="tone === 'dark' ? 'text-white/40' : 'text-muted'"
    >
      <li v-for="(item, index) in allItems" :key="`${item.label}-${index}`" class="flex items-center gap-x-2">
        <NuxtLink
          v-if="item.to && index < allItems.length - 1"
          :to="item.to"
          class="transition-colors"
          :class="tone === 'dark' ? 'hover:text-white' : 'hover:text-ink'"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          :aria-current="index === allItems.length - 1 ? 'page' : undefined"
          :class="[
            index === allItems.length - 1 ? 'font-medium' : '',
            index === allItems.length - 1
              ? (tone === 'dark' ? 'text-white/80' : 'text-ink')
              : '',
          ]"
        >
          {{ item.label }}
        </span>
        <UIcon
          v-if="index < allItems.length - 1"
          name="i-lucide-chevron-right"
          class="size-3"
          :class="tone === 'dark' ? 'text-white/20' : 'text-line'"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>
