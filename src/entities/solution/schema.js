import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin formasi sxemasi. TODO: maydonlarni Figma va backend bilan solishtiring
export const solutionSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "form.slug"),
  category: z.string(),
  title: localizedText(true),
  summary: localizedText(),
  body: localizedText(),
  features: z.array(z.object({ title: localizedText(true), text: localizedText() })),
  priceFrom: z.number().nonnegative().optional(),
  imageId: z.string().optional(),
  published: z.boolean(),
  seo: z.object({ title: localizedText(), description: localizedText() }),
});
