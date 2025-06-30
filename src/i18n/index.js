import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

const messages = {
  en,
  fr,
}

// Auto detect the browser language with fallback
const getDefaultLocale = () => {
  try {
    // Check for saved locale first
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && messages[savedLocale]) {
      return savedLocale
    }

    // Fallback to browser language
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserLocale = navigator.language.split('-')[0]
      if (messages[browserLocale]) {
        return browserLocale
      }
    }
  } catch (error) {
    console.warn('Error detecting locale:', error)
  }

  return 'en'
}

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
  silentTranslationWarn: import.meta.env.MODE === 'production',
  missingWarn: false,
  fallbackWarn: false,
  allowComposition: true,
})

// Utility function to change locale without page reload
export const setLocale = (locale) => {
  if (messages[locale] && i18n.global.locale.value !== locale) {
    try {
      localStorage.setItem('locale', locale)
      i18n.global.locale.value = locale
      // Update document direction if needed
      document.documentElement.lang = locale
    } catch (error) {
      console.error('Error setting locale:', error)
    }
  }
}

// Utility function to get current locale
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}

// Utility function to get available locales
export const getAvailableLocales = () => {
  return Object.keys(messages).map((locale) => ({
    code: locale,
    name: locale === 'en' ? 'English' : 'Français',
    flag: locale === 'en' ? '🇺🇸' : '🇫🇷',
  }))
}

export default i18n
