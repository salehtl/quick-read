import { useRef, useCallback } from 'react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { Input } from './Input'
import {
  formatPhoneNumber,
  stripPhoneFormatting,
  calculateCursorPosition,
} from '@/utils/phoneFormat'

interface PhoneInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  error?: string
  isValid?: boolean
  helperText?: string
  placeholder?: string
}

export function PhoneInput<T extends FieldValues>({
  name,
  control,
  label,
  error,
  isValid,
  helperText,
  placeholder,
}: PhoneInputProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (value: string) => void
    ) => {
      const input = e.target
      const prevCursor = input.selectionStart || 0
      const prevValue = input.value

      const rawDigits = stripPhoneFormatting(input.value)
      const formatted = formatPhoneNumber(rawDigits)

      // Update React Hook Form with RAW digits
      onChange(rawDigits)

      // Maintain cursor position after React re-render
      requestAnimationFrame(() => {
        if (inputRef.current) {
          const newCursor = calculateCursorPosition(prevValue, formatted, prevCursor)
          inputRef.current.setSelectionRange(newCursor, newCursor)
        }
      })
    },
    []
  )

  const handlePaste = useCallback(
    (
      e: React.ClipboardEvent<HTMLInputElement>,
      onChange: (value: string) => void
    ) => {
      e.preventDefault()
      const pastedText = e.clipboardData.getData('text')
      const rawDigits = stripPhoneFormatting(pastedText)
      onChange(rawDigits)
    },
    []
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <Input
          {...field}
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          label={label}
          error={error}
          isValid={isValid}
          helperText={helperText}
          placeholder={placeholder}
          value={formatPhoneNumber(value || '')}
          onChange={(e) => handleChange(e, onChange)}
          onPaste={(e) => handlePaste(e, onChange)}
          maxLength={12} // 10 digits + 2 hyphens
          autoComplete="tel"
        />
      )}
    />
  )
}
