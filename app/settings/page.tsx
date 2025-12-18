'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LuArrowLeft, LuLoader, LuTrash2, LuUser, LuX } from 'react-icons/lu'
import { useTranslations } from '@/hooks/use-translations.hook'
import { useAuthStore } from '@/app/store/auth.store'
import { Avatar, Button, Input } from '@/components/ui'
import { PasswordInput } from '@/components/ui/password-input'
import { cn, getAvatarUrl } from '@/lib/utils'

export default function SettingsPage() {
  const { t } = useTranslations()
  const router = useRouter()
  const {
    user,
    isAuthenticated,
    _hasHydrated,
    updateProfile,
    updateAvatar,
    updatePassword,
    deleteAccount,
  } = useAuthStore()

  // Form states
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Loading states
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [savingAvatar, setSavingAvatar] = useState(false)
  const [deletingAccount, setDeletingAccount] = useState(false)

  // Avatar
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? '')
    }
  }, [user])

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      router.push('/auth')
    }
  }, [_hasHydrated, isAuthenticated, router])

  if (!_hasHydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LuLoader className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const avatarUrl = getAvatarUrl(user.id, user.avatar)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) return

    const reader = new FileReader()
    reader.onloadend = () => setAvatarPreview(reader.result as string)
    reader.readAsDataURL(file)

    setSavingAvatar(true)
    try {
      await updateAvatar(file)
      setAvatarPreview(null)
    } finally {
      setSavingAvatar(false)
    }
  }

  const handleRemoveAvatar = async () => {
    setSavingAvatar(true)
    try {
      await updateAvatar(null)
      setAvatarPreview(null)
    } finally {
      setSavingAvatar(false)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username?.trim() || username === user.username) return

    setSavingProfile(true)
    try {
      await updateProfile(username.trim())
    } finally {
      setSavingProfile(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword || !newPassword || newPassword !== confirmNewPassword) return
    if (newPassword.length < 8) return

    setSavingPassword(true)
    try {
      await updatePassword(currentPassword, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } finally {
      setSavingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return

    setDeletingAccount(true)
    try {
      await deleteAccount()
      router.push('/')
    } finally {
      setDeletingAccount(false)
    }
  }

  const passwordError =
    confirmNewPassword && newPassword !== confirmNewPassword
      ? t('auth.passwordMismatch')
      : newPassword && newPassword.length < 8
        ? t('auth.passwordTooShort')
        : undefined

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LuArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-white">{t('settings.title')}</h1>
      </div>

      <div className="space-y-0">
        {/* Avatar Section */}
        <SettingsCard>
          <SettingsCardHeader
            title={t('settings.avatar')}
            description={t('settings.avatarDescription')}
          />
          <SettingsCardContent>
            <div className="flex items-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={savingAvatar}
                className="group cursor-pointer"
              >
                <Avatar
                  src={avatarPreview || avatarUrl}
                  alt={user.username}
                  size="xl"
                  isLoading={savingAvatar}
                  className="transition-opacity group-hover:opacity-80"
                />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              {avatarUrl && (
                <button
                  onClick={handleRemoveAvatar}
                  disabled={savingAvatar}
                  className="flex cursor-pointer items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-red-400"
                >
                  <LuX className="h-3.5 w-3.5" />
                  {t('settings.removeAvatar')}
                </button>
              )}
            </div>
          </SettingsCardContent>
          <SettingsCardFooter hint={t('settings.avatarHint')} />
        </SettingsCard>

        {/* Username Section */}
        <SettingsCard>
          <SettingsCardHeader
            title={t('settings.username')}
            description={t('settings.usernameDescription')}
          />
          <SettingsCardContent>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/40">
                lanegap.gg/
              </span>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={user.username}
                className="max-w-xs"
              />
            </div>
          </SettingsCardContent>
          <SettingsCardFooter hint={t('settings.usernameHint')}>
            <Button
              variant="secondary"
              size="sm"
              isLoading={savingProfile}
              disabled={!username?.trim() || username === user.username}
              onClick={handleSaveProfile}
            >
              {t('settings.save')}
            </Button>
          </SettingsCardFooter>
        </SettingsCard>

        {/* Email Section (Read-only) */}
        <SettingsCard>
          <SettingsCardHeader title={t('settings.email')} description={t('settings.emailDescription')} />
          <SettingsCardContent>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white">{user.email}</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                {t('settings.verified')}
              </span>
            </div>
          </SettingsCardContent>
          <SettingsCardFooter hint={t('settings.emailHint')} />
        </SettingsCard>

        {/* Password Section */}
        <SettingsCard>
          <SettingsCardHeader
            title={t('settings.password')}
            description={t('settings.passwordDescription')}
          />
          <SettingsCardContent>
            <form id="password-form" onSubmit={handleUpdatePassword} className="space-y-3">
              <PasswordInput
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={t('settings.currentPasswordPlaceholder')}
                className="max-w-sm"
              />
              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('settings.newPasswordPlaceholder')}
                className="max-w-sm"
              />
              <PasswordInput
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder={t('settings.confirmNewPasswordPlaceholder')}
                error={passwordError}
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
              isLoading={savingPassword}
              disabled={
                !currentPassword ||
                !newPassword ||
                newPassword !== confirmNewPassword ||
                newPassword.length < 8
              }
            >
              {t('settings.save')}
            </Button>
          </SettingsCardFooter>
        </SettingsCard>

        {/* Delete Account Section */}
        <SettingsCard variant="danger">
          <SettingsCardHeader
            title={t('settings.deleteAccount')}
            description={t('settings.deleteAccountDescription')}
            variant="danger"
          />
          <SettingsCardContent>
            <p className="text-sm text-white/60">{t('settings.deleteAccountWarning')}</p>
          </SettingsCardContent>
          <SettingsCardFooter variant="danger">
            <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)}>
              {t('settings.deleteAccountButton')}
            </Button>
          </SettingsCardFooter>
        </SettingsCard>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md animate-scale-in rounded-xl border border-white/10 bg-[#1a1f35] p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                <LuTrash2 className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{t('settings.deleteConfirmTitle')}</h3>
            </div>
            <p className="mb-4 text-sm text-white/60">{t('settings.deleteConfirmMessage')}</p>
            <Input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={t('settings.deleteConfirmPlaceholder')}
              className="mb-4"
            />
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setDeleteConfirmText('')
                }}
                className="flex-1"
              >
                {t('settings.cancel')}
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                isLoading={deletingAccount}
                className="flex-1"
              >
                {t('settings.confirm')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

// ============================================================================
// Settings Card Components (Vercel-style)
// ============================================================================

interface ISettingsCardProps {
  children: React.ReactNode
  variant?: 'default' | 'danger'
}

function SettingsCard({ children, variant = 'default' }: ISettingsCardProps) {
  return (
    <div
      className={cn(
        'border-b border-white/[0.06] bg-transparent',
        variant === 'danger' && 'border-red-500/20 bg-red-500/[0.02]'
      )}
    >
      {children}
    </div>
  )
}

interface ISettingsCardHeaderProps {
  title: string
  description: string
  variant?: 'default' | 'danger'
}

function SettingsCardHeader({ title, description, variant = 'default' }: ISettingsCardHeaderProps) {
  return (
    <div className="pb-4 pt-6">
      <h3 className={cn('text-base font-semibold', variant === 'danger' ? 'text-red-400' : 'text-white')}>
        {title}
      </h3>
      <p className="mt-1 text-sm text-white/50">{description}</p>
    </div>
  )
}

function SettingsCardContent({ children }: { children: React.ReactNode }) {
  return <div className="pb-4">{children}</div>
}

interface ISettingsCardFooterProps {
  hint?: string
  children?: React.ReactNode
  variant?: 'default' | 'danger'
}

function SettingsCardFooter({ hint, children, variant = 'default' }: ISettingsCardFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-b-lg py-3',
        'border-t',
        variant === 'danger'
          ? 'border-red-500/20 bg-red-500/[0.05]'
          : 'border-white/[0.06] bg-white/[0.02]'
      )}
    >
      {hint && <p className="text-xs text-white/40">{hint}</p>}
      {!hint && <div />}
      {children}
    </div>
  )
}
