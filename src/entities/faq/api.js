import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// Public javob: tarjima maydonlari oddiy string (?lang=). Admin javob: { uz, "uz-Cyrl", ru }.

export const getFaqItems = (lang, filters) => api("/api/public/faq" + toQuery({ lang, ...filters }));

export const getFaqItemsAdmin = () => api("/api/admin/faq");
export const getFaqItemAdmin = (id) => api(`/api/admin/faq/${id}`);
export const createFaqItem = (body) => api("/api/admin/faq", { method: "POST", body });
export const updateFaqItem = (id, body) => api(`/api/admin/faq/${id}`, { method: "PATCH", body });
export const deleteFaqItem = (id) => api(`/api/admin/faq/${id}`, { method: "DELETE" });
export const reorderFaqItems = (ids) => api("/api/admin/faq/reorder", { method: "PATCH", body: { ids } });
