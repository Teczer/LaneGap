import { cn } from '@/lib/utils'
import type { TTier } from '@/lib/types'

interface ITierBadgeProps {
  tier: TTier
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
}

const TIER_STYLES: Record<TTier, string> = {
  S: 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900',
  'A+': 'bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900',
  A: 'bg-gradient-to-r from-blue-500 to-blue-400 text-white',
  'B+': 'bg-gradient-to-r from-violet-500 to-purple-400 text-white',
  B: 'bg-gradient-to-r from-violet-600 to-violet-400 text-white',
  'B-': 'bg-gradient-to-r from-indigo-600 to-indigo-400 text-white',
  C: 'bg-gradient-to-r from-slate-500 to-slate-400 text-white',
}

const TIER_LABELS: Record<TTier, string> = {
  S: 'Hard Counter',
  'A+': 'Strong Counter',
  A: 'Counter',
  'B+': 'Slight Advantage',
  B: 'Even',
  'B-': 'Slight Disadvantage',
  C: 'Countered',
}

export function TierBadge({ tier, size = 'md', className, showLabel = false }: ITierBadgeProps) {
  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5 min-w-[22px]',
    md: 'text-xs px-2 py-0.5 min-w-[28px]',
    lg: 'text-sm px-2.5 py-1 min-w-[36px]',
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-md font-bold shadow-sm',
          TIER_STYLES[tier],
          sizes[size]
        )}
      >
        {tier}
      </span>
      {showLabel && <span className="text-sm text-white/60">{TIER_LABELS[tier]}</span>}
    </div>
  )
}

export { TIER_STYLES, TIER_LABELS }
