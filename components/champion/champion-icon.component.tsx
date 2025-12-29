'use client'

import { getChampionIconUrl } from '@/lib/data-dragon'
import { cn } from '@/lib/utils'
import { Image } from '@/components/ui'

interface IChampionIconProps {
  championId: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showBorder?: boolean
}

const SIZES = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
} as const

export const ChampionIcon = ({
  championId,
  size = 'md',
  className,
  showBorder = true,
}: IChampionIconProps) => {
  const px = SIZES[size]

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-lg',
        showBorder && 'ring-2 ring-white/10',
        'transition-all duration-200',
        className
      )}
      style={{ width: px, height: px }}
    >
      <Image
        src={getChampionIconUrl(championId)}
        alt={championId}
        width={px}
        height={px}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
