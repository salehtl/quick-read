import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/utils/cn'

export function LanguageSwitcher() {
  const { currentLang, setLanguage } = useLanguage()

  const isEnglish = currentLang === 'en' || currentLang.startsWith('en')

  return (
    <div className="flex items-center gap-1 rounded-sm border border-default-strong p-1">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-3 py-1 text-sm font-medium transition-colors rounded-sm',
          isEnglish
            ? 'bg-accent text-white'
            : 'text-muted hover:text-foreground'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={cn(
          'px-3 py-1 text-sm font-medium transition-colors rounded-sm',
          !isEnglish
            ? 'bg-accent text-white'
            : 'text-muted hover:text-foreground'
        )}
      >
        عربي
      </button>
    </div>
  )
}
