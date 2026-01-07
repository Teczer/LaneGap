'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuInfo, LuX } from 'react-icons/lu'
import type { TLanguage } from '@/lib/i18n'
import type { TTier } from '@/lib/types'
import { cn } from '@/lib/utils'
import { TIER_LABELS, TierBadge } from './tier-badge.component'

const TIERS_TO_SHOW: TTier[] = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'B-', 'C']

interface ITierLegendProps {
  className?: string
  language: TLanguage
}

export const TierLegend = ({ className, language }: ITierLegendProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('relative', className)}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full',
          'text-white/40 hover:bg-white/10 hover:text-white/70',
          'cursor-pointer transition-colors duration-200'
        )}
        aria-label="Tier explanation"
      >
        <LuInfo className="h-4 w-4" />
      </button>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute top-full right-0 z-50 mt-2',
                'bg-card/95 w-64 rounded-xl border border-white/10 backdrop-blur-sm',
                'shadow-xl shadow-black/20'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-semibold text-white">Tier Legend</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-white/40 hover:text-white/70"
                >
                  <LuX className="h-4 w-4" />
                </button>
              </div>

              {/* Tier list */}
              <div className="space-y-2 p-3">
                {TIERS_TO_SHOW.map((tier) => (
                  <div
                    key={tier}
                    className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-white/5"
                  >
                    <TierBadge tier={tier} size="sm" language={language} />
                    <span className="text-sm text-white/70">{TIER_LABELS[tier][language]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
