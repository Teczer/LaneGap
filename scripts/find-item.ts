/**
 * Find item IDs by name
 *
 * Usage: bun run scripts/find-item.ts "blackfire"
 * Usage: bun run scripts/find-item.ts (lists all items)
 */

const VERSIONS_URL = 'https://ddragon.leagueoflegends.com/api/versions.json'

interface IItem {
  name: string
  description: string
  gold: { total: number }
}

async function main() {
  const searchTerm = process.argv[2]?.toLowerCase()

  // Get latest patch version
  const versionsRes = await fetch(VERSIONS_URL)
  const versions = (await versionsRes.json()) as string[]
  const latestPatch = versions[0]

  console.log(`🔍 Fetching items from Data Dragon (patch ${latestPatch})...\n`)

  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/item.json`
  )
  const data = (await response.json()) as { data: Record<string, IItem> }

  const items = Object.entries(data.data)
    .map(([id, item]) => ({
      id,
      name: item.name,
      gold: item.gold.total,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  if (searchTerm) {
    const filtered = items.filter((item) => item.name.toLowerCase().includes(searchTerm))

    if (filtered.length === 0) {
      console.log(`❌ No items found matching "${searchTerm}"`)
      return
    }

    console.log(`Found ${filtered.length} items matching "${searchTerm}":\n`)
    filtered.forEach((item) => {
      console.log(`  ${item.id.padEnd(6)} │ ${item.name} (${item.gold}g)`)
    })
  } else {
    console.log(`📦 All items (${items.length}):\n`)
    items.forEach((item) => {
      console.log(`  ${item.id.padEnd(6)} │ ${item.name} (${item.gold}g)`)
    })
  }
}

main().catch(console.error)
