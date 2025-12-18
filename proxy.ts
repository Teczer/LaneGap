import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { parseAuthCookie } from '@/lib/cookies'

/**
 * Next.js Proxy for auth protection
 *
 * Auth token is stored in a cookie (set by auth store on login/hydrate).
 * This allows server-side auth checks before page render.
 */

// Routes that require authentication
const PROTECTED_ROUTES = ['/settings']

// Routes that should redirect to home if already authenticated
const AUTH_ROUTES = ['/auth']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Parse auth cookie
  const cookieHeader = request.headers.get('cookie')
  const authData = parseAuthCookie(cookieHeader ?? undefined)
  const isAuthenticated = !!authData?.token

  // Check route type
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

  return NextResponse.next()
}

export const config = {
  // Match all routes except static files, api routes, and public assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|champions|items).*)'],
}
