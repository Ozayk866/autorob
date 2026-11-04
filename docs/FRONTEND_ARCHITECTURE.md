# AUTOROB — Frontend arxitekturasi (bitta React ilova: sayt + admin, JavaScript)

> Bu hujjat loyihaning `docs/FRONTEND_ARCHITECTURE.md` faylida turadi. Papka va fayllar shu hujjat bo'yicha yaratilgan. **Til — JavaScript (`.js` / `.jsx`), TypeScript ishlatilmaydi.**

## 1. Umumiy ko'rinish

Bitta React ilova, ichida ikki qism bor:

| Qism        | Yo'l (URL)                   | Kim uchun         | Nima qiladi                                                                                           |
| ----------- | ---------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------- |
| Sayt        | `/`, `/yechimlar`, `/blog` … | Mijozlar          | Kontentni ko'rsatadi; «Ma'lumot qoldirish» formasi arizani backend orqali **Telegram botga** yuboradi |
| Admin panel | `/admin/*`                   | AUTOROB adminlari | Faqat **kontent kiritadi** va **yangi admin qo'shadi**. Arizalar adminda yo'q                         |

```
                ┌──────────────────────── autorob (React + Vite, JavaScript) ───────────────────────┐
  Brauzer  ───► │  /, /ru/..., /uz-cyrl/...  →  SiteLayout  →  sayt sahifalari ─┐                    │
                │  /admin/*                  →  AdminLayout →  admin sahifalari ┤                    │
                └───────────────────────────────────────────────────────────────┼────────────────────┘
                                                                                ▼
                                                     shared/api/client.js ──► Node.js API ──► Postgres (Neon)
                                                                                  │
                                       POST /api/public/leads  ───────────────────┴──► Telegram bot (guruh)
```

**Stack:**

