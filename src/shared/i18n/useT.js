import { useCallback } from "react";
import { useLocale } from "./useLocale";
import uz from "./dictionaries/uz.json";
import uzCyrl from "./dictionaries/uz-Cyrl.json";
import ru from "./dictionaries/ru.json";

const DICTIONARIES = { uz, "uz-Cyrl": uzCyrl, ru };
const get = (obj, key) => key.split(".").reduce((o, k) => o?.[k], obj);
const lookup = (lang, key) => get(DICTIONARIES[lang], key) ?? get(DICTIONARIES.uz, key);

const fill = (text, vars) =>
  vars ? text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? vars[name] : match)) : text;

/**
 * UI matnlari: t("lead.submit"). Topilmasa — uz, keyin kalitning o'zi.
 * O'zgaruvchilar: t("lead.success.title", { name: "Aziz" }) → "Rahmat, Aziz!" (lug'atda "Rahmat, {name}!")
 */
export function useT() {
  const lang = useLocale();
  return useCallback((key, vars) => fill(lookup(lang, key) ?? key, vars), [lang]);
}

/**
 * Lug'atdagi massiv yoki obyekt (statik kontent: hero slaydlar, bosqichlar, kartalar).
 *   const slides = useMessages("home.hero.slides");   // [{ title, accent, text, ... }]
 * Tanlangan tilda bo'lmasa — uz versiyasi.
 * @template T
 * @param {string} key
 * @param {T} [fallback]
 * @returns {T}
 */
export function useMessages(key, fallback) {
  const lang = useLocale();
  return lookup(lang, key) ?? fallback;
}
