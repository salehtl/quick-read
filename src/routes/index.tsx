import { createFileRoute } from '@tanstack/react-router'
import { useSEO } from '@/hooks/useSEO'
import { useLanguage } from '@/hooks/useLanguage'
import { siteConfig } from '@/config/site'
import {
  HeroSection,
  FeatureSection,
  CTASection,
  FAQSection,
  ContactSection,
} from '@/components/sections'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { t } = useLanguage()

  useSEO({
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  })

  return (
    <>
      <HeroSection />

      <section id="about" className="section">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>
      </section>

      <FeatureSection />

      <CTASection />

      <FAQSection />

      <ContactSection />
    </>
  )
}
