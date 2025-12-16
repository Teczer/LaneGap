import PocketBase from 'pocketbase'

// PocketBase client instance
export const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'
)

// Disable auto-cancellation for better UX
pb.autoCancellation(false)

// =============================================================================
// Types for PocketBase Collections
// =============================================================================

export interface IPBChampion {
  id: string
  collectionId: string
  collectionName: 'champions'
  created: string
  updated: string
  champion_id: string
  name_en: string
  name_fr: string
  date_edited: string
  tips_en: string[]
  tips_fr: string[]
}

export interface IPBCounter {
  id: string
  collectionId: string
  collectionName: 'counters'
  created: string
  updated: string
  champion: string // relation ID
  counter_champion: string // relation ID
  tier: 'S' | 'A+' | 'A' | 'B+' | 'B' | 'B-' | 'C'
  expand?: {
    champion?: IPBChampion
    counter_champion?: IPBChampion
  }
}

export interface IPBLevelSpike {
  id: string
  collectionId: string
  collectionName: 'level_spikes'
  created: string
  updated: string
  champion: string // relation ID
  level: number
  text_en: string
  text_fr: string
  important: boolean
  expand?: {
    champion?: IPBChampion
  }
}

export interface IPBItemSpike {
  id: string
  collectionId: string
  collectionName: 'item_spikes'
  created: string
  updated: string
  champion: string // relation ID
  item_id: string
  text_en: string
  text_fr: string
  expand?: {
    champion?: IPBChampion
  }
}

export interface IPBMatchup {
  id: string
  collectionId: string
  collectionName: 'matchups'
  created: string
  updated: string
  my_champion: string // relation ID
  enemy_champion: string // relation ID
  tips_en: string[]
  tips_fr: string[]
  expand?: {
    my_champion?: IPBChampion
    enemy_champion?: IPBChampion
  }
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Check if PocketBase is available
 */
export async function isPocketBaseAvailable(): Promise<boolean> {
  try {
    await pb.health.check()
    return true
  } catch {
    return false
  }
}

/**
 * Get auth store state
 */
export function getAuthState() {
  return {
    isValid: pb.authStore.isValid,
    token: pb.authStore.token,
    model: pb.authStore.record,
  }
}

/**
 * Clear auth state
 */
export function logout() {
  pb.authStore.clear()
}

