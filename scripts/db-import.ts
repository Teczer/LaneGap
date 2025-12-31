/**
 * Import game data from JSON to PocketBase
 *
 * Usage: bun run db:import
 * Usage with custom URL: POCKETBASE_URL=https://your-prod.com bun run db:import
 *
 * ⚠️ WARNING: This will DELETE all existing game data and replace it!
 *
 * Imports: champions, level_spikes, item_spikes, counters, matchups
 * Source: data/game-data.json
 */

import { readFile } from 'fs/promises'
import PocketBase from 'pocketbase'

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'
const INPUT_FILE = 'data/game-data.json'

// Import order matters due to relations
// Champions must be imported first, then things that reference them
const IMPORT_ORDER = ['champions', 'level_spikes', 'item_spikes', 'counters', 'matchups'] as const

interface IExportData {
  exportedAt: string
  source: string
  collections: {
    [key: string]: Record<string, unknown>[]
  }
}

// Map old IDs to new IDs for relation fixing
const idMap: Map<string, string> = new Map()

async function main() {
  console.log('🚀 Starting PocketBase import...')
  console.log(`📡 Target: ${POCKETBASE_URL}`)
  console.log(`📁 Source: ${INPUT_FILE}`)
  console.log('')
  console.log('⚠️  WARNING: This will DELETE all existing game data!')
  console.log('')

  // Read export file
  let exportData: IExportData
  try {
    const content = await readFile(INPUT_FILE, 'utf-8')
    exportData = JSON.parse(content)
    console.log(`📅 Export date: ${exportData.exportedAt}`)
    console.log(`📡 Export source: ${exportData.source}`)
  } catch (error) {
    console.error(`❌ Failed to read ${INPUT_FILE}:`, error)
    process.exit(1)
  }

  const pb = new PocketBase(POCKETBASE_URL)

  // Step 1: Delete all existing data (in reverse order due to relations)
  console.log('')
  console.log('🗑️  Deleting existing data...')
  for (const collection of [...IMPORT_ORDER].reverse()) {
    try {
      const existing = await pb.collection(collection).getFullList()
      for (const record of existing) {
        await pb.collection(collection).delete(record.id)
      }
      console.log(`   ✅ Deleted ${existing.length} records from ${collection}`)
    } catch (error) {
      console.log(`   ⚠️  Could not delete from ${collection} (may be empty)`)
    }
  }

  // Step 2: Import data in order
  console.log('')
  console.log('📥 Importing data...')

  for (const collection of IMPORT_ORDER) {
    const records = exportData.collections[collection] || []

    if (records.length === 0) {
      console.log(`   ⏭️  Skipping ${collection} (no records)`)
      continue
    }

    console.log(`   📦 Importing ${collection}...`)
    let successCount = 0
    let errorCount = 0

    for (const record of records) {
      try {
        const oldId = record.id as string

        // Prepare data for import (remove id, created, updated - let PocketBase generate new ones)
        const { id, created, updated, ...data } = record

        // Fix relations using idMap
        const fixedData = fixRelations(collection, data)

        // Create new record
        const newRecord = await pb.collection(collection).create(fixedData)

        // Store ID mapping for relation fixing
        idMap.set(oldId, newRecord.id)

        successCount++
      } catch (error) {
        errorCount++
        console.error(`      ❌ Failed to import record:`, error)
      }
    }

    console.log(`      ✅ ${successCount} imported, ${errorCount} failed`)
  }

  console.log('')
  console.log('✅ Import complete!')

  // Summary
  console.log('')
  console.log('📊 Summary:')
  for (const collection of IMPORT_ORDER) {
    const count = exportData.collections[collection]?.length || 0
    console.log(`   ${collection}: ${count} records`)
  }
}

/**
 * Fix relation fields by mapping old IDs to new IDs
 */
function fixRelations(
  collection: string,
  data: Record<string, unknown>
): Record<string, unknown> {
  const fixed = { ...data }

  // Relations by collection
  const relationFields: Record<string, string[]> = {
    level_spikes: ['champion'],
    item_spikes: ['champion'],
    counters: ['champion', 'counter_champion'],
    matchups: ['my_champion', 'enemy_champion'],
  }

  const fields = relationFields[collection] || []

  for (const field of fields) {
    const oldId = fixed[field] as string
    if (oldId && idMap.has(oldId)) {
      fixed[field] = idMap.get(oldId)
    }
  }

  return fixed
}

main().catch(console.error)

