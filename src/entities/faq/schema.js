import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin formasi sxemasi. TODO: maydonlarni Figma va backend bilan solishtiring
export const faqItemSchema = z.object({
  category: z.string(),
  question: localizedText(true),
  answer: localizedText(true),
  published: z.boolean(),
});
