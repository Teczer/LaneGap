'use client'

import { LuClock, LuPlay } from 'react-icons/lu'
import type { IClip } from '@/lib/types'
import { cn } from '@/lib/utils'

interface IClipCardProps {
  clip: IClip
  className?: string
}

export function ClipCard({ clip, className }: IClipCardProps) {
  return (
    <div
      className={cn(
        'group bg-surface relative overflow-hidden rounded-xl',
        'border-border border transition-all duration-200',
        'hover:border-accent hover:shadow-lg',
        className
      )}
    >
      {/* Video preview / placeholder */}
      <div className="bg-card relative aspect-video">
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="bg-accent/90 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg">
            <LuPlay className="ml-1 h-6 w-6" />
          </div>
        </div>

        {/* Timestamp badge */}
        {clip.timestamp && (
          <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
            <LuClock className="h-3 w-3" />
            {clip.timestamp}
          </div>
        )}
      </div>

      {/* Title */}
      <div className="p-3">
        <h4 className="text-text-primary group-hover:text-accent text-sm font-medium transition-colors">
          {clip.title}
        </h4>
      </div>
    </div>
  )
}
