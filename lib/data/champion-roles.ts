/**
 * Champion role mappings
 * Each champion can have multiple roles, ordered by popularity
 * Note: Jungle role is excluded - this app focuses on lane matchups
 */

export type TLane = 'top' | 'mid' | 'adc' | 'support'

export const LANE_LABELS: Record<TLane, { en: string; fr: string }> = {
  top: { en: 'Top', fr: 'Top' },
  mid: { en: 'Mid', fr: 'Mid' },
  adc: { en: 'ADC', fr: 'ADC' },
  support: { en: 'Support', fr: 'Support' },
}

export const LANE_ICONS: Record<TLane, string> = {
  top: '/roles/icon-position-top.png',
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
  Aatrox: ['top'],
  Ahri: ['mid'],
  Akali: ['mid', 'top'],
  Akshan: ['mid'],
  Alistar: ['support'],
  Ambessa: ['top'],
  Amumu: ['support'],
  Anivia: ['mid'],
  Annie: ['mid', 'support'],
  Aphelios: ['adc'],
  Ashe: ['adc', 'support'],
  AurelionSol: ['mid'],
  Aurora: ['mid', 'top'],
  Azir: ['mid'],

  // B
  Bard: ['support'],
  Blitzcrank: ['support'],
  Brand: ['support', 'mid'],
  Braum: ['support'],
  Caitlyn: ['adc'],
  Camille: ['top'],
  Cassiopeia: ['mid', 'top'],
  Chogath: ['top'],
  Corki: ['mid', 'adc'],

  // D
  Darius: ['top'],
  Diana: ['mid'],
  Draven: ['adc'],
  DrMundo: ['top'],

  // E
  Ekko: ['mid'],
  Ezreal: ['adc'],

  // F
  Fiddlesticks: ['support'],
  Fiora: ['top'],
  Fizz: ['mid'],

  // G
  Galio: ['mid', 'support'],
  Gangplank: ['top'],
  Garen: ['top'],
  Gnar: ['top'],
  Gragas: ['top', 'mid'],
  Gwen: ['top'],

  // H
  Heimerdinger: ['top', 'support'],
  Hwei: ['mid', 'support'],

  // I
  Illaoi: ['top'],
  Irelia: ['top', 'mid'],

  // J
  Janna: ['support'],
  Jax: ['top'],
  Jayce: ['top', 'mid'],
  Jhin: ['adc'],
  Jinx: ['adc'],

  // K
  Kaisa: ['adc'],
  Kalista: ['adc'],
  Karma: ['support'],
  Kassadin: ['mid'],
  Katarina: ['mid'],
  Kayle: ['top', 'mid'],
  Kennen: ['top'],
  Kled: ['top'],
  KogMaw: ['adc'],
  KSante: ['top'],

  // L
  Leblanc: ['mid'],
  Leona: ['support'],
  Lissandra: ['mid'],
  Lucian: ['adc', 'mid'],
  Lulu: ['support'],
  Lux: ['support', 'mid'],

  // M
  Malphite: ['top'],
  Mel: ['mid', 'support'],
  Malzahar: ['mid'],
  Maokai: ['support'],
  Milio: ['support'],
  MissFortune: ['adc'],
  Mordekaiser: ['top'],
  Morgana: ['support', 'mid'],

  // N
  Naafiri: ['mid'],
  Nami: ['support'],
  Nasus: ['top'],
  Nautilus: ['support'],
  Neeko: ['support'],
  Nilah: ['adc'],

  // O
  Olaf: ['top'],
  Orianna: ['mid'],
  Ornn: ['top'],

  // P
  Pantheon: ['support', 'top'],
  Poppy: ['top', 'support'],
  Pyke: ['support'],

  // Q
  Qiyana: ['mid'],
  Quinn: ['top'],

  // R
  Rakan: ['support'],
  Rell: ['support'],
  Renata: ['support'],
  Renekton: ['top'],
  Rengar: ['top'],
  Riven: ['top'],
  Rumble: ['top'],
  Ryze: ['mid', 'top'],

  // S
  Samira: ['adc'],
  Senna: ['support', 'adc'],
  Seraphine: ['support', 'adc'],
  Sett: ['top'],
  Shen: ['top'],
  Singed: ['top'],
  Sion: ['top'],
  Sivir: ['adc'],
  Smolder: ['adc', 'mid'],
  Sona: ['support'],
  Soraka: ['support'],
  Swain: ['support', 'mid', 'adc'],
  Sylas: ['mid'],
  Syndra: ['mid'],

  // T
  TahmKench: ['top', 'support'],
  Taliyah: ['mid'],
  Talon: ['mid'],
  Taric: ['support'],
  Teemo: ['top'],
  Thresh: ['support'],
  Tristana: ['adc', 'mid'],
  Trundle: ['top'],
  Tryndamere: ['top'],
  TwistedFate: ['mid'],
  Twitch: ['adc'],

  // U
  Urgot: ['top'],

  // V
  Varus: ['adc'],
  Vayne: ['adc', 'top'],
  Veigar: ['mid', 'support'],
  Velkoz: ['support', 'mid'],
  Vex: ['mid'],
  Viktor: ['mid'],
  Vladimir: ['mid', 'top'],
  Volibear: ['top'],

  // W
  Warwick: ['top'],

  // X
  Xayah: ['adc'],
  Xerath: ['support', 'mid'],

  // Y
  Yasuo: ['mid', 'top', 'adc'],
  Yone: ['mid', 'top'],
  Yorick: ['top'],
  Yuumi: ['support'],
  Yunara: ['adc'],

  // Z
  Zed: ['mid'],
  Zeri: ['adc'],
  Ziggs: ['adc', 'mid'],
  Zilean: ['support'],
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
