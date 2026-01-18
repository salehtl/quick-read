import { useState, useRef, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, type Theme } from '@/hooks'
import { cn } from '@/utils/cn'

const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'auto', icon: Monitor, label: 'Auto' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Map<Theme, HTMLButtonElement>>(new Map())

  // Update indicator position when theme changes
  useEffect(() => {
    const activeButton = buttonRefs.current.get(theme)
    const container = containerRef.current
    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      })
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex items-center gap-0.5 p-1 rounded-full',
        'bg-surface-overlay/50 backdrop-blur-sm',
        'border border-default'
      )}
      role="radiogroup"
      aria-label="Appearance"
    >
      {/* Sliding indicator */}
      <motion.div
        className={cn(
          'absolute top-1 bottom-1 rounded-full',
          'bg-surface-elevated',
          'border border-default-strong',
          'shadow-sm'
        )}
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      />

      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value

        return (
          <button
            key={value}
            ref={(el) => {
              if (el) buttonRefs.current.set(value, el)
            }}
            onClick={() => setTheme(value)}
            className={cn(
              'relative z-10 flex items-center justify-center gap-1.5',
              'px-3 py-1.5 rounded-full',
              'text-sm font-medium',
              'transition-colors duration-200',
              isActive
                ? 'text-foreground'
                : 'text-muted hover:text-foreground/80'
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={label}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={`${value}-${isActive}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Icon
                  className={cn(
                    'w-4 h-4 transition-all duration-200',
                    isActive && 'text-accent'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.span>
            </AnimatePresence>


            {/* Subtle glow effect for active state */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-accent/5"
                layoutId="theme-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
