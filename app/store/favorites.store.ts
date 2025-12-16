import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IFavoritesState {
  favoriteChampions: string[]
  recentChampions: string[]
  myChampion: string | null

  addFavorite: (championId: string) => void
  removeFavorite: (championId: string) => void
  toggleFavorite: (championId: string) => void
  isFavorite: (championId: string) => boolean

  addRecent: (championId: string) => void
  clearRecents: () => void

  setMyChampion: (championId: string | null) => void
}

const MAX_RECENTS = 10

export const useFavoritesStore = create<IFavoritesState>()(
  persist(
    (set, get) => ({
      favoriteChampions: [],
      recentChampions: [],
      myChampion: null,

      addFavorite: (championId) =>
        set((state) => {
          if (state.favoriteChampions.includes(championId)) return state
          return { favoriteChampions: [...state.favoriteChampions, championId] }
        }),

      removeFavorite: (championId) =>
        set((state) => ({
          favoriteChampions: state.favoriteChampions.filter((id) => id !== championId),
        })),

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

      setMyChampion: (championId) => set({ myChampion: championId }),
    }),
    {
      name: 'lanegap-favorites',
    }
  )
)
