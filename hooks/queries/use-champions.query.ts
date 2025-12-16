'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchChampions } from '@/lib/api/pocketbase.api'

// =============================================================================
// Query Keys
// =============================================================================

export const championKeys = {
  all: ['champions'] as const,
  detail: (id: string) => ['champions', id] as const,
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Fetch all champions
 */
export function useChampions() {
  return useQuery({
    queryKey: championKeys.all,
    queryFn: fetchChampions,
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
