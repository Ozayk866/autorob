// Backend sozlamalari (entities/settings) kelguncha yoki bo'sh bo'lsa ishlatiladigan qiymatlar.
// Tilga bog'liq matnlar (manzil, ish vaqti) — shared/i18n/dictionaries → contacts.*
// TODO: haqiqiy telefon, Telegram va email bilan almashtirish
export const SITE_CONTACTS = {
  phone: "998000000000", // faqat raqamlar; ko'rinishi shared/lib/phone formatPhone bilan
  telegram: "autorob_uz", // @ siz
  email: "info@autorob.uz",
};

/**
 * Katalog filtri (`/yechimlar?soha=service`) — backend `GET /api/public/solutions?category=` qiymatlari bilan bir xil.
 * Nomlari: t(`solutionCategories.${value}`)
 */
export const CATALOG_CATEGORIES = ["service", "education", "manufacturing"];
