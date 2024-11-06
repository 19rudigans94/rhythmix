import { useState, useEffect } from 'react'
import { useI18n } from '@/shared/lib/i18n/hooks/use-i18n'
import { cn } from '@/shared/lib/class-names'

export function LanguageSwitch() {
  const i18n = useI18n()
  const [currentLang, setCurrentLang] = useState(i18n.getLanguage())

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setCurrentLang(lang)
    }

    i18n.on('languageChange', handleLanguageChange)

    return () => {
      i18n.removeListener('languageChange', handleLanguageChange)
    }
  }, [i18n])

  const handleLanguageChange = (lang) => {
    i18n.setLanguage(lang)
  }

  return (
    <div className="flex items-center space-x-2">
      {i18n.getSupportedLanguages().map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={cn(
            'px-2 py-1 rounded-md text-sm transition-colors',
            currentLang === lang
              ? 'bg-wasabi-500 text-black'
              : 'text-gray-400 hover:text-white'
          )}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}