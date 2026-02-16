import { getLanguage } from '@/lib/i18n'
import { PrivacyPageClient } from './privacy-page-client'

const PrivacyPage = async () => {
  const language = await getLanguage()

  return <PrivacyPageClient language={language} />
}

export default PrivacyPage
