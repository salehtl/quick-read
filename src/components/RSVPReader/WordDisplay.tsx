import { cn } from '@/utils/cn'

interface WordDisplayProps {
  word: string
  isComplete: boolean
}

export function WordDisplay({ word, isComplete }: WordDisplayProps) {
  return (
    <div
      className={cn(
        'paper-card',
        'flex items-center justify-center',
        'min-h-[200px] md:min-h-[280px]',
        'px-8 py-12'
      )}
    >
      <span
        className={cn(
          'font-serif text-4xl md:text-6xl lg:text-7xl',
          'text-foreground text-center',
          'transition-opacity duration-100',
          isComplete && 'text-muted'
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {isComplete ? 'Done!' : word || '\u00A0'}
      </span>
    </div>
  )
}
