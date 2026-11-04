import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang

/** Public: telefon, email, manzil, ijtimoiy tarmoqlar, ish vaqti */
export const getSettings = (lang) => api("/api/public/settings" + toQuery({ lang }));
/** Admin: + Telegram bot sozlamalari (token javobda yashirilgan bo'ladi) */
export const getSettingsAdmin = () => api("/api/admin/settings");
export const updateSettings = (body) => api("/api/admin/settings", { method: "PATCH", body });
export const getTelegramStatus = () => api("/api/admin/settings/telegram/status");
export const sendTelegramTest = () => api("/api/admin/settings/telegram/test", { method: "POST" });
