#!/usr/bin/env bun

/**
 * Download item icons from Data Dragon
 *
 * Usage:
 *   bun run scripts/sync-items.ts
 *   bun run scripts/sync-items.ts --fresh
 */

import { mkdir, writeFile, rm, access } from 'fs/promises'
import { join } from 'path'

const DDRAGON_BASE = 'https://ddragon.leagueoflegends.com'
const OUTPUT_DIR = join(process.cwd(), 'public/items')

interface Item {
  name: string
  description: string
  gold: {
    base: number
    total: number
    sell: number
    purchasable: boolean
  }
  maps: Record<string, boolean>
}

async function main() {
  const args = process.argv.slice(2)
  const fresh = args.includes('--fresh')

  console.log('🚀 Syncing item data...')

  // Check if we should do a fresh sync
  if (fresh) {
    console.log('🗑️  Cleaning existing data...')
    try {
      await rm(OUTPUT_DIR, { recursive: true })
    } catch {
      // Directory doesn't exist, that's fine
    }
  }

  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true })

  // Get latest version
  console.log('📦 Fetching latest patch version...')
  const versionsResponse = await fetch(`${DDRAGON_BASE}/api/versions.json`)
  const versions = (await versionsResponse.json()) as string[]
  const version = versions[0] ?? '15.1.1'
  console.log(`   Version: ${version}`)

  // Get items list
  console.log('📋 Fetching items list...')
  const itemDataResponse = await fetch(
    `${DDRAGON_BASE}/cdn/${version}/data/en_US/item.json`
  )
  const itemData = (await itemDataResponse.json()) as { data: Record<string, Item> }

  const items = Object.entries(itemData.data)
  console.log(`   Found ${items.length} items`)

  // Filter to only purchasable items on Summoner's Rift (map 11)
  const relevantItems = items.filter(([_, item]) => {
    return item.gold.purchasable && item.maps['11']
  })
  console.log(`   Relevant items (SR, purchasable): ${relevantItems.length}`)

  // Download icons
  console.log('\n📥 Downloading icons...')
  let downloaded = 0
  let skipped = 0

  for (const [itemId] of relevantItems) {
    const iconPath = join(OUTPUT_DIR, `${itemId}.png`)

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

    const iconUrl = `${DDRAGON_BASE}/cdn/${version}/img/item/${itemId}.png`
    const response = await fetch(iconUrl)

    if (!response.ok) {
      console.error(`   ❌ Failed to download item ${itemId}`)
      continue
    }

    const buffer = await response.arrayBuffer()
    await writeFile(iconPath, Buffer.from(buffer))
    downloaded++

    // Progress indicator
    if (downloaded % 50 === 0) {
      console.log(`   ✅ Downloaded ${downloaded} icons...`)
    }
  }

  console.log(`\n   ✅ Downloaded: ${downloaded}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)

  // Save metadata
  const metadata = {
    version,
    lastUpdated: new Date().toISOString(),
    itemCount: relevantItems.length,
    items: relevantItems.map(([id, item]) => ({
      id,
      name: item.name,
      gold: item.gold.total,
    })),
  }

  await writeFile(
    join(OUTPUT_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  )

  console.log('\n✅ Sync complete!')
  console.log(`   Metadata saved to public/items/metadata.json`)
}

main().catch(console.error)

