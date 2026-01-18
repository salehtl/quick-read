import { motion } from 'framer-motion'
import { Zap, Shield, Sparkles, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

// Define your features here or pull from translations
const features: { icon: LucideIcon; key: string }[] = [
  { icon: Zap, key: 'feature1' },
  { icon: Shield, key: 'feature2' },
  { icon: Sparkles, key: 'feature3' },
]

export function FeatureSection() {
  const { t } = useLanguage()

  return (
    <section id="features" className="section bg-surface-elevated">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold mb-4"
          >
            {t('features.subtitle')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            {t('features.title')}
          </motion.h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-8 text-center hover:border-accent/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 text-accent mb-6">
                  <Icon size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="text-muted">
                  {t(`features.${feature.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
