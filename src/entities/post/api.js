import { adminResource, api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// Backend: docs/API_CONTRACT.md §8 (public), §10 «Maqolalar» (admin)

/**
 * @typedef {{ id: string, slug: string, title: string, excerpt: string,
 *   coverImage: import("@/shared/api/types").Image | null,
 *   category: { slug: string, name: string }, authorName: string,
 *   publishedAt: string, readingMinutes: number }} PostListItem
 */
/**
 * @typedef {PostListItem & { body: string, seo: { metaTitle: string | null, metaDescription: string | null },
 *   related: PostListItem[], updatedAt: string }} Post   body — tozalangan HTML
 */
/** @typedef {import("@/shared/api/types").PageMeta} PageMeta */

/**
 * Sahifalangan, yangisi birinchi.
 * @param {{ category?: string, page?: number, pageSize?: number }} [filters]  category — blog kategoriyasi slug'i
 * @returns {Promise<{ data: PostListItem[], meta: PageMeta }>}
 */
export const getPosts = (lang, { category, page, pageSize } = {}) =>
  api("/api/public/posts" + toQuery({ lang, category, page, pageSize }), { withMeta: true });

/** @returns {Promise<Post>} topilmasa ApiError 404 */
export const getPost = (slug, lang) => api(`/api/public/posts/${slug}` + toQuery({ lang }));

/** Admin ro'yxat query: page, pageSize, status, categoryId, q */
export const postsAdminApi = adminResource("posts", { paginated: true });
