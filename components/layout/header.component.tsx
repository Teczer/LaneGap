'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LuChevronDown, LuLogIn, LuLogOut, LuSettings, LuSwords } from 'react-icons/lu'
import type { TAuthTranslations } from '@/lib/i18n'
import { cn, getAvatarUrl } from '@/lib/utils'
import { useAuthReady } from '@/hooks/use-require-auth.hook'
import { LanguageToggle } from '@/components/toggles/language-toggle.component'
import { Avatar } from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'

interface IHeaderTranslations {
  settings: string
  auth: TAuthTranslations
}

interface IHeaderProps {
  translations: IHeaderTranslations
  className?: string
}

export const Header = ({ translations: t, className }: IHeaderProps) => {
  const router = useRouter()
  const { isHydrated, isAuthenticated, user } = useAuthReady()
  const logout = useAuthStore((s) => s.logout)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Close menu on escape
  useEffect(() => {
    if (!isMenuOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  const avatarUrl = user ? getAvatarUrl(user.id, user.avatar) : null

  const handleLogout = () => {
    setIsMenuOpen(false)
    logout()
    router.push('/')
  }

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

          {/* Show skeleton while hydrating */}
          {!isHydrated ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-white/5" />
          ) : isAuthenticated && user ? (
            <div ref={menuRef} className="relative">
              {/* User Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'flex items-center gap-2 rounded-full py-1 pr-2.5 pl-1',
                  'cursor-pointer bg-white/5 transition-all duration-200',
                  'hover:bg-white/10',
                  isMenuOpen && 'bg-white/10 ring-2 ring-violet-500/30'
                )}
              >
                {/* Avatar */}
                <Avatar src={avatarUrl} alt={user.name} size="sm" />

                {/* Username */}
                <span className="max-w-[100px] truncate text-sm font-medium text-white/80">
                  {user.name}
                </span>

                {/* Chevron */}
                <LuChevronDown
                  className={cn(
                    'h-4 w-4 text-white/40 transition-transform duration-200',
                    isMenuOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div
                  className={cn(
                    'absolute top-full right-0 mt-2 w-52',
                    'rounded-xl border border-white/10 bg-[#1a1f35] shadow-2xl shadow-black/20',
                    'animate-scale-in origin-top-right',
                    'overflow-hidden'
                  )}
                >
                  {/* User Info Header */}
                  <div className="border-b border-white/5 p-3">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={avatarUrl}
                        alt={user.name}
                        size="md"
                        className="shrink-0 ring-2"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{user.name}</p>
                        <p className="truncate text-xs text-white/50">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-1.5">
                    <Link
                      href="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5',
                        'text-sm text-white/70 transition-colors',
                        'hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <LuSettings className="h-4 w-4" />
                      {t.settings}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5',
                        'text-sm text-red-400 transition-colors',
                        'hover:bg-red-500/10'
                      )}
                    >
                      <LuLogOut className="h-4 w-4" />
                      {t.auth.logout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth"
              className="flex items-center gap-2 rounded-lg bg-violet-600/20 px-3 py-1.5 text-sm font-medium text-violet-400 transition-colors hover:bg-violet-600/30"
            >
              <LuLogIn className="h-4 w-4" />
              {t.auth.loginButton}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
