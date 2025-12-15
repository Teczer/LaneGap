import { useMemo, useCallback } from 'react'
import databaseJson from '@/data/database.json'
import type { IDatabase, IChampion, IMatchup } from '@/lib/types'

// Type assertion for the imported JSON
const database = databaseJson as IDatabase

/**
 * Hook to access the local database with helper functions
 */
export function useDatabase() {
  const getChampion = useCallback(
    (championId: string): IChampion | undefined =>
      database.champions.find((c) => c.id.toLowerCase() === championId.toLowerCase()),
    []
  )

  const getMatchup = useCallback(
    (myChampion: string, enemyChampion: string): IMatchup | undefined =>
      database.matchups.find(
        (m) =>
          m.myChampion.toLowerCase() === myChampion.toLowerCase() &&
          m.enemyChampion.toLowerCase() === enemyChampion.toLowerCase()
      ),
    []
  )

  return useMemo(
    () => ({
      meta: database.meta,
      champions: database.champions,
      matchups: database.matchups,
      getChampion,
      getMatchup,
    }),
    [getChampion, getMatchup]
  )
}

/**
 * Hook to get a specific champion by ID
 */
export function useChampion(championId: string): IChampion | undefined {
  const { getChampion } = useDatabase()
  return useMemo(() => getChampion(championId), [getChampion, championId])
}

/**
 * Hook to get a specific matchup
 */
export function useMatchup(myChampion: string, enemyChampion: string): IMatchup | undefined {
  const { getMatchup } = useDatabase()
  return useMemo(() => getMatchup(myChampion, enemyChampion), [getMatchup, myChampion, enemyChampion])
}

/**
 * Hook to get all matchups for a specific champion
 */
export function useChampionMatchups(championId: string): IMatchup[] {
  const { matchups } = useDatabase()
  return useMemo(
    () =>
      matchups.filter(
        (m) =>
          m.myChampion.toLowerCase() === championId.toLowerCase() ||
          m.enemyChampion.toLowerCase() === championId.toLowerCase()
      ),
    [matchups, championId]
  )
}

/**
 * Hook to search champions by name
 */
export function useChampionSearch(query: string): IChampion[] {
  const { champions } = useDatabase()
  return useMemo(() => {
    if (!query.trim()) return champions
    const lowerQuery = query.toLowerCase()
    return champions.filter(
      (c) => c.name.en.toLowerCase().includes(lowerQuery) || c.id.toLowerCase().includes(lowerQuery)
    )
  }, [champions, query])
}
