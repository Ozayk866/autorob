/** { lang: "ru", soha: undefined } → "?lang=ru" (bo'sh qiymatlar tashlab yuboriladi) */
export function toQuery(params = {}) {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "");
  return entries.length ? `?${new URLSearchParams(entries)}` : "";
}
