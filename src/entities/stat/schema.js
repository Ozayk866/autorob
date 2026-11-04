import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin formasi sxemasi. TODO: maydonlarni Figma va backend bilan solishtiring
export const statSchema = z.object({
  value: z.string().trim().min(1), // "120+"
  label: localizedText(true),
});
