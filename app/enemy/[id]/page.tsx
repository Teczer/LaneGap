'use client'

import { use, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { PageContainer } from '@/components/layout/page-container.component'
import { ChampionIcon } from '@/components/champion/champion-icon.component'
import { ChampionCard } from '@/components/champion/champion-card.component'
import { TipList } from '@/components/matchup/tip-list.component'
import { LevelSpikeTimeline } from '@/components/matchup/level-spike-timeline.component'
import { ItemSpikeList } from '@/components/matchup/item-spike-list.component'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDatabase } from '@/hooks/use-database.hook'
import { useFavoritesStore } from '@/app/store/favorites.store'
import { useSettingsStore } from '@/app/store/settings.store'
import { cn } from '@/lib/utils'
import {
  LuArrowLeft,
  LuStar,
  LuShield,
  LuTrendingUp,
  LuBox,
  LuTarget,
} from 'react-icons/lu'
import type { TTier } from '@/lib/types'

interface IEnemyPageProps {
  params: Promise<{ id: string }>
}

const TIER_ORDER: TTier[] = ['S', 'A+', 'A', 'B+', 'B', 'B-', 'C']

export default function EnemyPage({ params }: IEnemyPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { champions, getChampion } = useDatabase()
  const language = useSettingsStore((s) => s.language)
  const favoriteChampions = useFavoritesStore((s) => s.favoriteChampions)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)

  const enemy = getChampion(id)
  const isFavorite = favoriteChampions.includes(id)

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

  if (!enemy) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="mb-4 text-lg text-white/60">Champion not found</p>
          <Button variant="secondary" onClick={() => router.push('/')}>
            <LuArrowLeft className="h-4 w-4" />
            {language === 'en' ? 'Back to home' : "Retour à l'accueil"}
          </Button>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <LuArrowLeft className="h-4 w-4" />
          </Button>
          <ChampionIcon championId={enemy.id} size="xl" />
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-red-400">
              {language === 'en' ? 'Facing Enemy' : 'Face à'}
            </p>
            <h1 className="text-2xl font-bold">{enemy.name[language]}</h1>
            <p className="text-sm text-white/50">
              {language === 'en' ? 'Updated' : 'MAJ'}: {enemy.dateEdited}
            </p>
          </div>
        </div>
        <Button
          variant={isFavorite ? 'primary' : 'secondary'}
          onClick={() => toggleFavorite(enemy.id)}
        >
          <LuStar className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          {isFavorite
            ? language === 'en'
              ? 'Favorited'
              : 'Favori'
            : language === 'en'
              ? 'Add favorite'
              : 'Ajouter favori'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Counters - Who to pick */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuShield className="h-4 w-4 text-emerald-400" />
              {language === 'en'
                ? `Best picks against ${enemy.name[language]}`
                : `Meilleurs picks contre ${enemy.name[language]}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {countersWithData.length === 0 ? (
              <p className="text-sm italic text-white/40">
                {language === 'en' ? 'No counters documented' : 'Aucun counter documenté'}
              </p>
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
              <LuTarget className="h-4 w-4 text-red-400" />
              {language === 'en'
                ? `How to play against ${enemy.name[language]}`
                : `Comment jouer contre ${enemy.name[language]}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TipList tips={enemy.tips} />
          </CardContent>
        </Card>

        {/* Enemy Level Spikes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuTrendingUp className="h-4 w-4 text-cyan-400" />
              {language === 'en'
                ? `${enemy.name[language]} Power Spikes`
                : `Power Spikes de ${enemy.name[language]}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LevelSpikeTimeline spikes={enemy.levelSpikes} />
          </CardContent>
        </Card>

        {/* Enemy Item Spikes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuBox className="h-4 w-4 text-orange-400" />
              {language === 'en'
                ? `${enemy.name[language]} Item Spikes`
                : `Item Spikes de ${enemy.name[language]}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ItemSpikeList spikes={enemy.itemSpikes} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

