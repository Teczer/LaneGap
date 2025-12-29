import { getLanguage, getTranslations } from '@/lib/i18n'
import { MatchupPageClient } from './matchup-page-client'

interface IMatchupPageProps {
  params: Promise<{ myChamp: string; enemyChamp: string }>
}

const MatchupPage = async ({ params }: IMatchupPageProps) => {
  const { myChamp, enemyChamp } = await params
  const t = await getTranslations()
  const language = await getLanguage()

  return (
    <MatchupPageClient
      myChamp={myChamp}
      enemyChamp={enemyChamp}
      translations={t}
      language={language}
    />
  )
}

export default MatchupPage
