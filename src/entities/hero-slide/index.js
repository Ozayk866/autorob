import { z } from "zod";
import { adminResource, createAdminHooks } from "@/shared/api";
import { localizedText } from "@/shared/i18n";

// Hero slaydlar — kontrakt §10 «Hero slaydlar».
// ⚠️ Saytdagi hero slayder hozircha STATIK (matnlar — shared/i18n/dictionaries → hero.slides).
// Backend'da API bor, admin paneldan boshqarish kerak bo'lsa — shu entity ishlatiladi.

export const heroSlideAdmin = createAdminHooks(adminResource("hero-slides"), ["hero-slides"]);

const cta = z.object({
  label: localizedText(true),
  href: z
    .string()
    .regex(/^(\/|#|https?:\/\/)/)
    .max(300),
});

export const heroSlideSchema = z.object({
  title: localizedText(true),
  accentWord: localizedText(true), // har tilda title ichida bo'lishi shart (server tekshiradi)
  text: localizedText(true),
  primaryCta: cta,
  secondaryCta: cta.nullable().optional(),
  backgroundImageId: z.string().uuid().nullable().optional(),
  mobileImageId: z.string().uuid().nullable().optional(),
  durationSec: z.number().int().min(2).max(30),
  isActive: z.boolean(),
});
