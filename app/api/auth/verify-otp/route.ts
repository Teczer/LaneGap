import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 })
    }

    // Find the OTP record
    const otpRecords = await pb.collection('otp_codes').getList(1, 1, {
      filter: `email = "${email}" && code = "${code}" && used = false`,
      sort: '-created',
    })

    const otpRecord = otpRecords.items[0]
    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    // Check if expired (5 minutes)
    const createdAt = new Date(otpRecord.created)
    const now = new Date()
    const diffMinutes = (now.getTime() - createdAt.getTime()) / 1000 / 60

    if (diffMinutes > 5) {
      // Mark as used since it's expired
      await pb.collection('otp_codes').update(otpRecord.id, { used: true })
      return NextResponse.json({ error: 'Code has expired' }, { status: 400 })
    }

    // Mark OTP as used
    await pb.collection('otp_codes').update(otpRecord.id, { used: true })

    // Mark user as verified
    const users = await pb.collection('users').getList(1, 1, {
      filter: `email = "${email}"`,
    })

    const user = users.items[0]
    if (user) {
      await pb.collection('users').update(user.id, { verified: true })
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
  }
}
