'use client'

import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/app/store/settings.store'

export function LanguageToggle() {
  const language = useSettingsStore((s) => s.language)
  const toggleLanguage = useSettingsStore((s) => s.toggleLanguage)

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'flex h-9 cursor-pointer items-center rounded-lg bg-white/5 p-1',
        'text-sm font-medium transition-all duration-200',
        'hover:bg-white/10'
      )}
      title="Toggle language"
    >
      <span
        className={cn(
          'flex h-7 w-9 items-center justify-center rounded-md transition-all duration-200',
          language === 'en' ? 'bg-violet-600 text-white' : 'text-white/50'
        )}
      >
        EN
      </span>
      <span
        className={cn(
          'flex h-7 w-9 items-center justify-center rounded-md transition-all duration-200',
          language === 'fr' ? 'bg-violet-600 text-white' : 'text-white/50'
        )}
      >
        FR
      </span>
    </button>
  )
}
