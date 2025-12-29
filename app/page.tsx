import { getLanguage, getTranslations } from '@/lib/i18n'
import { HomePageClient } from './home-page-client'

const HomePage = async () => {
  const t = await getTranslations()
  const language = await getLanguage()

  return <HomePageClient translations={t} language={language} />
}

export default HomePage
