import { useState, useEffect } from 'react'
import { I18nContext } from '../context/i18n-context'
import { i18nManager } from '../model/i18n-manager'

export function I18nProvider({ children }) {
  const [, setLanguage] = useState(i18nManager.getLanguage())

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setLanguage(lang)
    }

    i18nManager.on('languageChange', handleLanguageChange)

    return () => {
      i18nManager.removeListener('languageChange', handleLanguageChange)
    }
  }, [])

  return (
    <I18nContext.Provider value={i18nManager}>
      {children}
    </I18nContext.Provider>
  )
}