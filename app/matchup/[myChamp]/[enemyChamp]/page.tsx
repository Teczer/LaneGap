'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { PageContainer } from '@/components/layout/page-container.component'
import { ChampionIcon } from '@/components/champion/champion-icon.component'
import { TipList } from '@/components/matchup/tip-list.component'
import { LevelSpikeTimeline } from '@/components/matchup/level-spike-timeline.component'
import { ItemSpikeList } from '@/components/matchup/item-spike-list.component'
import { TierBadge } from '@/components/matchup/tier-badge.component'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDatabase } from '@/hooks/use-database.hook'
import { useSettingsStore } from '@/app/store/settings.store'
import {
  LuArrowLeft,
  LuSwords,
  LuTarget,
  LuTrendingUp,
  LuBox,
  LuCircleAlert,
  LuSparkles,
} from 'react-icons/lu'
import type { TTier } from '@/lib/types'

interface IMatchupPageProps {
  params: Promise<{ myChamp: string; enemyChamp: string }>
}

export default function MatchupPage({ params }: IMatchupPageProps) {
  const { myChamp, enemyChamp } = use(params)
  const router = useRouter()
  const { getChampion, getMatchup } = useDatabase()
  const language = useSettingsStore((s) => s.language)

  const myChampion = getChampion(myChamp)
  const enemy = getChampion(enemyChamp)
  const matchup = getMatchup(myChamp, enemyChamp)

  // Find the tier for this matchup (from enemy's counter list)
  const getTier = (): TTier | null => {
    if (!enemy?.countersWholeGame) return null
    const tiers: TTier[] = ['S', 'A+', 'A', 'B+', 'B', 'B-', 'C']
    for (const tier of tiers) {
      const counters = enemy.countersWholeGame[tier]
      if (counters?.includes(myChamp)) {
        return tier
      }
    }
    return null
  }
  const tier = getTier()

  if (!myChampion || !enemy) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <LuCircleAlert className="mb-4 h-12 w-12 text-red-500/60" />
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
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
          <LuArrowLeft className="h-4 w-4" />
          {language === 'en' ? 'Back' : 'Retour'}
        </Button>

        {/* VS Display */}
        <div className="flex items-center justify-center gap-8">
          {/* My Champion */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium tracking-wider text-emerald-400 uppercase">
              {language === 'en' ? 'Playing as' : 'Tu joues'}
            </p>
            <ChampionIcon championId={myChampion.id} size="xl" />
            <span className="font-semibold text-white">{myChampion.name[language]}</span>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center gap-2">
            <LuSwords className="h-8 w-8 text-violet-400" />
            <span className="text-sm text-white/40">VS</span>
            {tier && <TierBadge tier={tier} size="lg" />}
          </div>

          {/* Enemy Champion */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium tracking-wider text-red-400 uppercase">
              {language === 'en' ? 'Enemy' : 'Ennemi'}
            </p>
            <ChampionIcon championId={enemy.id} size="xl" />
            <span className="font-semibold text-white">{enemy.name[language]}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Specific Matchup Tips */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuSwords className="h-4 w-4 text-emerald-400" />
              {language === 'en'
                ? `How to beat ${enemy.name[language]} as ${myChampion.name[language]}`
                : `Comment battre ${enemy.name[language]} avec ${myChampion.name[language]}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {matchup && matchup.tips[language].length > 0 ? (
              <TipList tips={matchup.tips} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-8 text-center">
                <LuSparkles className="mb-3 h-8 w-8 text-violet-400/60" />
                <p className="text-sm text-white/50">
                  {language === 'en'
                    ? 'Specific tips coming soon...'
                    : 'Tips spécifiques à venir...'}
                </p>
                <p className="mt-1 text-xs text-white/30">
                  {language === 'en'
                    ? 'Check the general tips below for now'
                    : 'Consulte les tips généraux ci-dessous en attendant'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* General Tips vs Enemy */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuTarget className="h-4 w-4 text-red-400" />
              {language === 'en'
                ? `How to beat ${enemy.name[language]}`
                : `Comment battre ${enemy.name[language]}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enemy.tips[language].length > 0 ? (
              <TipList tips={enemy.tips} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-8 text-center">
                <LuSparkles className="mb-3 h-8 w-8 text-violet-400/60" />
                <p className="text-sm text-white/50">
                  {language === 'en' ? 'Tips coming soon...' : 'Tips à venir...'}
                </p>
              </div>
            )}
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
            {enemy.levelSpikes.length > 0 ? (
              <LevelSpikeTimeline spikes={enemy.levelSpikes} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-6 text-center">
                <LuSparkles className="mb-2 h-6 w-6 text-violet-400/60" />
                <p className="text-sm text-white/50">
                  {language === 'en' ? 'Coming soon...' : 'À venir...'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enemy Item Spikes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuBox className="h-4 w-4 text-orange-400" />
              {language === 'en'
                ? `${enemy.name[language]} Item Spikes`
                : `Item Spikes de ${enemy.name[language]}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enemy.itemSpikes.length > 0 ? (
              <ItemSpikeList spikes={enemy.itemSpikes} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-6 text-center">
                <LuSparkles className="mb-2 h-6 w-6 text-violet-400/60" />
                <p className="text-sm text-white/50">
                  {language === 'en' ? 'Coming soon...' : 'À venir...'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
