import type { TAuthTranslations } from '@/lib/i18n'
import type { TAuthMode } from '../types'

interface IAuthHeaderProps {
  translations: TAuthTranslations
  mode: TAuthMode
}

export const AuthHeader = ({ translations: t, mode }: IAuthHeaderProps) => {
  const isLogin = mode === 'login'

  return (
    <div className="mb-8 text-center">
      <h1 className="mb-2 text-3xl font-bold text-white">
        {isLogin ? t.welcomeBack : t.createAccount}
      </h1>
      <p className="text-white/60">{isLogin ? t.loginSubtitle : t.registerSubtitle}</p>
    </div>
  )
}
