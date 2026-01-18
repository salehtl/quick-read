/**
 * Site Configuration
 *
 * Centralized configuration for your site's branding, contact info, and navigation.
 * Update these values to customize your site, or run `npm run setup` to do it interactively.
 */

export const siteConfig = {
  // Brand
  name: 'Your Brand',
  tagline: 'Your tagline here',
  description: 'Your site description for SEO and meta tags',
  domain: 'https://yourdomain.com',

  // Social links (leave empty string if not applicable)
  social: {
    instagram: '' as string,
    twitter: '' as string,
    linkedin: '' as string,
    facebook: '' as string,
    youtube: '' as string,
    tiktok: '' as string,
  },

  // Contact information
  contact: {
    email: 'hello@yourdomain.com',
    phone: '+971 XX XXX XXXX',
    address: 'Dubai, UAE',
  },

  // Theme colors (must match values in globals.css)
  colors: {
    accent: '#3b82f6',
    accentLight: '#60a5fa',
    accentDark: '#2563eb',
  },

  // Navigation items
  // key: translation key in locales files (nav.{key})
  // href: route path or anchor
  nav: [
    { key: 'home', href: '/' },
    { key: 'about', href: '#about' },
    { key: 'features', href: '#features' },
    { key: 'contact', href: '#contact' },
  ],

  // Footer navigation sections
  footerNav: {
    company: [
      { key: 'about', href: '#about' },
      { key: 'contact', href: '#contact' },
    ],
    legal: [
      { key: 'privacy', href: '/privacy' },
      { key: 'terms', href: '/terms' },
    ],
  },
} as const

export type SiteConfig = typeof siteConfig
