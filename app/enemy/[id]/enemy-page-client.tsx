'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  LuArrowLeft,
  LuBox,
  LuLoader,
  LuShield,
  LuSparkles,
  LuStar,
  LuTarget,
  LuTrendingUp,
} from 'react-icons/lu'
import type { TLanguage, TTranslations } from '@/lib/i18n'
import type { TTier } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  useChampion,
  useChampions,
  useCreateEnemyNote,
  useDeleteNote,
  useEnemyNotes,
  useUpdateNote,
} from '@/hooks/queries'
import { ChampionCard } from '@/components/champion/champion-card.component'
import { ChampionIcon } from '@/components/champion/champion-icon.component'
import { ChampionBackground, PageContainer } from '@/components/layout'
import { ItemSpikeList } from '@/components/matchup/item-spike-list.component'
import { LevelSpikeTimeline } from '@/components/matchup/level-spike-timeline.component'
import { TipList } from '@/components/matchup/tip-list.component'
import { PersonalNotes } from '@/components/notes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFavoritesStore } from '@/app/store/favorites.store'

interface IEnemyPageClientProps {
  id: string
  translations: TTranslations
  language: TLanguage
}

const TIER_ORDER: TTier[] = ['S', 'A+', 'A', 'B+', 'B', 'B-', 'C']

export const EnemyPageClient = ({ id, translations: t, language }: IEnemyPageClientProps) => {
  const router = useRouter()
  const { data: champions = [] } = useChampions()
  const { data: enemy, isLoading } = useChampion(id)
  const favoriteChampions = useFavoritesStore((s) => s.favoriteChampions)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)

  const isFavorite = favoriteChampions.includes(id)

  // Notes hooks
  const { data: notes = [], isLoading: isLoadingNotes } = useEnemyNotes(id)
  const createNoteMutation = useCreateEnemyNote(id)
  const updateNoteMutation = useUpdateNote()
  const deleteNoteMutation = useDeleteNote()

  // Get counters (champions that are GOOD against this enemy)
  const countersWithData = useMemo(() => {
    if (!enemy?.countersWholeGame) return []

    const result: { champion: typeof enemy; tier: TTier }[] = []

    for (const tier of TIER_ORDER) {
      const counters = enemy.countersWholeGame[tier] ?? []
      for (const counterId of counters) {
        const counterChamp = champions.find((c) => c.id === counterId)
        if (counterChamp) {
          result.push({ champion: counterChamp, tier })
        }
      }
    }

    return result
  }, [enemy, champions])

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center py-20">
          <LuLoader className="text-primary-light h-8 w-8 animate-spin" />
        </div>
      </PageContainer>
    )
  }

  if (!enemy) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="mb-4 text-lg text-white/60">{t.common.championNotFound}</p>
          <Button variant="secondary" onClick={() => router.push('/')}>
            <LuArrowLeft className="h-4 w-4" />
            {t.common.backToHome}
          </Button>
        </div>
      </PageContainer>
    )
  }

  const championName = enemy.name[language]

  return (
    <>
      <ChampionBackground championId={enemy.id} />
      <PageContainer>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <LuArrowLeft className="h-4 w-4" />
          </Button>
          <ChampionIcon championId={enemy.id} size="xl" />
          <div>
            <p className="text-danger mb-1 text-xs font-medium tracking-wider uppercase">
              {t.enemy.facingEnemy}
            </p>
            <h1 className="text-2xl font-bold">{championName}</h1>
            <p className="text-sm text-white/50">
              {t.enemy.updated}: {enemy.dateEdited}
            </p>
          </div>
        </div>
        <Button
          variant={isFavorite ? 'primary' : 'secondary'}
          onClick={() => toggleFavorite(enemy.id)}
        >
          <LuStar className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          {isFavorite ? t.enemy.favorited : t.enemy.addFavorite}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Counters - Who to pick */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuShield className="text-success h-4 w-4" />
              {t.enemy.bestPicks.replace('{champion}', championName)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {countersWithData.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-8 text-center">
                <LuSparkles className="text-primary-light/60 mb-3 h-8 w-8" />
                <p className="text-sm text-white/50">{t.common.counterPicksComingSoon}</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
                {countersWithData.map(({ champion: c, tier }) => (
                  <ChampionCard
                    key={c.id}
                    championId={c.id}
                    name={c.name}
                    tier={tier}
                    href={`/matchup/${c.id}/${enemy.id}`}
                    compact
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips vs Enemy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuTarget className="text-danger h-4 w-4" />
              {t.enemy.howToPlay.replace('{champion}', championName)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enemy.tips[language].length > 0 ? (
              <TipList tips={enemy.tips} language={language} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-8 text-center">
                <LuSparkles className="text-primary-light/60 mb-3 h-8 w-8" />
                <p className="text-sm text-white/50">{t.common.tipsComingSoon}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enemy Level Spikes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuTrendingUp className="text-info h-4 w-4" />
              {t.enemy.powerSpikes.replace('{champion}', championName)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enemy.levelSpikes.length > 0 ? (
              <LevelSpikeTimeline spikes={enemy.levelSpikes} language={language} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-6 text-center">
                <LuSparkles className="text-primary-light/60 mb-2 h-6 w-6" />
                <p className="text-sm text-white/50">{t.common.comingSoon}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enemy Item Spikes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuBox className="text-accent-gold h-4 w-4" />
              {t.enemy.itemSpikes.replace('{champion}', championName)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enemy.itemSpikes.length > 0 ? (
              <ItemSpikeList spikes={enemy.itemSpikes} language={language} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-6 text-center">
                <LuSparkles className="text-primary-light/60 mb-2 h-6 w-6" />
                <p className="text-sm text-white/50">{t.common.comingSoon}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personal Notes */}
        <PersonalNotes
          notes={notes}
          isLoading={isLoadingNotes}
          onAddNote={async (content) => {
            await createNoteMutation.mutateAsync(content)
          }}
          onUpdateNote={async (noteId, content) => {
            await updateNoteMutation.mutateAsync({ noteId, content })
          }}
          onDeleteNote={async (noteId) => {
            await deleteNoteMutation.mutateAsync(noteId)
          }}
          title={t.notes.myNotesEnemy.replace('{champion}', championName)}
          translations={t.notes}
          className="lg:col-span-2"
        />
      </div>
    </PageContainer>
    </>
  )
}
