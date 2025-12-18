/**
 * Champion role mappings
 * Each champion can have multiple roles, ordered by popularity
 */

export type TLane = 'top' | 'jungle' | 'mid' | 'adc' | 'support'

export const LANE_LABELS: Record<TLane, { en: string; fr: string }> = {
  top: { en: 'Top', fr: 'Top' },
  jungle: { en: 'Jungle', fr: 'Jungle' },
  mid: { en: 'Mid', fr: 'Mid' },
  adc: { en: 'ADC', fr: 'ADC' },
  support: { en: 'Support', fr: 'Support' },
}

export const LANE_ICONS: Record<TLane, string> = {
  top: '/roles/icon-position-top.png',
  jungle: '/roles/icon-position-jungle.png',
  mid: '/roles/icon-position-middle.png',
  adc: '/roles/icon-position-bottom.png',
  support: '/roles/icon-position-utility.png',
}

/**
 * Champion to lane mapping
 * Key: Champion ID (matches Data Dragon ID)
 * Value: Array of lanes (first = primary role)
 */
export const CHAMPION_ROLES: Record<string, TLane[]> = {
  // A
  Aatrox: ['top', 'mid'],
  Ahri: ['mid'],
  Akali: ['mid', 'top'],
  Akshan: ['mid', 'top'],
  Alistar: ['support'],
  Ambessa: ['top', 'mid'],
  Amumu: ['jungle', 'support'],
  Anivia: ['mid'],
  Annie: ['mid', 'support'],
  Aphelios: ['adc'],
  Ashe: ['adc', 'support'],
  AurelionSol: ['mid'],
  Aurora: ['mid', 'top'],
  Azir: ['mid'],

  // B
  Bard: ['support'],
  Belveth: ['jungle'],
  Blitzcrank: ['support'],
  Brand: ['support', 'mid'],
  Braum: ['support'],
  Briar: ['jungle'],
  Caitlyn: ['adc'],
  Camille: ['top'],
  Cassiopeia: ['mid', 'top'],
  Chogath: ['top', 'mid'],
  Corki: ['mid', 'adc'],

  // D
  Darius: ['top'],
  Diana: ['jungle', 'mid'],
  Draven: ['adc'],
  DrMundo: ['top', 'jungle'],

  // E
  Ekko: ['jungle', 'mid'],
  Elise: ['jungle'],
  Evelynn: ['jungle'],
  Ezreal: ['adc'],

  // F
  Fiddlesticks: ['jungle', 'support'],
  Fiora: ['top'],
  Fizz: ['mid'],

  // G
  Galio: ['mid', 'support'],
  Gangplank: ['top', 'mid'],
  Garen: ['top', 'mid'],
  Gnar: ['top'],
  Gragas: ['jungle', 'top', 'mid'],
  Graves: ['jungle'],
  Gwen: ['top'],

  // H
  Hecarim: ['jungle'],
  Heimerdinger: ['mid', 'top', 'support'],
  Hwei: ['mid', 'support'],

  // I
  Illaoi: ['top'],
  Irelia: ['top', 'mid'],
  Ivern: ['jungle'],

  // J
  Janna: ['support'],
  JarvanIV: ['jungle', 'top'],
  Jax: ['top', 'jungle'],
  Jayce: ['top', 'mid'],
  Jhin: ['adc'],
  Jinx: ['adc'],

  // K
  Kaisa: ['adc'],
  Kalista: ['adc'],
  Karma: ['support', 'mid'],
  Karthus: ['jungle', 'mid'],
  Kassadin: ['mid'],
  Katarina: ['mid'],
  Kayle: ['top', 'mid'],
  Kayn: ['jungle'],
  Kennen: ['top'],
  Khazix: ['jungle'],
  Kindred: ['jungle'],
  Kled: ['top'],
  KogMaw: ['adc'],
  KSante: ['top'],

  // L
  Leblanc: ['mid'],
  LeeSin: ['jungle'],
  Leona: ['support'],
  Lillia: ['jungle'],
  Lissandra: ['mid'],
  Lucian: ['adc', 'mid'],
  Lulu: ['support'],
  Lux: ['support', 'mid'],

  // M
  Malphite: ['top', 'support'],
  Mel: ['mid', 'support'],
  Malzahar: ['mid'],
  Maokai: ['support', 'jungle'],
  MasterYi: ['jungle'],
  Milio: ['support'],
  MissFortune: ['adc'],
  MonkeyKing: ['top', 'jungle'], // Wukong
  Mordekaiser: ['top'],
  Morgana: ['support', 'mid'],

  // N
  Naafiri: ['mid', 'jungle'],
  Nami: ['support'],
  Nasus: ['top'],
  Nautilus: ['support'],
  Neeko: ['mid', 'support'],
  Nidalee: ['jungle'],
  Nilah: ['adc'],
  Nocturne: ['jungle'],
  Nunu: ['jungle'],

  // O
  Olaf: ['jungle', 'top'],
  Orianna: ['mid'],
  Ornn: ['top'],

  // P
  Pantheon: ['support', 'mid', 'top'],
  Poppy: ['jungle', 'top', 'support'],
  Pyke: ['support'],

  // Q
  Qiyana: ['mid', 'jungle'],
  Quinn: ['top'],

  // R
  Rakan: ['support'],
  Rammus: ['jungle'],
  RekSai: ['jungle'],
  Rell: ['support'],
  Renata: ['support'],
  Renekton: ['top'],
  Rengar: ['jungle', 'top'],
  Riven: ['top'],
  Rumble: ['top', 'mid'],
  Ryze: ['mid', 'top'],

  // S
  Samira: ['adc'],
  Sejuani: ['jungle'],
  Senna: ['support', 'adc'],
  Seraphine: ['support', 'adc'],
  Sett: ['top', 'support'],
  Shaco: ['jungle'],
  Shen: ['top', 'support'],
  Shyvana: ['jungle'],
  Singed: ['top'],
  Sion: ['top'],
  Sivir: ['adc'],
  Skarner: ['jungle'],
  Smolder: ['adc', 'mid'],
  Sona: ['support'],
  Soraka: ['support'],
  Swain: ['support', 'mid', 'adc'],
  Sylas: ['mid', 'jungle'],
  Syndra: ['mid'],

  // T
  TahmKench: ['top', 'support'],
  Taliyah: ['jungle', 'mid'],
  Talon: ['mid', 'jungle'],
  Taric: ['support'],
  Teemo: ['top'],
  Thresh: ['support'],
  Tristana: ['adc', 'mid'],
  Trundle: ['jungle', 'top'],
  Tryndamere: ['top'],
  TwistedFate: ['mid'],
  Twitch: ['adc'],

  // U
  Udyr: ['jungle', 'top'],
  Urgot: ['top'],

  // V
  Varus: ['adc', 'mid'],
  Vayne: ['adc', 'top'],
  Veigar: ['mid', 'support'],
  Velkoz: ['support', 'mid'],
  Vex: ['mid'],
  Vi: ['jungle'],
  Viego: ['jungle'],
  Viktor: ['mid'],
  Vladimir: ['mid', 'top'],
  Volibear: ['top', 'jungle'],

  // W
  Warwick: ['jungle', 'top'],

  // X
  Xayah: ['adc'],
  Xerath: ['support', 'mid'],
  XinZhao: ['jungle'],

  // Y
  Yasuo: ['mid', 'top', 'adc'],
  Yone: ['mid', 'top'],
  Yorick: ['top'],
  Yuumi: ['support'],
  Yunara: ['top', 'jungle'],

  // Z
  Zaahen: ['jungle'],
  Zac: ['jungle'],
  Zed: ['mid'],
  Zeri: ['adc'],
  Ziggs: ['adc', 'mid'],
  Zilean: ['support', 'mid'],
  Zoe: ['mid'],
  Zyra: ['support'],
}

/**
 * Get champions for a specific lane
 */
export function getChampionsForLane(lane: TLane): string[] {
  return Object.entries(CHAMPION_ROLES)
    .filter(([_, roles]) => roles.includes(lane))
    .map(([championId]) => championId)
}

/**
 * Check if a champion plays a specific lane
 */
export function championPlaysLane(championId: string, lane: TLane): boolean {
  const roles = CHAMPION_ROLES[championId]
  return roles ? roles.includes(lane) : false
}

/**
 * Get primary lane for a champion
 */
export function getPrimaryLane(championId: string): TLane | null {
  const roles = CHAMPION_ROLES[championId]
  return roles?.[0] ?? null
}
