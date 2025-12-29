import { cookies } from 'next/headers'
import en from './en.json'
import fr from './fr.json'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, type TLanguage, type TTranslations } from './types'

const translations: Record<TLanguage, TTranslations> = { en, fr }

/**
 * Cookie name for language preference
 */
export const LANGUAGE_COOKIE_NAME = 'lanegap-lang'

/**
 * Get the current language from cookies (server-side)
 */
export const getLanguage = async (): Promise<TLanguage> => {
  const cookieStore = await cookies()
  const langCookie = cookieStore.get(LANGUAGE_COOKIE_NAME)

  if (langCookie && SUPPORTED_LANGUAGES.includes(langCookie.value as TLanguage)) {
    return langCookie.value as TLanguage
  }

  return DEFAULT_LANGUAGE
}

/**
 * Get translations object for the current language (server-side)
 *
 * @example
 * // In a Server Component
 * const t = await getTranslations()
 * return <h1>{t.settings.title}</h1>
 */
export const getTranslations = async (): Promise<TTranslations> => {
  const language = await getLanguage()
  return translations[language]
}

/**
 * Get a specific namespace of translations (server-side)
 *
 * @example
 * const t = await getNamespacedTranslations('settings')
 * return <h1>{t.title}</h1>
 */
export const getNamespacedTranslations = async <K extends keyof TTranslations>(
  namespace: K
): Promise<TTranslations[K]> => {
  const t = await getTranslations()
  return t[namespace]
}
