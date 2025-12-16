import { useCallback } from 'react'
import en from '@/lib/i18n/en.json'
import fr from '@/lib/i18n/fr.json'
import { useSettingsStore } from '@/app/store/settings.store'

type TTranslations = typeof en

const translations = { en, fr } as const

/**
 * Hook to get translations based on current language
 *
 * @example
 * const { t } = useTranslations()
 * t('home.searchPlaceholder') // "Search enemy champion..."
 * t('enemy.bestPicks', { champion: 'Orianna' }) // "Best picks against Orianna"
 */
export function useTranslations() {
  const language = useSettingsStore((s) => s.language)

  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      const keys = key.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = translations[language]

      for (const k of keys) {
        value = value?.[k]
      }

      if (typeof value !== 'string') {
        console.warn(`Translation key not found: ${key}`)
        return key
      }

      // Replace {param} placeholders
      if (params) {
        return value.replace(/\{(\w+)\}/g, (_, paramKey) => params[paramKey] ?? `{${paramKey}}`)
      }

      return value
    },
    [language]
  )

  return { t, language }
}

/**
 * Get a specific namespace of translations
 *
 * @example
 * const { t } = useNamespacedTranslations('home')
 * t('searchPlaceholder') // "Search enemy champion..."
 */
export function useNamespacedTranslations(namespace: keyof TTranslations) {
  const language = useSettingsStore((s) => s.language)

  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (translations[language][namespace] as any)?.[key]

      if (typeof value !== 'string') {
        console.warn(`Translation key not found: ${namespace}.${key}`)
        return key
      }

      if (params) {
        return value.replace(/\{(\w+)\}/g, (_, paramKey) => params[paramKey] ?? `{${paramKey}}`)
      }

      return value
    },
    [language, namespace]
  )

  return { t, language }
}
