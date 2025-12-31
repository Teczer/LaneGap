// =============================================================================
// Language
// =============================================================================

export type TLanguage = 'en' | 'fr'

export interface ILocalizedText {
  en: string
  fr: string
}

// =============================================================================
// Tiers
// =============================================================================

export type TTier = 'S' | 'A+' | 'A' | 'B+' | 'B' | 'B-' | 'C'
export type TTierBase = 'S' | 'A' | 'B' | 'C'

/** Get base letter from tier (S, A+, A, B+, B, B-, C -> S, A, A, B, B, B, C) */
export const getTierBase = (tier: TTier): TTierBase => {
  if (tier === 'S') return 'S'
  if (tier.startsWith('A')) return 'A'
  if (tier.startsWith('B')) return 'B'
  return 'C'
}

export const TIER_ORDER: readonly TTier[] = ['S', 'A+', 'A', 'B+', 'B', 'B-', 'C'] as const

export const TIER_COLORS: Record<TTier, string> = {
  S: '#DC2626',
  'A+': '#EA580C',
  A: '#F97316',
  'B+': '#CA8A04',
  B: '#EAB308',
  'B-': '#A3A31A',
  C: '#6B7280',
}

export const TIER_BG_COLORS: Record<TTier, string> = {
  S: 'bg-tier-s',
  'A+': 'bg-tier-a-plus',
  A: 'bg-tier-a',
  'B+': 'bg-tier-b-plus',
  B: 'bg-tier-b',
  'B-': 'bg-tier-b-minus',
  C: 'bg-tier-c',
}

// =============================================================================
// Champion
// =============================================================================

export interface IChampion {
  id: string
  name: ILocalizedText
  dateEdited: string
  countersWholeGame: Partial<Record<TTier, string[]>>
  tips: {
    en: string[]
    fr: string[]
  }
  levelSpikes: ILevelSpike[]
  itemSpikes: IItemSpike[]
}

export interface ILevelSpike {
  level: number
  text: ILocalizedText
  important?: boolean
}

export interface IItemSpike {
  item: string // Item ID from Data Dragon
  text: ILocalizedText
}

// =============================================================================
// Matchup
// =============================================================================

export interface IMatchup {
  myChampion: string
  enemyChampion: string
  tips: {
    en: string[]
    fr: string[]
  }
  clips: IClip[]
}

export interface IClip {
  title: string
  url: string
  timestamp?: string
}

// =============================================================================
// Database
// =============================================================================

export interface IMeta {
  version: string
  patchVersion: string
  lastUpdated: string
  author: string
}

export interface IDatabase {
  meta: IMeta
  champions: IChampion[]
  matchups: IMatchup[]
}

// =============================================================================
// Data Dragon Types
// =============================================================================

export interface IDataDragonChampion {
  id: string
  key: string
  name: string
  title: string
  blurb: string
  info: {
    attack: number
    defense: number
    magic: number
    difficulty: number
  }
  image: {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
  }
  tags: string[]
  partype: string
  stats: Record<string, number>
}

export interface IDataDragonItem {
  name: string
  description: string
  colloq: string
  plaintext: string
  image: {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
  }
  gold: {
    base: number
    purchasable: boolean
    total: number
    sell: number
  }
  tags: string[]
  maps: Record<string, boolean>
}
