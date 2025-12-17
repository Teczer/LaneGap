import { toast } from 'sonner'
import en from '@/lib/i18n/en.json'
import fr from '@/lib/i18n/fr.json'

type TTranslations = typeof en
type TToastKey = keyof TTranslations['toast']

// Get the current language from localStorage (same as settings store)
function getLanguage(): 'en' | 'fr' {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = localStorage.getItem('lanegap-settings')
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.state?.language || 'en'
    }
  } catch {
    // Ignore
  }
  return 'en'
}

function getTranslation(key: TToastKey): string {
  const lang = getLanguage()
  const translations = lang === 'fr' ? fr : en
  return translations.toast[key] || key
}

// =============================================================================
// TOAST HELPERS
// =============================================================================

export function showSuccessToast(key: TToastKey) {
  toast.success(getTranslation(key))
}

export function showErrorToast(key: TToastKey) {
  toast.error(getTranslation(key))
}

export function showToast(message: string) {
  toast(message)
}

// Re-export toast for custom usage
export { toast }
