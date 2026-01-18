import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  isValid?: boolean
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isValid, helperText, className, id, required, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || props.name || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`
    const [hasShaken, setHasShaken] = useState(false)

    // Trigger shake animation when error appears
    const shouldShake = error && !hasShaken

    const handleAnimationComplete = () => {
      if (error) setHasShaken(true)
    }

    // Reset shake state when error clears
    if (!error && hasShaken) {
      setHasShaken(false)
    }

    const showValidIcon = isValid && !error
    const showErrorIcon = !!error

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <motion.div
          className="relative"
          animate={shouldShake ? { x: [0, -4, 4, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={handleAnimationComplete}
        >
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              [error && errorId, helperText && helperId]
                .filter(Boolean)
                .join(' ') || undefined
            }
            aria-required={required}
            className={cn(
              'w-full rounded-sm border border-default-strong bg-subtle px-4 py-3 text-foreground',
              'placeholder:text-muted',
              'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
              'transition-colors duration-200',
              (showValidIcon || showErrorIcon) && 'pr-11',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              isValid && !error && 'border-green-500/50',
              className
            )}
            {...props}
          />

          {/* Validation Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {showErrorIcon && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <AlertCircle className="text-red-500" size={18} />
                </motion.div>
              )}
              {showValidIcon && (
                <motion.div
                  key="valid"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [0, 1.2, 1] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <Check className="text-green-500" size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Helper Text */}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-xs text-muted">
            {helperText}
          </p>
        )}

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-1 text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Input.displayName = 'Input'
