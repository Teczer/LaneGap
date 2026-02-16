'use client'

import { useRouter } from 'next/navigation'
import { setLanguage } from '@/lib/i18n/actions'
import type { TLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface ILanguageToggleProps {
  currentLanguage: TLanguage
  className?: string
}

export const LanguageToggle = ({ currentLanguage, className }: ILanguageToggleProps) => {
  const router = useRouter()

  const handleChange = async (lang: TLanguage) => {
    if (lang === currentLanguage) return
    await setLanguage(lang)
    router.refresh()
  }

  return (
    <div className={cn('flex items-center rounded-lg bg-white/5 p-0.5', className)}>
      <button
        onClick={() => handleChange('en')}
        className={cn(
          'rounded-md px-2 py-1 text-xs font-medium transition-all',
          currentLanguage === 'en'
            ? 'bg-white/10 text-white'
            : 'text-white/40 hover:text-white/60'
        )}
      >
        EN
      </button>
      <button
        onClick={() => handleChange('fr')}
        className={cn(
          'rounded-md px-2 py-1 text-xs font-medium transition-all',
          currentLanguage === 'fr'
            ? 'bg-white/10 text-white'
            : 'text-white/40 hover:text-white/60'
        )}
      >
        FR
      </button>
    </div>
  )
}
