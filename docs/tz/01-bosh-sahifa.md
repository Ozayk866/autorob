# 01 — Bosh sahifa

**URL:** `/`, `/ru`, `/uz-cyrl`  
**Dizayn:** «Bosh sahifa — Desktop 1440» (1440×5149) + «HeroSlider» (4 ta slayd)  
**Qiyinlik:** ⭐⭐⭐ (eng katta sahifa)

## Maqsad

Mijoz 10 soniyada tushunishi kerak: AUTOROB nima qiladi (CRM → ERP → Robot → Stanok), kimlar uchun, nega aynan AUTOROB — va **ariza qoldirishi** kerak.

## Fayllar

| Fayl                               | Nima qilasiz                                            |
| ---------------------------------- | ------------------------------------------------------- |
| `src/pages/site/home/HomePage.jsx` | Bo'limlar tartibi, `<Seo>`                              |
| `src/widgets/site/hero-slider/`    | `HeroSlider.jsx`, `SlideProgress.jsx`, `useAutoplay.js` |
| `src/widgets/site/stats-row/`      | `StatsRow.jsx`                                          |
| `src/widgets/site/solutions-path/` | `SolutionsPath.jsx`                                     |
| `src/widgets/site/audience/`       | `AudienceCards.jsx`                                     |
| `src/widgets/site/advantages/`     | `Advantages.jsx`                                        |
| `src/widgets/site/partners-strip/` | `PartnersStrip.jsx`                                     |
| `src/widgets/site/blog-preview/`   | `BlogPreview.jsx`                                       |
| `src/shared/ui/SectionHeading/`    | **Yangi** umumiy komponent — birinchi navbatda          |
| `src/shared/ui/Card/`              | Umumiy karta                                            |
| lug'atlar                          | `"home": { ... }` bo'limi                               |

`CtaBand` — 10-o'quvchiniki, `PostCard` — 05-o'quvchiniki: faqat import qilasiz.

## Bo'limlar (dizayn tartibida)

> `HomePage.jsx` dagi tartibni to'g'rilang: **HeroSlider (+ StatsRow uning ichida) → SolutionsPath → AudienceCards → Advantages → PartnersStrip → BlogPreview → CtaBand**.

### 1. Hero slayder — statik

Qorong'i fon (ko'k gradient), 4 ta slayd. **Ma'lumot backend'dan kelmaydi** — lug'atda:

```json
"home": { "hero": { "slides": [
  { "tab": "CRM", "title": "Har bir mijoz — nazoratda", "accent": "nazoratda",
    "text": "CRM bilan arizalar, sotuv va mijozlar bilan ishlash bitta oynada. Hech bir qo'ng'iroq yo'qolmaydi.",
    "secondary": { "label": "CRM haqida", "href": "/yechimlar/crm-tizimi" } },
  { "tab": "ERP", "title": "Butun biznes — bitta tizimda", "accent": "bitta tizimda", "text": "Ombor, xarid, moliya va ishlab chiqarish ERP orqali yagona hisobga bog'lanadi.", "secondary": { "label": "ERP haqida", "href": "/yechimlar/erp-tizimi" } },
  { "tab": "Robot", "title": "Og'ir ishni robotlarga topshiring", "accent": "robotlarga", "text": "Sanoat robotlari takroriy operatsiyalarni tez, aniq va tanaffussiz bajaradi.", "secondary": { "label": "Robotlar haqida", "href": "/yechimlar/sanoat-robotlari" } },
  { "tab": "Stanok liniyasi", "title": "To'liq avtomatlashgan ishlab chiqarish", "accent": "avtomatlashgan", "text": "Stanok liniyalarini loyihalaymiz, o'rnatamiz va ishga tushiramiz — kalit taslim.", "secondary": { "label": "Liniyalar haqida", "href": "/yechimlar/stanok-liniyalari" } }
] } }
```

`const slides = useMessages("home.hero.slides")`. Har slaydda:

