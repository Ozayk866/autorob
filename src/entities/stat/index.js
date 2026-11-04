import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { adminResource, api, createAdminHooks } from "@/shared/api";
import { localizedText } from "@/shared/i18n";
import { toQuery } from "@/shared/lib";

// Raqamlar («120+ bajarilgan loyiha») — kontrakt §8 `GET /api/public/stats`, §10 «Raqamlar»

/** @returns {Promise<{ id: string, value: string, label: string }[]>}  value — qator ("120+", "24/7"), son emas */
export const getStats = (lang) => api("/api/public/stats" + toQuery({ lang }));

export const statKeys = { all: ["stats"], list: (lang) => ["stats", "list", lang] };
export const useStats = (lang) => useQuery({ queryKey: statKeys.list(lang), queryFn: () => getStats(lang) });

export const statAdmin = createAdminHooks(adminResource("stats"), statKeys.all);

export const statSchema = z.object({
  value: z.string().trim().min(1).max(20),
  label: localizedText(true),
});
