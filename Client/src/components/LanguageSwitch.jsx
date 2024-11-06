import { useState, useEffect } from 'react'
import { i18n } from '@/shared/lib/i18n'

function LanguageSwitch() {
  const [currentLang, setCurrentLang] = useState(i18n.getLanguage())

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setCurrentLang(lang)
    }

    i18n.on('languageChange', handleLanguageChange)

    return () => {
      i18n.removeListener('languageChange', handleLanguageChange)
    }
  }, [])

  const handleLanguageChange = (lang) => {
    i18n.setLanguage(lang)
  }

  return (
    <div className="flex items-center space-x-2">
      {i18n.getSupportedLanguages().map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`px-2 py-1 rounded-md text-sm transition-colors ${
            currentLang === lang
              ? 'bg-wasabi-500 text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitch