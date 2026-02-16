/**
 * Add champion data for TwistedFate, Yasuo, Fizz, Tristana
 *
 * Usage: bun run scripts/add-champion-data.ts
 */
import PocketBase from 'pocketbase'

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'

// ============================================================================
// TWISTED FATE DATA
// ============================================================================

const TWISTED_FATE_TIPS = {
  tips_en: [
    'Whenever Twisted Fate uses W there is 6 sec window to play',
    "Depends on your Champion when you're getting gold carded you can throw out a skillshot such as Ahri Q,E Veigar Q basically any skillshots when CC'd",
    "It's good if you can keep an estimate time when TF R is back 170 base CD First 10 haste -15 sec then its -10 every 10 AH",
    'Play skirmishes 1v1 2v2 3v3 TF is only strong when creating number advantage with his ultimate',
    "When TF ults and you're playing Control mage or can't match just push mid and take plates/base or play other side",
  ],
  tips_fr: [
    'Quand TF utilise son W tu as 6 sec de fenêtre pour jouer',
    "Selon ton champion quand tu te fais gold card tu peux lancer un skillshot comme Ahri Q/E, Veigar Q - n'importe quel skillshot quand tu es CC",
    "C'est bien de garder un timer sur le R de TF: 170 sec base CD, les premiers 10 haste = -15 sec puis -10 sec pour chaque 10 AH",
    'Joue les skirmishes 1v1 2v2 3v3 - TF est seulement fort quand il crée un avantage numérique avec son ult',
    "Quand TF ult et que tu joues control mage ou que tu peux pas match, push mid et prend les plates/base ou joue de l'autre côté",
  ],
}

const TWISTED_FATE_COUNTERS = [
  { counter: 'Ryze', tier: 'S' },
  { counter: 'Galio', tier: 'S' },
  { counter: 'Sylas', tier: 'S' },
  { counter: 'Orianna', tier: 'A+' },
  { counter: 'Annie', tier: 'A+' },
  { counter: 'Cassiopeia', tier: 'A+' },
  { counter: 'Anivia', tier: 'A+' },
  { counter: 'Mel', tier: 'A+' },
  { counter: 'Syndra', tier: 'A' },
  { counter: 'Viktor', tier: 'A' },
  { counter: 'Azir', tier: 'A' },
]

const TWISTED_FATE_LEVEL_SPIKES = [
  {
    level: 2,
    text_en: 'Once TF gets his E, TF has more trade potential',
    text_fr: 'Quand TF a son E, il a plus de potentiel de trade',
    important: false,
  },
  {
    level: 5,
    text_en: 'Able to 2 Q the backline and wave gone',
    text_fr: 'Peut 2 Q la backline et la wave est clear',
    important: false,
  },
  {
    level: 6,
    text_en: 'Becomes a threat now to ult into the side lanes',
    text_fr: 'Devient une menace maintenant avec son ult sur les sidelanes',
    important: true,
  },
  {
    level: 9,
    text_en: 'Can 1 shot the Range minions with 1 Q',
    text_fr: 'Peut one shot les minions range avec 1 Q',
    important: false,
  },
]

const TWISTED_FATE_ITEM_SPIKES = [
  {
    item_id: '1026',
    text_en: 'First Base - Once he gets it TF becomes tankier and harder to kill',
    text_fr: 'First Base - TF devient plus tanky et plus dur à kill',
  },
  {
    item_id: '3027',
    text_en: 'ROA - Becomes very hard to kill',
    text_fr: 'ROA - Devient très dur à kill',
  },
  {
    item_id: '3158',
    text_en: 'Full Boots - Is very mobile now and is able to threaten your side way faster',
    text_fr: 'Bottes complètes - Très mobile maintenant et peut menacer tes sides plus vite',
  },
  {
    item_id: '3094',
    text_en: 'Rapid Firecannon - Once TF gets this spike he gets to Stun from very far away now',
    text_fr: 'Rapid Firecannon - TF peut stun de très loin maintenant',
  },
]

