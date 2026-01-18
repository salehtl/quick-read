import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PlaybackControlsProps {
  isPlaying: boolean
  isComplete: boolean
  onToggle: () => void
  onRestart: () => void
}

export function PlaybackControls({
  isPlaying,
  isComplete,
  onToggle,
  onRestart,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button onClick={onToggle} size="lg" className="min-w-[140px]">
        {isPlaying ? (
          <>
            <Pause className="w-5 h-5" />
            Pause
          </>
        ) : isComplete ? (
          <>
            <RotateCcw className="w-5 h-5" />
            Read Again
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Play
          </>
        )}
      </Button>

      {!isComplete && (
        <Button variant="secondary" onClick={onRestart} size="lg">
          <RotateCcw className="w-5 h-5" />
          Restart
        </Button>
      )}
    </div>
  )
}
