/**
 * Cookie utilities for auth token management
 */

const AUTH_COOKIE_NAME = 'pb_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

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
    return JSON.parse(atob(value)) as IAuthCookieData
  } catch {
    return null
  }
}

