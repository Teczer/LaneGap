'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaDiscord, FaGoogle } from 'react-icons/fa'
import { LuLoader } from 'react-icons/lu'
import type { TAuthTranslations } from '@/lib/i18n'
import { Button } from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'

interface IOAuthButtonsProps {
  translations: TAuthTranslations
}

export const OAuthButtons = ({ translations: t }: IOAuthButtonsProps) => {
  const router = useRouter()
  const { loginWithOAuth, isLoading } = useAuthStore()
  const [oauthLoading, setOauthLoading] = useState<'google' | 'discord' | null>(null)

  const handleOAuthLogin = async (provider: 'google' | 'discord') => {
    setOauthLoading(provider)
    try {
      await loginWithOAuth(provider)
      router.push('/')
    } catch {
      // Error toast handled in store
    } finally {
      setOauthLoading(null)
    }
  }

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-card px-4 text-white/40">{t.orContinueWith}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthLogin('google')}
          disabled={isLoading || oauthLoading !== null}
          className="w-full"
        >
          {oauthLoading === 'google' ? (
            <LuLoader className="h-5 w-5 animate-spin" />
          ) : (
            <FaGoogle className="h-5 w-5" />
          )}
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthLogin('discord')}
          disabled={isLoading || oauthLoading !== null}
          className="w-full"
        >
          {oauthLoading === 'discord' ? (
            <LuLoader className="h-5 w-5 animate-spin" />
          ) : (
            <FaDiscord className="h-5 w-5 text-[#5865F2]" />
          )}
          Discord
        </Button>
      </div>
    </>
  )
}
