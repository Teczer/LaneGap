/**
 * Cookie utilities for auth token and language management
 */
import type { TLanguage } from './i18n/types'

const AUTH_COOKIE_NAME = 'pb_auth'
const LANGUAGE_COOKIE_NAME = 'lanegap-lang'
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

// Re-export for backwards compatibility
const COOKIE_MAX_AGE = AUTH_COOKIE_MAX_AGE

export interface IAuthCookieData {
  token: string
  userId: string
}

/**
 * Set auth cookie (client-side)
 */
export function setAuthCookie(token: string, userId: string): void {
  const data: IAuthCookieData = { token, userId }
  const value = btoa(JSON.stringify(data)) // Base64 encode

  document.cookie = [
    `${AUTH_COOKIE_NAME}=${value}`,
    `path=/`,
    `max-age=${COOKIE_MAX_AGE}`,
    `samesite=lax`,
    // Add 'secure' in production
    process.env.NODE_ENV === 'production' ? 'secure' : '',
  ]
    .filter(Boolean)
    .join('; ')
}

/**
 * Get auth cookie data (client-side)
 */
export function getAuthCookie(): IAuthCookieData | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  const authCookie = cookies.find((c) => c.trim().startsWith(`${AUTH_COOKIE_NAME}=`))

  if (!authCookie) return null

  try {
    const value = authCookie.split('=')[1]
    if (!value) return null
    return JSON.parse(atob(value)) as IAuthCookieData
  } catch {
    return null
  }
}

/**
 * Clear auth cookie (client-side)
 */
export function clearAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`
}

/**
 * Parse auth cookie from cookie string (server-side / middleware)
 */
export function parseAuthCookie(cookieString: string | undefined): IAuthCookieData | null {
  if (!cookieString) return null

  const cookies = cookieString.split(';')
  const authCookie = cookies.find((c) => c.trim().startsWith(`${AUTH_COOKIE_NAME}=`))

  if (!authCookie) return null

  try {
    const value = authCookie.split('=')[1]
    if (!value) return null
    return JSON.parse(atob(value)) as IAuthCookieData
  } catch {
    return null
  }
}

// ============================================
// Language Cookie Utilities
// ============================================

/**
 * Set language cookie (client-side)
 */
export function setLanguageCookie(language: TLanguage): void {
  document.cookie = [
    `${LANGUAGE_COOKIE_NAME}=${language}`,
    `path=/`,
    `max-age=${LANGUAGE_COOKIE_MAX_AGE}`,
    `samesite=lax`,
    process.env.NODE_ENV === 'production' ? 'secure' : '',
  ]
    .filter(Boolean)
    .join('; ')
}

/**
 * Get language cookie (client-side)
 */
export function getLanguageCookie(): TLanguage | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  const langCookie = cookies.find((c) => c.trim().startsWith(`${LANGUAGE_COOKIE_NAME}=`))

  if (!langCookie) return null

  const value = langCookie.split('=')[1]?.trim()
  if (value === 'en' || value === 'fr') {
    return value
  }

  return null
}

/**
 * Parse language cookie from cookie string (server-side / middleware)
 */
export function parseLanguageCookie(cookieString: string | undefined): TLanguage | null {
  if (!cookieString) return null

  const cookies = cookieString.split(';')
  const langCookie = cookies.find((c) => c.trim().startsWith(`${LANGUAGE_COOKIE_NAME}=`))

  if (!langCookie) return null

  const value = langCookie.split('=')[1]?.trim()
  if (value === 'en' || value === 'fr') {
    return value
  }

  return null
}
