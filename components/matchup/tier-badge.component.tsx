import type { TLanguage } from '@/lib/i18n'
import type { TTier } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ITierBadgeProps {
  tier: TTier
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
  language?: TLanguage
}

// Styles with effects based on tier importance
// S+ = Iridescent white, S = Red, A/A+ = Orange, B/B+/B- = Slate gray, C = Dark slate
const TIER_CONFIG: Record<
  TTier,
  {
    bg: string
    text: string
    glow: string
  }
> = {
  'S+': {
    bg: 'bg-gradient-to-br from-white via-slate-100 to-blue-50',
    text: 'text-slate-800 font-bold',
    glow: 'shadow-[0_0_15px_rgba(255,255,255,0.6)]',
  },
  S: {
    bg: 'bg-gradient-to-br from-red-500 to-rose-600',
    text: 'text-white font-bold',
    glow: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  },
  'A+': {
    bg: 'bg-gradient-to-br from-orange-500 to-amber-600',
    text: 'text-white font-bold',
    glow: 'shadow-[0_0_8px_rgba(249,115,22,0.4)]',
  },
  A: {
    bg: 'bg-gradient-to-br from-orange-500 to-amber-600',
    text: 'text-white font-bold',
    glow: '',
  },
  'B+': {
    bg: 'bg-gradient-to-br from-sky-600 to-blue-700',
    text: 'text-white font-semibold',
    glow: '',
  },
  B: {
    bg: 'bg-gradient-to-br from-sky-600 to-blue-700',
    text: 'text-white font-medium',
    glow: '',
  },
  'B-': {
    bg: 'bg-gradient-to-br from-sky-600 to-blue-700',
    text: 'text-white font-medium',
    glow: '',
  },
  C: {
    bg: 'bg-slate-600',
    text: 'text-white/90 font-normal',
    glow: '',
  },
}

const TIER_LABELS: Record<TTier, Record<TLanguage, string>> = {
  'S+': { en: 'Perfect Counter', fr: 'Counter parfait' },
  S: { en: 'Hard Counter', fr: 'Hard counter' },
  'A+': { en: 'Strong Counter', fr: 'Counter fort' },
  A: { en: 'Counter', fr: 'Counter' },
  'B+': { en: 'Slight Advantage', fr: 'Léger avantage' },
  B: { en: 'Skill Matchup (50/50)', fr: 'Skill matchup (50/50)' },
  'B-': { en: 'Slight Disadvantage', fr: 'Léger désavantage' },
  C: { en: 'Avoid', fr: 'À éviter' },
}

export const TierBadge = ({
  tier,
  size = 'md',
  className,
  showLabel = false,
  language = 'en',
}: ITierBadgeProps) => {
  const config = TIER_CONFIG[tier]

  // Fixed width to ensure consistent sizing regardless of + or not
  const sizes = {
    sm: 'text-[10px] py-0.5 w-[26px]',
    md: 'text-xs py-0.5 w-[32px]',
    lg: 'text-sm py-1 w-[40px]',
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-md',
          config.bg,
          config.text,
          config.glow,
          sizes[size]
        )}
      >
        {tier}
      </span>
      {showLabel && <span className="text-sm text-white/60">{TIER_LABELS[tier][language]}</span>}
    </div>
  )
}

export { TIER_CONFIG, TIER_LABELS }
