/**
 * Formats a phone number as 050-123-4567
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * Strips formatting to get raw digits
 */
export function stripPhoneFormatting(value: string): string {
  return value.replace(/\D/g, '').slice(0, 10)
}

/**
 * Calculate cursor position after formatting
 */
export function calculateCursorPosition(
  prevValue: string,
  newValue: string,
  prevCursor: number
): number {
  const prevDigitsBeforeCursor = prevValue.slice(0, prevCursor).replace(/\D/g, '').length
  let digitCount = 0
  let newCursor = 0

  for (let i = 0; i < newValue.length && digitCount < prevDigitsBeforeCursor; i++) {
    if (/\d/.test(newValue[i])) {
      digitCount++
    }
    newCursor = i + 1
  }

  return newCursor
}
