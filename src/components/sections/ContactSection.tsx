import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Check, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactSection() {
  const { t } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null)

    try {
      // TODO: Implement your form submission logic here
      // Example: Send to Supabase, API endpoint, or email service
      console.log('Form submitted:', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      reset()
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold mb-4"
          >
            {t('contact.subtitle')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            {t('contact.title')}
          </motion.h2>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-lg p-8"
        >
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                <Check size={32} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {t('contact.success.title')}
              </h3>
              <p className="text-muted">{t('contact.success.message')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label={t('contact.form.name')}
                placeholder={t('contact.form.namePlaceholder')}
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label={t('contact.form.email')}
                type="email"
                placeholder={t('contact.form.emailPlaceholder')}
                error={errors.email?.message}
                {...register('email')}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={4}
                  className={cn(
                    'w-full px-4 py-3 bg-subtle border border-default rounded-lg',
                    'text-foreground placeholder:text-muted',
                    'focus:outline-none focus:border-accent transition-colors',
                    'resize-none',
                    errors.message && 'border-red-500'
                  )}
                  {...register('message')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {submitError}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? t('contact.form.submitting')
                  : t('contact.form.submit')}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
