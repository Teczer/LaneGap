import { pb } from '@/lib/pocketbase'

export interface IUserFavorites {
  id: string
  user: string
  favorite_champions: string[]
  my_champion: string | null
  created: string
  updated: string
}

/**
 * Get user favorites from PocketBase
 */
export async function getUserFavorites(userId: string): Promise<IUserFavorites | null> {
  try {
    const records = await pb.collection('user_favorites').getList<IUserFavorites>(1, 1, {
      filter: `user = "${userId}"`,
    })
    return records.items[0] || null
  } catch (error) {
    console.error('[Favorites API] Failed to get favorites:', error)
    return null
  }
}

/**
 * Create or update user favorites in PocketBase
 */
export async function saveUserFavorites(
  userId: string,
  data: { favorite_champions?: string[]; my_champion?: string | null }
): Promise<IUserFavorites | null> {
  try {
    // Check if record exists
    const existing = await getUserFavorites(userId)

    if (existing) {
      // Update existing record
      const updated = await pb
        .collection('user_favorites')
        .update<IUserFavorites>(existing.id, data)
      return updated
    } else {
      // Create new record
      const created = await pb.collection('user_favorites').create<IUserFavorites>({
        user: userId,
        favorite_champions: data.favorite_champions || [],
        my_champion: data.my_champion || null,
      })
      return created
    }
  } catch (error) {
    console.error('[Favorites API] Failed to save favorites:', error)
    return null
  }
}

/**
 * Delete user favorites (for account deletion)
 */
export async function deleteUserFavorites(userId: string): Promise<boolean> {
  try {
    const existing = await getUserFavorites(userId)
    if (existing) {
      await pb.collection('user_favorites').delete(existing.id)
    }
    return true
  } catch (error) {
    console.error('[Favorites API] Failed to delete favorites:', error)
    return false
  }
}