// ============================================================================
// YASUO DATA
// ============================================================================

const YASUO_TIPS = {
  tips_en: [
    'Always think the angles Yasuo can E to and play around that',
    'Windwall is 25 seconds so play around that',
    'He cannot E to the same minion 2 times within 10 seconds',
  ],
  tips_fr: [
    'Pense toujours aux angles où Yasuo peut E et joue autour de ça',
    'Windwall est 25 sec CD donc joue autour',
    'Il ne peut pas E sur le même minion 2 fois en 10 secondes',
  ],
}

const YASUO_COUNTERS = [
  { counter: 'Lissandra', tier: 'S' },
  { counter: 'Renekton', tier: 'S' },
  { counter: 'Vex', tier: 'A+' },
  { counter: 'Aurora', tier: 'A' },
  { counter: 'Akali', tier: 'A' },
  { counter: 'Leblanc', tier: 'A' },
  { counter: 'Malzahar', tier: 'B' },
  { counter: 'Cassiopeia', tier: 'B' },
  { counter: 'Yone', tier: 'B' },
]

const YASUO_LEVEL_SPIKES = [
  {
    level: 1,
    text_en:
      'If Yasuo starts E he will look for full trade - space around the minions by not giving him angles to E into minion and E you. If he starts Q you can look to punish during last hits',
    text_fr:
      "Si Yasuo start E il va chercher un full trade - space autour des minions en ne lui donnant pas d'angles pour E sur minion puis E sur toi. S'il start Q tu peux punish pendant ses last hits",
    important: true,
  },
  {
    level: 2,
    text_en:
      'Yasuo unlocks E and Q now able to start trading you back so always look out for potential E into E on you or Q',
    text_fr:
      'Yasuo débloque E et Q maintenant capable de te trade back donc fais gaffe au potentiel E into E sur toi ou Q',
    important: false,
  },
  {
    level: 6,
    text_en: 'Unlocks the ability to 100-0 you',
    text_fr: 'Débloque la capacité de te 100-0',
    important: true,
  },
]

const YASUO_ITEM_SPIKES = [
  {
    item_id: '3006',
    text_en:
      "Berserker's Greaves - Once Yasuo purchases this he becomes 2x more powerful, his Q is lower CD and is able to have easier time to kite and chase you down",
    text_fr:
      "Berserker's Greaves - Yasuo devient 2x plus fort, son Q a moins de CD et il peut plus facilement te kite et te chase",
  },
  {
    item_id: '3153',
    text_en:
      "Blade of the Ruined King - This is where the champ becomes broken. Be aware even if he's 0/5 he's gonna deal a lot of dmg",
    text_fr:
      "BORK - C'est là que le champ devient broken. Fais gaffe même s'il est 0/5 il va deal beaucoup de dmg",
  },
]

// ============================================================================
// FIZZ DATA
// ============================================================================

const FIZZ_TIPS = {
  tips_en: [
    "Play around the minions, force him to use spell to last hit and don't stand together with the wave",
    'Main CD to track is E 16 sec. The other one is Q 8 sec and R 120. W is whatever lol',
    "DON'T be afraid to chase Fizz after he used his ONLY all-in tools Q and E - you have windows to just throw spells at him",
  ],
  tips_fr: [
    'Joue autour des minions, force le à utiliser ses spells pour last hit et ne te tiens pas avec la wave',
    "Le CD principal à track est E 16 sec. L'autre c'est Q 8 sec et R 120. W on s'en fout lol",
    "N'aie PAS peur de chase Fizz après qu'il a utilisé ses SEULS outils d'all-in Q et E - tu as des fenêtres pour lui throw des spells",
  ],
}

const FIZZ_COUNTERS = [
  { counter: 'Lissandra', tier: 'S' },
  { counter: 'Galio', tier: 'A+' },
  { counter: 'Malzahar', tier: 'A+' },
  { counter: 'Akali', tier: 'A+' },
  { counter: 'Ryze', tier: 'A+' },
  { counter: 'Viktor', tier: 'A' },
  { counter: 'Vladimir', tier: 'A' },
  { counter: 'Sylas', tier: 'A' },
  { counter: 'Kassadin', tier: 'A' },
  { counter: 'Orianna', tier: 'B' },
  { counter: 'Leblanc', tier: 'B' },
]

