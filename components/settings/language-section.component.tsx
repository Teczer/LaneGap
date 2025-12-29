'use client'

import { useRouter } from 'next/navigation'
import { setLanguage } from '@/lib/i18n/actions'
import type { TLanguage, TSettingsTranslations } from '@/lib/i18n'
import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardHeader,
} from './settings-card.component'

interface ILanguageSectionProps {
  translations: TSettingsTranslations
  currentLanguage: TLanguage
}

const LANGUAGES: { value: TLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
]

export const LanguageSection = ({
  translations: t,
  currentLanguage,
}: ILanguageSectionProps) => {
  const router = useRouter()

  const handleChange = async (lang: TLanguage) => {
    await setLanguage(lang)
    router.refresh()
  }

  return (
    <SettingsCard>
      <SettingsCardHeader title={t.language} description={t.languageDescription} />
      <SettingsCardContent>
        <div className="flex gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleChange(lang.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                currentLanguage === lang.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </SettingsCardContent>
    </SettingsCard>
  )
}

