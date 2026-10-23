import type { Vehicle } from '~/types/vehicle'
import { vehicleListingUrl } from '~/utils/whatsapp'
import { vehicleTitle } from '~/utils/vehicle'

/**
 * Native share sheet where available, clipboard fallback otherwise.
 * No fake "shared" state: feedback is only shown after a real action.
 */
export function useShare() {
  const toast = useToast()
  const requestUrl = useRequestURL()
  const config = useRuntimeConfig()
  const sharing = ref(false)

  async function shareVehicle(vehicle: Vehicle): Promise<void> {
    if (!import.meta.client) return

    const url = vehicleListingUrl(vehicle, requestUrl.origin || String(config.public.siteUrl))
    const title = vehicleTitle(vehicle)
    const text = `${title} — ${vehicle.stockNumber}`

    sharing.value = true
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title, text, url })
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        toast.add({
          title: 'Listing link copied',
          description: 'The vehicle URL is now on your clipboard.',
          icon: 'i-lucide-check',
          color: 'primary',
        })
        return
      }

      toast.add({
        title: 'Sharing unavailable',
        description: 'Your browser does not support sharing or clipboard access. Copy the address from the browser bar instead.',
        icon: 'i-lucide-info',
        color: 'neutral',
      })
    }
    catch (error) {
      // AbortError means the visitor dismissed the native share sheet.
      if (error instanceof DOMException && error.name === 'AbortError') return
      toast.add({
        title: 'Could not share this listing',
        description: 'Please copy the page address from your browser instead.',
        icon: 'i-lucide-alert-circle',
        color: 'error',
      })
    }
    finally {
      sharing.value = false
    }
  }

  return { shareVehicle, sharing }
}
