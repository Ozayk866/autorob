import { createBrowserRouter, RouterProvider } from "react-router";
import { LocaleProvider } from "@/i18n";
import { SiteLayout } from "@/components";
import { HomePage } from "@/pages/Home/HomePage";
import { SolutionsPage } from "@/pages/Solutions/SolutionsPage";
import { SolutionPage } from "@/pages/Solution/SolutionPage";
import { AboutPage } from "@/pages/About/AboutPage";
import { BlogPage } from "@/pages/Blog/BlogPage";
import { PostPage } from "@/pages/Post/PostPage";
import { FaqPage } from "@/pages/Faq/FaqPage";
import { ContactsPage } from "@/pages/Contacts/ContactsPage";
import { PrivacyPage } from "@/pages/Privacy/PrivacyPage";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";

// Sahifalar. Til manzilning boshida: "/blog" (o'zbekcha), "/ru/blog", "/uz-cyrl/blog"
const pages = [
  { index: true, element: <HomePage /> },
  { path: "yechimlar", element: <SolutionsPage /> },
  { path: "yechimlar/:slug", element: <SolutionPage /> },
  { path: "biz-haqimizda", element: <AboutPage /> },
  { path: "blog", element: <BlogPage /> },
  { path: "blog/:slug", element: <PostPage /> },
  { path: "faq", element: <FaqPage /> },
  { path: "kontaktlar", element: <ContactsPage /> },
  { path: "maxfiylik", element: <PrivacyPage /> },
  { path: "*", element: <NotFoundPage /> },
];

const layout = (
  <LocaleProvider>
    <SiteLayout />
  </LocaleProvider>
);

const router = createBrowserRouter([
  { path: "/ru", element: layout, children: pages },
  { path: "/uz-cyrl", element: layout, children: pages },
  { path: "/", element: layout, children: pages },
]);

export function App() {
  return <RouterProvider router={router} />;
}
