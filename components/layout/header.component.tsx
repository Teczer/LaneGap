'use client'

import Link from 'next/link'
import { LuSwords } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { LanguageToggle } from '@/components/toggles/language-toggle.component'

interface IHeaderProps {
  className?: string
}

export function Header({ className }: IHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        'border-b border-white/5 bg-[#0a0d17]/80 backdrop-blur-xl',
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-white transition-colors hover:text-violet-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
            <LuSwords className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg tracking-tight">
            LANE<span className="text-violet-400">GAP</span>
          </span>
        </Link>

        {/* Controls */}
        <LanguageToggle />
      </div>
    </header>
  )
}