- React 19 + **JavaScript (ES2022)** + Vite;
- React Router 7 (kutubxona rejimi, `createBrowserRouter`; import `"react-router"` dan);
- TanStack Query (server ma'lumotlari);
- React Hook Form + zod (forma validatsiyasi);
- **Oddiy CSS**: dizayn tokenlari `:root` CSS o'zgaruvchilarida, komponent stillari **CSS Modules** (`Button.module.css`);
- dnd-kit (sudrab tartiblash);
- vitest + Testing Library + MSW (testlar).

**Stackda yo'q narsalar va ularning o'rnini nima bosadi:**

| Kerak bo'lgan narsa                 | Yechim (qo'shimcha kutubxonasiz)                                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| title, meta, hreflang               | React 19 o'zi `<title>`, `<meta>`, `<link>` ni `<head>` ga ko'taradi (SSR'da ham) → `shared/seo/Seo.jsx`                                    |
| Toast xabarlar                      | `shared/ui/Toast` (kichik context + komponent)                                                                                              |
| Matn muharriri (blog)               | `shared/form/RichTextEditor.jsx` — Markdown `textarea` + toolbar; saytda `shared/lib/markdown.js` bilan render (avval HTML escape qilinadi) |
| Kichik global UI holati (LeadModal) | React context: `features/lead-form/LeadModalProvider.jsx`                                                                                   |

**JavaScript'da tartibni saqlash uchun:**

- `jsconfig.json` (`@/` alias va editor yordami uchun);
- ESLint (`eslint-plugin-react`, `react-hooks`, `eslint-plugin-boundaries`) va Prettier;
- murakkab obyektlar uchun JSDoc izohlari (`/** @typedef … */`), shunda VS Code avtomatik to'ldirish beradi;
- API javoblari tekshiriladigan joylarda zod sxemalari.

> **SEO haqida qaror.** Oddiy SPA'da Google va Telegram/Instagram link preview'lari sahifa matnini yomon o'qiydi, TZ'da esa SEO talab qilingan. Yechim — **build vaqtida public sahifalarni HTML'ga prerender qilish**, qo'shimcha plaginsiz, Vite'ning SSR build'i bilan:
>
> 1. `vite build` — oddiy client build (`dist/`);
> 2. `vite build --ssr src/entry-server.jsx` — server bundle (`dist-ssr/`);
> 3. `node scripts/prerender.js` — har bir public yo'l uchun `createStaticHandler` + `renderToString` bilan HTML yaratadi va `dist/<yo'l>/index.html` ga yozadi; oxirida `sitemap.xml` ni ham yaratadi.
>
> Prerender qilinadigan yo'llar: bosh sahifa, katalog, har bir yechim va maqola, FAQ, kontaktlar, biz haqimizda, maxfiylik — 3 tilda. Yechim va maqola slug'lari build vaqtida API'dan olinadi. Admin prerender qilinmaydi.
>
> Prerender qilingan sahifada `main.jsx` **`hydrateRoot`** ishlatadi, aks holda `createRoot`. Bo'lmasa tayyor HTML o'chirilib, qayta chiziladi.
>
> Hosting SPA fallback'da boshqa sahifaning HTML'ini berishi mumkin (masalan `/admin/login` yoki `/ru/yechimlar` so'roviga bosh sahifaning `index.html` i). Shuning uchun prerender har sahifaga `window.__PRERENDER_PATH__` yozadi. `main.jsx` faqat shu yo'l joriy URL bilan mos kelsa hydrate qiladi. Mos kelmasa `#root` va `<head>` dagi prerender teglarini (`data-pr`) tozalab, `createRoot` bilan chizadi.

## 2. Qatlamlar (Feature-Sliced Design asosida)

```
app        →  ilovani ishga tushirish: providerlar, router, global stillar
pages      →  sahifalar (yupqa: faqat layout ichida widget'larni yig'adi)
layouts    →  sahifa qobiqlari: SiteLayout, AdminLayout, AuthLayout
widgets    →  katta bloklar (HeroSlider, SolutionForm …)
features   →  foydalanuvchi harakatlari (ariza yuborish, login, admin qo'shish …)
entities   →  domen obyektlari: API so'rovlari, sxemalar, kichik UI (SolutionCard …)
shared     →  hech narsaga bog'liq bo'lmagan umumiy kod: UI kit, api client, i18n, utils
```

**Import qoidasi:** qatlam faqat **o'zidan pastdagi** qatlamlardan import qiladi.

```
app ─► pages ─► layouts ─► widgets ─► features ─► entities ─► shared
```

- Bir slice ikkinchisining ichki fayliga kira olmaydi, faqat uning `index.js` (public API) orqali import qiladi: `import { SolutionCard } from "@/entities/solution"`.
- Bu qoida ESLint (`eslint-plugin-boundaries`) bilan majburiy qilinadi — `eslint.config.js` da **7 ta qatlam ham** (`layouts` bilan) ro'yxatga olingan.
- Bir qatlam ichida slice'lar bir-biridan import qilmaydi (masalan `entities/post` → `entities/solution` taqiqlangan). Faqat `shared` segmentlari bir-birini ishlata oladi.
- `pages/site` ↔ `pages/admin` va `widgets/site` ↔ `widgets/admin` bir-biridan import qilmaydi. `entities` va `shared` ikkalasi uchun umumiy.
- Admin kodi alohida chunk bo'ladi (`React.lazy`), sayt mijozi uni yuklamaydi.

## 3. Papka va fayllar

```
autorob/
├── index.html                    # <div id="root"><!--app-html--></div> — prerender shu joyga yozadi
├── package.json
├── vite.config.js                # alias "@/" → src/, vitest sozlamasi
├── jsconfig.json                 # { "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] } } }
├── eslint.config.js              # qatlam import qoidalari shu yerda
├── .prettierrc
├── .env.example                  # VITE_API_URL, VITE_SITE_URL, VITE_GA_ID
├── docs/FRONTEND_ARCHITECTURE.md
├── scripts/
│   └── prerender.js              # dist-ssr/entry-server.js → dist/**/index.html + sitemap.xml
├── public/
│   ├── favicon.svg
│   ├── robots.txt                # Disallow: /admin
│   ├── og-default.jpg
│   └── fonts/                    # Unbounded, Inter (woff2, self-host)
│
├── src/
│   ├── main.jsx                  # hydrateRoot (prerender bo'lsa) yoki createRoot
│   ├── entry-server.jsx          # render(url) → { html, status } — faqat prerender uchun
│   │
│   ├── app/
│   │   ├── App.jsx               # <Providers><RouterProvider/></Providers>
│   │   ├── providers.jsx         # QueryClient, ToastProvider (LocaleProvider va LeadModalProvider — router ichida)
│   │   ├── router.jsx            # createRouter(queryClient) → createBrowserRouter([...site, ...admin])
│   │   ├── site-routes.jsx       # sayt marshrutlari + localeLoader (client va prerender umumiy)
│   │   ├── admin-routes.jsx      # /admin marshrutlari, har sahifa `lazy` (alohida chunk)
│   │   ├── prerender-paths.js    # prerender qilinadigan yo'llar (statik + API'dan slug'lar) × 3 til
│   │   └── styles/
│   │       ├── tokens.css        # --ink-900, --accent-500, --radius-md … (Figma tokenlari)
│   │       ├── fonts.css
│   │       └── globals.css       # reset + body + umumiy utility klasslar (.container, .visually-hidden)
│   │
│   ├── pages/
│   │   ├── site/
│   │   │   ├── home/             HomePage.jsx, index.js
│   │   │   ├── solutions/        SolutionsPage.jsx           # katalog
│   │   │   ├── solution/         SolutionPage.jsx            # /yechimlar/:slug
│   │   │   ├── about/            AboutPage.jsx
│   │   │   ├── blog/             BlogPage.jsx
│   │   │   ├── post/             PostPage.jsx                # /blog/:slug
│   │   │   ├── faq/              FaqPage.jsx
│   │   │   ├── contacts/         ContactsPage.jsx
│   │   │   ├── privacy/          PrivacyPage.jsx
│   │   │   └── not-found/        NotFoundPage.jsx
│   │   └── admin/
│   │       ├── login/            LoginPage.jsx
│   │       ├── change-password/  ChangePasswordPage.jsx      # mustChangePassword bo'lsa
│   │       ├── dashboard/        DashboardPage.jsx
│   │       ├── solutions/        SolutionsListPage.jsx, SolutionEditPage.jsx
│   │       ├── hero-slides/      HeroSlidesPage.jsx
│   │       ├── posts/            PostsListPage.jsx, PostEditPage.jsx
│   │       ├── faq/              FaqAdminPage.jsx
│   │       ├── team/             TeamAdminPage.jsx
│   │       ├── partners/         PartnersAdminPage.jsx
│   │       ├── about-content/    MilestonesStatsPage.jsx     # tarix + raqamlar
│   │       ├── page-texts/       PageTextsPage.jsx
│   │       ├── settings/         SettingsPage.jsx            # kontaktlar + Telegram bot
│   │       └── admins/           AdminsPage.jsx              # adminlar ro'yxati + yangi admin
│   │
│   ├── layouts/
│   │   ├── SiteLayout/           SiteLayout.jsx, TopBar.jsx, Header.jsx, MobileMenu.jsx, Footer.jsx, SiteLayout.module.css
│   │   ├── AdminLayout/          AdminLayout.jsx, Sidebar.jsx, AdminTopbar.jsx, nav.config.js, AdminLayout.module.css
│   │   └── AuthLayout/           AuthLayout.jsx, AuthLayout.module.css
│   │
│   ├── widgets/                  # har bir widget: Komponent.jsx + Komponent.module.css + index.js
│   │   ├── site/
│   │   │   ├── hero-slider/      HeroSlider.jsx, SlideProgress.jsx, useAutoplay.js
│   │   │   ├── solutions-path/   SolutionsPath.jsx           # CRM → ERP → Robot → Stanok
│   │   │   ├── audience/         AudienceCards.jsx
│   │   │   ├── advantages/       Advantages.jsx
│   │   │   ├── stats-row/        StatsRow.jsx
│   │   │   ├── partners-strip/   PartnersStrip.jsx
│   │   │   ├── blog-preview/     BlogPreview.jsx
│   │   │   ├── solutions-grid/   SolutionsGrid.jsx
│   │   │   ├── solution-hero/    SolutionHero.jsx
│   │   │   ├── process-timeline/ ProcessTimeline.jsx
│   │   │   ├── faq-accordion/    FaqAccordion.jsx
│   │   │   ├── about-timeline/   AboutTimeline.jsx
│   │   │   ├── team-grid/        TeamGrid.jsx
│   │   │   ├── contacts-block/   ContactsBlock.jsx, MapEmbed.jsx
│   │   │   └── cta-band/         CtaBand.jsx                 # ichida features/lead-form
│   │   └── admin/
│   │       ├── dashboard-overview/ ContentCounters.jsx, TranslationProgress.jsx, RecentChanges.jsx, TelegramStatus.jsx, QuickActions.jsx
│   │       ├── solution-form/    SolutionForm.jsx, FeaturesRepeater.jsx, PublishCard.jsx, PriceCard.jsx
│   │       ├── post-form/        PostForm.jsx
│   │       ├── hero-slide-form/  SlideList.jsx, SlideForm.jsx
│   │       ├── faq-editor/       FaqCategoryList.jsx, FaqItemRow.jsx
│   │       ├── admins-table/     AdminsTable.jsx
│   │       └── sortable-table/   SortableTable.jsx           # yechim, jamoa, hamkorlar uchun umumiy
│   │
│   ├── features/
│   │   ├── lead-form/            LeadForm.jsx, LeadModal.jsx, LeadModalProvider.jsx, useLeadModal.js, schema.js, useSubmitLead.js, index.js
│   │   ├── locale-switch/        LocaleSwitch.jsx
│   │   ├── solutions-filter/     SolutionsFilter.jsx, useCategoryParam.js
│   │   ├── auth/                 LoginForm.jsx, ChangePasswordForm.jsx, useLogin.js, useLogout.js, useMe.js, RequireAuth.jsx, GuestOnly.jsx
│   │   ├── add-admin/            AddAdminModal.jsx, TempPasswordNotice.jsx, useCreateAdmin.js
│   │   ├── reorder/              useReorder.js               # dnd-kit + PATCH /reorder
│   │   ├── publish-toggle/       PublishToggle.jsx           # optimistic
│   │   ├── ai-translate/         TranslateButton.jsx         # /api/admin/translate (ixtiyoriy)
│   │   └── telegram-test/        TelegramTestButton.jsx
│   │
│   ├── entities/                 # har biri: api.js, queries.js, schema.js, ui/, index.js
│   │   ├── solution/             ui/SolutionCard.jsx, ui/TranslationStatus.jsx
│   │   ├── hero-slide/
│   │   ├── post/                 ui/PostCard.jsx
│   │   ├── faq/
│   │   ├── team-member/          ui/TeamCard.jsx
│   │   ├── partner/
│   │   ├── milestone/
│   │   ├── stat/
│   │   ├── page-content/         usePageTexts.js              # bazadagi sahifa matnlari
│   │   ├── settings/
│   │   ├── media/                upload.js                    # FormData orqali
│   │   ├── admin/                # admin foydalanuvchi (ro'yxat, yaratish)
│   │   └── audit/                # dashboard'dagi «so'nggi o'zgarishlar»
│   │
│   └── shared/
│       ├── api/
│       │   ├── client.js         # fetch wrapper: baseURL, credentials, JSON yoki FormData, ApiError
│       │   ├── errors.js
│       │   └── queryClient.js
│       ├── i18n/
│       │   ├── locales.js        # LOCALES = ["uz", "uz-Cyrl", "ru"], URL prefikslari, isUrlLocale()
│       │   ├── LocaleProvider.jsx, useLocale.js, useT.js
│       │   ├── localized.js      # pick(text, lang) — fallback bilan
│       │   └── dictionaries/     uz.json, uz-Cyrl.json, ru.json   # UI matnlari
│       ├── seo/
│       │   ├── Seo.jsx           # title, description, canonical, hreflang, og (React 19 hoisting)
│       │   └── jsonld.js         # Organization, BreadcrumbList, Article
│       ├── ui/                   # dizayn tizimi (Figma UI Kit bilan 1:1); har biri X.jsx + X.module.css + index.js
│       │   ├── Button/  Input/  Textarea/  Select/  Checkbox/  Toggle/  Badge/  Chip/
│       │   ├── Card/  Tabs/  Accordion/  Modal/  Drawer/  Tooltip/  Skeleton/  EmptyState/  Spinner/
│       │   ├── Toast/            ToastProvider.jsx, useToast.js
│       │   ├── Table/            DataTable.jsx, Pagination.jsx
│       │   ├── Icon/             Icon.jsx + icons/*.svg
│       │   ├── Logo/
│       │   └── index.js
│       ├── form/                 # admin formalar uchun
│       │   ├── FormField.jsx
│       │   ├── LocalizedField.jsx  # O'zbekcha / Ўзбекча / Русский tablari
│       │   ├── RichTextEditor.jsx  # Markdown textarea + toolbar
│       │   ├── ImageUpload.jsx
│       │   ├── SeoFields.jsx, GooglePreview.jsx
│       │   └── CharCounter.jsx
│       ├── hooks/                useDebounce.js, useHotkey.js, useUnsavedChanges.js, useMediaQuery.js
│       ├── lib/                  cn.js, format.js, phone.js (+998 niqob), slugify.js, markdown.js, analytics.js, query.js
│       └── config/               env.js (VITE_* tekshiruvi), routes.js (yo'l konstantalari: routes.solution(slug, lang))
│
└── tests/
    ├── setup.js
    └── mocks/                    handlers.js (MSW), server.js
```

Har bir slice ichidagi `index.js` tashqariga nima chiqishini belgilaydi:

```js
// entities/solution/index.js
export { useSolutions, useSolution, solutionKeys } from "./queries";
export { solutionSchema } from "./schema";
export { SolutionCard } from "./ui/SolutionCard";
```

## 4. Marshrutlar

Tillar: `uz` — prefikssiz (asosiy), `ru` → `/ru/...`, `uz-Cyrl` → `/uz-cyrl/...`. Har sahifada `hreflang` teglari qo'yiladi. Slug'lar barcha tillarda bir xil (`/ru/yechimlar/...`).

| Yo'l                                                                           | Sahifa                    | Himoya                                     |
| ------------------------------------------------------------------------------ | ------------------------- | ------------------------------------------ |
| `/:lang?`                                                                      | HomePage                  | —                                          |
| `/:lang?/yechimlar`                                                            | SolutionsPage (`?soha=`)  | —                                          |
| `/:lang?/yechimlar/:slug`                                                      | SolutionPage              | —                                          |
| `/:lang?/biz-haqimizda`                                                        | AboutPage                 | —                                          |
| `/:lang?/blog`, `/:lang?/blog/:slug`                                           | BlogPage, PostPage        | —                                          |
| `/:lang?/faq`, `/:lang?/kontaktlar`                                            | FaqPage, ContactsPage     | —                                          |
| `/:lang?/maxfiylik`                                                            | PrivacyPage               | —                                          |
| `/admin/login`                                                                 | LoginPage                 | `GuestOnly` (faqat kirmagan foydalanuvchi) |
| `/admin/change-password`                                                       | ChangePasswordPage        | kirgan, `mustChangePassword`               |
| `/admin`                                                                       | DashboardPage             | `RequireAuth`                              |
| `/admin/solutions`, `/new`, `/:id`                                             | Yechimlar                 | `RequireAuth`                              |
| `/admin/hero`                                                                  | HeroSlidesPage            | `RequireAuth`                              |
| `/admin/posts`, `/new`, `/:id`                                                 | Blog                      | `RequireAuth`                              |
| `/admin/faq`, `/admin/team`, `/admin/partners`, `/admin/about`, `/admin/texts` | Kontent                   | `RequireAuth`                              |
| `/admin/settings`                                                              | Kontaktlar + Telegram bot | `RequireAuth`                              |
| `/admin/admins`                                                                | Adminlar                  | `RequireAuth`                              |
| `*`                                                                            | NotFoundPage              | —                                          |

**Til prefiksini tekshirish.** `/:lang?` har qanday birinchi segmentni qabul qiladi (`/abc/yechimlar` ham mos keladi). Shuning uchun sayt route'ining `loader`'i `lang` ni tekshiradi: `lang` berilgan, lekin `ru` yoki `uz-cyrl` bo'lmasa — `404` tashlanadi va `NotFoundPage` ko'rsatiladi. `/uz/...` esa prefikssiz yo'lga `301` bilan yo'naltiriladi.

Rollar yo'q, shuning uchun bitta `RequireAuth` yetadi. U foydalanuvchi kirmagan bo'lsa `/admin/login` ga, `mustChangePassword` bo'lsa `/admin/change-password` ga yo'naltiradi.

**Yo'l konstantalari** `shared/config/routes.js` da turadi, `app/` da emas: ularni widget va feature'lar ham ishlatadi, `app` esa eng yuqori qatlam.

**Admin marshrutlari `/admin/*` + ichki `<Routes>` emas.** React Router reytingida `/:lang/faq` (17 ball) `/admin/*` (12 ball) dan yuqori turadi, ya'ni `/admin/faq` sayt route'iga tushib qolardi. Shuning uchun admin sahifalari data router'da aniq yo'l bilan (`/admin/faq`, 24 ball) va `lazy` bilan e'lon qilinadi.

```jsx
// app/site-routes.jsx
export const createSiteRoutes = (queryClient) => [
  {
    path: "/:lang?",
    loader: localeLoader, // noto'g'ri lang → 404, "uz" → prefikssiz yo'lga 301
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
    children: [
      { index: true, element: <HomePage /> },
      { path: "yechimlar", element: <SolutionsPage /> },
      { path: "yechimlar/:slug", element: <SolutionPage /> },
      // …
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

// app/admin-routes.jsx
const page = (load, name) => async () => ({ Component: (await load())[name] });

export const adminRoutes = [
  {
    path: "/admin",
    children: [
      {
        lazy: guestLayout,
        children: [{ path: "login", lazy: page(() => import("@/pages/admin/login"), "LoginPage") }],
      },
      {
        lazy: protectedLayout,
        children: [
          // <RequireAuth><AdminLayout/></RequireAuth>
          { index: true, lazy: page(() => import("@/pages/admin/dashboard"), "DashboardPage") },
          { path: "faq", lazy: page(() => import("@/pages/admin/faq"), "FaqAdminPage") },
          // …
        ],
      },
    ],
  },
];

// app/router.jsx — sayt birinchi: hech narsa mos kelmasa, xato birinchi route'ning errorElement'ida chiqadi
export const createRouter = (queryClient) =>
  createBrowserRouter([...createSiteRoutes(queryClient), ...adminRoutes]);
```

**Sahifa ma'lumotini prerender HTML'ga kiritish.** Child route'ga loader qo'shiladi: `loader: ({ params }) => queryClient.ensureQueryData(solutionQuery(params.slug, lang))`. Prerender holat `window.__RQ_STATE__` ga yoziladi, `main.jsx` uni `hydrate()` qiladi. Har entity'da shu maqsad uchun query options bor (`solutionsQuery`, `solutionQuery` …).

## 5. Ma'lumot oqimi

```
SAYT
Sahifa ─► widget ─► entities/*/queries.js  useQuery({ queryKey: solutionKeys.list(lang, filters), queryFn })
                         └─► entities/*/api.js ─► shared/api/client.js ─► GET /api/public/solutions?lang=ru

Ariza formasi (features/lead-form)
LeadForm ─► honeypot to'ldirilganmi? ── ha ─► jim «Rahmat» (so'rov yuborilmaydi)
               │ yo'q
               ▼
           zod tekshiruv ─► useSubmitLead (useMutation) ─► POST /api/public/leads ─► backend ─► Telegram bot
   ├─ 201  → «Rahmat! Tez orada bog'lanamiz»
   ├─ 429  → «Juda ko'p urinish, birozdan keyin qayta yuboring»
   └─ 502  → «Yuborilmadi. Qayta urinib ko'ring yoki qo'ng'iroq qiling: +998 …» (raqam sozlamalardan)

ADMIN
Forma ─► useMutation(updateSolution)
   ├─ onSuccess: invalidateQueries(solutionKeys.all) + toast("Saqlandi")
   └─ onError:   error.details → React Hook Form setError (maydon ostida xato)
```

**Qoidalar:**

- **Server ma'lumotlari faqat TanStack Query'da saqlanadi.** Redux yoki boshqa store kerak emas. Kichik UI holati (modal ochiq/yopiq) uchun `useState` yoki React context (`LeadModalProvider`) yetadi.
- **Query key'lar** har bir entity'da factory ko'rinishida: `solutionKeys.all / list(...) / detail(id)`.
- **Public va admin javoblar ajratiladi:**
  - public javoblarda tarjima maydonlari oddiy string bo'ladi (`?lang=` bo'yicha);
  - admin javoblarda `{ uz, "uz-Cyrl", ru }` obyekt bo'ladi;
  - entity'da ikkalasi uchun alohida funksiyalar yoziladi: `getSolutions` / `getSolutionsAdmin`.
