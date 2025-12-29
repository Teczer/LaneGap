'use client'

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { LuClock, LuLoader, LuSearch, LuStar, LuTarget } from 'react-icons/lu'
import { LANE_ICONS, LANE_LABELS, type TLane, championPlaysLane } from '@/lib/data/champion-roles'
import type { TLanguage, TTranslations } from '@/lib/i18n'
import type { IChampion } from '@/lib/types'
import { useChampions } from '@/hooks/queries'
import { ChampionCard } from '@/components/champion/champion-card.component'
import { PageContainer } from '@/components/layout/page-container.component'
import { Input } from '@/components/ui/input'
import { useFavoritesStore } from '@/app/store/favorites.store'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
}

const LANES: TLane[] = ['top', 'jungle', 'mid', 'adc', 'support']

interface IHomePageClientProps {
  translations: TTranslations
  language: TLanguage
}

export const HomePageClient = ({ translations: t, language }: IHomePageClientProps) => {
  const router = useRouter()
  const { data: champions = [], isLoading } = useChampions({ sort: 'name_en' })
  const [search, setSearch] = useState('')
  const [selectedLane, setSelectedLane] = useState<TLane>('mid')

  const favoriteChampions = useFavoritesStore((s) => s.favoriteChampions)
  const recentChampions = useFavoritesStore((s) => s.recentChampions)
  const addRecent = useFavoritesStore((s) => s.addRecent)

  // Filter by search and lane (already sorted alphabetically from API)
  const filteredChampions = useMemo(() => {
    let result = champions

    // Filter by lane
    result = result.filter((c) => championPlaysLane(c.id, selectedLane))

    // Filter by search
    if (search.trim()) {
      const lowerQuery = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.en.toLowerCase().includes(lowerQuery) ||
          c.name.fr.toLowerCase().includes(lowerQuery) ||
          c.id.toLowerCase().includes(lowerQuery)
      )
    }

    return result
  }, [champions, search, selectedLane])

  // Filter favorites by selected lane (already sorted from API)
  const favoriteChampionsList = useMemo(() => {
    return champions
      .filter((c) => favoriteChampions.includes(c.id))
      .filter((c) => championPlaysLane(c.id, selectedLane))
  }, [champions, favoriteChampions, selectedLane])

  // Filter recents by selected lane
  const recentChampionsList = useMemo(() => {
    return recentChampions
      .map((id) => champions.find((c) => c.id === id))
      .filter((c): c is IChampion => c !== undefined)
      .filter((c) => championPlaysLane(c.id, selectedLane))
  }, [champions, recentChampions, selectedLane])

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
      <div className="animate-fade-in mb-8 text-center">
        <h1 className="mb-4 text-6xl font-bold tracking-tight">
          <span className="text-white">LANE</span>
          <span className="text-gradient">GAP</span>
        </h1>
        <p className="text-lg text-white/60">{t.home.subtitle}</p>
        <p className="mt-2 text-sm text-white/40">{filteredChampions.length} champions</p>
      </div>

      {/* Search Bar */}
      <div className="animate-slide-up mx-auto mb-10 max-w-md" style={{ animationDelay: '50ms' }}>
        <Input
          id="champion-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.home.searchPlaceholder}
          icon={<LuSearch className="h-4 w-4" />}
          className="h-12 text-base"
        />
      </div>

      {/* Lane Filter */}
      <div className="animate-slide-up mx-auto flex justify-center gap-x-4">
        {LANES.map((lane) => {
          const isSelected = selectedLane === lane
          return (
            <motion.button
              key={lane}
              onClick={() => setSelectedLane(lane)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isSelected ? 1.25 : 1,
                opacity: isSelected ? 1 : 0.3,
                filter: isSelected ? 'grayscale(0)' : 'grayscale(1)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative size-16 cursor-pointer"
            >
              <Image
                src={LANE_ICONS[lane]}
                alt={LANE_LABELS[lane][language]}
                fill
                className="object-contain"
                priority={lane === 'mid'}
              />
              {isSelected && (
                <motion.div
                  layoutId="lane-indicator"
                  className="bg-primary absolute -bottom-2 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Favorites Section */}
      {!search && favoriteChampionsList.length > 0 && (
        <section className="animate-slide-up mb-10" style={{ animationDelay: '100ms' }}>
          <div className="mb-4 flex items-center gap-2">
            <LuStar className="text-warning h-4 w-4" />
            <h2 className="text-sm font-semibold text-white/80">{t.home.favorites}</h2>
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
            <h2 className="text-sm font-semibold text-white/80">{t.home.recent}</h2>
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
          <LuTarget className="text-danger h-4 w-4" />
          <h2 className="text-sm font-semibold text-white/80">
            {search ? `${filteredChampions.length} ${t.home.results}` : t.home.enemyChampions}
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LuLoader className="text-primary-light h-8 w-8 animate-spin" />
          </div>
        ) : filteredChampions.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-white/40">{t.common.noChampionsFound}</p>
          </div>
        ) : (
          <motion.div
            key={selectedLane}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredChampions.map((champ) => (
                <motion.div key={champ.id} variants={itemVariants} layout>
                  <ChampionCard
                    championId={champ.id}
                    name={champ.name}
                    onClick={() => handleSelect(champ)}
                    compact
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </PageContainer>
  )
}
