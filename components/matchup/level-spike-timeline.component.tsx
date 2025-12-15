'use client'

import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/app/store/settings.store'
import type { ILevelSpike } from '@/lib/types'

interface ILevelSpikeTimelineProps {
  spikes: ILevelSpike[]
  className?: string
}

const LEVEL_MILESTONES = [1, 2, 3, 6, 9, 11, 16, 18] as const

export function LevelSpikeTimeline({ spikes, className }: ILevelSpikeTimelineProps) {
  const language = useSettingsStore((s) => s.language)

  const spikesByLevel = new Map(spikes.map((s) => [s.level, s]))

  if (spikes.length === 0) {
    return <p className="text-sm italic text-white/40">No level spikes documented</p>
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Timeline */}
      <div className="flex items-center justify-between">
        {LEVEL_MILESTONES.map((level, idx) => {
          const spike = spikesByLevel.get(level)
          const hasSpike = !!spike

          return (
            <div key={level} className="flex items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                  'transition-all duration-200',
                  hasSpike
                    ? 'bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20'
                    : 'bg-white/5 text-white/40 ring-1 ring-white/10'
                )}
              >
                {level}
              </div>
              {idx < LEVEL_MILESTONES.length - 1 && (
                <div className="mx-1 h-0.5 w-4 bg-white/10 sm:w-6 md:w-8" />
              )}
            </div>
          )
        })}
      </div>

      {/* Spike descriptions */}
      <div className="mt-4 space-y-2.5">
        {spikes.map((spike, index) => (
          <div
            key={spike.level}
            className="flex items-start gap-3 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-400">
              {spike.level}
            </span>
            <p className="text-sm text-white/70 leading-relaxed">{spike.text[language]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
