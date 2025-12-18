'use client'

import { useTranslations } from '@/hooks/use-translations.hook'
import {
  AvatarSection,
  DeleteAccountSection,
  EmailSection,
  NameSection,
  PasswordSection,
} from '@/components/settings'

export default function SettingsPage() {
  const { t } = useTranslations()

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-2xl font-bold text-white">{t('settings.title')}</h1>
      </div>

      {/* Settings Sections */}
      <div className="flex flex-col gap-4">
        <AvatarSection />
        <NameSection />
        <EmailSection />
        <PasswordSection />
        <DeleteAccountSection />
      </div>
    </main>
  )
}
