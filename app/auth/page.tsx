import { getTranslations } from '@/lib/i18n'
import { AuthPageClient } from './auth-page-client'

const AuthPage = async () => {
  const t = await getTranslations()

  return <AuthPageClient translations={t.auth} />
}

export default AuthPage
