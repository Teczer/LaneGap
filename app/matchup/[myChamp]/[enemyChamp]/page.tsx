'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import {
  LuArrowLeft,
  LuBox,
  LuCircleAlert,
  LuLoader,
  LuSparkles,
  LuSwords,
  LuTarget,
  LuTrendingUp,
} from 'react-icons/lu'
import type { TTier } from '@/lib/types'
import {
  useChampion,
  useCreateMatchupNote,
  useDeleteNote,
  useMatchup,
  useMatchupNotes,
  useUpdateNote,
} from '@/hooks/queries'
import { useTranslations } from '@/hooks/use-translations.hook'
import { ChampionIcon } from '@/components/champion/champion-icon.component'
import { PageContainer } from '@/components/layout/page-container.component'
import { ItemSpikeList } from '@/components/matchup/item-spike-list.component'
import { LevelSpikeTimeline } from '@/components/matchup/level-spike-timeline.component'
import { TierBadge } from '@/components/matchup/tier-badge.component'
import { TipList } from '@/components/matchup/tip-list.component'
import { PersonalNotes } from '@/components/notes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface IMatchupPageProps {
  params: Promise<{ myChamp: string; enemyChamp: string }>
}

export default function MatchupPage({ params }: IMatchupPageProps) {
  const { myChamp, enemyChamp } = use(params)
  const router = useRouter()
  const { data: myChampion, isLoading: isLoadingMyChamp } = useChampion(myChamp)
  const { data: enemy, isLoading: isLoadingEnemy } = useChampion(enemyChamp)
  const { data: matchup } = useMatchup(myChamp, enemyChamp)
  const { t, language } = useTranslations()

  // Notes hooks
  const { data: notes = [], isLoading: isLoadingNotes } = useMatchupNotes(myChamp, enemyChamp)
  const createNoteMutation = useCreateMatchupNote(myChamp, enemyChamp)
  const updateNoteMutation = useUpdateNote()
  const deleteNoteMutation = useDeleteNote()

  const isLoading = isLoadingMyChamp || isLoadingEnemy

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

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center py-20">
          <LuLoader className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      </PageContainer>
    )
  }

  if (!myChampion || !enemy) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <LuCircleAlert className="mb-4 h-12 w-12 text-red-500/60" />
          <p className="mb-4 text-lg text-white/60">{t('common.championNotFound')}</p>
          <Button variant="secondary" onClick={() => router.push('/')}>
            <LuArrowLeft className="h-4 w-4" />
            {t('common.backToHome')}
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
          {t('common.back')}
        </Button>

        {/* VS Display */}
        <div className="flex items-center justify-center gap-8">
          {/* My Champion */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium tracking-wider text-emerald-400 uppercase">
              {t('matchup.playingAs')}
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
              {t('matchup.enemy')}
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
              {t('matchup.howToBeatWith', {
                enemy: enemy.name[language],
                myChamp: myChampion.name[language],
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {matchup && matchup.tips[language].length > 0 ? (
              <TipList tips={matchup.tips} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-8 text-center">
                <LuSparkles className="mb-3 h-8 w-8 text-violet-400/60" />
                <p className="text-sm text-white/50">{t('common.specificTipsComingSoon')}</p>
                <p className="mt-1 text-xs text-white/30">{t('common.checkGeneralTips')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* General Tips vs Enemy */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuTarget className="h-4 w-4 text-red-400" />
              {t('matchup.howToBeat', { enemy: enemy.name[language] })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enemy.tips[language].length > 0 ? (
              <TipList tips={enemy.tips} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-8 text-center">
                <LuSparkles className="mb-3 h-8 w-8 text-violet-400/60" />
                <p className="text-sm text-white/50">{t('common.tipsComingSoon')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enemy Level Spikes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuTrendingUp className="h-4 w-4 text-cyan-400" />
              {t('matchup.powerSpikes', { champion: enemy.name[language] })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enemy.levelSpikes.length > 0 ? (
              <LevelSpikeTimeline spikes={enemy.levelSpikes} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-6 text-center">
                <LuSparkles className="mb-2 h-6 w-6 text-violet-400/60" />
                <p className="text-sm text-white/50">{t('common.comingSoon')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enemy Item Spikes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuBox className="h-4 w-4 text-orange-400" />
              {t('matchup.itemSpikes', { champion: enemy.name[language] })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enemy.itemSpikes.length > 0 ? (
              <ItemSpikeList spikes={enemy.itemSpikes} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-6 text-center">
                <LuSparkles className="mb-2 h-6 w-6 text-violet-400/60" />
                <p className="text-sm text-white/50">{t('common.comingSoon')}</p>
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
          title={t('notes.myNotesMatchup')}
          className="lg:col-span-2"
        />
      </div>
    </PageContainer>
  )
}
