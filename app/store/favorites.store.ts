import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  deleteUserFavorites,
  getUserFavorites,
  saveUserFavorites,
} from '@/lib/api/favorites.api'

interface IFavoritesState {
  favoriteChampions: string[]
  recentChampions: string[]
  myChampion: string | null
  _syncedUserId: string | null // Track which user we're synced with

  // Local actions (always update localStorage)
  addFavorite: (championId: string) => void
  removeFavorite: (championId: string) => void
  toggleFavorite: (championId: string) => void
  isFavorite: (championId: string) => boolean

  addRecent: (championId: string) => void
  clearRecents: () => void

  setMyChampion: (championId: string | null) => void

  // Sync actions (for authenticated users)
  syncFromServer: (userId: string) => Promise<void>
  syncToServer: (userId: string) => Promise<void>
  mergeAndSync: (userId: string) => Promise<void> // Merge localStorage + DB then sync
  clearServerData: (userId: string) => Promise<void>
}

const MAX_RECENTS = 10

export const useFavoritesStore = create<IFavoritesState>()(
  persist(
    (set, get) => ({
      favoriteChampions: [],
      recentChampions: [],
      myChampion: null,
      _syncedUserId: null,

      // =========================================================================
      // LOCAL ACTIONS (update state + sync to server if authenticated)
      // =========================================================================

      addFavorite: (championId) => {
        const state = get()
        if (state.favoriteChampions.includes(championId)) return

        const newFavorites = [...state.favoriteChampions, championId]
        set({ favoriteChampions: newFavorites })

        // Sync to server if authenticated
        if (state._syncedUserId) {
          saveUserFavorites(state._syncedUserId, { favorite_champions: newFavorites })
        }
      },

      removeFavorite: (championId) => {
        const state = get()
        const newFavorites = state.favoriteChampions.filter((id) => id !== championId)
        set({ favoriteChampions: newFavorites })

        // Sync to server if authenticated
        if (state._syncedUserId) {
          saveUserFavorites(state._syncedUserId, { favorite_champions: newFavorites })
        }
      },

      toggleFavorite: (championId) => {
        const state = get()
        if (state.favoriteChampions.includes(championId)) {
          state.removeFavorite(championId)
        } else {
          state.addFavorite(championId)
        }
      },

      isFavorite: (championId) => get().favoriteChampions.includes(championId),

      addRecent: (championId) =>
        set((state) => {
          const filtered = state.recentChampions.filter((id) => id !== championId)
          return {
            recentChampions: [championId, ...filtered].slice(0, MAX_RECENTS),
          }
        }),

      clearRecents: () => set({ recentChampions: [] }),

      setMyChampion: (championId) => {
        const state = get()
        set({ myChampion: championId })

        // Sync to server if authenticated
        if (state._syncedUserId) {
          saveUserFavorites(state._syncedUserId, { my_champion: championId })
        }
      },

      // =========================================================================
      // SYNC ACTIONS
      // =========================================================================

      /**
       * Fetch favorites from server and replace local state
       * Called on login when user already has data in DB
       */
      syncFromServer: async (userId: string) => {
        const serverData = await getUserFavorites(userId)

        if (serverData) {
          set({
            favoriteChampions: serverData.favorite_champions || [],
            myChampion: serverData.my_champion || null,
            _syncedUserId: userId,
          })
        } else {
          // No server data, just mark as synced
          set({ _syncedUserId: userId })
        }
      },

      /**
       * Push current local state to server
       * Called when we want to save current state to DB
       */
      syncToServer: async (userId: string) => {
        const state = get()
        await saveUserFavorites(userId, {
          favorite_champions: state.favoriteChampions,
          my_champion: state.myChampion,
        })
        set({ _syncedUserId: userId })
      },

      /**
       * Merge localStorage favorites with server data, then sync
       * Called on first login/register to preserve localStorage favorites
       */
      mergeAndSync: async (userId: string) => {
        const state = get()
        const serverData = await getUserFavorites(userId)

        // Merge: combine localStorage + server (dedupe)
        const localFavorites = state.favoriteChampions
        const serverFavorites = serverData?.favorite_champions || []
        const mergedFavorites = [...new Set([...serverFavorites, ...localFavorites])]

        // For myChampion: prefer server if exists, otherwise keep local
        const mergedMyChampion = serverData?.my_champion || state.myChampion

        // Update local state
        set({
          favoriteChampions: mergedFavorites,
          myChampion: mergedMyChampion,
          _syncedUserId: userId,
        })

        // Push merged data to server
        await saveUserFavorites(userId, {
          favorite_champions: mergedFavorites,
          my_champion: mergedMyChampion,
        })
      },

      /**
       * Delete server data (for account deletion)
       */
      clearServerData: async (userId: string) => {
        await deleteUserFavorites(userId)
        set({ _syncedUserId: null })
      },
    }),
    {
      name: 'lanegap-favorites',
      // Don't persist _syncedUserId - it should be set on login
      partialize: (state) => ({
        favoriteChampions: state.favoriteChampions,
        recentChampions: state.recentChampions,
        myChampion: state.myChampion,
      }),
    }
  )
)
