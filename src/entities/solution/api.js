import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// Public javob: tarjima maydonlari oddiy string (?lang=). Admin javob: { uz, "uz-Cyrl", ru }.

export const getSolutions = (lang, filters) => api("/api/public/solutions" + toQuery({ lang, ...filters }));
export const getSolution = (slug, lang) => api(`/api/public/solutions/${slug}${toQuery({ lang })}`);
/** Prerender uchun: barcha nashr qilingan slug'lar */
export const getSolutionSlugs = () => api("/api/public/solutions/slugs");

export const getSolutionsAdmin = () => api("/api/admin/solutions");
export const getSolutionAdmin = (id) => api(`/api/admin/solutions/${id}`);
export const createSolution = (body) => api("/api/admin/solutions", { method: "POST", body });
export const updateSolution = (id, body) => api(`/api/admin/solutions/${id}`, { method: "PATCH", body });
export const deleteSolution = (id) => api(`/api/admin/solutions/${id}`, { method: "DELETE" });
export const reorderSolutions = (ids) =>
  api("/api/admin/solutions/reorder", { method: "PATCH", body: { ids } });