- yuqorida `01 / 04 —— CRM` (raqam ko'k, chiziq, tab nomi);
- sarlavha (Unbounded, ~56px), ichidagi `accent` so'zi **ko'k** rangda — `title` ni `accent` bo'yicha bo'lib, `<span>` ga o'rang;
- matn, ikki tugma: **«Ma'lumot qoldirish →»** (asosiy, `useLeadModal().open()`) va ikkinchi (chegara bilan) — `secondary.href` ga havola;
- o'ng tomonda fon rasmi joyi (dizaynda «Foto: …» — placeholder, chiqarilmaydi). Rasm keyin `public/images/hero-*.webp` ga qo'yiladi.

Pastda **tab'lar qatori**: `01 CRM | 02 ERP | 03 Robot | 04 Stanok liniyasi` — har birining tepasida progress chizig'i (joriy slaydda ko'k bo'lib to'ladi), o'ngda `‹ ›` tugmalari.

- Avtomatik o'tish har **6 soniyada** (`useAutoplay`), progress chizig'i shu vaqtda to'ladi.
- Sichqoncha ustida yoki fokus ichida — pauza. `prefers-reduced-motion` — avtomatik o'tish yo'q.
- Tab bosilsa — o'sha slayd. Klaviatura: ← →.
- Slayd almashganda `aria-live="polite"`.
- 4-slayd sarlavhasi 3 qatorga tushadi — balandlik sakramasin (slaydlar bir xil balandlikda).

### 2. Raqamlar (Stats) — API

Hero ichida, pastki qismda (qorong'i fon davomi, yuqorida chiziq). 4 ustun: katta qiymat (Unbounded, ~40px) + izoh.

`useStats(lang)` → `GET /api/public/stats`:

```json
{ "data": [{ "id": "…", "value": "120+", "label": "bajarilgan loyiha" }] }
```

`value` — qator (`"120+"`, `"8 yil"`, `"24/7"`), son emas. **Bonus:** raqamli qismi ko'ringanda 0 dan sanab chiqsin.

### 3. Yechimlar yo'li — statik

Oq fon. `SectionHeading`: eyebrow «AVTOMATLASHTIRISH YO'LI», sarlavha «To'rt bosqich — bitta hamkor», matn.
4 ta karta (oq, chegara, radius): chapda ikonka (och ko'k kvadrat ichida), o'ngda `01`…`04`, sarlavha (CRM / ERP / Robot / Stanok liniyasi), matn. Lug'at: `home.path.steps[]` → `{ icon, title, text, href }`. Karta bosilsa — yechim sahifasi.

### 4. Kimlar uchun — statik

Och kulrang fon. Eyebrow «KIMLAR UCHUN», sarlavha «Har bir soha uchun o'z yechimi». 3 ta oq karta: ikonka, sarlavha (Servis kompaniyalari / Ta'lim muassasalari / Ishlab chiqarish), matn, «Batafsil →».
«Batafsil» → katalog filtri: `routes.solutions(lang, "service" | "education" | "manufacturing")`.

### 5. Afzalliklar («Nega AUTOROB») — statik

Qorong'i fon. Chapda: eyebrow, sarlavha «Boshidan oxirigacha — bitta jamoa», matn, **oq** tugma «Ma'lumot qoldirish →» (ariza modali). O'ngda 2×2: ko'k belgi ikonkasi, sarlavha, matn; har biri tepasida ingichka chiziq.

### 6. Hamkorlar — API

Oq fon. Kichik caption «Bizga ishonch bildirgan kompaniyalar», 6 ta logo kartasi (och kulrang, radius).
`usePartners(lang, { type: "partner" })` → `{ id, name, url, type, logo }`. `logo` null bo'lsa — `name` matn sifatida (dizayndagidek). `url` bo'lsa — havola, `target="_blank"`.

### 7. Blog — API

Och kulrang fon. Chapda eyebrow «BLOG», sarlavha «Avtomatlashtirish haqida foydali maqolalar», o'ngda «Barcha maqolalar →» (oq tugma) → `routes.blog(lang)`.
3 ta karta: `usePosts(lang, { pageSize: 3 })` → `data.data` + `PostCard`.

### 8. Ariza bloki

`<CtaBand />` (10-o'quvchi).

## Yangi umumiy komponent: `SectionHeading`

```jsx
<SectionHeading
  eyebrow="Kimlar uchun"
  title="Har bir soha uchun o'z yechimi"
  subtitle="..."
  theme="light"
  as="h2"
/>
```

Eyebrow — kichik, katta harf, ko'k, harflar orasi keng; sarlavha — Unbounded. Props: `eyebrow?`, `title`, `subtitle?`, `align` (`left` | `center`), `as` (`h1` | `h2`), `theme` (`light` | `dark`). `shared/ui/index.js` ga eksport. **Birinchi PR shu bo'lsin** — boshqalar kutyapti.

## SEO

- `<Seo title={t("home.seo.title")} description={t("home.seo.description")} />`.
- Bitta `<h1>` — joriy slayd sarlavhasi. Qolganlari `<h2>`.
- `organizationLd()` JSON-LD (`@/shared/seo`).

## Responsiv

- 1024px: qadamlar 2×2, auditoriya 2 + 1, afzalliklar ustma-ust, raqamlar 2×2.
- 375px: bitta ustun; slayder tab'lari faqat raqam (`01 02 03 04`) yoki gorizontal scroll.

## Qabul mezonlari

- [ ] Bo'limlar tartibi va ko'rinishi dizayn bilan bir xil (1440px)
- [ ] Slayder: avtomatik o'tadi, progress to'ladi, hover/fokusda to'xtaydi, tab va strelkalar ishlaydi
- [ ] Statik matnlar lug'atda, 3 tilda; API ma'lumotlari mock'dan keladi, yuklanishda `Skeleton`
- [ ] CTA tugmalar ariza modalini ochadi
- [ ] `SectionHeading` eksport qilingan va boshqalar ishlatyapti
- [ ] Bitta `<h1>`, `organizationLd`
- [ ] 375px da gorizontal scroll yo'q
- [ ] `npm run lint && npm test && npm run build` o'tadi
