/**
 * Parse text into words for RSVP display
 * Handles punctuation, URLs, and common patterns
 */
export function parseTextToWords(text: string): string[] {
  if (!text || typeof text !== 'string') {
    return []
  }

  // Normalize whitespace and trim
  const normalized = text.replace(/\s+/g, ' ').trim()

  if (!normalized) {
    return []
  }

  // Split on whitespace, filter empty strings
  const words = normalized.split(' ').filter((word) => word.length > 0)

  return words
}

/**
 * Calculate reading time based on word count and WPM
 */
export function calculateReadingTime(wordCount: number, wpm: number): number {
  if (wordCount <= 0 || wpm <= 0) return 0
  return Math.ceil((wordCount / wpm) * 60) // Returns seconds
}

/**
 * Format seconds into a readable time string
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
}
