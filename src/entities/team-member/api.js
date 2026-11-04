import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// Public javob: tarjima maydonlari oddiy string (?lang=). Admin javob: { uz, "uz-Cyrl", ru }.

export const getTeamMembers = (lang, filters) => api("/api/public/team" + toQuery({ lang, ...filters }));

export const getTeamMembersAdmin = () => api("/api/admin/team");
export const getTeamMemberAdmin = (id) => api(`/api/admin/team/${id}`);
export const createTeamMember = (body) => api("/api/admin/team", { method: "POST", body });
export const updateTeamMember = (id, body) => api(`/api/admin/team/${id}`, { method: "PATCH", body });
export const deleteTeamMember = (id) => api(`/api/admin/team/${id}`, { method: "DELETE" });
export const reorderTeamMembers = (ids) => api("/api/admin/team/reorder", { method: "PATCH", body: { ids } });
