#!/usr/bin/env bun

/**
 * Validate the database.json file against the schema
 *
 * Usage:
 *   bun run scripts/validate-database.ts
 */
import { readFile } from 'fs/promises'
import { join } from 'path'
import { DatabaseSchema } from '../data/schema'

async function main() {
  console.log('🔍 Validating database...')

  const databasePath = join(process.cwd(), 'data/database.json')

  try {
    const content = await readFile(databasePath, 'utf-8')
    const data = JSON.parse(content)

    const result = DatabaseSchema.safeParse(data)

    if (result.success) {
      console.log('\n✅ Database is valid!')
      console.log(`\n📊 Statistics:`)
      console.log(`   Version: ${data.meta.version}`)
      console.log(`   Patch: ${data.meta.patchVersion}`)
      console.log(`   Last Updated: ${data.meta.lastUpdated}`)
      console.log(`   Champions: ${data.champions.length}`)
      console.log(`   Matchups: ${data.matchups.length}`)

      // Additional stats
      let totalTips = 0
      let totalLevelSpikes = 0
      let totalItemSpikes = 0

      for (const champ of data.champions) {
        totalTips += champ.tips.en.length
        totalLevelSpikes += champ.levelSpikes.length
        totalItemSpikes += champ.itemSpikes.length
      }

      console.log(`\n📝 Content:`)
      console.log(`   Total Tips: ${totalTips}`)
      console.log(`   Total Level Spikes: ${totalLevelSpikes}`)
      console.log(`   Total Item Spikes: ${totalItemSpikes}`)

      // List champions
      console.log(`\n🎮 Champions in database:`)
      for (const champ of data.champions) {
        const counterCount = Object.values(champ.countersWholeGame ?? {}).flat().length
        console.log(
          `   - ${champ.name.en} (${champ.id}): ${counterCount} counters, ${champ.tips.en.length} tips`
        )
      }

      // List matchups
      if (data.matchups.length > 0) {
        console.log(`\n⚔️ Matchups documented:`)
        for (const matchup of data.matchups) {
          console.log(
            `   - ${matchup.myChampion} vs ${matchup.enemyChampion}: ${matchup.tips.en.length} tips, ${matchup.clips.length} clips`
          )
        }
      }
    } else {
      console.error('\n❌ Validation errors:')
      console.error(JSON.stringify(result.error.format(), null, 2))
      process.exit(1)
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('\n❌ Invalid JSON syntax:')
      console.error(error.message)
    } else {
      console.error('\n❌ Error reading database:')
      console.error(error)
    }
    process.exit(1)
  }
}

main()
