import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin formasi sxemasi. TODO: maydonlarni Figma va backend bilan solishtiring
export const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "form.slug"),
  title: localizedText(true),
  excerpt: localizedText(),
  body: localizedText(), // Markdown
  coverId: z.string().optional(),
  publishedAt: z.string().optional(),
  published: z.boolean(),
  seo: z.object({ title: localizedText(), description: localizedText() }),
});
