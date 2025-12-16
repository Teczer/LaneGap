'use client'

import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/app/store/settings.store'
import type { ILevelSpike } from '@/lib/types'
import { LuStar } from 'react-icons/lu'

interface ILevelSpikeTimelineProps {
  spikes: ILevelSpike[]
  className?: string
}

export function LevelSpikeTimeline({ spikes, className }: ILevelSpikeTimelineProps) {
  const language = useSettingsStore((s) => s.language)

  if (spikes.length === 0) {
    return <p className="text-sm text-white/40 italic">No level spikes documented</p>
  }

  return (
    <div className={cn('space-y-3', className)}>
      {spikes.map((spike, index) => (
        <div
          key={spike.level}
          className={cn(
            'animate-slide-up flex items-start gap-3 rounded-lg p-3',
            spike.important
              ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/10 ring-1 ring-amber-500/30'
              : 'bg-white/5'
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold',
              spike.important
                ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-violet-500/20 text-violet-400'
            )}
          >
            {spike.level}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                'text-sm leading-relaxed',
                spike.important ? 'font-medium text-white' : 'text-white/70'
              )}
            >
              {spike.text[language]}
            </p>
          </div>
          {spike.important && <LuStar className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />}
        </div>
      ))}
    </div>
  )
}
