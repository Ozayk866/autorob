import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin formasi sxemasi. TODO: maydonlarni Figma va backend bilan solishtiring
export const teamMemberSchema = z.object({
  name: localizedText(true),
  role: localizedText(),
  photoId: z.string().optional(),
  published: z.boolean(),
});
