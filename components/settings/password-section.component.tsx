'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from '@/hooks/use-translations.hook'
import { useAuthStore } from '@/app/store/auth.store'
import { Button } from '@/components/ui'
import { PasswordInput } from '@/components/ui/password-input'
import { passwordSchema, type TPasswordFormData } from '@/lib/validations/settings.schema'
import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from './settings-card.component'

export function PasswordSection() {
  const { t } = useTranslations()
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
      <SettingsCardHeader
        title={t('settings.password')}
        description={t('settings.passwordDescription')}
      />
      <SettingsCardContent>
        <form id="password-form" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <PasswordInput
            {...register('currentPassword')}
            placeholder={t('settings.currentPasswordPlaceholder')}
            error={errors.currentPassword?.message}
            className="max-w-sm"
          />
          <PasswordInput
            {...register('newPassword')}
            placeholder={t('settings.newPasswordPlaceholder')}
            error={errors.newPassword?.message}
            className="max-w-sm"
          />
          <PasswordInput
            {...register('confirmPassword')}
            placeholder={t('settings.confirmNewPasswordPlaceholder')}
            error={errors.confirmPassword?.message}
            className="max-w-sm"
          />
        </form>
      </SettingsCardContent>
      <SettingsCardFooter hint={t('settings.passwordHint')}>
        <Button
          type="submit"
          form="password-form"
          variant="secondary"
          size="sm"
          isLoading={isSubmitting}
          disabled={!isValid}
        >
          {t('settings.save')}
        </Button>
      </SettingsCardFooter>
    </SettingsCard>
  )
}

