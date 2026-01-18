import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/utils/cn'

// Define your FAQ keys here
const faqKeys = ['q1', 'q2', 'q3']

export function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section bg-surface-elevated">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
        >
          {t('faq.title')}
        </motion.h2>

        {/* Accordion */}
        <div className="space-y-4">
          {faqKeys.map((key, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="font-semibold text-foreground pe-4">
                    {t(`faq.questions.${key}.question`)}
                  </span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      'text-muted transition-transform duration-200 shrink-0',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 text-muted">
                        {t(`faq.questions.${key}.answer`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
