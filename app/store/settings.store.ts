import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TLanguage } from '@/lib/types'

interface ISettingsState {
  language: TLanguage
  setLanguage: (lang: TLanguage) => void
  toggleLanguage: () => void
}

export const useSettingsStore = create<ISettingsState>()(
  persist(
    (set) => ({
      language: 'en',

      setLanguage: (language) => set({ language }),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === 'en' ? 'fr' : 'en',
        })),
    }),
    {
      name: 'lanegap-settings',
    }
  )
)
