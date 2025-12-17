'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createNote,
  deleteNote,
  fetchEnemyNotes,
  fetchMatchupNotes,
  updateNote,
} from '@/lib/api/notes.api'
import { showErrorToast, showSuccessToast } from '@/lib/toast'
import { useAuthStore } from '@/app/store/auth.store'

// =============================================================================
// Query Keys
// =============================================================================

export const noteKeys = {
  all: ['notes'] as const,
  enemy: (userId: string, championId: string) => ['notes', 'enemy', userId, championId] as const,
  matchup: (userId: string, myChamp: string, enemyChamp: string) =>
    ['notes', 'matchup', userId, myChamp, enemyChamp] as const,
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Fetch notes for a specific enemy (general tips)
 */
export function useEnemyNotes(championId: string) {
  const user = useAuthStore((s) => s.user)

  return useQuery({
    queryKey: noteKeys.enemy(user?.id || '', championId),
    queryFn: () => fetchEnemyNotes(user!.id, championId),
    enabled: !!user && !!championId,
  })
}

/**
 * Fetch notes for a specific matchup
 */
export function useMatchupNotes(myChampionId: string, enemyChampionId: string) {
  const user = useAuthStore((s) => s.user)

  return useQuery({
    queryKey: noteKeys.matchup(user?.id || '', myChampionId, enemyChampionId),
    queryFn: () => fetchMatchupNotes(user!.id, myChampionId, enemyChampionId),
    enabled: !!user && !!myChampionId && !!enemyChampionId,
  })
}

/**
 * Create a new enemy note
 */
export function useCreateEnemyNote(championId: string) {
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)

  return useMutation({
    mutationFn: (content: string) =>
      createNote({
        user: user!.id,
        champion_id: championId,
        content,
      }),
    onSuccess: () => {
      showSuccessToast('noteCreated')
      queryClient.invalidateQueries({
        queryKey: noteKeys.enemy(user?.id || '', championId),
      })
    },
    onError: () => {
      showErrorToast('noteError')
    },
  })
}

/**
 * Create a new matchup note
 */
export function useCreateMatchupNote(myChampionId: string, enemyChampionId: string) {
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)

  return useMutation({
    mutationFn: (content: string) =>
      createNote({
        user: user!.id,
        my_champion_id: myChampionId,
        enemy_champion_id: enemyChampionId,
        content,
      }),
    onSuccess: () => {
      showSuccessToast('noteCreated')
      queryClient.invalidateQueries({
        queryKey: noteKeys.matchup(user?.id || '', myChampionId, enemyChampionId),
      })
    },
    onError: () => {
      showErrorToast('noteError')
    },
  })
}

/**
 * Update a note
 */
export function useUpdateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ noteId, content }: { noteId: string; content: string }) =>
      updateNote(noteId, content),
    onSuccess: () => {
      showSuccessToast('noteUpdated')
      queryClient.invalidateQueries({ queryKey: noteKeys.all })
    },
    onError: () => {
      showErrorToast('noteError')
    },
  })
}

/**
 * Delete a note
 */
export function useDeleteNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      showSuccessToast('noteDeleted')
      queryClient.invalidateQueries({ queryKey: noteKeys.all })
    },
    onError: () => {
      showErrorToast('noteError')
    },
  })
}
