/**
 * Champion search aliases
 * Maps common abbreviations/nicknames to champion IDs
 */

export const CHAMPION_ALIASES: Record<string, string[]> = {
  // Common abbreviations
  TwistedFate: ['tf', 'twisted'],
  Leblanc: ['lb'],
  MissFortune: ['mf', 'miss fortune'],
  TahmKench: ['tk', 'tahm'],
  AurelionSol: ['asol', 'aurelion'],
  DrMundo: ['mundo', 'dr mundo'],
  KogMaw: ['kog'],
  Renata: ['renata glasc'],
  KSante: ["k'sante", 'ksante'],
  Velkoz: ["vel'koz", 'vel koz'],
  Chogath: ["cho'gath", 'cho'],
  Khazix: ["kha'zix", 'kha'],
  Reksai: ["rek'sai", 'rek'],
  Kaisa: ["kai'sa"],
  Belveth: ["bel'veth", 'bel'],

  // Common nicknames
  Cassiopeia: ['cass', 'cassio'],
  Malphite: ['rock', 'malph'],
  Mordekaiser: ['morde'],
  Heimerdinger: ['heimer', 'donger'],
  Blitzcrank: ['blitz'],
  Fiddlesticks: ['fiddle'],
  Gangplank: ['gp'],
  Volibear: ['voli'],
  Tryndamere: ['trynd'],
  Warwick: ['ww'],
  Evelynn: ['eve'],
  Nocturne: ['noc'],
  Nidalee: ['nid'],
  Orianna: ['ori'],
  Gragas: ['grag'],
  Rumble: ['rumble'],
  Ezreal: ['ez'],
  Caitlyn: ['cait'],
  Jinx: ['jinx'],
  Vayne: ['vayne'],
  Seraphine: ['sera'],
  Lissandra: ['liss'],
  Malzahar: ['malz'],
  Kassadin: ['kass'],
  Zilean: ['zil'],
  Anivia: ['bird', 'anivia'],
  Singed: ['singed'],
  Vladimir: ['vlad'],
  Swain: ['swain'],
  Xerath: ['xerath'],
  Syndra: ['syndra'],
  Viktor: ['vik'],
  Katarina: ['kat'],
  Tristana: ['trist'],
  Renekton: ['renek', 'croc'],
  Nasus: ['dog', 'nasus'],
  Pantheon: ['panth'],
  Jarvan: ['j4', 'jarvan'],
  Xin: ['xin', 'xinzhao'],
  Skarner: ['skarn'],
  Hecarim: ['heca'],
  Zed: ['zed'],
  Talon: ['talon'],
  Yasuo: ['yas'],
  Yone: ['yone'],
  Akali: ['akali'],
  Irelia: ['irelia'],
  Fiora: ['fiora'],
  Camille: ['cam'],
  Riven: ['riven'],
  Jayce: ['jayce'],
  Kennen: ['kenn'],
  Teemo: ['teemo'],
  Quinn: ['quinn'],
  Urgot: ['urgot'],
  Yorick: ['yorick'],
  Sion: ['sion'],
  Ornn: ['ornn'],
  Poppy: ['poppy'],
  Maokai: ['mao'],
  Nautilus: ['naut'],
  Leona: ['leo'],
  Braum: ['braum'],
  Alistar: ['ali', 'cow'],
  Thresh: ['thresh'],
  Pyke: ['pyke'],
  Senna: ['senna'],
  Yuumi: ['yuumi', 'cat'],
  Soraka: ['raka'],
  Nami: ['nami'],
  Janna: ['janna'],
  Lulu: ['lulu'],
  Karma: ['karma'],
  Sona: ['sona'],
  Taric: ['taric'],
  Bard: ['bard'],
  Rakan: ['rakan'],
  Rell: ['rell'],
  Milio: ['milio'],
  Neeko: ['neeko'],
  Vex: ['vex'],
  Hwei: ['hwei'],
  Aurora: ['aurora'],
  Mel: ['mel'],
  Smolder: ['smolder'],
  Ambessa: ['ambessa'],
}

/**
 * Check if a search query matches a champion
 */
export function matchesSearch(
  championId: string,
  nameEn: string,
  nameFr: string,
  query: string
): boolean {
  const lowerQuery = query.toLowerCase().trim()

  // Direct match on name or id
  if (
    nameEn.toLowerCase().includes(lowerQuery) ||
    nameFr.toLowerCase().includes(lowerQuery) ||
    championId.toLowerCase().includes(lowerQuery)
  ) {
    return true
  }

  // Check aliases
  const aliases = CHAMPION_ALIASES[championId]
  if (aliases) {
    for (const alias of aliases) {
      if (alias.toLowerCase().includes(lowerQuery) || lowerQuery.includes(alias.toLowerCase())) {
        return true
      }
    }
  }

  return false
}
