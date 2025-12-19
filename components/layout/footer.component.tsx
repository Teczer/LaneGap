import { LuTimer } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/hooks/use-translations.hook'

interface IFooterProps {
  className?: string
}

export function Footer({ className }: IFooterProps) {
  const { t } = useTranslations()

  return (
    <footer className={cn('border-t border-white/5 bg-[#0a0d17] py-5', className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/40 sm:flex-row sm:text-left">
          <div className="flex flex-col gap-1">
            <p>LANEGAP - Midlane Coaching Tool</p>
            <p>Not affiliated with Riot Games.</p>
          </div>

          {/* LolTimeFlash Promo */}
          <a
            href="https://loltimeflash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 transition-all hover:border-amber-500/40 hover:bg-amber-500/10"
          >
            <LuTimer className="h-4 w-4 text-amber-400" />
            <span className="text-white/60 transition-colors group-hover:text-white/80">
              {t('footer.loltimeflash')}
            </span>
            <span className="font-medium text-amber-400">LolTimeFlash</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
