import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/utils/cn'
import { siteConfig } from '@/config/site'
import { ThemeSwitcher } from './ThemeSwitcher'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const isHomePage = location.pathname === '/'

  // Get section IDs from nav config (only hash links)
  const navSections = siteConfig.nav
    .filter((item) => item.href.startsWith('#'))
    .map((item) => item.href.slice(1))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section with IntersectionObserver (only on home page)
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(null)
      return
    }

    const observers: IntersectionObserver[] = []

    navSections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId)
              }
            })
          },
          { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [isHomePage, navSections])

  const handleNavClick = (item: (typeof siteConfig.nav)[number]) => {
    setIsMobileMenuOpen(false)

    if (item.href.startsWith('#')) {
      const sectionId = item.href.slice(1)
      if (isHomePage) {
        // On home page, smooth scroll to section
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // On other pages, navigate to home with hash
        navigate({ to: '/', hash: sectionId })
      }
    }
    // For non-hash links, the Link component handles navigation
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-surface/95 backdrop-blur-md border-b border-default'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            isScrolled ? 'h-16' : 'h-20'
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <img
              src="/logo.svg"
              alt={siteConfig.name}
              className={cn(
                'transition-all duration-300',
                isScrolled ? 'h-6' : 'h-7'
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item, index) => {
              const isLast = index === siteConfig.nav.length - 1
              const sectionId = item.href.startsWith('#')
                ? item.href.slice(1)
                : null

              return (
                <NavButton
                  key={item.key}
                  onClick={() => handleNavClick(item)}
                  isActive={activeSection === sectionId}
                  isAccent={isLast}
                >
                  {t(`nav.${item.key}`)}
                </NavButton>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme switcher */}
            <ThemeSwitcher />

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden bg-surface-elevated border-t border-default overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {siteConfig.nav.map((item, index) => {
                const isLast = index === siteConfig.nav.length - 1
                const sectionId = item.href.startsWith('#')
                  ? item.href.slice(1)
                  : null

                return (
                  <MobileNavButton
                    key={item.key}
                    onClick={() => handleNavClick(item)}
                    isActive={activeSection === sectionId}
                    isAccent={isLast}
                  >
                    {t(`nav.${item.key}`)}
                  </MobileNavButton>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Desktop nav button with hover underline animation
function NavButton({
  onClick,
  isActive,
  isAccent,
  children,
}: {
  onClick: () => void
  isActive: boolean
  isAccent?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded',
        isAccent
          ? 'text-accent hover:text-accent-light font-semibold'
          : 'text-muted hover:text-foreground',
        isActive && !isAccent && 'text-foreground'
      )}
    >
      {children}
      {/* Animated underline */}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-0.5 transition-all duration-300',
          isAccent ? 'bg-accent' : 'bg-foreground',
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
      {/* Hover underline effect */}
      <span
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 transition-all duration-300',
          isAccent ? 'bg-accent/50' : 'bg-muted',
          !isActive && 'hover:w-full'
        )}
        style={{ width: isActive ? '0' : undefined }}
      />
    </button>
  )
}

// Mobile nav button
function MobileNavButton({
  onClick,
  isActive,
  isAccent,
  children,
}: {
  onClick: () => void
  isActive: boolean
  isAccent?: boolean
  children: React.ReactNode
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'text-start py-3 px-4 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        isAccent
          ? 'text-accent hover:text-accent-light font-semibold'
          : 'text-muted hover:text-foreground',
        isActive && 'bg-subtle',
        isActive && !isAccent && 'text-foreground'
      )}
    >
      {children}
    </motion.button>
  )
}
