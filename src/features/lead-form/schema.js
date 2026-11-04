import { z } from "zod";

// Forma maydonlari (backend: docs/API_CONTRACT.md §8 «POST /api/public/leads»).
// Xato xabarlari — i18n kalitlari; FormField ularni useT() bilan tarjima qiladi.
export const leadSchema = z.object({
  name: z.string().trim().min(2, "lead.errors.name").max(80, "lead.errors.name"),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => /^998\d{9}$/.test(v), "lead.errors.phone"),
  solutionId: z.string().uuid().optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional(),
  website: z.string().optional(), // honeypot — yashirin input, bo'sh qolishi kerak
});

/**
 * Backend'ga yuboriladigan to'liq ariza.
 * formStartedAt — forma OCHILGAN vaqt (birinchi render), yuborilgan vaqt emas: backend 2 soniyadan
 * tez yuborilgan arizani spam deb hisoblaydi. Honeypot to'ldirilgan bo'lsa ham backend 201 qaytaradi,
 * lekin Telegram'ga yubormaydi — shuning uchun frontendda alohida tekshirish shart emas.
 * @param {z.output<typeof leadSchema>} values
 * @param {{ formStartedAt: number, pagePath: string, locale: string, utm?: object }} context
 */
export const buildLeadPayload = (values, context) => ({
  name: values.name,
  phone: values.phone,
  ...(values.solutionId ? { solutionId: values.solutionId } : {}),
  ...(values.message ? { message: values.message } : {}),
  website: values.website ?? "",
  pagePath: context.pagePath.slice(0, 300),
  locale: context.locale,
  ...(context.utm ? { utm: context.utm } : {}),
  formStartedAt: context.formStartedAt,
});
