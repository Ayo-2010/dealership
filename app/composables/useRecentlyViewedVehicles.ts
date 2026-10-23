const STORAGE_KEY = 'vantage-recently-viewed'
const MAX_ITEMS = 6

/**
 * Stores recently viewed vehicle slugs only — never customer information.
 * Reading happens after mount so SSR and hydration render identically.
 */
export function useRecentlyViewedVehicles() {
  const slugs = ref<string[]>([])
  const hydrated = ref(false)

  onMounted(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: unknown = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          slugs.value = parsed.filter((value): value is string => typeof value === 'string').slice(0, MAX_ITEMS)
        }
      }
    }
    catch {
      // Storage can be unavailable (private mode, policy). Fail silently.
    }
    hydrated.value = true
  })

  function persist() {
    if (!import.meta.client || !hydrated.value) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs.value.slice(0, MAX_ITEMS)))
    }
    catch {
      // Ignore storage quota or privacy errors.
    }
  }

  function track(slug: string) {
    if (!slug) return
    slugs.value = [slug, ...slugs.value.filter((item) => item !== slug)].slice(0, MAX_ITEMS)
    persist()
  }

  function clear() {
    slugs.value = []
    if (import.meta.client) {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      }
      catch {
        // Ignore.
      }
    }
  }

  return { slugs, hydrated, track, clear }
}
