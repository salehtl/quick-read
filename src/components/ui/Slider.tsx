import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showValue?: boolean
  valueSuffix?: string
}

export function Slider({
  label,
  showValue = true,
  valueSuffix = '',
  value,
  className,
  ...props
}: SliderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted">{label}</span>}
          {showValue && (
            <span className="font-medium text-foreground tabular-nums">
              {value}
              {valueSuffix}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        value={value}
        className={cn(
          'w-full h-2 rounded-full appearance-none cursor-pointer',
          'bg-elevated border border-default',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:h-4',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-accent',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:hover:scale-110',
          '[&::-moz-range-thumb]:w-4',
          '[&::-moz-range-thumb]:h-4',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-accent',
          '[&::-moz-range-thumb]:border-0',
          '[&::-moz-range-thumb]:cursor-pointer'
        )}
        {...props}
      />
    </div>
  )
}
