import { pb } from '@/lib/pocketbase'
import type { IChampion, IItemSpike, ILevelSpike, IMatchup, TTier } from '@/lib/types'

// =============================================================================
// PocketBase Record Types
// =============================================================================

interface PBChampion {
  id: string
  champion_id: string
  name_en: string
  name_fr: string
  date_edited: string
  tips_en: string[]
  tips_fr: string[]
  created: string
  updated: string
}

interface PBLevelSpike {
  id: string
  champion: string
  level: number
  text_en: string
  text_fr: string
  important: boolean
}

interface PBItemSpike {
  id: string
  champion: string
  item_id: string
  text_en: string
  text_fr: string
}

interface PBCounter {
  id: string
  champion: string
  counter_champion: string
  tier: TTier
}

interface PBMatchup {
  id: string
  my_champion: string
  enemy_champion: string
  tips_en: string[]
  tips_fr: string[]
}

// =============================================================================
// Transform Functions
// =============================================================================

function transformLevelSpike(spike: PBLevelSpike): ILevelSpike {
  return {
    level: spike.level,
    text: { en: spike.text_en, fr: spike.text_fr },
    important: spike.important,
  }
}

function transformItemSpike(spike: PBItemSpike): IItemSpike {
  return {
    item: spike.item_id,
    text: { en: spike.text_en, fr: spike.text_fr },
  }
}

// =============================================================================
// API Functions
// =============================================================================

export interface IFetchChampionsOptions {
  sort?: string
}

/**
 * Fetch all champions with their related data
 */
export async function fetchChampions(options?: IFetchChampionsOptions): Promise<IChampion[]> {
  const { sort } = options || {}

  // Fetch all data in parallel
  const [allChampions, levelSpikes, itemSpikes, counters] = await Promise.all([
    pb.collection('champions').getFullList<PBChampion>(sort ? { sort } : {}),
    pb.collection('level_spikes').getFullList<PBLevelSpike>(),
    pb.collection('item_spikes').getFullList<PBItemSpike>(),
    pb.collection('counters').getFullList<PBCounter>(),
  ])

  // Deduplicate champions by champion_id (keep the one with most recent update)
  const championsByChampionId = new Map<string, PBChampion>()
  for (const c of allChampions) {
    const existing = championsByChampionId.get(c.champion_id)
    if (!existing || new Date(c.updated) > new Date(existing.updated)) {
      championsByChampionId.set(c.champion_id, c)
    }
  }
  const champions = Array.from(championsByChampionId.values())

  // Create lookup maps
  const championIdMap = new Map<string, string>() // PB id -> champion_id
  for (const c of allChampions) {
    championIdMap.set(c.id, c.champion_id)
  }

  // Create reverse map: champion_id -> all PB ids for that champion
  const pbIdsByChampionId = new Map<string, string[]>()
  for (const c of allChampions) {
    const existing = pbIdsByChampionId.get(c.champion_id) || []
    existing.push(c.id)
    pbIdsByChampionId.set(c.champion_id, existing)
  }

  // Group level spikes by champion_id (aggregate all PB ids) - deduplicate by level
  const levelSpikesByChampionId = new Map<string, ILevelSpike[]>()
  for (const spike of levelSpikes) {
    const championId = championIdMap.get(spike.champion)
    if (championId) {
      const existing = levelSpikesByChampionId.get(championId) || []
      // Deduplicate by level (keep only unique levels)
      if (!existing.some((s) => s.level === spike.level)) {
        existing.push(transformLevelSpike(spike))
      }
      levelSpikesByChampionId.set(championId, existing)
    }
  }

  // Group item spikes by champion_id - deduplicate by item_id
  const itemSpikesByChampionId = new Map<string, IItemSpike[]>()
  for (const spike of itemSpikes) {
    const championId = championIdMap.get(spike.champion)
    if (championId) {
      const existing = itemSpikesByChampionId.get(championId) || []
      // Deduplicate by item_id
      if (!existing.some((s) => s.item === spike.item_id)) {
        existing.push(transformItemSpike(spike))
      }
      itemSpikesByChampionId.set(championId, existing)
    }
  }

  // Group counters by champion_id
  const countersByChampionId = new Map<string, Partial<Record<TTier, string[]>>>()
  for (const counter of counters) {
    const championId = championIdMap.get(counter.champion)
    const counterChampionId = championIdMap.get(counter.counter_champion)
    if (championId && counterChampionId) {
      const existing = countersByChampionId.get(championId) || {}
      if (!existing[counter.tier]) {
        existing[counter.tier] = []
      }
      if (!existing[counter.tier]!.includes(counterChampionId)) {
        existing[counter.tier]!.push(counterChampionId)
      }
      countersByChampionId.set(championId, existing)
    }
  }

  // Transform champions
  return champions.map((c) => ({
    id: c.champion_id,
    name: { en: c.name_en, fr: c.name_fr },
    dateEdited: c.date_edited,
    tips: { en: c.tips_en || [], fr: c.tips_fr || [] },
    levelSpikes: (levelSpikesByChampionId.get(c.champion_id) || []).sort(
      (a, b) => a.level - b.level
    ),
    itemSpikes: itemSpikesByChampionId.get(c.champion_id) || [],
    countersWholeGame: countersByChampionId.get(c.champion_id) || {},
  }))
}

/**
 * Fetch a single champion by ID
 */
export async function fetchChampion(championId: string): Promise<IChampion | null> {
  const champions = await fetchChampions()
  return champions.find((c) => c.id.toLowerCase() === championId.toLowerCase()) || null
}

/**
 * Fetch all matchups
 */
export async function fetchMatchups(): Promise<IMatchup[]> {
  const [matchups, champions] = await Promise.all([
    pb.collection('matchups').getFullList<PBMatchup>(),
    pb.collection('champions').getFullList<PBChampion>(),
  ])

  // Create lookup map: PB id -> champion_id
  const championIdMap = new Map<string, string>()
  for (const c of champions) {
    championIdMap.set(c.id, c.champion_id)
  }

  // Deduplicate matchups by myChampion+enemyChampion
  const matchupMap = new Map<string, IMatchup>()
  for (const m of matchups) {
    const myChampion = championIdMap.get(m.my_champion) || ''
    const enemyChampion = championIdMap.get(m.enemy_champion) || ''
    if (myChampion && enemyChampion) {
      const key = `${myChampion}-${enemyChampion}`
      if (!matchupMap.has(key)) {
        matchupMap.set(key, {
          myChampion,
          enemyChampion,
          tips: { en: m.tips_en || [], fr: m.tips_fr || [] },
          clips: [],
        })
      }
    }
  }

  return Array.from(matchupMap.values())
}

/**
 * Fetch a specific matchup
 */
export async function fetchMatchup(
  myChampion: string,
  enemyChampion: string
): Promise<IMatchup | null> {
  const matchups = await fetchMatchups()
  return (
    matchups.find(
      (m) =>
        m.myChampion.toLowerCase() === myChampion.toLowerCase() &&
        m.enemyChampion.toLowerCase() === enemyChampion.toLowerCase()
    ) || null
  )
}
