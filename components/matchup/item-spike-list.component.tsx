'use client'

import { cn } from '@/lib/utils'
import { getItemIconUrl } from '@/lib/data-dragon'
import { useSettingsStore } from '@/app/store/settings.store'
import type { IItemSpike } from '@/lib/types'

interface IItemSpikeListProps {
  spikes: IItemSpike[]
  className?: string
}

export function ItemSpikeList({ spikes, className }: IItemSpikeListProps) {
  const language = useSettingsStore((s) => s.language)

  if (spikes.length === 0) {
    return <p className="text-sm italic text-white/40">No item spikes documented</p>
  }

  return (
    <div className={cn('space-y-3', className)}>
      {spikes.map((spike, index) => (
        <div
          key={spike.item}
          className={cn(
            'flex items-center gap-3 rounded-lg bg-white/5 p-3',
            'transition-all duration-200 hover:bg-white/10',
            'animate-slide-up'
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Item icon - using local file */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getItemIconUrl(spike.item)}
              alt={`Item ${spike.item}`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-sm text-white/70 leading-relaxed">{spike.text[language]}</p>
        </div>
      ))}
    </div>
  )
}
