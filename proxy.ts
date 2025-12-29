import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { parseAuthCookie } from '@/lib/cookies'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, type TLanguage } from '@/lib/i18n/types'

/**
 * Next.js Proxy for auth protection and language detection
 */

const LANGUAGE_COOKIE_NAME = 'lanegap-lang'

// Routes that require authentication
const PROTECTED_ROUTES = ['/settings']

// Routes that should redirect to home if already authenticated
const AUTH_ROUTES = ['/auth']

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // ============================================
  // Language Detection
  // ============================================
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
        if (lang && SUPPORTED_LANGUAGES.includes(lang as TLanguage)) {
          detectedLanguage = lang as TLanguage
          break
        }
      }
    }

    // Set the language cookie on the response
    response.cookies.set(LANGUAGE_COOKIE_NAME, detectedLanguage, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  // ============================================
  // Auth Protection
  // ============================================
  const cookieHeader = request.headers.get('cookie')
  const authData = parseAuthCookie(cookieHeader ?? undefined)
  const isAuthenticated = !!authData?.token

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // Redirect to /auth if protected route and not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect to home if auth route and already authenticated
  if (isAuthRoute && isAuthenticated) {
    const redirectTo = request.nextUrl.searchParams.get('redirect') || '/'
    const url = request.nextUrl.clone()
    url.pathname = redirectTo
    url.searchParams.delete('redirect')
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  // Match all routes except static files, api routes, and public assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|champions|items|roles|clips).*)'],
}
