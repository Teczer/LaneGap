import { useMutation } from '@tanstack/react-query'
import { sendOTP, verifyOTP } from '@/lib/api/auth.api'
import { showErrorToast, showSuccessToast } from '@/lib/toast'

// =============================================================================
// SEND OTP MUTATION
// =============================================================================

export function useSendOTP() {
  return useMutation({
    mutationFn: (email: string) => sendOTP(email),
    onSuccess: () => {
      showSuccessToast('otpSent')
    },
    onError: () => {
      showErrorToast('otpSentError')
    },
  })
}

// =============================================================================
// VERIFY OTP MUTATION
// =============================================================================

export function useVerifyOTP() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) => verifyOTP(email, code),
    onSuccess: () => {
      showSuccessToast('otpVerified')
    },
    onError: () => {
      showErrorToast('otpVerifiedError')
    },
  })
}
