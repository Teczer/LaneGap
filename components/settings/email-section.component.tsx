import Link from 'next/link'
import { useTranslations } from '@/hooks/use-translations.hook'
import { useAuthStore } from '@/app/store/auth.store'
import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from './settings-card.component'

export function EmailSection() {
  const { t } = useTranslations()
  const user = useAuthStore((s) => s.user)

  if (!user) return null

  return (
    <SettingsCard>
      <SettingsCardHeader
        title={t('settings.email')}
        description={t('settings.emailDescription')}
      />
      <SettingsCardContent>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white">{user.email}</span>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
            {t('settings.verified')}
          </span>
        </div>
      </SettingsCardContent>
      <Link className="block hover:bg-white/5" href={`mailto:mehdi.hattou1@gmail.com`}>
        <SettingsCardFooter hint={t('settings.emailHint')} />
      </Link>
    </SettingsCard>
  )
}
