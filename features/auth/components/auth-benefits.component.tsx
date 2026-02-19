import type { TAuthTranslations } from '@/lib/i18n'

interface IAuthBenefitsProps {
  translations: TAuthTranslations
}

export const AuthBenefits = ({ translations: t }: IAuthBenefitsProps) => {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-white/5 bg-white/2 p-4">
        <div className="mb-2 text-lg">📝</div>
        <p className="text-sm text-white/60">{t.benefit1}</p>
      </div>
      <div className="rounded-xl border border-white/5 bg-white/2 p-4">
        <div className="mb-2 text-lg">☁️</div>
        <p className="text-sm text-white/60">{t.benefit2}</p>
      </div>
    </div>
  )
}
