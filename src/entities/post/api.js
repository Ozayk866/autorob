import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// TODO: endpoint'larni backend kontraktiga qarab moslang
// Public javob: tarjima maydonlari oddiy string (?lang=). Admin javob: { uz, "uz-Cyrl", ru }.

export const getPosts = (lang, filters) => api("/api/public/posts" + toQuery({ lang, ...filters }));
export const getPost = (slug, lang) => api(`/api/public/posts/${slug}${toQuery({ lang })}`);
/** Prerender uchun: barcha nashr qilingan slug'lar */
export const getPostSlugs = () => api("/api/public/posts/slugs");

export const getPostsAdmin = () => api("/api/admin/posts");
export const getPostAdmin = (id) => api(`/api/admin/posts/${id}`);
export const createPost = (body) => api("/api/admin/posts", { method: "POST", body });
export const updatePost = (id, body) => api(`/api/admin/posts/${id}`, { method: "PATCH", body });
export const deletePost = (id) => api(`/api/admin/posts/${id}`, { method: "DELETE" });
export const reorderPosts = (ids) => api("/api/admin/posts/reorder", { method: "PATCH", body: { ids } });
