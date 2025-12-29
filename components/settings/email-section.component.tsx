'use client'

import Link from 'next/link'
import type { TSettingsTranslations } from '@/lib/i18n'
import { useAuthStore } from '@/app/store/auth.store'
import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from './settings-card.component'

interface IEmailSectionProps {
  translations: TSettingsTranslations
}

export const EmailSection = ({ translations: t }: IEmailSectionProps) => {
  const user = useAuthStore((s) => s.user)

  if (!user) return null

  return (
    <SettingsCard>
      <SettingsCardHeader title={t.email} description={t.emailDescription} />
      <SettingsCardContent>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white">{user.email}</span>
          <span className="rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">
            {t.verified}
          </span>
        </div>
      </SettingsCardContent>
      <Link className="block hover:bg-white/5" href={`mailto:mehdi.hattou1@gmail.com`}>
        <SettingsCardFooter hint={t.emailHint} />
      </Link>
    </SettingsCard>
  )
}
