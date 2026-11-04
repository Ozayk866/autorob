import { LOCALES, localizePath } from "@/shared/i18n";
import { STATIC_SITE_PATHS } from "@/shared/config";
import { getSolutions } from "@/entities/solution";
import { getPosts } from "@/entities/post";

const PAGE_SIZE = 100; // backend chegarasi

async function getAllPostSlugs() {
  const slugs = [];
  for (let page = 1; ; page++) {
    const { data, meta } = await getPosts("uz", { page, pageSize: PAGE_SIZE });
    slugs.push(...data.map((p) => p.slug));
    if (page * PAGE_SIZE >= meta.total) return slugs;
  }
}

/**
 * Prerender qilinadigan barcha yo'llar, 3 tilda. Slug'lar build vaqtida API'dan olinadi (alohida «slugs»
 * endpoint yo'q — ro'yxatlardan). API ishlamasa, faqat statik sahifalar yaratiladi (ogohlantirish bilan).
 */
export async function getPrerenderPaths() {
  let dynamic = [];
  try {
    const [solutions, postSlugs] = await Promise.all([getSolutions("uz"), getAllPostSlugs()]);
    dynamic = [...solutions.map((s) => `/yechimlar/${s.slug}`), ...postSlugs.map((s) => `/blog/${s}`)];
  } catch (e) {
    console.warn(`[prerender] slug'lar olinmadi (${e.message}) — faqat statik sahifalar yaratiladi`);
  }
  return LOCALES.flatMap((lang) => [...STATIC_SITE_PATHS, ...dynamic].map((p) => localizePath(p, lang)));
}
