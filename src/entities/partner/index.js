import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { adminResource, api, createAdminHooks } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// Hamkorlar va sertifikatlar — kontrakt §8 `GET /api/public/partners`, §10 «Hamkorlar»

/**
 * @typedef {{ id: string, name: string, url: string | null, type: "PARTNER" | "CERTIFICATE",
 *   logo: import("@/shared/api/types").Image | null }} Partner   name tarjima qilinmaydi
 */

/**
 * @param {{ type?: "partner" | "certificate" }} [filters]
 * @returns {Promise<Partner[]>}
 */
export const getPartners = (lang, { type } = {}) => api("/api/public/partners" + toQuery({ lang, type }));

export const partnerKeys = {
  all: ["partners"],
  list: (lang, filters = {}) => ["partners", "list", lang, filters],
};
export const usePartners = (lang, filters) =>
  useQuery({ queryKey: partnerKeys.list(lang, filters), queryFn: () => getPartners(lang, filters) });

export const partnerAdmin = createAdminHooks(adminResource("partners"), partnerKeys.all);

export const partnerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  logoId: z.string().uuid().nullable().optional(),
  url: z
    .string()
    .regex(/^https?:\/\//)
    .max(300)
    .nullable()
    .optional(),
  type: z.enum(["PARTNER", "CERTIFICATE"]),
  isActive: z.boolean(),
});
