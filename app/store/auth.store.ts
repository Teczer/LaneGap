import type { RecordModel } from 'pocketbase'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { pb } from '@/lib/pocketbase'
import { showErrorToast, showSuccessToast } from '@/lib/toast'

export interface IUser {
  id: string
  email: string
  username: string
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

interface IAuthActions {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => void
  setLoading: (loading: boolean) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

type TAuthStore = IAuthState & IAuthActions

function mapUser(record: RecordModel): IUser {
  return {
    id: record.id,
    email: record.email as string,
    username: record.username as string,
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
      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const authData = await pb.collection('users').authWithPassword(email, password)
          set({
            user: mapUser(authData.record),
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          })
          showSuccessToast('loginSuccess')
        } catch (error) {
          set({ isLoading: false })
          showErrorToast('loginError')
          throw error
        }
      },

      register: async (email: string, password: string, username: string) => {
        set({ isLoading: true })
        try {
          // Create user (but don't login yet - wait for OTP verification)
          await pb.collection('users').create({
            email,
            password,
            passwordConfirm: password,
            username,
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
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        showSuccessToast('logoutSuccess')
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
        // Restore PocketBase auth store from persisted state
        if (state?.token && state?.user) {
          // Create a minimal record object for PocketBase
          const record = {
            id: state.user.id,
            email: state.user.email,
            username: state.user.username,
            avatar: state.user.avatar,
            created: state.user.created,
            collectionId: 'users',
            collectionName: 'users',
            updated: '',
          }
          pb.authStore.save(state.token, record)
        }
        state?.setHasHydrated(true)
      },
    }
  )
)
