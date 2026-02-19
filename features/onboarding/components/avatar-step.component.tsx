'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LuCamera, LuCheck } from 'react-icons/lu'
import type { TOnboardingTranslations } from '@/lib/i18n'
import { getAvatarUrl } from '@/lib/utils'
import { compressImage } from '@/lib/image-utils'
import { Avatar, Button } from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'

interface IAvatarStepProps {
  translations: TOnboardingTranslations
  onFinish: () => void
  onSkip: () => void
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export const AvatarStep = ({ translations: t, onFinish, onSkip }: IAvatarStepProps) => {
  const { user, updateAvatar, isLoading } = useAuthStore()
  const [preview, setPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const avatarUrl = user ? getAvatarUrl(user.id, user.avatar) : null

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsCompressing(true)

    try {
      const { file: compressedFile, preview: compressedPreview } = await compressImage(file)
      setAvatarFile(compressedFile)
      setPreview(compressedPreview)
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
      setIsCompressing(false)
      // Reset input to allow re-selecting same file
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleFinish = async () => {
    if (avatarFile) {
      try {
        await updateAvatar(avatarFile)
      } catch {
        // Continue anyway
      }
    }
    onFinish()
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center text-center"
    >
      <motion.h1 variants={itemVariants} className="mb-3 text-3xl font-bold text-white">
        {t.avatarTitle}
      </motion.h1>

      <motion.p variants={itemVariants} className="mb-10 text-white/60">
        {t.avatarSubtitle}
      </motion.p>

      <motion.div variants={itemVariants} className="mb-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isCompressing}
          className="group relative cursor-pointer disabled:cursor-wait"
        >
          <Avatar
            src={preview || avatarUrl}
            alt={user?.name ?? 'User'}
            size="2xl"
            className="transition-opacity group-hover:opacity-80"
          />
          <motion.div
            className="bg-primary border-card absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-2 text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <LuCamera className="h-5 w-5" />
          </motion.div>
          {isCompressing && (
            <div className="bg-card/80 absolute inset-0 flex items-center justify-center rounded-full">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-danger mb-4 text-sm"
        >
          {error}
        </motion.p>
      )}

      <motion.p variants={itemVariants} className="mb-10 text-xs text-white/40">
        {t.avatarHint}
      </motion.p>

      <motion.div variants={itemVariants} className="flex w-full max-w-xs flex-col gap-3">
        <Button
          onClick={handleFinish}
          isLoading={isLoading}
          disabled={!avatarFile}
          className="w-full"
          size="lg"
        >
          <LuCheck className="h-5 w-5" />
          {t.finishButton}
        </Button>

        <button
          onClick={onSkip}
          disabled={isLoading}
          className="text-sm text-white/40 transition-colors hover:text-white/60"
        >
          {t.skipButton}
        </button>
      </motion.div>
    </motion.div>
  )
}
