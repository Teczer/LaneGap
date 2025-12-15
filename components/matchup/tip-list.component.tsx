'use client'

import { cn } from '@/lib/utils'
import { useSettingsStore } from '@/app/store/settings.store'
import { LuChevronRight } from 'react-icons/lu'

interface ITipListProps {
  tips: {
    en: string[]
    fr: string[]
  }
  className?: string
  maxItems?: number
}

export function TipList({ tips, className, maxItems }: ITipListProps) {
  const language = useSettingsStore((s) => s.language)

  const localizedTips = tips[language]
  const displayTips = maxItems ? localizedTips.slice(0, maxItems) : localizedTips

  if (displayTips.length === 0) {
    return <p className="text-sm italic text-white/40">No tips available</p>
  }

  return (
    <ul className={cn('space-y-2.5', className)}>
      {displayTips.map((tip, index) => (
        <li
          key={index}
          className={cn(
            'flex items-start gap-2.5 text-white/80',
            'animate-slide-up'
          )}
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <LuChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
          <span className="leading-relaxed">{tip}</span>
        </li>
      ))}
    </ul>
  )
}
