import { adminResource, api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// Backend: docs/API_CONTRACT.md §8 (public), §10 «Yechimlar» (admin)

/** @typedef {"service" | "education" | "manufacturing"} SolutionCategory  so'rovda kichik harf, javobda KATTA */
/** @typedef {import("@/shared/api/types").Image} Image */
/**
 * @typedef {{ id: string, slug: string, title: string, shortDescription: string,
 *   categories: ("SERVICE" | "EDUCATION" | "MANUFACTURING")[], coverImage: Image | null }} SolutionListItem
 */
/**
 * @typedef {SolutionListItem & { body: string, features: string[], showPriceRequest: boolean,
 *   priceText: string | null, seo: { metaTitle: string | null, metaDescription: string | null },
 *   faq: { id: string, question: string, answer: string }[], related: SolutionListItem[], updatedAt: string }} Solution
 * body — tozalangan HTML
 */

/** @returns {Promise<SolutionListItem[]>} hammasi birdaniga (sahifalashsiz) */
export const getSolutions = (lang, { category } = {}) =>
  api("/api/public/solutions" + toQuery({ lang, category }));

/** @returns {Promise<Solution>} topilmasa ApiError 404 */
export const getSolution = (slug, lang) => api(`/api/public/solutions/${slug}` + toQuery({ lang }));

export const solutionsAdminApi = adminResource("solutions");
