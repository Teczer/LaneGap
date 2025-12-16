'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchMatchups } from '@/lib/api/pocketbase.api'

// =============================================================================
// Query Keys
// =============================================================================

export const matchupKeys = {
  all: ['matchups'] as const,
  detail: (myChamp: string, enemyChamp: string) => ['matchups', myChamp, enemyChamp] as const,
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Fetch all matchups
 */
export function useMatchups() {
  return useQuery({
    queryKey: matchupKeys.all,
    queryFn: fetchMatchups,
  })
}

/**
 * Get a specific matchup from the cached list
 */
export function useMatchup(myChampion: string, enemyChampion: string) {
  const { data: matchups, ...rest } = useMatchups()

  const matchup = matchups?.find(
    (m) =>
      m.myChampion.toLowerCase() === myChampion.toLowerCase() &&
      m.enemyChampion.toLowerCase() === enemyChampion.toLowerCase()
  )

  return {
    data: matchup,
    ...rest,
  }
}

/**
 * Get all matchups for a specific champion
 */
export function useChampionMatchups(championId: string) {
  const { data: matchups = [], ...rest } = useMatchups()

  const filtered = matchups.filter(
    (m) =>
      m.myChampion.toLowerCase() === championId.toLowerCase() ||
      m.enemyChampion.toLowerCase() === championId.toLowerCase()
  )

  return {
    data: filtered,
    ...rest,
  }
}
