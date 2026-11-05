import { localizePath } from "./locales";

// Sahifa manzillari (tilga qarab: "/blog", "/ru/blog"). Havolalarda: <Link to={routes.blog(lang)}>
export const routes = {
  home: (lang) => localizePath("/", lang),
  solutions: (lang) => localizePath("/yechimlar", lang),
  solution: (slug, lang) => localizePath(`/yechimlar/${slug}`, lang),
  about: (lang) => localizePath("/biz-haqimizda", lang),
  blog: (lang) => localizePath("/blog", lang),
  post: (slug, lang) => localizePath(`/blog/${slug}`, lang),
  faq: (lang) => localizePath("/faq", lang),
  contacts: (lang) => localizePath("/kontaktlar", lang),
  privacy: (lang) => localizePath("/maxfiylik", lang),
};
