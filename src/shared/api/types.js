// Backend javoblaridagi umumiy shakllar (JSDoc). Import: /** @typedef {import("@/shared/api/types").Image} Image */

/**
 * Public rasm obyekti (kontrakt §3). Admin javobida qo'shimcha `id`, `alt` esa LocalizedText | null.
 * `variants` kalitlari — kenglik: "480", "1024", "1920" (asl rasmdan kattasi bo'lmaydi). `url` — eng katta variant.
 * @typedef {{ url: string, variants: Record<string, string>, width: number, height: number, alt: string }} Image
 */

/** Sahifalash (kontrakt §4). Sahifalar soni: Math.ceil(total / pageSize) @typedef {{ page: number, pageSize: number, total: number }} PageMeta */

/** "complete" | "partial" | "missing" har til uchun (faqat admin) @typedef {Record<"uz" | "uz-Cyrl" | "ru", "complete" | "partial" | "missing">} TranslationStatus */

export {};
