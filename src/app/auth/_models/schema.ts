import { z } from "zod"

export const passwordSchema = z.object({
  email: z.string().min(5, "Минимум 5 символов").email("Введите E-Mail"),
  password: z.string().min(6, "Минимум 6 символов"),
})

export type PasswordSchemaType = z.infer<typeof passwordSchema>
