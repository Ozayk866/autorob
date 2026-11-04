import { LOCALES, localizePath } from "@/shared/i18n";
import { STATIC_SITE_PATHS } from "@/shared/config";
import { getSolutionSlugs } from "@/entities/solution";
import { getPostSlugs } from "@/entities/post";

/**
 * Prerender qilinadigan barcha yo'llar, 3 tilda. Slug'lar build vaqtida API'dan olinadi;
 * API ishlamasa, faqat statik sahifalar yaratiladi (ogohlantirish bilan).
 */
export async function getPrerenderPaths() {
  let dynamic = [];
  try {
    const [solutions, posts] = await Promise.all([getSolutionSlugs(), getPostSlugs()]);
    dynamic = [...solutions.map((s) => `/yechimlar/${s}`), ...posts.map((s) => `/blog/${s}`)];
  } catch (e) {
    console.warn(`[prerender] slug'lar olinmadi (${e.message}) — faqat statik sahifalar yaratiladi`);
  }
  return LOCALES.flatMap((lang) => [...STATIC_SITE_PATHS, ...dynamic].map((p) => localizePath(p, lang)));
}