const FIZZ_LEVEL_SPIKES = [
  {
    level: 1,
    text_en:
      "You wanna be AA'ing wave so the melee minions die at different times forcing Fizz in a dilemma: either get chunked or use E to last hit. BE aware to not stay too close so he can get last hit + E poke on you",
    text_fr:
      "Tu veux AA la wave pour que les minions melee meurent à des moments différents, forçant Fizz dans un dilemme: soit il se fait chunk soit il utilise E pour last hit. ATTENTION à ne pas rester trop près pour qu'il puisse last hit + E poke sur toi",
    important: true,
  },
  {
    level: 2,
    text_en:
      "Can go Q 2nd and look for all-ins on you but you should win most of the time because of your minions hitting him afterwards and your chase potential - don't be afraid to play around your minions",
    text_fr:
      "Peut aller Q 2nd et chercher des all-ins sur toi mais tu devrais gagner la plupart du temps car tes minions le frappent après et ton potentiel de chase - n'aie pas peur de jouer autour de tes minions",
    important: false,
  },
  {
    level: 3,
    text_en:
      "This is where if Fizz was smart he doesn't all-in lvl 2 but now with his W skilled he can AA cancel with W and deal a lot more dmg. Be aware and play around your lvl 3 advantage for a bit",
    text_fr:
      "C'est là que si Fizz est smart il n'all-in pas lvl 2 mais maintenant avec son W il peut AA cancel avec W et deal beaucoup plus de dmg. Sois attentif et joue autour de ton avantage lvl 3",
    important: false,
  },
]

const FIZZ_ITEM_SPIKES = [
  {
    item_id: '3100',
    text_en: 'Lich Bane - Can deal 100% of your hp or something, this is where he spikes hard',
    text_fr: "Lich Bane - Peut deal 100% de ta hp ou un truc du genre, c'est là qu'il spike fort",
  },
]

// ============================================================================
// TRISTANA DATA
// ============================================================================

const TRISTANA_TIPS = {
  tips_en: [
    'Avoid giving her a 1.3k Gold base for BF sword',
    'Play around her CDs they are very long: Q 20, W 22, E 16',
    'Depends on your champ keep your CC spell: Syndra E, Hwei E',
  ],
  tips_fr: [
    'Évite de lui donner un back à 1.3k Gold pour BF sword',
    'Joue autour de ses CDs ils sont très longs: Q 20, W 22, E 16',
    'Selon ton champ garde ton spell de CC: Syndra E, Hwei E',
  ],
}

const TRISTANA_COUNTERS = [
  { counter: 'Syndra', tier: 'S' },
  { counter: 'Akali', tier: 'A+' },
  { counter: 'Hwei', tier: 'A+' },
  { counter: 'Orianna', tier: 'A+' },
  { counter: 'Viktor', tier: 'A+' },
  { counter: 'Yasuo', tier: 'A' },
  { counter: 'Taliyah', tier: 'A' },
  { counter: 'Azir', tier: 'B' },
  { counter: 'Aurora', tier: 'B' },
  { counter: 'Ahri', tier: 'B' },
]

const TRISTANA_LEVEL_SPIKES = [
  {
    level: 1,
    text_en:
      "She's not as strong as you think lvl 1 - yes she can jump but if you play close to the minions and don't throw your spell you should be fine. Play to AA wave not Tristana. If she went E you will notice the AoE dmg - taking E AA is fine she will have 16 sec of no CDs that you can punish",
    text_fr:
      "Elle n'est pas aussi forte que tu penses lvl 1 - oui elle peut jump mais si tu joues proche des minions et que tu ne throw pas ton spell ça devrait aller. Joue pour AA la wave pas Tristana. Si elle a pris E tu verras le dmg AoE - prendre E AA c'est ok elle aura 16 sec sans CDs que tu peux punish",
    important: true,
  },
]

