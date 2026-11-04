import { localizePath } from "@/shared/i18n/locales";

/** @typedef {import("@/shared/i18n/locales").Locale} Locale */

// Yo'l konstantalari. widgets va features ham ishlatadi, shuning uchun shared'da turadi.
export const routes = {
  home: (/** @type {Locale} */ lang) => localizePath("/", lang),
  solutions: (lang, soha) =>
    localizePath(`/yechimlar${soha ? `?soha=${encodeURIComponent(soha)}` : ""}`, lang),
  solution: (slug, lang) => localizePath(`/yechimlar/${slug}`, lang),
  about: (lang) => localizePath("/biz-haqimizda", lang),
  blog: (lang) => localizePath("/blog", lang),
  post: (slug, lang) => localizePath(`/blog/${slug}`, lang),
  faq: (lang) => localizePath("/faq", lang),
  contacts: (lang) => localizePath("/kontaktlar", lang),
  privacy: (lang) => localizePath("/maxfiylik", lang),

  admin: {
    root: "/admin",
    login: "/admin/login",
    changePassword: "/admin/change-password",
    solutions: "/admin/solutions",
    solutionNew: "/admin/solutions/new",
    solution: (id) => `/admin/solutions/${id}`,
    hero: "/admin/hero",
    posts: "/admin/posts",
    postNew: "/admin/posts/new",
    post: (id) => `/admin/posts/${id}`,
    faq: "/admin/faq",
    team: "/admin/team",
    partners: "/admin/partners",
    about: "/admin/about",
    texts: "/admin/texts",
    settings: "/admin/settings",
    admins: "/admin/admins",
  },
};

/** Prerender va sitemap uchun statik public yo'llar (tilsiz) */
export const STATIC_SITE_PATHS = [
  "/",
  "/yechimlar",
  "/biz-haqimizda",
  "/blog",
  "/faq",
  "/kontaktlar",
  "/maxfiylik",
];
