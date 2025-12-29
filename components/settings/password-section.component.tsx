'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { TSettingsTranslations } from '@/lib/i18n'
import { type TPasswordFormData, passwordSchema } from '@/lib/validations/settings.schema'
import { Button } from '@/components/ui'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuthStore } from '@/app/store/auth.store'
import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from './settings-card.component'

interface IPasswordSectionProps {
  translations: TSettingsTranslations
}

export const PasswordSection = ({ translations: t }: IPasswordSectionProps) => {
  const updatePassword = useAuthStore((s) => s.updatePassword)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid },
  } = useForm<TPasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: TPasswordFormData) => {
    await updatePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword })
    reset()
  }

  return (
    <SettingsCard>
      <SettingsCardHeader title={t.password} description={t.passwordDescription} />
      <SettingsCardContent>
        <form id="password-form" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <PasswordInput
            {...register('currentPassword')}
            placeholder={t.currentPasswordPlaceholder}
            error={errors.currentPassword?.message}
            className="max-w-sm"
          />
          <PasswordInput
            {...register('newPassword')}
            placeholder={t.newPasswordPlaceholder}
            error={errors.newPassword?.message}
            className="max-w-sm"
          />
          <PasswordInput
            {...register('confirmPassword')}
            placeholder={t.confirmNewPasswordPlaceholder}
            error={errors.confirmPassword?.message}
            className="max-w-sm"
          />
        </form>
      </SettingsCardContent>
      <SettingsCardFooter hint={t.passwordHint}>
        <Button
          type="submit"
          form="password-form"
          variant="secondary"
          size="sm"
          isLoading={isSubmitting}
          disabled={!isValid}
        >
          {t.save}
        </Button>
      </SettingsCardFooter>
    </SettingsCard>
  )
}
