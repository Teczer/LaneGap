'use client'

import Link from 'next/link'
import { LuLogIn, LuLogOut, LuSwords, LuUser } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/hooks/use-translations.hook'
import { LanguageToggle } from '@/components/toggles/language-toggle.component'
import { useAuthStore } from '@/app/store/auth.store'

interface IHeaderProps {
  className?: string
}

export function Header({ className }: IHeaderProps) {
  const { t } = useTranslations()
  const { user, isAuthenticated, logout } = useAuthStore()

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
        <div className="flex items-center gap-3">
          <LanguageToggle />

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-white/5 py-1.5 pr-3 pl-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
                  <LuUser className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium text-white/80">{user.username}</span>
              </div>
              <button
                onClick={logout}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
                title={t('auth.logout')}
              >
                <LuLogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="flex items-center gap-2 rounded-lg bg-violet-600/20 px-3 py-1.5 text-sm font-medium text-violet-400 transition-colors hover:bg-violet-600/30"
            >
              <LuLogIn className="h-4 w-4" />
              {t('auth.loginButton')}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
