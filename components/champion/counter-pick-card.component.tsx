'use client'

import { motion } from 'framer-motion'
import type { TLanguage, TTier } from '@/lib/types'
import { getTierBase } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/app/store/settings.store'
import { ChampionIcon } from './champion-icon.component'
import { COUNTER_PICK_TIER_STYLES, S_TIER_BADGE_ANIMATION } from './counter-pick-card.constants'
import { ATierGlow, STierBeam } from './effects'

interface ICounterPickCardProps {
  championId: string
  name: { en: string; fr: string }
  tier: TTier
  className?: string
}

export const CounterPickCard = ({ championId, name, tier, className }: ICounterPickCardProps) => {
  const language = useSettingsStore((s) => s.language)
  const displayName = name[language as TLanguage] || name.en
  const tierBase = getTierBase(tier)
  const colors = COUNTER_PICK_TIER_STYLES[tierBase]
  const isSTier = tierBase === 'S'
  const isATier = tierBase === 'A'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('group relative', className)}
    >
      {/* S-Tier: Red beam with trail effect */}
      {isSTier && <STierBeam />}

      {/* A-Tier: Pulsing orange glow effect */}
      {isATier && <ATierGlow />}

      {/* Card content */}
      <div
        className={cn(
          'relative flex flex-col items-center',
          'rounded-xl p-3',
          'bg-card border border-white/10'
        )}
      >
        {/* Champion Icon */}
        <div className="relative mb-2">
          <ChampionIcon
            championId={championId}
            size="md"
            className="transition-transform duration-200"
          />

          {/* Tier Badge - positioned at bottom right */}
          <motion.div
            className={cn(
              'absolute -right-1.5 -bottom-1.5',
              'flex items-center justify-center',
              'h-7 w-7 rounded-lg',
              'text-[11px] font-bold text-white',
              colors.bg,
              colors.glow,
              'border border-white/20'
            )}
            animate={isSTier ? S_TIER_BADGE_ANIMATION : undefined}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {tier}
          </motion.div>
        </div>

        {/* Champion Name */}
        <span
          className={cn(
            'text-center text-xs leading-tight font-medium',
            'text-white/70',
            'transition-colors duration-200'
          )}
        >
          {displayName}
        </span>
      </div>
    </motion.div>
  )
}
