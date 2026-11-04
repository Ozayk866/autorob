import { routes } from "@/shared/config";

// label va group — i18n kalitlari (shared/i18n/dictionaries/uz.json → nav.*)
export const adminNav = [
  { group: "nav.main", items: [{ to: routes.admin.root, label: "nav.dashboard", icon: "dash", end: true }] },
  {
    group: "nav.content",
    items: [
      { to: routes.admin.hero, label: "nav.hero", icon: "slides" },
      { to: routes.admin.solutions, label: "nav.solutions", icon: "box" },
      { to: routes.admin.posts, label: "nav.posts", icon: "book" },
      { to: routes.admin.faq, label: "nav.faq", icon: "list" },
      { to: routes.admin.team, label: "nav.team", icon: "users" },
      { to: routes.admin.partners, label: "nav.partners", icon: "award" },
      { to: routes.admin.about, label: "nav.aboutContent", icon: "chart" },
      { to: routes.admin.texts, label: "nav.texts", icon: "home" },
    ],
  },
  {
    group: "nav.system",
    items: [
      { to: routes.admin.settings, label: "nav.settings", icon: "settings" },
      { to: routes.admin.admins, label: "nav.admins", icon: "lock" },
    ],
  },
];
