import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'
import { Resend } from 'resend'

const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090')
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Generate 6-digit OTP code
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Mark any existing unused codes for this email as used
    try {
      const existingCodes = await pb.collection('otp_codes').getFullList({
        filter: `email = "${email}" && used = false`,
      })
      for (const existingCode of existingCodes) {
        await pb.collection('otp_codes').update(existingCode.id, { used: true })
      }
    } catch {
      // No existing codes, that's fine
    }

    // Create new OTP record
    await pb.collection('otp_codes').create({
      email,
      code,
      used: false,
    })

    // Send email with OTP code via Resend
    const emailFrom = process.env.EMAIL_FROM || 'LANEGAP <noreply@mehdihattou.com>'

    console.log('[OTP] Sending email via Resend...')
    console.log('[OTP] From:', emailFrom)
    console.log('[OTP] To:', email)
    console.log('[OTP] API Key exists:', !!process.env.RESEND_API_KEY)

    const { data, error: resendError } = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: '🔐 LANEGAP - Code de vérification',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #8b5cf6; margin: 0; font-size: 28px;">LANE<span style="color: #fff;">GAP</span></h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #1a1f35 0%, #0a0d17 100%); border-radius: 16px; padding: 32px; text-align: center;">
            <p style="color: #a1a1aa; margin: 0 0 24px 0; font-size: 16px;">
              Ton code de vérification :
            </p>
            
            <div style="background: rgba(139, 92, 246, 0.1); border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <span style="font-family: 'SF Mono', Monaco, monospace; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #fff;">
                ${code}
              </span>
            </div>
            
            <p style="color: #71717a; margin: 0; font-size: 14px;">
              Ce code expire dans <strong style="color: #a1a1aa;">5 minutes</strong>.
            </p>
          </div>
          
          <p style="color: #52525b; font-size: 12px; text-align: center; margin-top: 24px;">
            Si tu n'as pas demandé ce code, ignore cet email.
          </p>
        </div>
      `,
    })

    // Handle Resend error - always show it, dev or prod
    if (resendError) {
      console.error('[OTP] ❌ Resend error:', JSON.stringify(resendError, null, 2))
      return NextResponse.json(
        {
          error: 'Failed to send email',
          details: resendError.message,
        },
        { status: 500 }
      )
    }

    console.log('[OTP] ✅ Email sent successfully! ID:', data?.id)

    return NextResponse.json({
      success: true,
      message: 'OTP code sent',
      emailId: data?.id,
    })
  } catch (error) {
    console.error('[OTP] ❌ Unexpected error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send OTP',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
