import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// TODO: maydonlarni Figma va backend bilan solishtiring
export const settingsSchema = z.object({
  phone: z.string().regex(/^998\d{9}$/, "lead.errors.phone"),
  email: z.string().email().optional(),
  address: localizedText(),
  workHours: localizedText(),
  telegram: z.object({
    botToken: z.string().optional(), // bo'sh qoldirilsa — eski token o'zgarmaydi
    chatId: z.string().optional(),
  }),
});
