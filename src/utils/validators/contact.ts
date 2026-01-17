import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "El nombre es demasiado corto"),
    email: z.string().email("Email inválido"),
    message: z.string().min(10, "Cuéntame un poco más (min 10 caracteres)"),
});

export type ContactFormData = z.infer<typeof contactSchema>;