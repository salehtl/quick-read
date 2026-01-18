import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useTheme } from '@/hooks'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  // Initialize theme on mount (applies data-theme attribute to <html>)
  useTheme()

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
