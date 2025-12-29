import { getTranslations } from '@/lib/i18n'
import {
  AvatarSection,
  DeleteAccountSection,
  EmailSection,
  NameSection,
  PasswordSection,
} from '@/components/settings'

const SettingsPage = async () => {
  const t = await getTranslations()

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-2xl font-bold text-white">{t.settings.title}</h1>
      </div>

      {/* Settings Sections */}
      <div className="flex flex-col gap-4">
        <AvatarSection translations={t.settings} />
        <NameSection translations={t.settings} />
        <EmailSection translations={t.settings} />
        <PasswordSection translations={t.settings} />
        <DeleteAccountSection translations={t.settings} />
      </div>
    </main>
  )
}

export default SettingsPage
