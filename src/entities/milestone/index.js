import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { adminResource, api, createAdminHooks } from "@/shared/api";
import { localizedText } from "@/shared/i18n";
import { toQuery } from "@/shared/lib";

// Kompaniya tarixi — kontrakt §8 `GET /api/public/milestones`, §10 «Tarix»

/** @returns {Promise<{ id: string, year: number, title: string, text: string }[]>} */
export const getMilestones = (lang) => api("/api/public/milestones" + toQuery({ lang }));

export const milestoneKeys = { all: ["milestones"], list: (lang) => ["milestones", "list", lang] };
export const useMilestones = (lang) =>
  useQuery({ queryKey: milestoneKeys.list(lang), queryFn: () => getMilestones(lang) });

export const milestoneAdmin = createAdminHooks(adminResource("milestones"), milestoneKeys.all);

export const milestoneSchema = z.object({
  year: z.number().int().min(1900).max(2100),
  title: localizedText(true),
  text: localizedText(true),
});
