import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// page — sahifa kaliti: "home", "about", "contacts" …; javob: { [textKey]: string } (public) yoki { [textKey]: LocalizedText } (admin)

export const getPageTexts = (page, lang) => api(`/api/public/page-texts/${page}${toQuery({ lang })}`);
export const getPageTextsAdmin = (page) => api(`/api/admin/page-texts/${page}`);
export const updatePageTexts = (page, body) => api(`/api/admin/page-texts/${page}`, { method: "PUT", body });
