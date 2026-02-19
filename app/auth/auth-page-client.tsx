'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AuthBenefits,
  AuthHeader,
  AuthModeToggle,
  LoginForm,
  OAuthButtons,
  OTPStep,
  RegisterForm,
} from '@/features/auth'
import type { TAuthMode } from '@/features/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { useForm, useWatch } from 'react-hook-form'
import type { TAuthTranslations } from '@/lib/i18n'
import { type TAuthForm, authFormSchema, registerSchema } from '@/lib/validations/auth.schema'
import { useSendOTP, useVerifyOTP } from '@/hooks/queries'
import { useAuthStore } from '@/app/store/auth.store'

type TFlowStep = 'form' | 'otp'

interface IAuthPageClientProps {
  translations: TAuthTranslations
}

export const AuthPageClient = ({ translations: t }: IAuthPageClientProps) => {
  const router = useRouter()
  const { login, register: registerUser, isLoading } = useAuthStore()

  const [mode, setMode] = useState<TAuthMode>('login')
  const [step, setStep] = useState<TFlowStep>('form')
  const [isNewRegistration, setIsNewRegistration] = useState(false)

  const sendOTPMutation = useSendOTP()
  const verifyOTPMutation = useVerifyOTP()

  const {
    register,
    control,
    getValues,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<TAuthForm>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  // Reactive values for OTP step display
  const email = useWatch({ control, name: 'email' })
  const password = useWatch({ control, name: 'password' })

  const handleLogin = async () => {
    const isValid = await trigger(['email', 'password'])
    if (!isValid) return

    const values = getValues()

    try {
      await login({ email: values.email, password: values.password })
      router.push('/')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ''

      if (errorMessage === 'email_not_verified') {
        setIsNewRegistration(false)
        await sendOTPMutation.mutateAsync(values.email)
        setStep('otp')
        return
      }

      setError('root', { message: t.loginError })
    }
  }

  const handleRegister = async () => {
    const values = getValues()

    const result = registerSchema.safeParse(values)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        setError(issue.path[0] as keyof TAuthForm, { message: issue.message })
      })
      return
    }

    try {
      await registerUser({ email: values.email, password: values.password })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes('email_already_used') || errorMessage.includes('unique')) {
        setError('root', { message: t.emailAlreadyUsed })
      } else {
        setError('root', { message: t.registerError })
      }
      return
    }

    setIsNewRegistration(true)
    await sendOTPMutation.mutateAsync(values.email)
    setStep('otp')
  }

  const handleVerifyOTP = async (code: string) => {
    await verifyOTPMutation.mutateAsync({ email, code })
    await login({ email, password })
    router.push(isNewRegistration ? '/onboarding' : '/')
  }

  const handleResendOTP = async () => {
    await sendOTPMutation.mutateAsync(email)
  }

  const handleBackToForm = () => {
    setStep('form')
  }

  const handleModeChange = (newMode: TAuthMode) => {
    clearErrors()
    setMode(newMode)
  }

  if (step === 'otp') {
    return (
      <OTPStep
        translations={t}
        email={email}
        isVerifying={verifyOTPMutation.isPending || isLoading}
        isResending={sendOTPMutation.isPending}
        onVerify={handleVerifyOTP}
        onResend={handleResendOTP}
        onBack={handleBackToForm}
      />
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-140px)] items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader translations={t} mode={mode} />

        <div className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <LoginForm
                key="login"
                translations={t}
                register={register}
                errors={errors}
                isLoading={isLoading || sendOTPMutation.isPending}
                onSubmit={handleLogin}
              />
            ) : (
              <RegisterForm
                key="register"
                translations={t}
                register={register}
                errors={errors}
                isLoading={isLoading || sendOTPMutation.isPending}
                onSubmit={handleRegister}
              />
            )}
          </AnimatePresence>

          <OAuthButtons translations={t} />
          <AuthModeToggle translations={t} mode={mode} onModeChange={handleModeChange} />
        </div>

        <AuthBenefits translations={t} />
      </div>
    </main>
  )
}
