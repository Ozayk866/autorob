import { HTML_LANG } from "@/shared/i18n/locales";

// Brauzerlarda o'zbekcha oy nomlari yo'q yoki noto'g'ri ("2026 M10 18") — o'zimiz yozamiz
const UZ_MONTHS = {
  uz: [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ],
  "uz-Cyrl": [
    "январ",
    "феврал",
    "март",
    "апрел",
    "май",
    "июн",
    "июл",
    "август",
    "сентабр",
    "октабр",
    "ноябр",
    "декабр",
  ],
};

/**
 * "2026-10-12T00:00:00.000Z" → "12 oktabr 2026" / "12 октабр 2026" / "12 октября 2026 г."
 * Sana UTC bo'yicha olinadi (backend sanalari UTC yarim tun — mahalliy vaqtda kun siljimasin).
 * @param {string | Date} date @param {import("@/shared/i18n/locales").Locale} lang
 */
export function formatDate(date, lang) {
  const d = new Date(date);
  const months = UZ_MONTHS[lang];
  if (months) return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  return new Intl.DateTimeFormat(HTML_LANG[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/** 1250000 → "1 250 000" */
export const formatNumber = (value, lang) => new Intl.NumberFormat(HTML_LANG[lang]).format(value);
