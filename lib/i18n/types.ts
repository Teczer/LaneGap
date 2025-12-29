import type en from './en.json'

/**
 * Full translations object type (inferred from en.json)
 */
export type TTranslations = typeof en

/**
 * Supported languages
 */
export type TLanguage = 'en' | 'fr'

/**
 * Namespace-specific translation types
 */
export type TCommonTranslations = TTranslations['common']
export type TAuthTranslations = TTranslations['auth']
export type TToastTranslations = TTranslations['toast']
export type TNotesTranslations = TTranslations['notes']
export type THomeTranslations = TTranslations['home']
export type TEnemyTranslations = TTranslations['enemy']
export type TMatchupTranslations = TTranslations['matchup']
export type TLanguageTranslations = TTranslations['language']
export type TFooterTranslations = TTranslations['footer']
export type TSettingsTranslations = TTranslations['settings']

/**
 * Default language
 */
export const DEFAULT_LANGUAGE: TLanguage = 'en'

/**
 * Supported languages list
 */
export const SUPPORTED_LANGUAGES: TLanguage[] = ['en', 'fr']
