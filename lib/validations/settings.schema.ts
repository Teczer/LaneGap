import { z } from 'zod'

export const nameSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50, 'Name must be 50 characters or less'),
})

export type TNameFormData = z.infer<typeof nameSchema>

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type TPasswordFormData = z.infer<typeof passwordSchema>

export const deleteAccountSchema = z.object({
  confirmText: z
    .string()
    .refine((val) => val === 'DELETE', { message: 'Please type DELETE to confirm' }),
})

export type TDeleteAccountFormData = z.infer<typeof deleteAccountSchema>

