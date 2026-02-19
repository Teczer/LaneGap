import { getTranslations } from '@/lib/i18n'
import { OnboardingPageClient } from './onboarding-page-client'

const OnboardingPage = async () => {
  const t = await getTranslations()

  return <OnboardingPageClient translations={t.onboarding} />
}

export default OnboardingPage
