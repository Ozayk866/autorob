import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin formasi sxemasi. TODO: maydonlarni Figma va backend bilan solishtiring
export const milestoneSchema = z.object({
  year: z.number().int(),
  title: localizedText(true),
  description: localizedText(),
});
