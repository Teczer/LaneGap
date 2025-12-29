import { type NextRequest, NextResponse } from 'next/server'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, type TLanguage } from '@/lib/i18n/types'

const LANGUAGE_COOKIE_NAME = 'lanegap-lang'

/**
 * Middleware to handle language detection and set default language cookie
 */
export const middleware = (request: NextRequest) => {
  const response = NextResponse.next()

  // Check if language cookie exists
  const langCookie = request.cookies.get(LANGUAGE_COOKIE_NAME)

  if (!langCookie) {
    // Detect language from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language')
    let detectedLanguage: TLanguage = DEFAULT_LANGUAGE

    if (acceptLanguage) {
      // Parse Accept-Language header (e.g., "fr-FR,fr;q=0.9,en;q=0.8")
      const preferredLanguages = acceptLanguage
        .split(',')
        .map((lang) => lang.split(';')[0]?.trim().substring(0, 2).toLowerCase())

      // Find first supported language
      for (const lang of preferredLanguages) {
        if (SUPPORTED_LANGUAGES.includes(lang as TLanguage)) {
          detectedLanguage = lang as TLanguage
          break
        }
      }
    }

    // Set the language cookie
    response.cookies.set(LANGUAGE_COOKIE_NAME, detectedLanguage, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  return response
}

/**
 * Only run middleware on page routes (not API, static files, etc.)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico|champions|items|roles|clips).*)',
  ],
}
