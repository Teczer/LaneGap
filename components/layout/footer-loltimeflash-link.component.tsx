'use client'

import { useTranslations } from '@/hooks/use-translations.hook'

export function FooterLolTimeFlashLink() {
  const { t } = useTranslations()

  return (
    <a
      href="https://loltimeflash.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 transition-all hover:border-amber-500/40 hover:bg-amber-500/10"
    >
      <span className="text-white/60 transition-colors group-hover:text-white/80">
        {t('footer.loltimeflash')}
      </span>
      <span className="font-medium text-amber-400">LolTimeFlash</span>
    </a>
  )
}

