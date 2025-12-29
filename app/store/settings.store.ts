import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getLanguageCookie, setLanguageCookie } from '@/lib/cookies'
import type { TLanguage } from '@/lib/i18n/types'

interface ISettingsState {
  language: TLanguage
  setLanguage: (lang: TLanguage) => void
  toggleLanguage: () => void
  syncFromCookie: () => void
}

export const useSettingsStore = create<ISettingsState>()(
  persist(
    (set, get) => ({
      language: 'en',

      setLanguage: (language) => {
        // Sync to cookie for SSR
        if (typeof document !== 'undefined') {
          setLanguageCookie(language)
        }
        set({ language })
      },

      toggleLanguage: () => {
        const newLanguage: TLanguage = get().language === 'en' ? 'fr' : 'en'
        // Sync to cookie for SSR
        if (typeof document !== 'undefined') {
          setLanguageCookie(newLanguage)
        }
        set({ language: newLanguage })
      },

      /**
       * Sync language from cookie (called on hydration)
       * This ensures the store matches the SSR cookie value
       */
      syncFromCookie: () => {
        if (typeof document !== 'undefined') {
          const cookieLang = getLanguageCookie()
          if (cookieLang && cookieLang !== get().language) {
            set({ language: cookieLang })
          }
        }
      },
    }),
    {
      name: 'lanegap-settings',
      onRehydrateStorage: () => (state) => {
        // On hydration, sync from cookie if it differs
        // Cookie is source of truth for SSR
        if (state && typeof document !== 'undefined') {
          const cookieLang = getLanguageCookie()
          if (cookieLang && cookieLang !== state.language) {
            state.setLanguage(cookieLang)
          } else if (state.language && !cookieLang) {
            // If no cookie but store has value, set the cookie
            setLanguageCookie(state.language)
          }
        }
      },
    }
  )
)
