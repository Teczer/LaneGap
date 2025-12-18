import { useAuthStore } from '@/app/store/auth.store'

/**
 * Hook to check if auth store has hydrated from localStorage.
 * Use this for UI components that need to show different content based on auth.
 *
 * Note: Protected routes are now handled by middleware, so no need for
 * client-side redirects. This hook is for UI state only.
 *
 * @returns { isHydrated: boolean, isAuthenticated: boolean, user: IUser | null }
 */
export function useAuthReady() {
  const { _hasHydrated, isAuthenticated, user } = useAuthStore()

  return {
    isHydrated: _hasHydrated,
    isAuthenticated,
    user,
  }
}
