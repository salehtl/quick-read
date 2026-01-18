import { useTranslation } from 'react-i18next'

export function useLanguage() {
  const { i18n, t } = useTranslation()

  const isRTL = i18n.dir() === 'rtl'
  const currentLang = i18n.language as 'en' | 'ar'

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' || currentLang.startsWith('en') ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
  }

  const setLanguage = (lang: 'en' | 'ar') => {
    i18n.changeLanguage(lang)
  }

  return { t, isRTL, currentLang, toggleLanguage, setLanguage }
}
