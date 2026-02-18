import { NextResponse } from 'next/server'

const MOBILE_SCHEME = 'loltimeflash://oauth'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  if (!code) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 })
  }

  const redirectUrl = new URL(MOBILE_SCHEME)
  redirectUrl.searchParams.set('code', code)
  if (state) {
    redirectUrl.searchParams.set('state', state)
  }

  return NextResponse.redirect(redirectUrl.toString())
}
