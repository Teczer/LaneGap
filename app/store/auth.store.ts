import type { RecordModel } from 'pocketbase'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { clearAuthCookie, setAuthCookie } from '@/lib/cookies'
import { pb } from '@/lib/pocketbase'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { useFavoritesStore } from './favorites.store'

export interface IUser {
  id: string
  email: string
  name: string
  avatar?: string
  created: string
}

interface IAuthState {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  _hasHydrated: boolean
}

// Action parameter types (exported for reuse)
export interface ILoginParams {
  email: string
  password: string
}

export interface IRegisterParams {
  email: string
  password: string
  name: string
}

export interface IUpdatePasswordParams {
  currentPassword: string
  newPassword: string
}

export type TOAuthProvider = 'google' | 'discord'

interface IAuthActions {
  login: (params: ILoginParams) => Promise<void>
  loginWithOAuth: (provider: TOAuthProvider) => Promise<void>
  register: (params: IRegisterParams) => Promise<void>
  logout: () => void
  updateProfile: (params: { name: string }) => Promise<void>
  updateAvatar: (file: File | null) => Promise<void>
  updatePassword: (params: IUpdatePasswordParams) => Promise<void>
  deleteAccount: () => Promise<void>
  setLoading: (loading: boolean) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

type TAuthStore = IAuthState & IAuthActions

function mapUser(record: RecordModel): IUser {
  const email = record.email as string
  // Use 'name' field, fallback to email prefix
  const name: string = (record.name as string) || email.split('@')[0] || 'User'

  return {
    id: record.id,
    email,
    name,
    avatar: record.avatar as string | undefined,
    created: record.created,
  }
}

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      _hasHydrated: false,

      // Actions
      login: async ({ email, password }) => {
        set({ isLoading: true })
        try {
          const authData = await pb.collection('users').authWithPassword(email, password)
          const user = mapUser(authData.record)

          // Set cookie for middleware auth
          setAuthCookie(authData.token, user.id)

          set({
            user,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          })

          // Sync favorites: merge localStorage with server data
          useFavoritesStore.getState().mergeAndSync(user.id)

          showSuccessToast('loginSuccess')
        } catch (error) {
          set({ isLoading: false })
          showErrorToast('loginError')
          throw error
        }
      },

      loginWithOAuth: async (provider) => {
        set({ isLoading: true })
        try {
          const authData = await pb.collection('users').authWithOAuth2({ provider })
          const user = mapUser(authData.record)

          // Set cookie for middleware auth
          setAuthCookie(authData.token, user.id)

          set({
            user,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          })

          // Sync favorites: merge localStorage with server data
          useFavoritesStore.getState().mergeAndSync(user.id)

          showSuccessToast('loginSuccess')
        } catch (error) {
          set({ isLoading: false })
          showErrorToast('oauthError')
          throw error
        }
      },

      register: async ({ email, password, name }) => {
        set({ isLoading: true })
        try {
          // Create user (but don't login yet - wait for OTP verification)
          await pb.collection('users').create({
            email,
            password,
            passwordConfirm: password,
            name,
          })
          set({ isLoading: false })
          // Don't show success toast here - OTP flow will handle it
        } catch (error) {
          set({ isLoading: false })
          showErrorToast('registerError')
          throw error
        }
      },

      logout: () => {
        pb.authStore.clear()
        clearAuthCookie()
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        showSuccessToast('logoutSuccess')
      },

      updateProfile: async ({ name }) => {
        const state = useAuthStore.getState()
        if (!state.user) throw new Error('Not authenticated')

        set({ isLoading: true })
        try {
          const record = await pb.collection('users').update(state.user.id, { name })
          set({
            user: mapUser(record),
            isLoading: false,
          })
          showSuccessToast('profileUpdated')
        } catch (error) {
          set({ isLoading: false })
          showErrorToast('profileUpdateError')
          throw error
        }
      },

      updateAvatar: async (file: File | null) => {
        const state = useAuthStore.getState()
        if (!state.user) throw new Error('Not authenticated')

        set({ isLoading: true })
        try {
          const formData = new FormData()
          if (file) {
            formData.append('avatar', file)
          } else {
            // Remove avatar by setting empty
            formData.append('avatar', '')
          }
          const record = await pb.collection('users').update(state.user.id, formData)
          set({
            user: mapUser(record),
            isLoading: false,
          })
          showSuccessToast(file ? 'avatarUploaded' : 'avatarRemoved')
        } catch (error) {
          set({ isLoading: false })
          showErrorToast('avatarUploadError')
          throw error
        }
      },

      updatePassword: async ({ currentPassword, newPassword }) => {
        const state = useAuthStore.getState()
        if (!state.user) throw new Error('Not authenticated')

        set({ isLoading: true })
        try {
          await pb.collection('users').update(state.user.id, {
            oldPassword: currentPassword,
            password: newPassword,
            passwordConfirm: newPassword,
          })
          set({ isLoading: false })
          showSuccessToast('passwordUpdated')
        } catch (error) {
          set({ isLoading: false })
          showErrorToast('passwordUpdateError')
          throw error
        }
      },

      deleteAccount: async () => {
        const state = useAuthStore.getState()
        if (!state.user) throw new Error('Not authenticated')

        set({ isLoading: true })
        try {
          // Delete all user's notes first (cascade delete)
          const userNotes = await pb.collection('user_notes').getFullList({
            filter: `user = "${state.user.id}"`,
          })
          await Promise.all(userNotes.map((note) => pb.collection('user_notes').delete(note.id)))

          // Delete user's favorites
          await useFavoritesStore.getState().clearServerData(state.user.id)

          // Now delete the user
          await pb.collection('users').delete(state.user.id)
          pb.authStore.clear()
          clearAuthCookie()
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
          showSuccessToast('accountDeleted')
        } catch (error) {
          set({ isLoading: false })
          showErrorToast('accountDeleteError')
          throw error
        }
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: 'lanegap-auth',
      // Persist both user and token
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Restore PocketBase auth store and cookie from persisted state
        if (state?.token && state?.user) {
          // Create a minimal record object for PocketBase
          const record = {
            id: state.user.id,
            email: state.user.email,
            name: state.user.name,
            avatar: state.user.avatar,
            created: state.user.created,
            collectionId: 'users',
            collectionName: 'users',
            updated: '',
          }
          pb.authStore.save(state.token, record)

          // Sync cookie for middleware auth
          setAuthCookie(state.token, state.user.id)

          // Sync favorites from server (non-blocking)
          useFavoritesStore.getState().syncFromServer(state.user.id)
        }
        state?.setHasHydrated(true)
      },
    }
  )
)
