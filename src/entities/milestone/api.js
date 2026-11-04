import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// Public javob: tarjima maydonlari oddiy string (?lang=). Admin javob: { uz, "uz-Cyrl", ru }.

export const getMilestones = (lang, filters) => api("/api/public/milestones" + toQuery({ lang, ...filters }));

export const getMilestonesAdmin = () => api("/api/admin/milestones");
export const getMilestoneAdmin = (id) => api(`/api/admin/milestones/${id}`);
export const createMilestone = (body) => api("/api/admin/milestones", { method: "POST", body });
export const updateMilestone = (id, body) => api(`/api/admin/milestones/${id}`, { method: "PATCH", body });
export const deleteMilestone = (id) => api(`/api/admin/milestones/${id}`, { method: "DELETE" });
export const reorderMilestones = (ids) =>
  api("/api/admin/milestones/reorder", { method: "PATCH", body: { ids } });
