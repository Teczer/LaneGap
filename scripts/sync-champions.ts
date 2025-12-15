#!/usr/bin/env bun

/**
 * Download champion icons from Data Dragon
 *
 * Usage:
 *   bun run scripts/sync-champions.ts
 *   bun run scripts/sync-champions.ts --fresh
 */

import { mkdir, writeFile, rm, access } from 'fs/promises'
import { join } from 'path'

const DDRAGON_BASE = 'https://ddragon.leagueoflegends.com'
const OUTPUT_DIR = join(process.cwd(), 'public/champions')
const ICONS_DIR = join(OUTPUT_DIR, 'icons')

interface Champion {
  id: string
  key: string
  name: string
}

async function main() {
  const args = process.argv.slice(2)
  const fresh = args.includes('--fresh')

  console.log('🚀 Syncing champion data...')

  // Check if we should do a fresh sync
  if (fresh) {
    console.log('🗑️  Cleaning existing data...')
    try {
      await rm(OUTPUT_DIR, { recursive: true })
    } catch {
      // Directory doesn't exist, that's fine
    }
  }

  // Create output directories
  await mkdir(ICONS_DIR, { recursive: true })

  // Get latest version
  console.log('📦 Fetching latest patch version...')
  const versionsResponse = await fetch(`${DDRAGON_BASE}/api/versions.json`)
  const versions = (await versionsResponse.json()) as string[]
  const version = versions[0] ?? '15.1.1'
  console.log(`   Version: ${version}`)

  // Get champions list
  console.log('📋 Fetching champions list...')
  const champDataResponse = await fetch(
    `${DDRAGON_BASE}/cdn/${version}/data/en_US/champion.json`
  )
  const champData = (await champDataResponse.json()) as { data: Record<string, Champion> }

  const champions = Object.values(champData.data)
  console.log(`   Found ${champions.length} champions`)

  // Download icons
  console.log('\n📥 Downloading icons...')
  let downloaded = 0
  let skipped = 0

  for (const champ of champions) {
    const iconPath = join(ICONS_DIR, `${champ.id}.png`)

    // Check if already exists (skip if not fresh)
    if (!fresh) {
      try {
        await access(iconPath)
        skipped++
        continue
      } catch {
        // File doesn't exist, download it
      }
    }

    const iconUrl = `${DDRAGON_BASE}/cdn/${version}/img/champion/${champ.id}.png`
    const response = await fetch(iconUrl)

    if (!response.ok) {
      console.error(`   ❌ Failed to download ${champ.name}`)
      continue
    }

    const buffer = await response.arrayBuffer()
    await writeFile(iconPath, Buffer.from(buffer))
    downloaded++

    // Progress indicator
    if (downloaded % 20 === 0) {
      console.log(`   ✅ Downloaded ${downloaded} icons...`)
    }
  }

  console.log(`\n   ✅ Downloaded: ${downloaded}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)

  // Save metadata
  const metadata = {
    version,
    lastUpdated: new Date().toISOString(),
    championCount: champions.length,
    champions: champions.map((c) => ({
      id: c.id,
      name: c.name,
      key: c.key,
    })),
  }

  await writeFile(
    join(OUTPUT_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  )

  console.log('\n✅ Sync complete!')
  console.log(`   Metadata saved to public/champions/metadata.json`)
}

main().catch(console.error)

