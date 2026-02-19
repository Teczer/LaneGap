'use client'

import type { TAuthTranslations } from '@/lib/i18n'
import type { TAuthMode } from '../types'

interface IAuthModeToggleProps {
  translations: TAuthTranslations
  mode: TAuthMode
  onModeChange: (mode: TAuthMode) => void
}

export const AuthModeToggle = ({ translations: t, mode, onModeChange }: IAuthModeToggleProps) => {
  const isLogin = mode === 'login'

  return (
    <div className="mt-6 text-center">
      <span className="text-white/60">{isLogin ? t.noAccount : t.hasAccount}</span>{' '}
      <button
        onClick={() => onModeChange(isLogin ? 'register' : 'login')}
        className="text-primary-light hover:text-primary cursor-pointer font-medium transition-colors"
      >
        {isLogin ? t.registerLink : t.loginLink}
      </button>
    </div>
  )
}
