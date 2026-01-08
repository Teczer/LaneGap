import { LuYoutube } from 'react-icons/lu'
import type { TFooterTranslations } from '@/lib/i18n'
import { Logo } from '@/components/ui/logo'

interface IFooterBrandingProps {
  translations: TFooterTranslations
}

export const FooterBranding = ({ translations: t }: IFooterBrandingProps) => {
  return (
    <div className="flex flex-col items-center gap-2 sm:items-start">
      <div className="flex items-center gap-2">
        <Logo size="sm" className="text-primary/60" />
        <span className="font-medium text-white/60">LANEGAP</span>
      </div>
      <p className="max-w-xs text-white/40">{t.tagline}</p>
      <p className="text-white/25">{t.disclaimer}</p>
      <p className="flex items-center justify-center gap-1.5 text-white/25 sm:justify-start">
        {t.dataCredit}{' '}
        <a
          href="https://www.youtube.com/@Midpeng"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-red-400/80 transition-colors hover:text-red-400"
        >
          <LuYoutube className="h-3.5 w-3.5" />
          <span className="font-medium">Peng</span>
        </a>
      </p>
    </div>
  )
}
