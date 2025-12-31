'use client'

import { useState } from 'react'
import { LuInfo, LuX } from 'react-icons/lu'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TierBadge, TIER_LABELS } from './tier-badge.component'
import type { TTier } from '@/lib/types'

const TIERS_TO_SHOW: TTier[] = ['S', 'A+', 'A', 'B+', 'B', 'B-', 'C']

interface ITierLegendProps {
  className?: string
}

export const TierLegend = ({ className }: ITierLegendProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('relative', className)}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full',
          'text-white/40 hover:text-white/70 hover:bg-white/10',
          'transition-colors duration-200 cursor-pointer'
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
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute right-0 top-full z-50 mt-2',
                'w-64 rounded-xl border border-white/10 bg-card/95 backdrop-blur-sm',
                'shadow-xl shadow-black/20'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-semibold text-white">Tier Legend</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white/70 cursor-pointer"
                >
                  <LuX className="h-4 w-4" />
                </button>
              </div>

              {/* Tier list */}
              <div className="p-3 space-y-2">
                {TIERS_TO_SHOW.map((tier) => (
                  <div
                    key={tier}
                    className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-white/5"
                  >
                    <TierBadge tier={tier} size="sm" />
                    <span className="text-sm text-white/70">{TIER_LABELS[tier]}</span>
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

