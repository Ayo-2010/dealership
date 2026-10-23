import type { DemoEnquiryResult, EnquiryPayload } from '~/types/enquiry'
import { enquiryService } from '~/services/enquiryService'

/**
 * Shared client-side state for the demonstration enquiry forms. The service
 * only prepares a local message; it never transmits or stores form data.
 */
export function useDemoEnquiry() {
  const toast = useToast()
  const submitting = ref(false)
  const result = ref<DemoEnquiryResult | null>(null)
  const submitError = ref('')

  async function submit(payload: EnquiryPayload) {
    if (submitting.value) return
    submitting.value = true
    submitError.value = ''

    try {
      result.value = await enquiryService.submit(payload)
    }
    catch {
      submitError.value = 'The local message could not be prepared. Please try again or contact the team directly.'
      toast.add({
        title: 'Could not prepare message',
        description: 'Nothing was sent. Please try again or use the contact details on this page.',
        icon: 'i-lucide-alert-circle',
        color: 'error',
      })
    }
    finally {
      submitting.value = false
    }
  }

  function reset() {
    result.value = null
    submitError.value = ''
  }

  return { submitting, result, submitError, submit, reset }
}
