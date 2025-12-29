'use server'

import { cookies } from 'next/headers'
import { LANGUAGE_COOKIE_NAME } from './get-translations'
import { SUPPORTED_LANGUAGES, type TLanguage } from './types'

/**
 * Cookie max age: 1 year
 */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/**
 * Server Action to set the language preference
 *
 * @example
 * // In a Client Component
 * import { setLanguage } from '@/lib/i18n/actions'
 *
 * <button onClick={() => setLanguage('fr')}>FR</button>
 */
export const setLanguage = async (language: TLanguage): Promise<void> => {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    throw new Error(`Invalid language: ${language}`)
  }

  const cookieStore = await cookies()

  cookieStore.set(LANGUAGE_COOKIE_NAME, language, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

/**
 * Server Action to toggle between languages
 *
 * @example
 * import { toggleLanguage } from '@/lib/i18n/actions'
 *
 * <button onClick={() => toggleLanguage()}>Toggle</button>
 */
export const toggleLanguage = async (): Promise<TLanguage> => {
  const cookieStore = await cookies()
  const current = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value as TLanguage | undefined

  const newLanguage: TLanguage = current === 'en' ? 'fr' : 'en'

  cookieStore.set(LANGUAGE_COOKIE_NAME, newLanguage, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return newLanguage
}
