import type { TTierBase } from '@/lib/types'

export interface ITierStyle {
  bg: string
  border: string
  glow: string
}

/**
 * S+ Tier badge animation config (iridescent shimmer)
 */
export const S_PLUS_TIER_BADGE_ANIMATION = {
  scale: [1, 1.05, 1],
  boxShadow: [
    '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(200,200,255,0.3)',
    '0 0 25px rgba(255,255,255,0.9), 0 0 50px rgba(180,200,255,0.5)',
    '0 0 15px rgba(255,255,255,0.6), 0 0 30px rgba(200,200,255,0.3)',
  ],
}

/**
 * S-Tier badge animation config (pulsing scale + glow)
 */
export const S_TIER_BADGE_ANIMATION = {
  scale: [1, 1.1, 1],
  boxShadow: [
    '0 0 10px rgba(239,68,68,0.5)',
    '0 0 20px rgba(239,68,68,0.8)',
    '0 0 10px rgba(239,68,68,0.5)',
  ],
}

/**
 * Color config for counter pick cards based on tier base letter
 * (+ variants share same color as their base letter)
 */
export const COUNTER_PICK_TIER_STYLES: Record<TTierBase, ITierStyle> = {
  'S+': {
    bg: 'bg-gradient-to-br from-white via-slate-100 to-blue-50',
    border: 'border-white/80',
    glow: 'shadow-[0_0_25px_rgba(255,255,255,0.5)]',
  },
  S: {
    bg: 'bg-gradient-to-br from-red-500 to-rose-600',
    border: 'border-red-400/50',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
  },
  A: {
    bg: 'bg-gradient-to-br from-orange-500 to-amber-600',
    border: 'border-orange-400/50',
    glow: 'shadow-[0_0_12px_rgba(249,115,22,0.3)]',
  },
  B: {
    bg: 'bg-gradient-to-br from-sky-600 to-blue-700',
    border: 'border-sky-400/30',
    glow: '',
  },
  C: {
    bg: 'bg-slate-600',
    border: 'border-slate-500/30',
    glow: '',
  },
}

