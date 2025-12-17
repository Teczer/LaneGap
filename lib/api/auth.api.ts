// =============================================================================
// AUTH API - Client-side API calls for authentication
// =============================================================================

export interface ISendOTPResponse {
  success: boolean
  message: string
  code?: string // Only in development
}

export interface IVerifyOTPResponse {
  success: boolean
  message: string
}

/**
 * Send OTP code to email
 */
export async function sendOTP(email: string): Promise<ISendOTPResponse> {
  const response = await fetch('/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to send OTP')
  }

  // In development, log the code for testing
  if (data.code) {
    console.log('🔐 OTP Code:', data.code)
  }

  return data
}

/**
 * Verify OTP code
 */
export async function verifyOTP(email: string, code: string): Promise<IVerifyOTPResponse> {
  const response = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Invalid code')
  }

  return data
}
