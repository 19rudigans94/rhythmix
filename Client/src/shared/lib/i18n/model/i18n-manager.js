import Cookies from 'js-cookie'
import { EventEmitter } from '../../event-emitter'
import { I18N_CONFIG } from '@/shared/config/i18n'
import { translations } from '../translations'

class I18nManager extends EventEmitter {
  constructor() {
    super()
    this.currentLang = this.getInitialLanguage()
    this.setDocumentLang(this.currentLang)
  }

  getInitialLanguage() {
    const savedLang = Cookies.get(I18N_CONFIG.COOKIE_KEY)
    return I18N_CONFIG.SUPPORTED_LANGS.includes(savedLang) 
      ? savedLang 
      : I18N_CONFIG.DEFAULT_LANG
  }

  setDocumentLang(lang) {
    document.documentElement.lang = lang
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
    if (I18N_CONFIG.SUPPORTED_LANGS.includes(lang)) {
      this.currentLang = lang
      Cookies.set(I18N_CONFIG.COOKIE_KEY, lang, I18N_CONFIG.COOKIE_OPTIONS)
      this.setDocumentLang(lang)
      this.emit('languageChange', lang)
      return true
    }
    return false
  }

  getLanguage() {
    return this.currentLang
  }

  getSupportedLanguages() {
    return I18N_CONFIG.SUPPORTED_LANGS
  }
}

export const i18nManager = new I18nManager()