import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Minimum 3 caractères')
      .max(20, 'Maximum 20 caractères')
      .regex(/^[a-zA-Z0-9_]+$/, 'Lettres, chiffres et _ uniquement'),
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Minimum 8 caractères'),
    confirmPassword: z.string().min(1, 'Confirmation requise'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export type TLoginForm = z.infer<typeof loginSchema>
export type TRegisterForm = z.infer<typeof registerSchema>
