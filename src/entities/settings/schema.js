import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin sozlamalar formasi — kontrakt §10 «Sozlamalar» (PUT, hamma maydon majburiy)
export const settingsSchema = z.object({
  phone: z.string().trim().max(50),
  telegram: z.string().trim().max(100),
  email: z.union([z.string().email(), z.literal("")]),
  address: localizedText(),
  workHours: localizedText(),
  mapLat: z.number().min(-90).max(90).nullable(),
  mapLng: z.number().min(-180).max(180).nullable(),
  socials: z.record(
    z.string().regex(/^[a-z0-9_]{1,30}$/),
    z
      .string()
      .regex(/^https?:\/\//)
      .max(300),
  ),
  gaId: z.string().max(50).nullable(),
  metrikaId: z.string().max(50).nullable(),
  metaPixelId: z.string().max(50).nullable(),
});
