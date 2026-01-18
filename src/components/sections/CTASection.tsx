import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-16 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto mb-8">
            {t('cta.description')}
          </p>
          <a href="#contact" className="btn-primary inline-block">
            {t('cta.button')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
