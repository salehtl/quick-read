import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme, type Theme } from '@/hooks'
import { cn } from '@/utils/cn'

const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'auto', icon: Monitor, label: 'Auto' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={cn(
        'flex items-center gap-1 p-1 rounded-lg',
        'bg-elevated border border-default'
      )}
      role="radiogroup"
      aria-label="Theme"
    >
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              'flex items-center justify-center',
              'w-8 h-8 rounded-md',
              'transition-colors',
              isActive
                ? 'bg-surface text-accent'
                : 'text-muted hover:text-foreground'
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        )
      })}
    </div>
  )
}
