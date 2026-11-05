# AUTOROB sayti — o'quvchilar topshiriqlari

O'quvchilar uchun topshiriqlar — **Word fayllarda**: [`word/`](word/) papkasi. Har bir o'quvchiga bitta fayl.

| №   | Fayl                                | O'quvchi    | Sahifa             | Ishlaydigan fayllar                                                |
| --- | ----------------------------------- | ----------- | ------------------ | ------------------------------------------------------------------ |
| 02  | `02_Yechimlar_katalogi_Behruz.docx` | Behruz      | `/yechimlar`       | `pages/site/solutions/SolutionsPage.jsx` + `.css`                  |
| 03  | `03_Yechim_sahifasi_CRM.docx`       | —           | `/yechimlar/:slug` | `pages/site/solution/SolutionPage.jsx` + `.css`                    |
| 04  | `04_Biz_haqimizda_Xolmirzayev.docx` | Xolmirzayev | `/biz-haqimizda`   | `pages/site/about/AboutPage.jsx` + `.css`                          |
| 05  | `05_Blog_SkiLLzaR.docx`             | SkiLLzaR    | `/blog`            | `pages/site/blog/BlogPage.jsx` + `.css`                            |
| 06  | `06_Maqola_Abdulazeez.docx`         | Abdulazeez  | `/blog/:slug`      | `pages/site/post/PostPage.jsx` + `.css`                            |
| 07  | `07_FAQ_Islombek.docx`              | Islombek    | `/faq`             | `pages/site/faq/FaqPage.jsx` + `.css`                              |
| 08  | `08_Kontaktlar_Dilmurod.docx`       | Dilmurod    | `/kontaktlar`      | `pages/site/contacts/ContactsPage.jsx` + `.css`                    |
| 09  | `09_404_va_Maxfiylik_Islomjon.docx` | Islomjon    | `*`, `/maxfiylik`  | `not-found/NotFoundPage` + `privacy/PrivacyPage` (`.jsx` + `.css`) |

## Qisqa qoidalar

- Har bir o'quvchi faqat o'z sahifasining **2 ta faylida** ishlaydi: `XxxPage.jsx` va oddiy `XxxPage.css` (CSS Modules emas).
- Fayllar tayyor: ma'lumot olingan, izohlar (`{/* 1. … */}`) — har bo'lim qayerga yozilishi.
- CSS klasslari sahifa nomi bilan boshlanadi: `faq-`, `blog-`, `catalog-` …
- Statik matnlar JSX ichida. Yuklanish (Skeleton), xato holatlari, tarjima — keyin o'qituvchi qo'shadi.
- Ishga tushirish: `npm run mock:api` (ma'lumotlar) + `npm run dev` (sayt).

Tayyor qismlar (o'quvchilar tegmaydi): header, footer, bosh sahifa ([01-bosh-sahifa.md](01-bosh-sahifa.md)), ariza formasi va modal ([10-ariza-formasi.md](10-ariza-formasi.md)), `PageHero`, `CtaBand`, `PostCard`, `Button`, `Icon`, `CoverArt`.
