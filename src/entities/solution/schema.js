import { z } from "zod";
import { localizedText } from "@/shared/i18n";

export const SOLUTION_CATEGORIES = ["SERVICE", "EDUCATION", "MANUFACTURING"];

// Admin formasi (POST/PATCH body) — kontrakt §10 «Yechimlar»
export const solutionSchema = z.object({
  title: localizedText(true),
  shortDescription: localizedText(true),
  body: localizedText(true), // HTML
  slug: z
    .string()
    .regex(/^[a-z0-9-]*$/, "form.slug")
    .max(120)
    .optional(),
  features: z.array(localizedText(true)).max(30),
  categories: z.array(z.enum(SOLUTION_CATEGORIES)).max(3),
  coverImageId: z.string().uuid().nullable().optional(),
  showPriceRequest: z.boolean(),
  priceText: localizedText().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  seo: z.object({ metaTitle: localizedText().optional(), metaDescription: localizedText().optional() }),
});
