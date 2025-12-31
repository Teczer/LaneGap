/**
 * Export game data from PocketBase to JSON
 *
 * Usage: bun run db:export
 *
 * Exports: champions, level_spikes, item_spikes, counters, matchups
 * Output: data/game-data.json
 */

import { mkdir, writeFile } from 'fs/promises'
import PocketBase from 'pocketbase'

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'
const OUTPUT_FILE = 'data/game-data.json'

// Collections to export (game data only, no user data)
const COLLECTIONS = ['champions', 'level_spikes', 'item_spikes', 'counters', 'matchups'] as const

interface IExportData {
  exportedAt: string
  source: string
  collections: {
    [key: string]: unknown[]
  }
}

async function main() {
  console.log('🚀 Starting PocketBase export...')
  console.log(`📡 Source: ${POCKETBASE_URL}`)

  const pb = new PocketBase(POCKETBASE_URL)

  const exportData: IExportData = {
    exportedAt: new Date().toISOString(),
    source: POCKETBASE_URL,
    collections: {},
  }

  for (const collection of COLLECTIONS) {
    try {
      console.log(`📦 Exporting ${collection}...`)
      const records = await pb.collection(collection).getFullList({
        sort: 'created',
      })

      // Remove PocketBase metadata fields we don't need
      const cleanRecords = records.map((record) => {
        const { collectionId, collectionName, ...data } = record
        // Keep id, created, updated for reference
        return data
      })

      exportData.collections[collection] = cleanRecords
      console.log(`   ✅ ${cleanRecords.length} records`)
    } catch (error) {
      console.error(`   ❌ Failed to export ${collection}:`, error)
      exportData.collections[collection] = []
    }
  }

  // Ensure data directory exists
  await mkdir('data', { recursive: true })

  // Write to file
  await writeFile(OUTPUT_FILE, JSON.stringify(exportData, null, 2))

  console.log('')
  console.log(`✅ Export complete!`)
  console.log(`📁 Output: ${OUTPUT_FILE}`)

  // Summary
  console.log('')
  console.log('📊 Summary:')
  for (const collection of COLLECTIONS) {
    const count = exportData.collections[collection]?.length || 0
    console.log(`   ${collection}: ${count} records`)
  }
}

main().catch(console.error)

