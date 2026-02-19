export type TAuthMode = 'login' | 'register' | 'verify-otp'

export interface IAuthContext {
  mode: TAuthMode
  setMode: (mode: TAuthMode) => void
  registeredEmail: string
  setRegisteredEmail: (email: string) => void
  registeredPassword: string
  setRegisteredPassword: (password: string) => void
  isNewRegistration: boolean
  setIsNewRegistration: (value: boolean) => void
  otpValue: string
  setOtpValue: (value: string) => void
  otpError: string | null
  setOtpError: (error: string | null) => void
  switchMode: (mode: TAuthMode) => void
}
