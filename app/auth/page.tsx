'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  LuCheck,
  LuLoader,
  LuLock,
  LuLogIn,
  LuMail,
  LuMailCheck,
  LuRefreshCw,
  LuSparkles,
  LuUser,
} from 'react-icons/lu'
import {
  type TLoginForm,
  type TRegisterForm,
  loginSchema,
  registerSchema,
} from '@/lib/validations/auth.schema'
import { useSendOTP, useVerifyOTP } from '@/hooks/queries'
import { useTranslations } from '@/hooks/use-translations.hook'
import {
  Button,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  PasswordInput,
} from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'

type TAuthMode = 'login' | 'register' | 'verify-otp'

export default function AuthPage() {
  const router = useRouter()
  const { t } = useTranslations()
  const { login, register: registerUser, isLoading } = useAuthStore()

  const sendOTPMutation = useSendOTP()
  const verifyOTPMutation = useVerifyOTP()

  const [mode, setMode] = useState<TAuthMode>('login')
  const [registeredEmail, setRegisteredEmail] = useState('')
  const [registeredPassword, setRegisteredPassword] = useState('') // Store for auto-login after OTP
  const [otpValue, setOtpValue] = useState('')
  const [otpError, setOtpError] = useState<string | null>(null)

  const loginForm = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const registerForm = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  })

  const onLoginSubmit = async (data: TLoginForm) => {
    try {
      await login(data.email, data.password)
      router.push('/')
    } catch {
      loginForm.setError('root', { message: t('auth.loginError') })
    }
  }

  const onRegisterSubmit = async (data: TRegisterForm) => {
    try {
      await registerUser(data.email, data.password, data.username)
      await sendOTPMutation.mutateAsync(data.email)
      setRegisteredEmail(data.email)
      setRegisteredPassword(data.password) // Store for auto-login after OTP
      setMode('verify-otp')
    } catch {
      registerForm.setError('root', { message: t('auth.registerError') })
    }
  }

  const handleVerifyOTP = async () => {
    if (otpValue.length !== 6) {
      setOtpError(t('auth.otpIncomplete'))
      return
    }

    setOtpError(null)

    try {
      await verifyOTPMutation.mutateAsync({ email: registeredEmail, code: otpValue })
      // Auto-login after successful OTP verification
      await login(registeredEmail, registeredPassword)
      setRegisteredPassword('') // Clear password from memory
      router.push('/')
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : t('auth.otpInvalid'))
    }
  }

  const handleResendOTP = async () => {
    setOtpError(null)
    try {
      await sendOTPMutation.mutateAsync(registeredEmail)
    } catch {
      setOtpError(t('auth.resendError'))
    }
  }

  const switchMode = (newMode: TAuthMode) => {
    setMode(newMode)
    loginForm.reset()
    registerForm.reset()
    setOtpValue('')
    setOtpError(null)
    setRegisteredPassword('') // Clear password from memory
  }

  // OTP Verification Screen
  if (mode === 'verify-otp') {
    return (
      <main className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center">
            {/* Icon */}
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10">
              <LuMailCheck className="h-10 w-10 text-violet-400" />
            </div>

            {/* Title */}
            <h1 className="mb-2 text-2xl font-bold text-white">{t('auth.verifyEmailTitle')}</h1>
            <p className="mb-1 text-white/60">{t('auth.otpSentTo')}</p>
            <p className="mb-8 font-medium text-violet-400">{registeredEmail}</p>

            {/* OTP Input */}
            <div className="mb-6 flex justify-center">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) => {
                  setOtpValue(value)
                  setOtpError(null)
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <div className="mx-2 text-white/30">-</div>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Error */}
            {otpError && <p className="mb-4 text-sm text-red-400">{otpError}</p>}

            {/* Verify Button */}
            <Button
              onClick={handleVerifyOTP}
              isLoading={verifyOTPMutation.isPending}
              disabled={otpValue.length !== 6}
              className="mb-4 w-full"
            >
              <LuCheck className="h-5 w-5" />
              {t('auth.verifyButton')}
            </Button>

            {/* Resend */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/50">
              <span>{t('auth.didntReceive')}</span>
              <button
                onClick={handleResendOTP}
                disabled={sendOTPMutation.isPending}
                className="inline-flex cursor-pointer items-center gap-1 font-medium text-violet-400 transition-colors hover:text-violet-300 disabled:opacity-50"
              >
                {sendOTPMutation.isPending ? (
                  <LuLoader className="h-3 w-3 animate-spin" />
                ) : (
                  <LuRefreshCw className="h-3 w-3" />
                )}
                {t('auth.resendCode')}
              </button>
            </div>

            {/* Hint */}
            <p className="mt-6 text-xs text-white/30">{t('auth.otpHint')}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-400">
            <LuSparkles className="h-4 w-4" />
            {t('auth.personalNotes')}
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">
            {mode === 'login' ? t('auth.welcomeBack') : t('auth.createAccount')}
          </h1>
          <p className="text-white/60">
            {mode === 'login' ? t('auth.loginSubtitle') : t('auth.registerSubtitle')}
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
          {mode === 'login' ? (
            // LOGIN FORM
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <Input
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                icon={<LuMail className="h-5 w-5" />}
                error={loginForm.formState.errors.email?.message}
                {...loginForm.register('email')}
              />

              <PasswordInput
                placeholder={t('auth.passwordPlaceholder')}
                icon={<LuLock className="h-5 w-5" />}
                error={loginForm.formState.errors.password?.message}
                {...loginForm.register('password')}
              />

              {loginForm.formState.errors.root && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {loginForm.formState.errors.root.message}
                </div>
              )}

              <Button type="submit" isLoading={isLoading} className="w-full">
                <LuLogIn className="h-5 w-5" />
                {t('auth.loginButton')}
              </Button>
            </form>
          ) : (
            // REGISTER FORM
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <Input
                type="text"
                placeholder={t('auth.usernamePlaceholder')}
                icon={<LuUser className="h-5 w-5" />}
                error={registerForm.formState.errors.username?.message}
                {...registerForm.register('username')}
              />

              <Input
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                icon={<LuMail className="h-5 w-5" />}
                error={registerForm.formState.errors.email?.message}
                {...registerForm.register('email')}
              />

              <PasswordInput
                placeholder={t('auth.passwordPlaceholder')}
                icon={<LuLock className="h-5 w-5" />}
                error={registerForm.formState.errors.password?.message}
                {...registerForm.register('password')}
              />

              <PasswordInput
                placeholder={t('auth.confirmPasswordPlaceholder')}
                icon={<LuLock className="h-5 w-5" />}
                error={registerForm.formState.errors.confirmPassword?.message}
                {...registerForm.register('confirmPassword')}
              />

              {registerForm.formState.errors.root && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {registerForm.formState.errors.root.message}
                </div>
              )}

              <Button
                type="submit"
                isLoading={isLoading || sendOTPMutation.isPending}
                className="w-full"
              >
                <LuLogIn className="h-5 w-5" />
                {t('auth.registerButton')}
              </Button>
            </form>
          )}

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <span className="text-white/60">
              {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}
            </span>{' '}
            <button
              onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              className="cursor-pointer font-medium text-violet-400 transition-colors hover:text-violet-300"
            >
              {mode === 'login' ? t('auth.registerLink') : t('auth.loginLink')}
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-2 text-lg">📝</div>
            <p className="text-sm text-white/60">{t('auth.benefit1')}</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-2 text-lg">☁️</div>
            <p className="text-sm text-white/60">{t('auth.benefit2')}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
