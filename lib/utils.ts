import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * @example cn('px-2 py-1', condition && 'bg-red-500', 'hover:bg-blue-500')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format time in seconds to mm:ss format
 * @example formatTime(125) → "2:05"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Capitalize first letter of a string
 * @example capitalize('ahri') → "Ahri"
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Check if we're running on the client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Normalize champion ID for Data Dragon
 * Handles special cases like Kai'Sa → KaiSa, Wukong → MonkeyKing
 */
export function normalizeChampionId(id: string): string {
  const specialCases: Record<string, string> = {
    wukong: 'MonkeyKing',
    renataglasc: 'Renata',
    ksante: 'KSante',
    belveth: 'Belveth',
    kogmaw: 'KogMaw',
    reksai: 'RekSai',
    leesin: 'LeeSin',
    twistedfate: 'TwistedFate',
    xinzhao: 'XinZhao',
    jarvaniv: 'JarvanIV',
    drmundo: 'DrMundo',
    missfortune: 'MissFortune',
    tahmkench: 'TahmKench',
    masteryi: 'MasterYi',
    aurelionsol: 'AurelionSol',
  }

  const normalized = id.toLowerCase().replace(/['\s-]/g, '')
  return specialCases[normalized] ?? capitalize(normalized)
}

/**
 * Sleep for a given amount of time (useful for testing/debugging)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Get PocketBase file URL for user avatar
 */
export function getAvatarUrl(userId: string, avatarFilename: string | undefined): string | null {
  if (!avatarFilename) return null
  const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'
  return `${baseUrl}/api/files/users/${userId}/${avatarFilename}`
}
