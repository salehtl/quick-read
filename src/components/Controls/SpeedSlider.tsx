import { Slider } from '@/components/ui/Slider'
import { appConfig } from '@/config/app'
import { cn } from '@/utils/cn'

interface SpeedSliderProps {
  wpm: number
  onWPMChange: (wpm: number) => void
}

export function SpeedSlider({ wpm, onWPMChange }: SpeedSliderProps) {
  return (
    <div className="space-y-4">
      <Slider
        label="Speed"
        value={wpm}
        onChange={(e) => onWPMChange(Number(e.target.value))}
        min={appConfig.minWPM}
        max={appConfig.maxWPM}
        step={10}
        valueSuffix=" WPM"
      />

      <div className="flex items-center justify-center gap-2">
        {appConfig.wpmPresets.map((preset) => (
          <button
            key={preset}
            onClick={() => onWPMChange(preset)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium',
              'transition-colors',
              wpm === preset
                ? 'bg-accent text-white'
                : 'bg-elevated border border-default text-muted hover:text-foreground'
            )}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  )
}
