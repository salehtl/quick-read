import { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/layout'
import { TextInput } from '@/components/Input'
import { RSVPReader } from '@/components/RSVPReader'
import { useRSVP } from '@/hooks'
import { appConfig } from '@/config/app'

type AppView = 'input' | 'reader'

export default function App() {
  const [view, setView] = useState<AppView>('input')
  const rsvp = useRSVP()

  const handleLoadText = useCallback(
    (text: string) => {
      rsvp.setText(text)
      setView('reader')
    },
    [rsvp]
  )

  const handleBack = useCallback(() => {
    rsvp.reset()
    setView('input')
  }, [rsvp])

  // Keyboard shortcuts
  useEffect(() => {
    if (view !== 'reader') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const { shortcuts } = appConfig

      switch (e.key) {
        case shortcuts.togglePlayback:
          e.preventDefault()
          rsvp.toggle()
          break
        case shortcuts.restart:
        case shortcuts.restart.toUpperCase():
          e.preventDefault()
          rsvp.restart()
          break
        case shortcuts.speedUp:
          e.preventDefault()
          rsvp.setWPM(rsvp.wpm + 50)
          break
        case shortcuts.speedDown:
          e.preventDefault()
          rsvp.setWPM(rsvp.wpm - 50)
          break
        case shortcuts.skipForward:
          e.preventDefault()
          rsvp.skipForward()
          break
        case shortcuts.skipBackward:
          e.preventDefault()
          rsvp.skipBackward()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [view, rsvp])

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {view === 'input' ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold text-foreground">Quick Read</h1>
                <p className="text-muted">Speed read any text with RSVP</p>
              </div>

              <div className="paper-card p-6">
                <TextInput onLoad={handleLoadText} />
              </div>

              <div className="text-center text-sm text-muted">
                <p>
                  <kbd className="px-1.5 py-0.5 rounded bg-elevated border border-default text-xs">Space</kbd> play/pause
                  {' · '}
                  <kbd className="px-1.5 py-0.5 rounded bg-elevated border border-default text-xs">R</kbd> restart
                  {' · '}
                  <kbd className="px-1.5 py-0.5 rounded bg-elevated border border-default text-xs">↑↓</kbd> speed
                </p>
              </div>
            </div>
          ) : (
            <RSVPReader
              currentWord={rsvp.currentWord}
              isPlaying={rsvp.isPlaying}
              isComplete={rsvp.isComplete}
              progress={rsvp.progress}
              currentIndex={rsvp.currentIndex}
              totalWords={rsvp.words.length}
              wpm={rsvp.wpm}
              onToggle={rsvp.toggle}
              onRestart={rsvp.restart}
              onWPMChange={rsvp.setWPM}
              onBack={handleBack}
            />
          )}
        </div>
      </main>
    </div>
  )
}
