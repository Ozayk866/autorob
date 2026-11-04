import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// Sozlamalar — kontrakt §8 `GET /api/public/settings`, §10 «Sozlamalar»

/**
 * @typedef {{ phone: string, telegram: string, email: string, address: string, workHours: string,
 *   map: { lat: number, lng: number } | null, socials: Record<string, string>,
 *   analytics: { gaId: string | null, metrikaId: string | null, metaPixelId: string | null } }} PublicSettings
 * phone — "+998 90 123 45 67", telegram — "@autorob_uz", socials — { instagram: "https://..." }
 */

/** @returns {Promise<PublicSettings>} */
export const getSettings = (lang) => api("/api/public/settings" + toQuery({ lang }));

export const getSettingsAdmin = () => api("/api/admin/settings");
/** PUT — barcha maydonlar majburiy (to'liq almashtirish) */
export const updateSettings = (body) => api("/api/admin/settings", { method: "PUT", body });
