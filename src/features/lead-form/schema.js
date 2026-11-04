import { z } from "zod";

// Xato xabarlari — i18n kalitlari; FormField ularni useT() bilan tarjima qiladi
export const leadSchema = z.object({
  name: z.string().trim().min(2, "lead.errors.name").max(80, "lead.errors.name"),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => /^998\d{9}$/.test(v), "lead.errors.phone"),
  solutionId: z.string().optional(),
  website: z.string().optional(), // honeypot: sxema xato bermaydi, LeadForm isBot() bilan tekshiradi
});

/** Bot yashirin maydonni to'ldirganmi. To'ldirgan bo'lsa — jim «muvaffaqiyat», so'rov yuborilmaydi. */
export const isBot = (values) => Boolean(values.website);
