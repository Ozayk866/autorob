// Backend sozlamalari (entities/settings) kelguncha yoki bo'sh bo'lsa ishlatiladigan qiymatlar.
// Tilga bog'liq matnlar (manzil, ish vaqti) — shared/i18n/dictionaries → contacts.*
// TODO: haqiqiy telefon va Telegram bilan almashtirish
export const SITE_CONTACTS = {
  phone: "998000000000", // faqat raqamlar; ko'rinishi shared/lib/phone formatPhone bilan
  telegram: "autorob_uz", // @ siz
};

/** Footer'dagi «Yechimlar» ustuni: katalog filtri (?soha=) slug'lari, nomlari — solutionCategories.* */
export const SOLUTION_CATEGORIES = ["crm", "erp", "robotlar", "stanoklar"];
