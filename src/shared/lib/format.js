import { HTML_LANG } from "@/shared/i18n/locales";

/** @param {string | Date} date @param {import("@/shared/i18n/locales").Locale} lang */
export const formatDate = (date, lang) =>
  new Intl.DateTimeFormat(HTML_LANG[lang], { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date),
  );

/** 1250000 → "1 250 000" */
export const formatNumber = (value, lang) => new Intl.NumberFormat(HTML_LANG[lang]).format(value);
