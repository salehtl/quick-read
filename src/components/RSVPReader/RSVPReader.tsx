import { WordDisplay } from './WordDisplay'
import { ProgressBar } from './ProgressBar'
import { PlaybackControls } from '@/components/Controls/PlaybackControls'
import { SpeedSlider } from '@/components/Controls/SpeedSlider'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

interface RSVPReaderProps {
  currentWord: string
  isPlaying: boolean
  isComplete: boolean
  progress: number
  currentIndex: number
  totalWords: number
  wpm: number
  onToggle: () => void
  onRestart: () => void
  onWPMChange: (wpm: number) => void
  onBack: () => void
}

export function RSVPReader({
  currentWord,
  isPlaying,
  isComplete,
  progress,
  currentIndex,
  totalWords,
  wpm,
  onToggle,
  onRestart,
  onWPMChange,
  onBack,
}: RSVPReaderProps) {
  return (
    <div className="space-y-6">
      <WordDisplay word={currentWord} isComplete={isComplete} />

      <ProgressBar progress={progress} currentIndex={currentIndex} totalWords={totalWords} />

      <PlaybackControls
        isPlaying={isPlaying}
        isComplete={isComplete}
        onToggle={onToggle}
        onRestart={onRestart}
      />

      <SpeedSlider wpm={wpm} onWPMChange={onWPMChange} />

      <div className="pt-4 border-t border-default">
        <Button variant="ghost" onClick={onBack} className="w-full">
          <ArrowLeft className="w-4 h-4" />
          Load different text
        </Button>
      </div>
    </div>
  )
}
