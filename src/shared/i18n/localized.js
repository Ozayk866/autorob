import { z } from "zod";

/** @typedef {import("./locales").Locale} Locale */
/** @typedef {{ uz: string, "uz-Cyrl"?: string, ru?: string }} LocalizedText */

/** @param {LocalizedText | undefined} text @param {Locale} lang */
export const pick = (text, lang) => text?.[lang]?.trim() || text?.uz || "";

/**
 * Admin formalari uchun zod sxemasi: { uz, "uz-Cyrl", ru }. uz — asosiy til.
 * @param {boolean} [required]  true bo'lsa uz majburiy
 */
export const localizedText = (required = false) =>
  z.object({
    uz: required ? z.string().trim().min(1, "form.required") : z.string().trim().optional().default(""),
    "uz-Cyrl": z.string().trim().optional().default(""),
    ru: z.string().trim().optional().default(""),
  });
