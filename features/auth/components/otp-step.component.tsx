'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LuArrowLeft, LuCheck, LuLoader, LuRefreshCw } from 'react-icons/lu'
import type { TAuthTranslations } from '@/lib/i18n'
import { Button, InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui'

interface IOTPStepProps {
  translations: TAuthTranslations
  email: string
  isVerifying: boolean
  isResending: boolean
  onVerify: (code: string) => Promise<void>
  onResend: () => Promise<void>
  onBack: () => void
}

export const OTPStep = ({
  translations: t,
  email,
  isVerifying,
  isResending,
  onVerify,
  onResend,
  onBack,
}: IOTPStepProps) => {
  const [otpValue, setOtpValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      setError(t.otpIncomplete)
      return
    }

    setError(null)

    try {
      await onVerify(otpValue)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.otpInvalid)
    }
  }

  const handleResend = async () => {
    setError(null)
    try {
      await onResend()
    } catch {
      setError(t.resendError)
    }
  }

  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        onClick={onBack}
        className="fixed top-10 left-10 flex h-10 w-10 cursor-pointer items-center justify-center transition-all hover:scale-110"
      >
        <LuArrowLeft className="h-5 w-5" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-md flex-col items-center text-center"
      >
        <h1 className="mb-3 text-3xl font-bold text-white">{t.otpTitle}</h1>
        <p className="mb-2 text-white/60">{t.otpSubtitle}</p>
        <p className="text-primary-light mb-10 font-medium">{email}</p>

        <div className="mb-8">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => {
              setOtpValue(value)
              setError(null)
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <div className="mx-3 text-white/30">-</div>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && <p className="text-danger mb-6 text-sm">{error}</p>}

        <div className="w-full max-w-xs">
          <Button
            onClick={handleVerify}
            isLoading={isVerifying}
            disabled={otpValue.length !== 6}
            className="mb-6 w-full"
            size="lg"
          >
            <LuCheck className="h-5 w-5" />
            {t.verifyButton}
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-white/50">
          <span>{t.didntReceive}</span>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-primary-light hover:text-primary inline-flex cursor-pointer items-center gap-1 font-medium transition-colors disabled:opacity-50"
          >
            {isResending ? (
              <LuLoader className="h-3 w-3 animate-spin" />
            ) : (
              <LuRefreshCw className="h-3 w-3" />
            )}
            {t.resendCode}
          </button>
        </div>

        <p className="mt-8 text-xs text-white/30">{t.otpHint}</p>
      </motion.div>
    </div>
  )
}
