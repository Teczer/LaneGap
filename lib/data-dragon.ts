/**
 * Data Dragon utilities for League of Legends assets
 * Uses LOCAL files when available, falls back to remote API
 */

const PATCH_VERSION = process.env.NEXT_PUBLIC_PATCH_VERSION ?? '15.24.1'
const DDRAGON_BASE = 'https://ddragon.leagueoflegends.com'

/**
 * Get champion icon URL - uses LOCAL files first
 * @example getChampionIconUrl('Ahri') → '/champions/icons/Ahri.png'
 */
export function getChampionIconUrl(championId: string): string {
  // Use local file (synced via bun run sync:champions)
  return `/champions/icons/${championId}.png`
}

/**
 * Get champion icon URL from remote Data Dragon (fallback)
 */
export function getChampionIconUrlRemote(championId: string): string {
  return `${DDRAGON_BASE}/cdn/${PATCH_VERSION}/img/champion/${championId}.png`
}

/**
 * Get champion splash art URL from Data Dragon
 * @example getChampionSplashUrl('Ahri', 0) → 'https://ddragon.../Ahri_0.jpg'
 */
export function getChampionSplashUrl(championId: string, skinNum = 0): string {
  return `${DDRAGON_BASE}/cdn/img/champion/splash/${championId}_${skinNum}.jpg`
}

/**
 * Get champion loading screen art URL from Data Dragon
 */
export function getChampionLoadingUrl(championId: string, skinNum = 0): string {
  return `${DDRAGON_BASE}/cdn/img/champion/loading/${championId}_${skinNum}.jpg`
}

/**
 * Get item icon URL - uses LOCAL files first
 * @example getItemIconUrl('3089') → '/items/3089.png'
 */
export function getItemIconUrl(itemId: string): string {
  // Use local file (synced via bun run sync:items)
  return `/items/${itemId}.png`
}

/**
 * Get item icon URL from remote Data Dragon (fallback)
 */
export function getItemIconUrlRemote(itemId: string): string {
  return `${DDRAGON_BASE}/cdn/${PATCH_VERSION}/img/item/${itemId}.png`
}

/**
 * Get spell icon URL from Data Dragon
 */
export function getSpellIconUrl(spellId: string): string {
  return `${DDRAGON_BASE}/cdn/${PATCH_VERSION}/img/spell/${spellId}.png`
}

/**
 * Get the latest patch version from Data Dragon API
 */
export async function getLatestPatchVersion(): Promise<string> {
  const response = await fetch(`${DDRAGON_BASE}/api/versions.json`)
  const versions = (await response.json()) as string[]
  return versions[0] ?? PATCH_VERSION
}

/**
 * Get all champions data from Data Dragon
 */
export async function getAllChampions(): Promise<
  Record<string, { id: string; key: string; name: string }>
> {
  const response = await fetch(`${DDRAGON_BASE}/cdn/${PATCH_VERSION}/data/en_US/champion.json`, {
    next: { revalidate: 86400 },
  })
  const data = (await response.json()) as {
    data: Record<string, { id: string; key: string; name: string }>
  }
  return data.data
}

/**
 * Get all items data from Data Dragon
 */
export async function getAllItems(): Promise<
  Record<string, { name: string; description: string; gold: { total: number } }>
> {
  const response = await fetch(`${DDRAGON_BASE}/cdn/${PATCH_VERSION}/data/en_US/item.json`, {
    next: { revalidate: 86400 },
  })
  const data = (await response.json()) as {
    data: Record<string, { name: string; description: string; gold: { total: number } }>
  }
  return data.data
}

/**
 * Constants for commonly used Data Dragon paths
 */
export const DATA_DRAGON = {
  BASE_URL: DDRAGON_BASE,
  PATCH_VERSION,
  CHAMPIONS_JSON: `${DDRAGON_BASE}/cdn/${PATCH_VERSION}/data/en_US/champion.json`,
  ITEMS_JSON: `${DDRAGON_BASE}/cdn/${PATCH_VERSION}/data/en_US/item.json`,
  VERSIONS_JSON: `${DDRAGON_BASE}/api/versions.json`,
} as const
