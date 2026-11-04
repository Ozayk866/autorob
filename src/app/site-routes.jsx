import { data, redirect } from "react-router";
import { LocaleProvider, localeFromParam } from "@/shared/i18n";
import { Spinner } from "@/shared/ui";
import { SiteLayout } from "@/layouts/SiteLayout";
import { HomePage } from "@/pages/site/home";
import { SolutionsPage } from "@/pages/site/solutions";
import { SolutionPage } from "@/pages/site/solution";
import { AboutPage } from "@/pages/site/about";
import { BlogPage } from "@/pages/site/blog";
import { PostPage } from "@/pages/site/post";
import { FaqPage } from "@/pages/site/faq";
import { ContactsPage } from "@/pages/site/contacts";
import { PrivacyPage } from "@/pages/site/privacy";
import { NotFoundPage } from "@/pages/site/not-found";

/**
 * `/:lang?` har qanday birinchi segmentni qabul qiladi, shuning uchun tilni tekshiramiz:
 * "/uz/..." → prefikssiz yo'lga 301; noma'lum prefiks → 404.
 */
function localeLoader({ params, request }) {
  if (params.lang === "uz") {
    const url = new URL(request.url);
    throw redirect((url.pathname.replace(/^\/uz(?=\/|$)/, "") || "/") + url.search, 301);
  }
  if (localeFromParam(params.lang) === null) throw data(null, { status: 404 });
  return null;
}

/**
 * Sayt marshrutlari. Client (router.jsx) ham, prerender (entry-server.jsx) ham shu ro'yxatni ishlatadi.
 * Sahifa ma'lumotini prerender HTML'ga kiritish uchun child route'ga loader qo'shiladi:
 *   loader: ({ params }) => queryClient.ensureQueryData(solutionQuery(params.slug, lang))
 * @param {import("@tanstack/react-query").QueryClient} _queryClient
 */
export function createSiteRoutes(_queryClient) {
  return [
    {
      path: "/:lang?",
      loader: localeLoader,
      element: (
        <LocaleProvider>
          <SiteLayout />
        </LocaleProvider>
      ),
      errorElement: (
        <LocaleProvider>
          <SiteLayout>
            <NotFoundPage />
          </SiteLayout>
        </LocaleProvider>
      ),
      hydrateFallbackElement: <Spinner fullPage />,
      children: [
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
      ],
    },
  ];
}
