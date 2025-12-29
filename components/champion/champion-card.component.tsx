'use client'

import Link from 'next/link'
import type { TLanguage, TTier } from '@/lib/types'
import { cn } from '@/lib/utils'
import { TierBadge } from '@/components/matchup/tier-badge.component'
import { useSettingsStore } from '@/app/store/settings.store'
import { ChampionIcon } from './champion-icon.component'

interface IChampionCardProps {
  championId: string
  name: { en: string; fr: string }
  tier?: TTier
  href?: string
  onClick?: () => void
  className?: string
  compact?: boolean
}

export const ChampionCard = ({
  championId,
  name,
  tier,
  href,
  onClick,
  className,
  compact = false,
}: IChampionCardProps) => {
  const language = useSettingsStore((s) => s.language)
  const displayName = name[language as TLanguage] || name.en

  const content = (
    <div
      className={cn(
        'group relative flex flex-col items-center',
        'rounded-xl bg-white/3 transition-all duration-200',
        'border border-transparent hover:border-white/10 hover:bg-white/8',
        'cursor-pointer',
        compact ? 'gap-2 p-2.5' : 'gap-3 p-4',
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <ChampionIcon
          championId={championId}
          size={compact ? 'md' : 'lg'}
          className="group-hover:ring-accent-gold/50 transition-all duration-200"
        />
        {tier && (
          <div className="absolute -right-1 -bottom-1">
            <TierBadge tier={tier} size="sm" />
          </div>
        )}
      </div>
      <span
        className={cn(
          'text-center leading-tight font-medium text-white/60',
          'transition-colors duration-200 group-hover:text-white',
          compact ? 'text-xs' : 'text-sm'
        )}
      >
        {displayName}
      </span>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
