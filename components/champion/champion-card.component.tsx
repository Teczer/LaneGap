'use client'

import Link from 'next/link'
import { ChampionIcon } from './champion-icon.component'
import { TierBadge } from '@/components/matchup/tier-badge.component'
import { cn } from '@/lib/utils'
import type { TTier, TLanguage } from '@/lib/types'
import { useSettingsStore } from '@/app/store/settings.store'

interface IChampionCardProps {
  championId: string
  name: { en: string; fr: string }
  tier?: TTier
  href?: string
  onClick?: () => void
  className?: string
  compact?: boolean
}

export function ChampionCard({
  championId,
  name,
  tier,
  href,
  onClick,
  className,
  compact = false,
}: IChampionCardProps) {
  const language = useSettingsStore((s) => s.language)
  const displayName = name[language as TLanguage] || name.en

  const content = (
    <div
      className={cn(
        'group relative flex flex-col items-center',
        'rounded-xl bg-white/[0.03] transition-all duration-200',
        'hover:bg-white/[0.08] border border-transparent hover:border-white/10',
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
          className="group-hover:ring-violet-500/50 transition-all duration-200"
        />
        {tier && (
          <div className="absolute -bottom-1 -right-1">
            <TierBadge tier={tier} size="sm" />
          </div>
        )}
      </div>
      <span
        className={cn(
          'text-center font-medium text-white/60 leading-tight',
          'group-hover:text-white transition-colors duration-200',
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
