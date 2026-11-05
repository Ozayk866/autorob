/** @typedef {"uz" | "uz-Cyrl" | "ru"} Locale */

/** @type {Locale[]} */
export const LOCALES = ["uz", "uz-Cyrl", "ru"];
export const DEFAULT_LOCALE = "uz";

/** URL prefikslari: uz — prefikssiz */
export const URL_PREFIX = { uz: "", "uz-Cyrl": "uz-cyrl", ru: "ru" };
const LOCALE_BY_PREFIX = { "uz-cyrl": "uz-Cyrl", ru: "ru" };

/** <html lang> va hreflang qiymatlari */
export const HTML_LANG = { uz: "uz-Latn", "uz-Cyrl": "uz-Cyrl", ru: "ru" };

/**
 * `:lang?` parametridan til. Parametr yo'q → uz. Noma'lum prefiks (shu jumladan "uz") → null.
 * @param {string | undefined} param
 * @returns {Locale | null}
 */
export const localeFromParam = (param) =>
  param === undefined ? DEFAULT_LOCALE : (LOCALE_BY_PREFIX[param] ?? null);

/** "/yechimlar", "ru" → "/ru/yechimlar"; "/", "uz" → "/" */
export function localizePath(path, lang) {
  const prefix = URL_PREFIX[lang];
  if (!prefix) return path;
  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
}

/** "/ru/yechimlar/crm" → "/yechimlar/crm" */
export function stripLocale(pathname) {
  const m = pathname.match(/^\/(ru|uz-cyrl)(?=\/|$)/);
  return m ? pathname.slice(m[0].length) || "/" : pathname;
}
