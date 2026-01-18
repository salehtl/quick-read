import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  image?: string
  type?: 'website' | 'product'
}

const BASE_URL = 'https://www.souomoto.ae'
const DEFAULT_IMAGE = `${BASE_URL}/meta-media/open-graph.png`

export function useSEO({ title, description, canonical, image, type = 'website' }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Helper to update or create meta tag
    const setMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        const [attr, value] = selector.replace(/[[\]"]/g, '').split('=')
        element.setAttribute(attr, value)
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    }

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (element) {
        element.setAttribute('href', href)
      } else {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        element.setAttribute('href', href)
        document.head.appendChild(element)
      }
    }

    // Basic meta tags
    setMetaTag('meta[name="title"]', title)
    setMetaTag('meta[name="description"]', description)

    // Canonical URL
    if (canonical) {
      setLinkTag('canonical', `${BASE_URL}${canonical}`)
    }

    // Open Graph
    setMetaTag('meta[property="og:title"]', title)
    setMetaTag('meta[property="og:description"]', description)
    setMetaTag('meta[property="og:type"]', type)
    if (canonical) {
      setMetaTag('meta[property="og:url"]', `${BASE_URL}${canonical}`)
    }
    if (image) {
      setMetaTag('meta[property="og:image"]', `${BASE_URL}${image}`)
    }

    // Twitter
    setMetaTag('meta[name="twitter:title"]', title)
    setMetaTag('meta[name="twitter:description"]', description)
    if (image) {
      setMetaTag('meta[name="twitter:image"]', `${BASE_URL}${image}`)
    }

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = 'SOUO Moto Dubai | Premium 8 cylinder 8 speed DCT Motorcycles in UAE'
      setMetaTag('meta[name="description"]', 'Experience the world\'s first 8 cylinder 8 speed DCT powered production motorcycles. SOUO Moto brings the legendary S2000 series to Dubai. Join our exclusive waitlist for priority access.')
      setLinkTag('canonical', BASE_URL + '/')
      setMetaTag('meta[property="og:url"]', BASE_URL + '/')
      setMetaTag('meta[property="og:image"]', DEFAULT_IMAGE)
      setMetaTag('meta[name="twitter:image"]', `${BASE_URL}/meta-media/twitter-card.png`)
    }
  }, [title, description, canonical, image, type])
}
