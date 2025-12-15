import { useSettingsStore } from '@/app/store/settings.store'

/**
 * Hook for accessing settings with selector pattern
 */
export function useSettings() {
  const language = useSettingsStore((s) => s.language)
  const toggleLanguage = useSettingsStore((s) => s.toggleLanguage)
  const setLanguage = useSettingsStore((s) => s.setLanguage)

  return {
    language,
    toggleLanguage,
    setLanguage,
  }
}
