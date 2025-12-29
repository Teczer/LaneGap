import type { TTier } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ITierBadgeProps {
  tier: TTier
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
}

const TIER_STYLES: Record<TTier, string> = {
  S: 'bg-gradient-to-r from-tier-s to-tier-a-plus text-background',
  'A+': 'bg-gradient-to-r from-tier-a-plus to-tier-a text-background',
  A: 'bg-gradient-to-r from-tier-a to-tier-a text-white',
  'B+': 'bg-gradient-to-r from-tier-b-plus to-tier-b text-white',
  B: 'bg-gradient-to-r from-tier-b to-tier-b text-white',
  'B-': 'bg-gradient-to-r from-tier-b-minus to-tier-b-minus text-white',
  C: 'bg-gradient-to-r from-tier-c to-tier-c text-white',
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

export const TierBadge = ({ tier, size = 'md', className, showLabel = false }: ITierBadgeProps) => {
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
