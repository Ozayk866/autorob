import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { adminResource, api, createAdminHooks } from "@/shared/api";
import { localizedText } from "@/shared/i18n";
import { toQuery } from "@/shared/lib";

// Jamoa — kontrakt §8 `GET /api/public/team`, §10 «Jamoa»

/** @typedef {{ id: string, name: string, role: string, photo: import("@/shared/api/types").Image | null }} TeamMember */

/** @returns {Promise<TeamMember[]>} */
export const getTeam = (lang) => api("/api/public/team" + toQuery({ lang }));

export const teamKeys = { all: ["team"], list: (lang) => ["team", "list", lang] };
export const useTeam = (lang) => useQuery({ queryKey: teamKeys.list(lang), queryFn: () => getTeam(lang) });

export const teamAdmin = createAdminHooks(adminResource("team"), teamKeys.all);

export const teamMemberSchema = z.object({
  name: localizedText(true),
  role: localizedText(true),
  photoId: z.string().uuid().nullable().optional(),
  isActive: z.boolean(),
});
