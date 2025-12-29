import type { TFooterTranslations } from '@/lib/i18n'
import { Logo } from '@/components/ui/logo'

interface IFooterBrandingProps {
  translations: TFooterTranslations
}

export const FooterBranding = ({ translations: t }: IFooterBrandingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Logo size="sm" className="text-primary/60" />
        <span className="font-medium text-white/60">LANEGAP</span>
      </div>
      <p className="max-w-xs text-white/40">{t.tagline}</p>
      <p className="text-white/25">{t.disclaimer}</p>
    </div>
  )
}
