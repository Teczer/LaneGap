'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PageContainer } from '@/components/layout/page-container.component'
import { Input } from '@/components/ui/input'
import { ChampionCard } from '@/components/champion/champion-card.component'
import { useDatabase } from '@/hooks/use-database.hook'
import { useFavoritesStore } from '@/app/store/favorites.store'
import { useTranslations } from '@/hooks/use-translations.hook'
import { cn } from '@/lib/utils'
import { LuSearch, LuStar, LuClock, LuTarget } from 'react-icons/lu'
import type { IChampion } from '@/lib/types'

export default function HomePage() {
  const router = useRouter()
  const { champions, meta } = useDatabase()
  const [search, setSearch] = useState('')
  const { t } = useTranslations()

  const favoriteChampions = useFavoritesStore((s) => s.favoriteChampions)
  const recentChampions = useFavoritesStore((s) => s.recentChampions)
  const addRecent = useFavoritesStore((s) => s.addRecent)

  const filteredChampions = useMemo(() => {
    if (!search.trim()) return champions
    const lowerQuery = search.toLowerCase()
    return champions.filter(
      (c) =>
        c.name.en.toLowerCase().includes(lowerQuery) ||
        c.name.fr.toLowerCase().includes(lowerQuery) ||
        c.id.toLowerCase().includes(lowerQuery)
    )
  }, [champions, search])

  const favoriteChampionsList = useMemo(() => {
    return champions.filter((c) => favoriteChampions.includes(c.id))
  }, [champions, favoriteChampions])

  const recentChampionsList = useMemo(() => {
    return recentChampions
      .map((id) => champions.find((c) => c.id === id))
      .filter((c): c is IChampion => c !== undefined)
  }, [champions, recentChampions])

  const handleSelect = useCallback(
    (champion: IChampion) => {
      addRecent(champion.id)
      router.push(`/enemy/${champion.id}`)
    },
    [router, addRecent]
  )

  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="animate-fade-in mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          <span className="text-white">LANE</span>
          <span className="text-gradient">GAP</span>
        </h1>
        <p className="text-lg text-white/60">{t('home.subtitle')}</p>
        <p className="mt-2 text-sm text-white/40">
          Patch {meta.patchVersion} • {champions.length} champions
        </p>
      </div>

      {/* Search Bar */}
      <div className="animate-slide-up mx-auto mb-12 max-w-md">
        <Input
          id="champion-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('home.searchPlaceholder')}
          icon={<LuSearch className="h-4 w-4" />}
          className="h-12 text-base"
        />
      </div>

      {/* Favorites Section */}
      {!search && favoriteChampionsList.length > 0 && (
        <section className="animate-slide-up mb-10" style={{ animationDelay: '100ms' }}>
          <div className="mb-4 flex items-center gap-2">
            <LuStar className="h-4 w-4 text-yellow-400" />
            <h2 className="text-sm font-semibold text-white/80">{t('home.favorites')}</h2>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
            {favoriteChampionsList.map((champ) => (
              <ChampionCard
                key={champ.id}
                championId={champ.id}
                name={champ.name}
                onClick={() => handleSelect(champ)}
                compact
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Section */}
      {!search && recentChampionsList.length > 0 && (
        <section className="animate-slide-up mb-10" style={{ animationDelay: '150ms' }}>
          <div className="mb-4 flex items-center gap-2">
            <LuClock className="h-4 w-4 text-white/40" />
            <h2 className="text-sm font-semibold text-white/80">{t('home.recent')}</h2>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
            {recentChampionsList.slice(0, 5).map((champ) => (
              <ChampionCard
                key={champ.id}
                championId={champ.id}
                name={champ.name}
                onClick={() => handleSelect(champ)}
                compact
              />
            ))}
          </div>
        </section>
      )}

      {/* All Champions Grid */}
      <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="mb-4 flex items-center gap-2">
          <LuTarget className="h-4 w-4 text-red-400" />
          <h2 className="text-sm font-semibold text-white/80">
            {search ? `${filteredChampions.length} ${t('home.results')}` : t('home.enemyChampions')}
          </h2>
        </div>

        {filteredChampions.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-white/40">{t('common.noChampionsFound')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
            {filteredChampions.map((champ, index) => (
              <ChampionCard
                key={champ.id}
                championId={champ.id}
                name={champ.name}
                onClick={() => handleSelect(champ)}
                compact
                className={cn(
                  'animate-scale-in',
                  index < 10 && `stagger-${Math.min(index + 1, 6)}`
                )}
              />
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  )
}
