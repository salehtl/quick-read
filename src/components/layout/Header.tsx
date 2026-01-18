import { BookOpen } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { appConfig } from '@/config/app'

export function Header() {
  return (
    <header className="w-full border-b border-default">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-accent" />
            <span className="font-semibold text-foreground">{appConfig.name}</span>
          </div>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
