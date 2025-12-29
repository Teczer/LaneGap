import type { TFooterTranslations } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { FooterBranding } from './footer-branding.component'
import { FooterLolTimeFlashLink } from './footer-loltimeflash-link.component'

interface IFooterProps {
  translations: TFooterTranslations
  className?: string
}

export const Footer = ({ translations, className }: IFooterProps) => {
  return (
    <footer className={cn('bg-background border-t border-white/5 py-5', className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/40 sm:flex-row sm:text-left">
          <FooterBranding />
          <FooterLolTimeFlashLink label={translations.loltimeflash} />
        </div>
      </div>
    </footer>
  )
}
