import { cn } from '@/utils/cn'

interface ProgressBarProps {
  progress: number
  currentIndex: number
  totalWords: number
}

export function ProgressBar({ progress, currentIndex, totalWords }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div
        className={cn('h-2 rounded-full overflow-hidden', 'bg-elevated border border-default')}
      >
        <div
          className="h-full bg-accent transition-all duration-100 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="flex justify-between text-xs text-muted tabular-nums">
        <span>
          {currentIndex + 1} / {totalWords}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
