'use client'

import { useRef, useState } from 'react'
import type { TSettingsTranslations } from '@/lib/i18n'
import { getAvatarUrl } from '@/lib/utils'
import { compressImage } from '@/lib/image-utils'
import { Avatar } from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'
import { SettingsCardFooter } from './settings-card.component'

interface IAvatarSectionProps {
  translations: TSettingsTranslations
}

export const AvatarSection = ({ translations: t }: IAvatarSectionProps) => {
  const { user, updateAvatar } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!user) return null

  const avatarUrl = getAvatarUrl(user.id, user.avatar)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsLoading(true)

    try {
      const { file: compressedFile, preview: compressedPreview } = await compressImage(file)
      setPreview(compressedPreview)
      await updateAvatar(compressedFile)
      setPreview(null)
    } catch (err) {
      const errorCode = err instanceof Error ? err.message : 'unknown_error'

      const errorMessages: Record<string, string> = {
        file_too_large: 'Image trop lourde (max 5MB)',
        invalid_file_type: 'Format non supporté',
        compression_error: "Erreur lors de l'optimisation",
        image_load_error: "Impossible de charger l'image",
      }

      setError(errorMessages[errorCode] || "Erreur lors du chargement de l'image")
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="rounded-lg border border-white/6 bg-transparent">
      <div className="flex items-start gap-6 px-4 py-4">
        <div className="flex-1 pt-1">
          <h3 className="text-base font-semibold text-white">{t.avatar}</h3>
          <p className="mt-1 text-sm text-white/50">{t.avatarDescription}</p>
          {error && <p className="text-danger mt-2 text-sm">{error}</p>}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="group shrink-0 cursor-pointer"
        >
          <Avatar
            src={preview || avatarUrl}
            alt={user.name}
            size="xl"
            isLoading={isLoading}
            className="transition-opacity group-hover:opacity-80"
          />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      <SettingsCardFooter hint={t.avatarHint} />
    </div>
  )
}
