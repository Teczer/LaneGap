import { z } from 'zod'

// =============================================================================
// Base Schemas
// =============================================================================

export const LocalizedTextSchema = z.object({
  en: z.string(),
  fr: z.string(),
})

export const TierSchema = z.enum(['S', 'A+', 'A', 'B+', 'B', 'B-', 'C'])

// =============================================================================
// Champion Schemas
// =============================================================================

export const LevelSpikeSchema = z.object({
  level: z.number().int().min(1).max(18),
  text: LocalizedTextSchema,
  important: z.boolean().optional(),
})

export const ItemSpikeSchema = z.object({
  item: z.string(), // Item ID from Data Dragon
  text: LocalizedTextSchema,
})

// Partial record for counters - not all tiers need to be present
const CountersSchema = z
  .object({
    S: z.array(z.string()),
    'A+': z.array(z.string()),
    A: z.array(z.string()),
    'B+': z.array(z.string()),
    B: z.array(z.string()),
    'B-': z.array(z.string()),
    C: z.array(z.string()),
  })
  .partial()

export const ChampionSchema = z.object({
  id: z.string().min(1),
  name: LocalizedTextSchema,
  dateEdited: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  countersWholeGame: CountersSchema.optional(),
  tips: z.object({
    en: z.array(z.string()),
    fr: z.array(z.string()),
  }),
  levelSpikes: z.array(LevelSpikeSchema),
  itemSpikes: z.array(ItemSpikeSchema),
})

// =============================================================================
// Matchup Schemas
// =============================================================================

export const ClipSchema = z.object({
  title: z.string(),
  url: z.string(),
  timestamp: z.string().optional(),
})

export const MatchupSchema = z.object({
  myChampion: z.string().min(1),
  enemyChampion: z.string().min(1),
  tips: z.object({
    en: z.array(z.string()),
    fr: z.array(z.string()),
  }),
  clips: z.array(ClipSchema),
})

// =============================================================================
// Database Schema
// =============================================================================

export const MetaSchema = z.object({
  version: z.string(),
  patchVersion: z.string(),
  lastUpdated: z.string().datetime(),
  author: z.string(),
})

export const DatabaseSchema = z.object({
  meta: MetaSchema,
  champions: z.array(ChampionSchema),
  matchups: z.array(MatchupSchema),
})

// =============================================================================
// Type Exports from Schemas
// =============================================================================

export type TLocalizedText = z.infer<typeof LocalizedTextSchema>
export type TLevelSpike = z.infer<typeof LevelSpikeSchema>
export type TItemSpike = z.infer<typeof ItemSpikeSchema>
export type TChampion = z.infer<typeof ChampionSchema>
export type TClip = z.infer<typeof ClipSchema>
export type TMatchup = z.infer<typeof MatchupSchema>
export type TMeta = z.infer<typeof MetaSchema>
export type TDatabase = z.infer<typeof DatabaseSchema>
