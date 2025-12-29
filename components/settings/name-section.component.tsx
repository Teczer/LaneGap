'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { TSettingsTranslations } from '@/lib/i18n'
import { type TNameFormData, nameSchema } from '@/lib/validations/settings.schema'
import { Button, Input } from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'
import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from './settings-card.component'

interface INameSectionProps {
  translations: TSettingsTranslations
}

export const NameSection = ({ translations: t }: INameSectionProps) => {
  const { user, updateProfile } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<TNameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: user?.name ?? '' },
  })

  const onSubmit = async (data: TNameFormData) => {
    if (data.name === user?.name) return
    await updateProfile({ name: data.name })
  }

  return (
    <SettingsCard>
      <SettingsCardHeader title={t.name} description={t.nameDescription} />
      <SettingsCardContent>
        <form id="name-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('name')}
            placeholder={user?.name}
            autoComplete="name"
            className="max-w-sm"
          />
        </form>
      </SettingsCardContent>
      <SettingsCardFooter hint={t.nameHint}>
        <Button
          type="submit"
          form="name-form"
          variant="secondary"
          size="sm"
          isLoading={isSubmitting}
          disabled={!isDirty}
        >
          {t.save}
        </Button>
      </SettingsCardFooter>
    </SettingsCard>
  )
}
