import { z } from "zod";

// Admin formasi sxemasi. TODO: maydonlarni Figma va backend bilan solishtiring
export const partnerSchema = z.object({
  name: z.string().trim().min(1),
  logoId: z.string(),
  url: z.string().url().optional(),
  published: z.boolean(),
});
