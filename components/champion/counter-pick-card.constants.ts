import type { TTierBase } from '@/lib/types'

export interface ITierStyle {
  bg: string
  border: string
  glow: string
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

