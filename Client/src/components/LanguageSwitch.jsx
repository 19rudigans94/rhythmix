import { useCallback } from 'react'
import { i18n } from '@/shared/lib/i18n'
import { useForceUpdate } from '@/shared/hooks/useForceUpdate'

function LanguageSwitch() {
  const forceUpdate = useForceUpdate()
  const currentLang = i18n.getLanguage()

  const handleLanguageChange = useCallback((lang) => {
    if (i18n.setLanguage(lang)) {
      forceUpdate()
    }
  }, [forceUpdate])

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