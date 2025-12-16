#!/usr/bin/env bun

/**
 * Migration script to populate PocketBase with data from database.json
 *
 * Prerequisites:
 *   1. Start PocketBase: cd pocketbase && ./pocketbase serve
 *   2. Create admin account at http://127.0.0.1:8090/_/
 *   3. Create collections with schema (see MIGRATION.md)
 *   4. Get admin auth token
 *
 * Usage:
 *   POCKETBASE_EMAIL=admin@example.com POCKETBASE_PASSWORD=password bun run scripts/migrate-to-pocketbase.ts
 */

import PocketBase from 'pocketbase'
import database from '../data/database.json'

const pb = new PocketBase('http://127.0.0.1:8090')

interface ChampionMap {
  [key: string]: string // champion_id -> pocketbase record id
}

async function main() {
  console.log('🚀 Starting migration to PocketBase...\n')

  // Authenticate as admin
  const email = process.env.POCKETBASE_EMAIL
  const password = process.env.POCKETBASE_PASSWORD

  if (!email || !password) {
    console.error('❌ Missing POCKETBASE_EMAIL or POCKETBASE_PASSWORD environment variables')
    console.log('\nUsage:')
    console.log(
      '  POCKETBASE_EMAIL=admin@example.com POCKETBASE_PASSWORD=password bun run scripts/migrate-to-pocketbase.ts'
    )
    process.exit(1)
  }

  try {
    await pb.collection('_superusers').authWithPassword(email, password)
    console.log('✅ Authenticated as admin\n')
  } catch (error) {
    console.error('❌ Failed to authenticate:', error)
    process.exit(1)
  }

  const championMap: ChampionMap = {}

  // Step 1: Create champions
  console.log('📦 Creating champions...')
  for (const champion of database.champions) {
    try {
      const record = await pb.collection('champions').create({
        champion_id: champion.id,
        name_en: champion.name.en,
        name_fr: champion.name.fr,
        date_edited: champion.dateEdited,
        tips_en: champion.tips.en,
        tips_fr: champion.tips.fr,
      })
      championMap[champion.id] = record.id
      console.log(`   ✅ ${champion.id}`)
    } catch (error: unknown) {
      // Check if already exists
      if (error instanceof Error && error.message.includes('unique')) {
        const existing = await pb
          .collection('champions')
          .getFirstListItem(`champion_id="${champion.id}"`)
        championMap[champion.id] = existing.id
        console.log(`   ⏭️  ${champion.id} (already exists)`)
      } else {
        console.error(`   ❌ ${champion.id}:`, error)
      }
    }
  }
  console.log(`\n   Total: ${Object.keys(championMap).length} champions\n`)

  // Step 2: Create level spikes
  console.log('📈 Creating level spikes...')
  let levelSpikeCount = 0
  for (const champion of database.champions) {
    const championPbId = championMap[champion.id]
    if (!championPbId) continue

    for (const spike of champion.levelSpikes) {
      try {
        await pb.collection('level_spikes').create({
          champion: championPbId,
          level: spike.level,
          text_en: spike.text.en,
          text_fr: spike.text.fr,
          important: (spike as { important?: boolean }).important || false,
        })
        levelSpikeCount++
      } catch (error: unknown) {
        if (error instanceof Error && !error.message.includes('unique')) {
          console.error(`   ❌ ${champion.id} lvl ${spike.level}:`, error)
        }
      }
    }
  }
  console.log(`   ✅ Created ${levelSpikeCount} level spikes\n`)

  // Step 3: Create item spikes
  console.log('🎒 Creating item spikes...')
  let itemSpikeCount = 0
  for (const champion of database.champions) {
    const championPbId = championMap[champion.id]
    if (!championPbId) continue

    for (const spike of champion.itemSpikes) {
      try {
        await pb.collection('item_spikes').create({
          champion: championPbId,
          item_id: spike.item,
          text_en: spike.text.en,
          text_fr: spike.text.fr,
        })
        itemSpikeCount++
      } catch (error: unknown) {
        if (error instanceof Error && !error.message.includes('unique')) {
          console.error(`   ❌ ${champion.id} item ${spike.item}:`, error)
        }
      }
    }
  }
  console.log(`   ✅ Created ${itemSpikeCount} item spikes\n`)

  // Step 4: Create counters
  console.log('⚔️  Creating counters...')
  let counterCount = 0
  for (const champion of database.champions) {
    const championPbId = championMap[champion.id]
    if (!championPbId || !champion.countersWholeGame) continue

    for (const [tier, counters] of Object.entries(champion.countersWholeGame)) {
      if (!counters) continue
      for (const counterId of counters) {
        const counterPbId = championMap[counterId]
        if (!counterPbId) {
          console.log(`   ⚠️  Counter ${counterId} not found in database`)
          continue
        }

        try {
          await pb.collection('counters').create({
            champion: championPbId,
            counter_champion: counterPbId,
            tier: tier,
          })
          counterCount++
        } catch (error: unknown) {
          if (error instanceof Error && !error.message.includes('unique')) {
            console.error(`   ❌ ${champion.id} <- ${counterId}:`, error)
          }
        }
      }
    }
  }
  console.log(`   ✅ Created ${counterCount} counter relationships\n`)

  // Step 5: Create matchups (if any)
  console.log('🎯 Creating matchups...')
  let matchupCount = 0
  for (const matchup of database.matchups) {
    const myChampPbId = championMap[matchup.myChampion]
    const enemyChampPbId = championMap[matchup.enemyChampion]

    if (!myChampPbId || !enemyChampPbId) {
      console.log(`   ⚠️  Matchup ${matchup.myChampion} vs ${matchup.enemyChampion} - champion not found`)
      continue
    }

    try {
      await pb.collection('matchups').create({
        my_champion: myChampPbId,
        enemy_champion: enemyChampPbId,
        tips_en: matchup.tips.en,
        tips_fr: matchup.tips.fr,
      })
      matchupCount++
    } catch (error: unknown) {
      if (error instanceof Error && !error.message.includes('unique')) {
        console.error(`   ❌ ${matchup.myChampion} vs ${matchup.enemyChampion}:`, error)
      }
    }
  }
  console.log(`   ✅ Created ${matchupCount} matchups\n`)

  console.log('🎉 Migration complete!')
  console.log('\nSummary:')
  console.log(`   Champions: ${Object.keys(championMap).length}`)
  console.log(`   Level Spikes: ${levelSpikeCount}`)
  console.log(`   Item Spikes: ${itemSpikeCount}`)
  console.log(`   Counters: ${counterCount}`)
  console.log(`   Matchups: ${matchupCount}`)
}

main().catch(console.error)