- **Til** URL'dan olinadi (`useLocale()`) va query key'ga kiradi.
- **Ariza** frontendda saqlanmaydi va hech qayerga log qilinmaydi. Faqat analitikaga «lead_submitted» hodisasi ketadi, shaxsiy ma'lumotlarsiz.
- **Fayl yuklash** (`entities/media/upload.js`) `FormData` yuboradi; `client.js` bunda `Content-Type` qo'ymaydi va `body` ni o'zgartirmaydi (brauzer `boundary` ni o'zi qo'yadi).

## 6. Muhim fayllar namunasi

```js
// shared/api/client.js
import { env } from "@/shared/config/env";
import { ApiError } from "./errors";

export async function api(path, { body, headers, ...init } = {}) {
  const isForm = body instanceof FormData;
  const res = await fetch(`${env.VITE_API_URL}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      ...(isForm || body === undefined ? {} : { "Content-Type": "application/json" }),
      "X-Requested-With": "autorob-web",
      ...headers,
    },
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });
  if (res.status === 401 && path.startsWith("/api/admin"))
    window.dispatchEvent(new Event("auth:unauthorized"));
  const json = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, json?.error);
  return json?.data;
}
```

```js
// shared/i18n/localized.js
/** @typedef {"uz" | "uz-Cyrl" | "ru"} Locale */
/** @typedef {{ uz: string, "uz-Cyrl"?: string, ru?: string }} LocalizedText */

