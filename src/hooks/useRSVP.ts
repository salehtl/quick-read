import { useState, useCallback, useRef, useEffect } from 'react'
import { appConfig } from '@/config/app'
import { parseTextToWords } from '@/utils/textParser'

interface UseRSVPOptions {
  initialWPM?: number
}

interface UseRSVPReturn {
  // State
  words: string[]
  currentIndex: number
  currentWord: string
  isPlaying: boolean
  wpm: number
  isComplete: boolean
  progress: number

  // Actions
  setText: (text: string) => void
  play: () => void
  pause: () => void
  toggle: () => void
  restart: () => void
  setWPM: (wpm: number) => void
  skipForward: () => void
  skipBackward: () => void
  goToIndex: (index: number) => void
  reset: () => void
}

export function useRSVP(options: UseRSVPOptions = {}): UseRSVPReturn {
  const { initialWPM = appConfig.defaultWPM } = options

  const [words, setWords] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [wpm, setWPMState] = useState(initialWPM)

  const intervalRef = useRef<number | null>(null)

  const currentWord = words[currentIndex] ?? ''
  const isComplete = words.length > 0 && currentIndex >= words.length
  const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0

  // Calculate interval based on WPM
  const getInterval = useCallback(() => {
    return Math.round(60000 / wpm)
  }, [wpm])

  // Clear interval helper
  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Set text and parse into words
  const setText = useCallback((text: string) => {
    clearTimer()
    const parsedWords = parseTextToWords(text)
    setWords(parsedWords)
    setCurrentIndex(0)
    setIsPlaying(false)
  }, [clearTimer])

  // Play
  const play = useCallback(() => {
    if (words.length === 0) return

    // If at end, restart from beginning
    if (currentIndex >= words.length) {
      setCurrentIndex(0)
    }

    setIsPlaying(true)
  }, [words.length, currentIndex])

  // Pause
  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // Toggle
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  // Restart
  const restart = useCallback(() => {
    clearTimer()
    setCurrentIndex(0)
    setIsPlaying(false)
  }, [clearTimer])

  // Set WPM with clamping
  const setWPM = useCallback((newWPM: number) => {
    const clamped = Math.max(appConfig.minWPM, Math.min(appConfig.maxWPM, newWPM))
    setWPMState(clamped)
  }, [])

  // Skip forward (5 words or to end)
  const skipForward = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 5, words.length - 1))
  }, [words.length])

  // Skip backward (5 words or to start)
  const skipBackward = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 5, 0))
  }, [])

  // Go to specific index
  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, words.length - 1))
      setCurrentIndex(clamped)
    },
    [words.length]
  )

  // Reset everything
  const reset = useCallback(() => {
    clearTimer()
    setWords([])
    setCurrentIndex(0)
    setIsPlaying(false)
  }, [clearTimer])

  // Manage interval for playback
  useEffect(() => {
    if (!isPlaying || words.length === 0) {
      clearTimer()
      return
    }

    // Start interval
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1
        if (next >= words.length) {
          setIsPlaying(false)
          return prev
        }
        return next
      })
    }, getInterval())

    return clearTimer
  }, [isPlaying, words.length, getInterval, clearTimer])

  // Update interval when WPM changes during playback
  useEffect(() => {
    if (isPlaying && words.length > 0) {
      clearTimer()
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1
          if (next >= words.length) {
            setIsPlaying(false)
            return prev
          }
          return next
        })
      }, getInterval())
    }
  }, [wpm, isPlaying, words.length, getInterval, clearTimer])

  return {
    words,
    currentIndex,
    currentWord,
    isPlaying,
    wpm,
    isComplete,
    progress,
    setText,
    play,
    pause,
    toggle,
    restart,
    setWPM,
    skipForward,
    skipBackward,
    goToIndex,
    reset,
  }
}
