import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// Public javob: tarjima maydonlari oddiy string (?lang=). Admin javob: { uz, "uz-Cyrl", ru }.

export const getStats = (lang, filters) => api("/api/public/stats" + toQuery({ lang, ...filters }));

export const getStatsAdmin = () => api("/api/admin/stats");
export const getStatAdmin = (id) => api(`/api/admin/stats/${id}`);
export const createStat = (body) => api("/api/admin/stats", { method: "POST", body });
export const updateStat = (id, body) => api(`/api/admin/stats/${id}`, { method: "PATCH", body });
export const deleteStat = (id) => api(`/api/admin/stats/${id}`, { method: "DELETE" });
export const reorderStats = (ids) => api("/api/admin/stats/reorder", { method: "PATCH", body: { ids } });
