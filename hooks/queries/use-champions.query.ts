'use client'

import { useQuery } from '@tanstack/react-query'
import { type IFetchChampionsOptions, fetchChampions } from '@/lib/api/pocketbase.api'

// =============================================================================
// Query Keys
// =============================================================================

export const championKeys = {
  all: (options?: IFetchChampionsOptions) => ['champions', options] as const,
  detail: (id: string) => ['champions', id] as const,
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Fetch all champions
 */
export function useChampions(options?: IFetchChampionsOptions) {
  return useQuery({
    queryKey: championKeys.all(options),
    queryFn: () => fetchChampions(options),
  })
}

/**
 * Get a specific champion from the cached list
 */
export function useChampion(championId: string) {
  const { data: champions, ...rest } = useChampions()

  const champion = champions?.find((c) => c.id.toLowerCase() === championId.toLowerCase())

  return {
    data: champion,
    ...rest,
  }
}

/**
 * Search champions by name
 */
export function useChampionSearch(query: string) {
  const { data: champions = [], ...rest } = useChampions()

  const filtered = query.trim()
    ? champions.filter(
        (c) =>
          c.name.en.toLowerCase().includes(query.toLowerCase()) ||
          c.name.fr.toLowerCase().includes(query.toLowerCase()) ||
          c.id.toLowerCase().includes(query.toLowerCase())
      )
    : champions

  return {
    data: filtered,
    ...rest,
  }
}

/**
 * Get champions count and metadata
 */
export function useChampionsMeta() {
  const { data: champions = [], isLoading } = useChampions()

  return {
    count: champions.length,
    isLoading,
  }
}
