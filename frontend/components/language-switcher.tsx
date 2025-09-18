"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
]

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 rounded-md"
        aria-label={t("nav.language")}
      >
        <GlobeAltIcon className="h-4 w-4" />
        <span className="hidden sm:block">{currentLanguage.nativeName}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    i18n.language === language.code ? "bg-ocean-50 text-ocean-700 font-medium" : "text-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{language.nativeName}</span>
                    <span className="text-xs text-gray-500">{language.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
