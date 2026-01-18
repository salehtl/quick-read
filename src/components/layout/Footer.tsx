import { Link } from '@tanstack/react-router'
import { Instagram, Facebook, Youtube, Twitter, Linkedin } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { siteConfig } from '@/config/site'

// Map of social platform keys to their icons
const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  tiktok: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
}

export function Footer() {
  const { t } = useLanguage()

  // Filter out empty social links
  const activeSocialLinks = Object.entries(siteConfig.social).filter(
    ([, url]) => url && url.trim() !== ''
  )

  return (
    <footer className="bg-surface-elevated border-t border-default">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.svg" alt={siteConfig.name} className="h-7" />
            </Link>
            <p className="text-muted text-sm">{t('footer.tagline')}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t('footer.contact')}
            </h3>
            <div className="space-y-2 text-muted text-sm">
              <p>{siteConfig.contact.address}</p>
              <p>{siteConfig.contact.email}</p>
              {siteConfig.contact.phone && <p>{siteConfig.contact.phone}</p>}
            </div>
          </div>

          {/* Social */}
          {activeSocialLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                {t('footer.follow')}
              </h3>
              <div className="flex gap-4">
                {activeSocialLinks.map(([platform, url]) => {
                  const Icon =
                    socialIcons[platform as keyof typeof socialIcons]
                  if (!Icon) return null

                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                      aria-label={platform}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-default">
          <p className="text-muted text-sm text-center opacity-70">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
