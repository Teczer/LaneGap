'use client'

import { motion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LuArrowRight, LuUser } from 'react-icons/lu'
import type { TOnboardingTranslations } from '@/lib/i18n'
import { type TProfileSetupForm, profileSetupSchema } from '@/lib/validations/auth.schema'
import { Button, Input } from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'

interface IPseudoStepProps {
  translations: TOnboardingTranslations
  onNext: () => void
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

export const PseudoStep = ({ translations: t, onNext, onSkip }: IPseudoStepProps) => {
  const { updateProfile, isLoading } = useAuthStore()

  const form = useForm<TProfileSetupForm>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: { name: '' },
    mode: 'onChange',
  })

  const { isValid, errors } = form.formState
  const nameValue = form.watch('name')

  const onSubmit = async (data: TProfileSetupForm) => {
    try {
      await updateProfile({ name: data.name })
      onNext()
    } catch {
      form.setError('root', { message: t.pseudoUpdateError })
    }
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
        {t.pseudoTitle}
      </motion.h1>

      <motion.p variants={itemVariants} className="mb-10 text-white/60">
        {t.pseudoSubtitle}
      </motion.p>

      <motion.form
        variants={itemVariants}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xs"
      >
        <div className="mb-3">
          <Input
            type="text"
            placeholder={t.pseudoPlaceholder}
            icon={<LuUser className="h-5 w-5" />}
            error={errors.name?.message}
            maxLength={20}
            autoFocus
            {...form.register('name')}
          />
        </div>

        <p className="mb-8 text-xs text-white/40">{t.pseudoHint}</p>

        {errors.root && (
          <p className="text-danger mb-4 text-sm">{errors.root.message}</p>
        )}

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid || !nameValue.trim()}
            className="w-full"
            size="lg"
          >
            {t.continueButton}
            <LuArrowRight className="h-5 w-5" />
          </Button>

          <button
            type="button"
            onClick={onSkip}
            disabled={isLoading}
            className="text-sm text-white/40 transition-colors hover:text-white/60"
          >
            {t.skipButton}
          </button>
        </div>
      </motion.form>
    </motion.div>
  )
}
