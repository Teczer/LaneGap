/**
 * Seed counters data into PocketBase
 *
 * Usage: bun run seed:counters
 *
 * This script will:
 * 1. Delete ALL existing counters
 * 2. Re-create counters from the data below (no duplicates)
 */
import PocketBase from 'pocketbase'

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'

// Counter data: champion -> who counters them
// Format: { championName: { tier: [counterChampions] } }
const COUNTER_DATA: Record<string, Record<string, string[]>> = {
  Orianna: {
    S: ['Akali'],
    A: ['Syndra', 'Viktor'],
    B: ['Hwei'],
  },
  Katarina: {
    S: ['Lissandra', 'Annie', 'Malzahar', 'Ryze'],
    A: ['Orianna', 'Aurora', 'LeBlanc', 'Ahri'],
    B: ['Akali'],
  },
  Aurora: {
    S: ['Viktor'],
    A: ['Orianna', 'Hwei', 'LeBlanc', 'Mel'],
    B: ['Syndra', 'Taliyah', 'Ryze'],
  },
  Ahri: {
    S: ['Viktor', 'Lissandra', 'Malzahar'],
    A: ['LeBlanc', 'Mel', 'Sylas', 'Orianna', 'Aurora'],
    B: ['Taliyah', 'Syndra'],
  },
  Syndra: {
    S: ['Akali', 'Zed', 'Ekko'],
    A: ['LeBlanc', 'Viktor'],
    B: ['Ahri', 'Orianna', 'Aurora'],
  },
  Azir: {
    S: ['Akali', 'Yone'],
    A: ['LeBlanc'],
    B: ['Orianna', 'Taliyah', 'Syndra', 'Veigar', 'AurelionSol', 'Hwei', 'Ahri'],
  },
  Mel: {
    S: ['Orianna', 'Hwei', 'Akali'],
    A: ['Viktor', 'Syndra', 'Ryze'],
    B: ['Aurora'],
  },
  Akali: {
    S: ['Galio'],
    A: ['LeBlanc', 'Aurora', 'Vex', 'Morgana', 'Malzahar', 'Ryze'],
    B: ['Sylas', 'TwistedFate', 'Lissandra', 'Hwei', 'Cassiopeia'],
  },
  LeBlanc: {
    S: ['Lissandra', 'Malzahar', 'Galio', 'Annie'],
    A: ['Ryze'],
    B: ['Orianna'],
  },
  Sylas: {
    S: ['Ryze', 'Jayce'],
    A: ['Zoe', 'Taliyah', 'Hwei', 'Viktor', 'Orianna', 'LeBlanc'],
    B: ['Akali'],
  },
  Viktor: {
    'A+': ['Galio'],
    A: ['Akali', 'Irelia', 'Hwei'],
    B: ['Orianna', 'LeBlanc', 'Azir', 'Swain', 'Kassadin'],
    'B-': ['Syndra'],
  },
  Yone: {
    S: ['Cassiopeia', 'LeBlanc', 'Akali'],
    A: ['Aurora', 'Lissandra', 'Annie'],
    B: ['Orianna'],
  },
  Kassadin: {
    S: ['Jayce', 'Tristana', 'Irelia', 'Yone'],
    'A+': ['Yasuo', 'Zed', 'Cassiopeia', 'Ryze'],
    'B+': ['Orianna', 'Aurora'],
  },
  Veigar: {
    S: ['Kassadin', 'Fizz', 'Sylas'],
    A: ['LeBlanc', 'Aurora', 'Taliyah'],
    'B+': ['Orianna', 'Viktor'],
  },
  Zoe: {
    S: ['Mel', 'Morgana', 'Yone'],
    A: ['Akali', 'Yasuo', 'LeBlanc', 'Galio'],
    'B+': ['Syndra', 'Hwei', 'Orianna', 'Viktor', 'Lissandra'],
  },
  Hwei: {
    A: ['Yasuo', 'Yone', 'Irelia', 'Akali'],
    B: ['Viktor', 'Orianna', 'Syndra', 'Aurora'],
  },
  Ryze: {
    S: ['Orianna', 'Cassiopeia'],
    'A+': ['Anivia', 'Annie', 'Veigar', 'Syndra'],
    A: ['Azir', 'Hwei'],
    'B+': ['Aurora'],
    B: ['LeBlanc'],
  },
  Jayce: {
    A: ['LeBlanc', 'Syndra'],
    'B+': ['Orianna', 'Hwei', 'Annie'],
  },
  Galio: {
    S: ['Vayne', 'Tristana', 'Smolder'],
    A: ['Ryze', 'Kassadin', 'Kayle'],
    B: ['Orianna', 'Viktor', 'Syndra', 'Azir'],
  },
  Annie: {
    A: ['Orianna', 'Viktor', 'Syndra', 'Galio'],
    B: ['Akali'],
    C: ['Morgana', 'Veigar'],
  },
  Cassiopeia: {
    S: ['Syndra', 'Orianna'],
    A: ['Taliyah', 'Hwei', 'Anivia'],
    'B+': ['Veigar'],
  },
}

async function main() {
  console.log('🚀 Seeding counters data...')
  console.log(`📡 Target: ${POCKETBASE_URL}`)
  console.log('')

  const pb = new PocketBase(POCKETBASE_URL)

  // Step 1: Delete ALL existing counters
  console.log('🗑️  Deleting all existing counters...')
  const existingCounters = await pb.collection('counters').getFullList()
  console.log(`   Found ${existingCounters.length} existing counters`)

  for (const counter of existingCounters) {
    await pb.collection('counters').delete(counter.id)
  }
  console.log(`   ✅ Deleted ${existingCounters.length} counters`)

  // Step 2: Get all champions to map names to IDs
  console.log('')
  console.log('📦 Fetching champions...')
  const champions = await pb.collection('champions').getFullList()

  // Create map: champion_id (lowercase) -> PB id
  const championMap = new Map<string, string>()
  for (const champ of champions) {
    championMap.set(champ.champion_id.toLowerCase(), champ.id)
  }
  console.log(`   ✅ Found ${champions.length} champions`)

  // Step 3: Create new counters
  console.log('')
  console.log('📥 Creating counters...')

  let created = 0
  let errors = 0

  for (const [enemyName, counters] of Object.entries(COUNTER_DATA)) {
    const enemyId = championMap.get(enemyName.toLowerCase())

    if (!enemyId) {
      console.log(`   ⚠️  Champion not found: ${enemyName}`)
      errors++
      continue
    }

    for (const [tier, counterNames] of Object.entries(counters)) {
      for (const counterName of counterNames) {
        const counterId = championMap.get(counterName.toLowerCase())

        if (!counterId) {
          console.log(`   ⚠️  Counter champion not found: ${counterName}`)
          errors++
          continue
        }

        try {
          await pb.collection('counters').create({
            champion: enemyId,
            counter_champion: counterId,
            tier,
          })
          console.log(`   ✅ ${counterName} counters ${enemyName} (${tier})`)
          created++
        } catch (err) {
          console.log(`   ❌ Failed: ${counterName} vs ${enemyName}:`, err)
          errors++
        }
      }
    }
  }

  console.log('')
  console.log('📊 Summary:')
  console.log(`   Created: ${created}`)
  console.log(`   Errors: ${errors}`)
}

main().catch(console.error)
