import { pb } from '@/lib/pocketbase'

// =============================================================================
// Types
// =============================================================================

export interface IUserNote {
  id: string
  user: string
  champion_id: string | null // For enemy-specific notes
  my_champion_id: string | null // For matchup-specific notes
  enemy_champion_id: string | null // For matchup-specific notes
  content: string
  created: string
  updated: string
}

interface PBUserNote {
  id: string
  user: string
  champion_id: string
  my_champion_id: string
  enemy_champion_id: string
  content: string
  created: string
  updated: string
}

// =============================================================================
// API Functions
// =============================================================================

/**
 * Fetch notes for a specific enemy champion (general tips against that enemy)
 */
export async function fetchEnemyNotes(userId: string, championId: string): Promise<IUserNote[]> {
  const records = await pb.collection('user_notes').getFullList<PBUserNote>({
    filter: `user = "${userId}" && champion_id = "${championId}" && my_champion_id = ""`,
    sort: '-created',
  })

  return records.map((r) => ({
    id: r.id,
    user: r.user,
    champion_id: r.champion_id || null,
    my_champion_id: r.my_champion_id || null,
    enemy_champion_id: r.enemy_champion_id || null,
    content: r.content,
    created: r.created,
    updated: r.updated,
  }))
}

/**
 * Fetch notes for a specific matchup
 */
export async function fetchMatchupNotes(
  userId: string,
  myChampionId: string,
  enemyChampionId: string
): Promise<IUserNote[]> {
  const records = await pb.collection('user_notes').getFullList<PBUserNote>({
    filter: `user = "${userId}" && my_champion_id = "${myChampionId}" && enemy_champion_id = "${enemyChampionId}"`,
    sort: '-created',
  })

  return records.map((r) => ({
    id: r.id,
    user: r.user,
    champion_id: r.champion_id || null,
    my_champion_id: r.my_champion_id || null,
    enemy_champion_id: r.enemy_champion_id || null,
    content: r.content,
    created: r.created,
    updated: r.updated,
  }))
}

/**
 * Create a new note
 */
export async function createNote(data: {
  user: string
  champion_id?: string
  my_champion_id?: string
  enemy_champion_id?: string
  content: string
}): Promise<IUserNote> {
  const record = await pb.collection('user_notes').create<PBUserNote>({
    user: data.user,
    champion_id: data.champion_id || '',
    my_champion_id: data.my_champion_id || '',
    enemy_champion_id: data.enemy_champion_id || '',
    content: data.content,
  })

  return {
    id: record.id,
    user: record.user,
    champion_id: record.champion_id || null,
    my_champion_id: record.my_champion_id || null,
    enemy_champion_id: record.enemy_champion_id || null,
    content: record.content,
    created: record.created,
    updated: record.updated,
  }
}

/**
 * Update an existing note
 */
export async function updateNote(noteId: string, content: string): Promise<IUserNote> {
  const record = await pb.collection('user_notes').update<PBUserNote>(noteId, { content })

  return {
    id: record.id,
    user: record.user,
    champion_id: record.champion_id || null,
    my_champion_id: record.my_champion_id || null,
    enemy_champion_id: record.enemy_champion_id || null,
    content: record.content,
    created: record.created,
    updated: record.updated,
  }
}

/**
 * Delete a note
 */
export async function deleteNote(noteId: string): Promise<void> {
  await pb.collection('user_notes').delete(noteId)
}
