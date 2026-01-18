import { z } from 'zod'
import { supabase } from '@/lib/supabase'

/**
 * Sanitizes user input by removing potentially dangerous characters
 * and trimming whitespace
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script-related patterns
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
}

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .transform(sanitizeInput),
  email: z
    .string()
    .email('Please enter a valid email')
    .max(254, 'Email is too long')
    .transform((val) => sanitizeInput(val).toLowerCase()),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long')
    .transform(sanitizeInput),
  phone: z
    .string()
    .max(20)
    .transform(sanitizeInput)
    .optional()
    .or(z.literal('')),
})

export type ContactInput = z.infer<typeof contactSchema>

export interface ContactResponse {
  success: boolean
  message: string
}

export async function submitContact(data: ContactInput): Promise<ContactResponse> {
  const insertData: {
    name: string
    email: string
    message: string
    phone?: string
  } = {
    name: data.name,
    email: data.email,
    message: data.message,
  }

  // Only include phone if provided
  if (data.phone && data.phone.trim() !== '') {
    insertData.phone = data.phone
  }

  const { error } = await supabase.from('contacts').insert(insertData)

  if (error) {
    console.error('Contact form submission error:', error)
    throw new Error(error.message || 'Failed to submit')
  }

  return { success: true, message: 'Message sent successfully' }
}
