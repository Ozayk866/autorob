import { Spinner } from "@/shared/ui";
import { NotFoundPage } from "@/pages/site/not-found"; // sayt bundle'ida bor, lazy shart emas

// Admin marshrutlari. Har bir sahifa `lazy` — sayt mijozi admin kodini yuklamaydi.
//
// Nega `/admin/*` + ichki <Routes> emas: React Router reytingida `/:lang/faq` (17 ball)
// `/admin/*` (12 ball) dan yuqori, ya'ni `/admin/faq` sayt route'iga tushib qolardi.
// Aniq `/admin/faq` (24 ball) esa har doim yutadi.

const page = (load, name) => async () => ({ Component: (await load())[name] });

async function guestLayout() {
  const [{ GuestOnly }, { AuthLayout }] = await Promise.all([
    import("@/features/auth"),
    import("@/layouts/AuthLayout"),
  ]);
  return {
    Component: function GuestAuthLayout() {
      return (
        <GuestOnly>
          <AuthLayout />
        </GuestOnly>
      );
    },
  };
}

async function changePasswordLayout() {
  const [{ RequireAuth }, { AuthLayout }] = await Promise.all([
    import("@/features/auth"),
    import("@/layouts/AuthLayout"),
  ]);
  return {
    Component: function ChangePasswordLayout() {
      return (
        <RequireAuth allowMustChangePassword>
          <AuthLayout />
        </RequireAuth>
      );
    },
  };
}

async function protectedLayout() {
  const [{ RequireAuth }, { AdminLayout }] = await Promise.all([
    import("@/features/auth"),
    import("@/layouts/AdminLayout"),
  ]);
  return {
    Component: function ProtectedAdminLayout() {
      return (
        <RequireAuth>
          <AdminLayout />
        </RequireAuth>
      );
    },
  };
}

const solutionEdit = page(() => import("@/pages/admin/solutions"), "SolutionEditPage");
const postEdit = page(() => import("@/pages/admin/posts"), "PostEditPage");

export const adminRoutes = [
  {
    path: "/admin",
    hydrateFallbackElement: <Spinner fullPage />,
    errorElement: <Spinner fullPage />, // TODO: admin xato sahifasi
    children: [
      {
        lazy: guestLayout,
        children: [{ path: "login", lazy: page(() => import("@/pages/admin/login"), "LoginPage") }],
      },
      {
        lazy: changePasswordLayout,
        children: [
          {
            path: "change-password",
            lazy: page(() => import("@/pages/admin/change-password"), "ChangePasswordPage"),
          },
        ],
      },
      {
        lazy: protectedLayout,
        children: [
          { index: true, lazy: page(() => import("@/pages/admin/dashboard"), "DashboardPage") },
          { path: "solutions", lazy: page(() => import("@/pages/admin/solutions"), "SolutionsListPage") },
          { path: "solutions/new", lazy: solutionEdit },
          { path: "solutions/:id", lazy: solutionEdit },
          { path: "hero", lazy: page(() => import("@/pages/admin/hero-slides"), "HeroSlidesPage") },
          { path: "posts", lazy: page(() => import("@/pages/admin/posts"), "PostsListPage") },
          { path: "posts/new", lazy: postEdit },
          { path: "posts/:id", lazy: postEdit },
          { path: "faq", lazy: page(() => import("@/pages/admin/faq"), "FaqAdminPage") },
          { path: "team", lazy: page(() => import("@/pages/admin/team"), "TeamAdminPage") },
          { path: "partners", lazy: page(() => import("@/pages/admin/partners"), "PartnersAdminPage") },
          { path: "about", lazy: page(() => import("@/pages/admin/about-content"), "MilestonesStatsPage") },
          { path: "texts", lazy: page(() => import("@/pages/admin/page-texts"), "PageTextsPage") },
          { path: "settings", lazy: page(() => import("@/pages/admin/settings"), "SettingsPage") },
          { path: "admins", lazy: page(() => import("@/pages/admin/admins"), "AdminsPage") },
          { path: "*", Component: NotFoundPage },
        ],
      },
    ],
  },
];
