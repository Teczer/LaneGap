'use client'

import { motion } from 'framer-motion'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { LuLock, LuLogIn, LuMail } from 'react-icons/lu'
import type { TAuthTranslations } from '@/lib/i18n'
import type { TAuthForm } from '@/lib/validations/auth.schema'
import { Button, Input, PasswordInput } from '@/components/ui'

interface ILoginFormProps {
  translations: TAuthTranslations
  register: UseFormRegister<TAuthForm>
  errors: FieldErrors<TAuthForm>
  isLoading: boolean
  onSubmit: () => void
}

export const LoginForm = ({
  translations: t,
  register,
  errors,
  isLoading,
  onSubmit,
}: ILoginFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        type="email"
        placeholder={t.emailPlaceholder}
        autoComplete="email"
        icon={<LuMail className="h-5 w-5" />}
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordInput
        placeholder={t.passwordPlaceholder}
        autoComplete="current-password"
        icon={<LuLock className="h-5 w-5" />}
        error={errors.password?.message}
        {...register('password')}
      />
      {errors.root && (
        <div className="border-danger/30 bg-danger/10 text-danger rounded-lg border px-4 py-3 text-sm">
          {errors.root.message}
        </div>
      )}
      <Button type="submit" isLoading={isLoading} className="w-full">
        <LuLogIn className="h-5 w-5" />
        {t.loginButton}
      </Button>
    </motion.form>
  )
}
