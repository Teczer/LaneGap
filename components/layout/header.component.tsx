'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LuChevronDown, LuLogIn, LuLogOut, LuSettings } from 'react-icons/lu'
import type { TAuthTranslations, TLanguage } from '@/lib/i18n'
import { cn, getAvatarUrl } from '@/lib/utils'
import { useAuthReady } from '@/hooks/use-require-auth.hook'
import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { Logo } from '@/components/ui/logo'
import { useAuthStore } from '@/app/store/auth.store'
import { LanguageToggle } from './language-toggle.component'

interface IHeaderTranslations {
  settings: string
  auth: TAuthTranslations
}

interface IHeaderProps {
  translations: IHeaderTranslations
  language: TLanguage
  className?: string
}

export const Header = ({ translations: t, language, className }: IHeaderProps) => {
  const router = useRouter()
  const { isHydrated, isAuthenticated, user } = useAuthReady()
  const logout = useAuthStore((s) => s.logout)

  const avatarUrl = user ? getAvatarUrl(user.id, user.avatar) : null

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header
      className={cn('sticky top-0 z-40 w-full', 'bg-background/80 backdrop-blur-xl', className)}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white transition-transform hover:scale-105"
        >
          <Logo size="lg" />
          <span className="text-lg font-bold tracking-tight">
            LANE<span className="text-primary-light">GAP</span>
          </span>
        </Link>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle - only show when not authenticated */}
          {isHydrated && !isAuthenticated && <LanguageToggle currentLanguage={language} />}
          {/* Show skeleton while hydrating */}
          {!isHydrated ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-white/5" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    'flex items-center gap-2 rounded-full py-1 pr-2.5 pl-1',
                    'cursor-pointer bg-white/5 transition-all duration-200',
                    'hover:bg-white/10',
                    'data-[state=open]:bg-secondary data-[state=open]:ring-primary/30 data-[state=open]:ring-2'
                  )}
                >
                  <Avatar src={avatarUrl} alt={user.name} size="sm" />
                  <span className="max-w-[100px] truncate text-sm font-medium text-white/80">
                    {user.name}
                  </span>
                  <LuChevronDown className="h-4 w-4 text-white/40 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="p-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={avatarUrl} alt={user.name} size="md" className="shrink-0 ring-2" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{user.name}</p>
                      <p className="truncate text-xs text-white/50">{user.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <LuSettings className="h-4 w-4" />
                      {t.settings}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LuLogOut className="h-4 w-4" />
                    {t.auth.logout}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth"
              className="bg-primary-muted text-primary-light hover:bg-primary/30 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
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
