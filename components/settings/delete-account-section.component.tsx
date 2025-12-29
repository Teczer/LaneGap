'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LuTrash2 } from 'react-icons/lu'
import type { TSettingsTranslations } from '@/lib/i18n'
import { parseBold } from '@/lib/utils'
import { type TDeleteAccountFormData, deleteAccountSchema } from '@/lib/validations/settings.schema'
import { Button, Input } from '@/components/ui'
import { useAuthStore } from '@/app/store/auth.store'
import {
  SettingsCard,
  SettingsCardContent,
  SettingsCardFooter,
  SettingsCardHeader,
} from './settings-card.component'

interface IDeleteAccountSectionProps {
  translations: TSettingsTranslations
}

export const DeleteAccountSection = ({ translations: t }: IDeleteAccountSectionProps) => {
  const router = useRouter()
  const deleteAccount = useAuthStore((s) => s.deleteAccount)
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<TDeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
    mode: 'onChange',
    defaultValues: { confirmText: '' as 'DELETE' },
  })

  const onSubmit = async () => {
    await deleteAccount()
    router.push('/')
  }

  const closeModal = () => {
    setShowModal(false)
    reset()
  }

  return (
    <>
      <SettingsCard variant="danger">
        <SettingsCardHeader
          title={t.deleteAccount}
          description={t.deleteAccountDescription}
          variant="danger"
        />
        <SettingsCardContent>
          <p className="text-sm text-white/60">{parseBold(t.deleteAccountWarning)}</p>
        </SettingsCardContent>
        <SettingsCardFooter variant="danger">
          <Button variant="danger" size="sm" onClick={() => setShowModal(true)}>
            {t.deleteAccountButton}
          </Button>
        </SettingsCardFooter>
      </SettingsCard>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="animate-scale-in bg-card mx-4 w-full max-w-md rounded-xl border border-white/10 p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                <LuTrash2 className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{t.deleteConfirmTitle}</h3>
            </div>
            <p className="mb-4 text-sm text-white/60">{t.deleteConfirmMessage}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register('confirmText')}
                placeholder={t.deleteConfirmPlaceholder}
                className="mb-4"
              />
              <div className="flex gap-3">
                <Button type="button" variant="ghost" onClick={closeModal} className="flex-1">
                  {t.cancel}
                </Button>
                <Button
                  type="submit"
                  variant="danger"
                  disabled={!isValid}
                  isLoading={isSubmitting}
                  className="flex-1"
                >
                  {t.confirm}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
