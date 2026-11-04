import { env } from "@/shared/config/env";

/**
 * Analitika hodisasi. Shaxsiy ma'lumot (ism, telefon) hech qachon yuborilmaydi.
 * @param {"lead_submitted" | "lead_modal_opened" | "locale_changed"} event
 * @param {Record<string, string | number>} [params]
 */
export function track(event, params) {
  if (!env.VITE_GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