/** @param {LocalizedText | undefined} text @param {Locale} lang */
export const pick = (text, lang) => text?.[lang]?.trim() || text?.uz || "";
```

```js
// features/lead-form/schema.js
import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "lead.errors.name").max(80),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => /^998\d{9}$/.test(v), "lead.errors.phone"),
  solutionId: z.string().optional(),
  website: z.string().optional(), // honeypot: sxema xato bermaydi, LeadForm uni tekshiradi
});

/** Bot yashirin maydonni to'ldirganmi. To'ldirgan bo'lsa — jim «muvaffaqiyat», so'rov yuborilmaydi. */
export const isBot = (values) => Boolean(values.website);
```

Xato xabarlari i18n kalit sifatida yoziladi (`lead.errors.name`), `FormField` ularni `useT()` bilan tarjima qiladi.

```js
// layouts/AdminLayout/nav.config.js
export const adminNav = [
  { group: "nav.main", items: [{ to: "/admin", label: "nav.dashboard", icon: "dash" }] },
  {
    group: "nav.content",
    items: [
      { to: "/admin/hero", label: "nav.hero", icon: "slides" },
      { to: "/admin/solutions", label: "nav.solutions", icon: "box" },
      // …
    ],
  },
  {
    group: "nav.system",
    items: [
      { to: "/admin/settings", label: "nav.settings", icon: "settings" },
      { to: "/admin/admins", label: "nav.admins", icon: "lock" },
    ],
  },
];
```

## 7. Nomlash va kod qoidalari

- **Fayl nomlari:**
  - komponentlar `PascalCase.jsx`, stillari `PascalCase.module.css`;
  - hook'lar `useSomething.js`;
  - qolganlari `camelCase.js`;
  - papkalar `kebab-case`.
- **JSX faqat `.jsx` fayllarda** bo'ladi, oddiy logika `.js` da.
- **CSS:**
  - ranglar, radiuslar, soyalar, oraliqlar faqat `tokens.css` dagi o'zgaruvchilardan olinadi (`var(--accent-500)`), raqam bilan yozilmaydi;
  - komponent stillari faqat o'z `.module.css` faylida; global klasslar faqat `globals.css` da;
  - klasslarni birlashtirish uchun `shared/lib/cn.js`.
- **Komponent hajmi:** bitta komponent 150 qatordan oshsa, bo'laklarga ajratiladi.
- **Sahifa komponentlari** fetch qilmaydi, faqat widget'larni joylashtiradi va `<Seo/>` qo'yadi.
- **Props hujjati:** umumiy UI komponentlar (`shared/ui`) uchun props'lar JSDoc bilan yoziladi.
- **Matnlar:**
  - UI'dagi statik matnlar `shared/i18n/dictionaries/*.json` da saqlanadi;
  - admin tahrirlaydigan matnlar bazadan keladi (`entities/page-content`);
  - kodga o'zbekcha matn yozilmaydi.
- **Rasmlar:** `loading="lazy"`, `width`/`height` berilgan, API qaytargan 480/1024/1920 o'lchamlardan `srcset`.
- **Kirish imkoniyati:**
  - modal va drawer'da fokus ichida ushlanadi;
  - Esc bilan yopiladi;
  - hamma tugma klaviaturadan bosiladi.
- **Bundle hajmi:**
  - admin (dnd-kit, muharrir) faqat lazy chunk'da bo'ladi;
  - sayt bosh sahifasi uchun JS ≤ 200 KB (gzip) maqsad qilinadi.
- **Testlar:**
  - `features/lead-form` (validatsiya, 201/429/502 holatlari, honeypot) va `features/auth` (redirect, parol almashtirish) majburiy;
  - qolganlari uchun smoke test yoziladi.

## 8. Qurish tartibi

0. ✅ **Skelet tayyor:** Vite + `jsconfig.json` + ESLint (qatlam qoidalari) + Prettier + tokenlar + router + `shared/api/client.js`, hamma papka va fayllar bo'sh shablon sifatida yaratilgan.
1. **`shared/ui`:** Button, Input, Select, Toggle, Badge, Card, Tabs, Accordion, Modal, Drawer, Table, Toast — Figma UI Kit'ka mos.
2. **Sayt layout:** TopBar, Header, MobileMenu, Footer, LocaleSwitch, `<Seo/>`.
3. **`features/lead-form`** + LeadModal. Bu asosiy funksiya, real API va test Telegram guruhi bilan tekshiriladi.
4. **Sayt sahifalari:** bosh sahifa (hero slayder bilan) → katalog → yechim → blog/maqola → FAQ → kontaktlar → biz haqimizda → 404.
5. **Admin:**
   - login va parol almashtirish;
   - layout;
   - dashboard;
   - yechimlar;
   - hero;
   - blog;
   - FAQ;
   - jamoa, hamkorlar, tarix va raqamlar, sahifa matnlari;
   - sozlamalar (Telegram bot);
   - adminlar.
6. **Prerender** (`npm run build:prerender`), `sitemap.xml`, Lighthouse tekshiruvi (mobil ≥ 85).

Har bosqichdan keyin `npm run lint && npm test && npm run build` o'tishi kerak.

## 9. Buyruqlar

| Buyruq                            | Nima qiladi                                                            |
| --------------------------------- | ---------------------------------------------------------------------- |
| `npm run dev`                     | dev server (`http://localhost:5173`)                                   |
| `npm run build`                   | client build → `dist/`                                                 |
| `npm run build:prerender`         | client + SSR build + `scripts/prerender.js` (public sahifalar HTML'ga) |
| `npm run preview`                 | `dist/` ni lokal ko'rish                                               |
| `npm run lint` / `npm run format` | ESLint / Prettier                                                      |
| `npm test`                        | vitest (bir marta), `npm run test:watch` — kuzatish rejimi             |
