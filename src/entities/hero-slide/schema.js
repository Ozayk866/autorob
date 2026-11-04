import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin formasi sxemasi. TODO: maydonlarni Figma va backend bilan solishtiring
export const heroSlideSchema = z.object({
  title: localizedText(true),
  subtitle: localizedText(),
  ctaLabel: localizedText(),
  ctaHref: z.string().optional(),
  imageId: z.string(),
  published: z.boolean(),
});
