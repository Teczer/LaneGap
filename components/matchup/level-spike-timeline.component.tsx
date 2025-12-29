import { LuStar } from 'react-icons/lu'
import type { TLanguage } from '@/lib/i18n'
import type { ILevelSpike } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ILevelSpikeTimelineProps {
  spikes: ILevelSpike[]
  language: TLanguage
  className?: string
}

export const LevelSpikeTimeline = ({ spikes, language, className }: ILevelSpikeTimelineProps) => {
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
              ? 'from-warning/15 to-accent-gold/10 ring-warning/30 bg-linear-to-br ring-1'
              : 'bg-muted'
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold',
              spike.important
                ? 'from-warning to-accent-gold shadow-warning/30 bg-linear-to-br text-white shadow-lg'
                : 'bg-primary-muted text-primary-light'
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
          {spike.important && <LuStar className="fill-warning text-warning h-4 w-4 shrink-0" />}
        </div>
      ))}
    </div>
  )
}
