import { translations } from '../i18n/translations'
import Cookies from 'js-cookie'
import { EventEmitter } from './event-emitter'

const LANG_COOKIE = 'rhythmix_lang'
const DEFAULT_LANG = 'en'
const SUPPORTED_LANGS = ['en', 'ru']

class I18nManager extends EventEmitter {
  constructor() {
    super()
    this.currentLang = Cookies.get(LANG_COOKIE) || DEFAULT_LANG
  }

  t(key, lang = null) {
    const currentLang = lang || this.currentLang
    const keys = key.split('.')
    let value = translations[currentLang]
    
    for (const k of keys) {
      if (!value?.[k]) return key
      value = value[k]
    }
    
    return value
  }

  setLanguage(lang) {
    if (SUPPORTED_LANGS.includes(lang)) {
      this.currentLang = lang
      Cookies.set(LANG_COOKIE, lang, { expires: 365 })
      document.documentElement.lang = lang
      this.emit('languageChange', lang)
      return true
    }
    return false
  }

  getLanguage() {
    return this.currentLang
  }

  getSupportedLanguages() {
    return SUPPORTED_LANGS
  }
}

export const i18n = new I18nManager()