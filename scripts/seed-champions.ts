#!/usr/bin/env bun

/**
 * Seed all missing champions to PocketBase
 *
 * - Adds all champions from Data Dragon metadata
 * - Skips champions that already exist in PocketBase
 * - Uses empty arrays for tips (to be filled later)
 *
 * Usage:
 *   bun run scripts/seed-champions.ts
 */
import { readFileSync } from 'fs'
import { join } from 'path'
import PocketBase from 'pocketbase'
import metadata from '../public/champions/metadata.json'

// Load .env.local manually
function loadEnv() {
  try {
    const envPath = join(process.cwd(), '.env.local')
    const envContent = readFileSync(envPath, 'utf-8')
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim()
        }
      }
    }
  } catch {
    console.log('⚠️  No .env.local found')
  }
}

loadEnv()

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD

interface ChampionMetadata {
  id: string
  name: string
  key: string
}

async function main() {
  console.log('🚀 Seeding champions to PocketBase...\n')

  const pb = new PocketBase(POCKETBASE_URL)

  // Authenticate as admin
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    console.log('🔐 Authenticating as admin...')
    await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)
    console.log('   ✅ Authenticated\n')
  } else {
    console.log(
      '⚠️  No admin credentials found. Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD in .env.local\n'
    )
  }

  // Get existing champions from PocketBase
  console.log('📋 Fetching existing champions...')
  const existingRecords = await pb.collection('champions').getFullList<{ champion_id: string }>()
  const existingIds = new Set(existingRecords.map((r) => r.champion_id))
  console.log(`   Found ${existingIds.size} existing champions\n`)

  // Get all champions from metadata
  const allChampions: ChampionMetadata[] = metadata.champions
  console.log(`📦 Total champions in metadata: ${allChampions.length}`)

  // Filter to only missing champions
  const missingChampions = allChampions.filter((c) => !existingIds.has(c.id))
  console.log(`➕ Champions to add: ${missingChampions.length}\n`)

  if (missingChampions.length === 0) {
    console.log('✅ All champions already exist in PocketBase!')
    return
  }

  // Add missing champions
  let added = 0
  let failed = 0

  for (const champ of missingChampions) {
    try {
      await pb.collection('champions').create({
        champion_id: champ.id,
        name_en: champ.name,
        name_fr: champ.name, // Same as English by default, can be updated later
        tips_en: ['Tips coming soon...'], // Placeholder - to be filled later
        tips_fr: ['Tips à venir...'], // Placeholder - to be filled later
        date_edited: new Date().toISOString().split('T')[0], // Today's date
      })
      added++

      // Progress indicator
      if (added % 20 === 0) {
        console.log(`   ✅ Added ${added}/${missingChampions.length}...`)
      }
    } catch (error: unknown) {
      const pbError = error as { response?: { data?: Record<string, unknown> } }
      console.error(
        `   ❌ Failed to add ${champ.id}:`,
        JSON.stringify(pbError.response?.data || error)
      )
      failed++
    }
  }

  console.log(`\n✅ Done!`)
  console.log(`   Added: ${added}`)
  console.log(`   Failed: ${failed}`)
  console.log(`   Skipped (already existed): ${existingIds.size}`)
  console.log(`   Total in PocketBase: ${existingIds.size + added}`)
}

main().catch(console.error)
