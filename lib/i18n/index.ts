// Types
export type {
  TTranslations,
  TLanguage,
  TCommonTranslations,
  TAuthTranslations,
  TToastTranslations,
  TNotesTranslations,
  THomeTranslations,
  TEnemyTranslations,
  TMatchupTranslations,
  TLanguageTranslations,
  TFooterTranslations,
  TSettingsTranslations,
  TOnboardingTranslations,
} from './types'

export { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './types'

// Server utilities
export {
  getTranslations,
  getNamespacedTranslations,
  getLanguage,
  LANGUAGE_COOKIE_NAME,
} from './get-translations'

// Server actions
export { setLanguage, toggleLanguage } from './actions'