const TRISTANA_ITEM_SPIKES: { item_id: string; text_en: string; text_fr: string }[] = []

// ============================================================================
// HELPER: Get champion record ID by champion_id
// ============================================================================

async function getChampionId(pb: PocketBase, championId: string): Promise<string | null> {
  try {
    const result = await pb
      .collection('champions')
      .getFirstListItem(`champion_id = "${championId}"`)
    return result.id
  } catch {
    console.error(`   ⚠️  Champion not found: ${championId}`)
    return null
  }
}

// ============================================================================
// MAIN SCRIPT
// ============================================================================

async function main() {
  console.log('🚀 Adding champion data to PocketBase...')
  console.log(`📡 Target: ${POCKETBASE_URL}`)

  const pb = new PocketBase(POCKETBASE_URL)

  // Build champion ID cache
  console.log('\n📋 Loading champion IDs...')
  const championCache: Record<string, string> = {}
  const championsNeeded = [
    'TwistedFate',
    'Yasuo',
    'Fizz',
    'Tristana',
    'Ryze',
    'Galio',
    'Sylas',
    'Orianna',
    'Annie',
    'Cassiopeia',
    'Anivia',
    'Mel',
    'Syndra',
    'Viktor',
    'Azir',
    'Lissandra',
    'Renekton',
    'Vex',
    'Aurora',
    'Akali',
    'Leblanc',
    'Malzahar',
    'Yone',
    'Vladimir',
    'Kassadin',
    'Hwei',
    'Taliyah',
    'Ahri',
  ]

  for (const champId of championsNeeded) {
    const id = await getChampionId(pb, champId)
    if (id) {
      championCache[champId] = id
    }
  }
  console.log(`   ✅ Loaded ${Object.keys(championCache).length} champion IDs`)

  const championsToUpdate = [
    { championId: 'TwistedFate', name: 'Twisted Fate', ...TWISTED_FATE_TIPS },
    { championId: 'Yasuo', name: 'Yasuo', ...YASUO_TIPS },
    { championId: 'Fizz', name: 'Fizz', ...FIZZ_TIPS },
    { championId: 'Tristana', name: 'Tristana', ...TRISTANA_TIPS },
  ]

  // Update champions with tips
  console.log('\n📝 Updating champion tips...')
  for (const champ of championsToUpdate) {
    const recordId = championCache[champ.championId]
    if (!recordId) {
      console.log(`   ⚠️  Skipping ${champ.name} - not found in DB`)
      continue
    }
    try {
      await pb.collection('champions').update(recordId, {
        tips_en: champ.tips_en,
        tips_fr: champ.tips_fr,
        date_edited: new Date().toISOString().split('T')[0],
      })
      console.log(`   ✅ ${champ.name} tips updated`)
    } catch (error) {
      console.error(`   ❌ Failed to update ${champ.name}:`, error)
    }
  }

  // Add counters
  console.log('\n🎯 Adding counters...')
  const allCounterData = [
    { enemy: 'TwistedFate', counters: TWISTED_FATE_COUNTERS },
    { enemy: 'Yasuo', counters: YASUO_COUNTERS },
    { enemy: 'Fizz', counters: FIZZ_COUNTERS },
    { enemy: 'Tristana', counters: TRISTANA_COUNTERS },
  ]

  let countersAdded = 0
  for (const { enemy, counters } of allCounterData) {
    const enemyId = championCache[enemy]
    if (!enemyId) continue

    for (const c of counters) {
      const counterId = championCache[c.counter]
      if (!counterId) continue

      try {
        const existing = await pb.collection('counters').getList(1, 1, {
          filter: `champion = "${enemyId}" && counter_champion = "${counterId}"`,
        })

        const existingRecord = existing.items[0]
        if (existing.totalItems > 0 && existingRecord) {
          await pb.collection('counters').update(existingRecord.id, { tier: c.tier })
          console.log(`   🔄 Updated ${c.counter} vs ${enemy}`)
        } else {
          await pb.collection('counters').create({
            champion: enemyId,
            counter_champion: counterId,
            tier: c.tier,
          })
          console.log(`   ✅ Added ${c.counter} vs ${enemy}`)
        }
        countersAdded++
      } catch (error) {
        console.error(`   ❌ Failed to add ${c.counter} vs ${enemy}:`, error)
      }
    }
  }

  // Add level spikes
  console.log('\n📈 Adding level spikes...')
  const allLevelSpikeData = [
    { championId: 'TwistedFate', spikes: TWISTED_FATE_LEVEL_SPIKES },
    { championId: 'Yasuo', spikes: YASUO_LEVEL_SPIKES },
    { championId: 'Fizz', spikes: FIZZ_LEVEL_SPIKES },
    { championId: 'Tristana', spikes: TRISTANA_LEVEL_SPIKES },
  ]

  let levelSpikesAdded = 0
  for (const { championId, spikes } of allLevelSpikeData) {
    const champRecordId = championCache[championId]
    if (!champRecordId) continue

    for (const spike of spikes) {
      try {
        const existing = await pb.collection('level_spikes').getList(1, 1, {
          filter: `champion = "${champRecordId}" && level = ${spike.level}`,
        })

        const existingRecord = existing.items[0]
        if (existing.totalItems > 0 && existingRecord) {
          await pb.collection('level_spikes').update(existingRecord.id, {
            text_en: spike.text_en,
            text_fr: spike.text_fr,
            important: spike.important,
          })
          console.log(`   🔄 Updated ${championId} level ${spike.level}`)
        } else {
          await pb.collection('level_spikes').create({
            champion: champRecordId,
            level: spike.level,
            text_en: spike.text_en,
            text_fr: spike.text_fr,
            important: spike.important,
          })
          console.log(`   ✅ Added ${championId} level ${spike.level}`)
        }
        levelSpikesAdded++
      } catch (error) {
        console.error(`   ❌ Failed to add ${championId} level ${spike.level}:`, error)
      }
    }
  }

  // Add item spikes
  console.log('\n🎁 Adding item spikes...')
  const allItemSpikeData = [
    { championId: 'TwistedFate', spikes: TWISTED_FATE_ITEM_SPIKES },
    { championId: 'Yasuo', spikes: YASUO_ITEM_SPIKES },
    { championId: 'Fizz', spikes: FIZZ_ITEM_SPIKES },
    { championId: 'Tristana', spikes: TRISTANA_ITEM_SPIKES },
  ]

  let itemSpikesAdded = 0
  for (const { championId, spikes } of allItemSpikeData) {
    const champRecordId = championCache[championId]
    if (!champRecordId) continue

    for (const spike of spikes) {
      try {
        const existing = await pb.collection('item_spikes').getList(1, 1, {
          filter: `champion = "${champRecordId}" && item_id = "${spike.item_id}"`,
        })

        const existingRecord = existing.items[0]
        if (existing.totalItems > 0 && existingRecord) {
          await pb.collection('item_spikes').update(existingRecord.id, {
            text_en: spike.text_en,
            text_fr: spike.text_fr,
          })
          console.log(`   🔄 Updated ${championId} item ${spike.item_id}`)
        } else {
          await pb.collection('item_spikes').create({
            champion: champRecordId,
            item_id: spike.item_id,
            text_en: spike.text_en,
            text_fr: spike.text_fr,
          })
          console.log(`   ✅ Added ${championId} item ${spike.item_id}`)
        }
        itemSpikesAdded++
      } catch (error) {
        console.error(`   ❌ Failed to add ${championId} item ${spike.item_id}:`, error)
      }
    }
  }

  console.log('\n✅ Done!')
  console.log('\n📊 Summary:')
  console.log(`   Champions updated: 4`)
  console.log(`   Counters added/updated: ${countersAdded}`)
  console.log(`   Level spikes added/updated: ${levelSpikesAdded}`)
  console.log(`   Item spikes added/updated: ${itemSpikesAdded}`)
}

main().catch(console.error)
