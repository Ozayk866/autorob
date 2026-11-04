import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// Public javob: tarjima maydonlari oddiy string (?lang=). Admin javob: { uz, "uz-Cyrl", ru }.

export const getHeroSlides = (lang, filters) =>
  api("/api/public/hero-slides" + toQuery({ lang, ...filters }));

export const getHeroSlidesAdmin = () => api("/api/admin/hero-slides");
export const getHeroSlideAdmin = (id) => api(`/api/admin/hero-slides/${id}`);
export const createHeroSlide = (body) => api("/api/admin/hero-slides", { method: "POST", body });
export const updateHeroSlide = (id, body) => api(`/api/admin/hero-slides/${id}`, { method: "PATCH", body });
export const deleteHeroSlide = (id) => api(`/api/admin/hero-slides/${id}`, { method: "DELETE" });
export const reorderHeroSlides = (ids) =>
  api("/api/admin/hero-slides/reorder", { method: "PATCH", body: { ids } });
