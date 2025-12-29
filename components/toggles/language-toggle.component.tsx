'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleLanguage } from '@/lib/i18n/actions'
import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/app/store/settings.store'

export const LanguageToggle = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const language = useSettingsStore((s) => s.language)
  const setLanguage = useSettingsStore((s) => s.setLanguage)

  const handleToggle = () => {
    startTransition(async () => {
      // Call Server Action to update cookie
      const newLanguage = await toggleLanguage()
      // Sync Zustand store
      setLanguage(newLanguage)
      // Refresh to get new SSR content
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        'flex h-9 cursor-pointer items-center rounded-lg bg-white/5 p-1',
        'text-sm font-medium transition-all duration-200',
        'hover:bg-white/10',
        isPending && 'opacity-50'
      )}
      title="Toggle language"
    >
      <span
        className={cn(
          'flex h-7 w-9 items-center justify-center rounded-md transition-all duration-200',
          language === 'en' ? 'bg-primary text-primary-foreground' : 'text-foreground-subtle'
        )}
      >
        EN
      </span>
      <span
        className={cn(
          'flex h-7 w-9 items-center justify-center rounded-md transition-all duration-200',
          language === 'fr' ? 'bg-primary text-primary-foreground' : 'text-foreground-subtle'
        )}
      >
        FR
      </span>
    </button>
  )
}
