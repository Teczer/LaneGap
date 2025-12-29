import { getLanguage, getTranslations } from '@/lib/i18n'
import { EnemyPageClient } from './enemy-page-client'

interface IEnemyPageProps {
  params: Promise<{ id: string }>
}

const EnemyPage = async ({ params }: IEnemyPageProps) => {
  const { id } = await params
  const t = await getTranslations()
  const language = await getLanguage()

  return <EnemyPageClient id={id} translations={t} language={language} />
}

export default EnemyPage
