import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// Public javob: tarjima maydonlari oddiy string (?lang=). Admin javob: { uz, "uz-Cyrl", ru }.

export const getPartners = (lang, filters) => api("/api/public/partners" + toQuery({ lang, ...filters }));

export const getPartnersAdmin = () => api("/api/admin/partners");
export const getPartnerAdmin = (id) => api(`/api/admin/partners/${id}`);
export const createPartner = (body) => api("/api/admin/partners", { method: "POST", body });
export const updatePartner = (id, body) => api(`/api/admin/partners/${id}`, { method: "PATCH", body });
export const deletePartner = (id) => api(`/api/admin/partners/${id}`, { method: "DELETE" });
export const reorderPartners = (ids) =>
  api("/api/admin/partners/reorder", { method: "PATCH", body: { ids } });
