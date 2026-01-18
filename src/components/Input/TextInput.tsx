import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface TextInputProps {
  onLoad: (text: string) => void
}

export function TextInput({ onLoad }: TextInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onLoad(text.trim())
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="text-input" className="block text-sm font-medium text-muted">
            Paste your text
          </label>
          {wordCount > 0 && (
            <span className="text-xs text-muted tabular-nums">{wordCount} words</span>
          )}
        </div>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste any text you want to speed read..."
          rows={5}
          className={cn(
            'w-full px-4 py-3 rounded-lg resize-none',
            'bg-elevated border border-default text-foreground',
            'placeholder:text-muted',
            'focus:outline-none focus:ring-2 focus:ring-accent/50'
          )}
        />
      </div>

      <Button type="submit" disabled={!text.trim()} className="w-full">
        Start Reading
      </Button>
    </form>
  )
}
