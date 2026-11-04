# 03 — Yechim sahifasi

**URL:** `/yechimlar/:slug` (masalan `/yechimlar/crm-tizimi`, `/ru/yechimlar/crm-tizimi`)  
**Dizayn:** «AUTOROB_03_Yechim_sahifasi_CRM» (1440×5169)  
**Qiyinlik:** ⭐⭐⭐

## Maqsad

Mijoz bitta yechim haqida batafsil o'qiydi: qaysi muammoni hal qiladi, imkoniyatlari, qanday joriy qilinadi, savollar — va **narxini so'raydi** (arizada yechim nomi Telegram'ga boradi).

## Ma'lumot: API + statik

| Bo'lim                                                                                               | Manba                                         |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Nom, kategoriyalar, qisqa tavsif, rasm, imkoniyatlar ro'yxati, narx matni, FAQ, «Boshqa yechimlar»   | **API** — `useSolution(slug, lang)`           |
| Hero ostidagi 3 ta raqam, «Muammolar» kartalari, imkoniyat ikonka va izohlari, «Jarayon» bosqichlari | **Statik** — lug'at: `solutionDetails.<slug>` |

Statik qism slug bo'yicha: yangi yechim admin'dan qo'shilsa-yu, lug'atda bo'lmasa — o'sha bo'limlar **ko'rinmaydi** (sahifa buzilmaydi). Hozir `crm-tizimi` uchun to'ldiring (dizayndagi matnlar), qolgan 5 tasi uchun bonus.

```json
"solutionDetails": { "crm-tizimi": {
  "stats": [ { "value": "2–4 hafta", "label": "joriy etish muddati" }, { "value": "50+", "label": "CRM loyihalar" }, { "value": "24/7", "label": "qo'llab-quvvatlash" } ],
  "problems": [ { "icon": "alert", "title": "Arizalar yo'qoladi", "text": "Qo'ng'iroq, Telegram va saytdan kelgan arizalar turli joyda qoladi va unutiladi." } ],
  "features": { "Mijozlar bazasi": { "icon": "user", "text": "Har bir mijoz tarixi: qo'ng'iroqlar, xabarlar, buyurtmalar." } },
  "process": [ { "title": "Tahlil", "duration": "1–3 kun", "text": "Jarayonlaringizni o'rganamiz va CRM tuzilmasini loyihalaymiz." } ]
} }
```

`features` — API'dagi imkoniyat nomi (`solution.features[]` — oddiy qatorlar) bo'yicha ikonka va izoh.

## Fayllar

| Fayl                                                    | Nima qilasiz                               |
| ------------------------------------------------------- | ------------------------------------------ |
| `src/pages/site/solution/SolutionPage.jsx`              | `slug` → ma'lumot, 404, `<Seo>`, bo'limlar |
| `src/widgets/site/solution-hero/SolutionHero.jsx`       | Sahifa boshi                               |
| `src/widgets/site/solution-problems/`                   | **Yangi**: «Qaysi muammolarni hal qiladi»  |
| `src/widgets/site/solution-features/`                   | **Yangi**: «Bir tizimda — hamma narsa»     |
| `src/widgets/site/process-timeline/ProcessTimeline.jsx` | «Qanday joriy qilamiz»                     |
| `src/widgets/site/faq-accordion/FaqAccordion.jsx`       | **07-o'quvchiniki** — faqat ishlatasiz     |

## API javobi

`GET /api/public/solutions/crm-tizimi?lang=uz`:

```json
{
  "data": {
    "id": "…",
    "slug": "crm-tizimi",
    "title": "CRM tizimi",
    "shortDescription": "…",
    "categories": ["SERVICE", "EDUCATION"],
    "coverImage": null,
    "body": "<h2>CRM tizimi</h2><p>…</p>",
    "features": ["Mijozlar bazasi", "Sotuv voronkasi", "Telefoniya va Telegram"],
    "showPriceRequest": true,
    "priceText": "Narx kelishiladi",
    "seo": { "metaTitle": "CRM tizimi — AUTOROB", "metaDescription": null },
    "faq": [
      { "id": "…", "question": "CRM'ni joriy qilish qancha vaqt oladi?", "answer": "Odatda 2–4 hafta…" }
    ],
    "related": [
      {
        "id": "…",
        "slug": "erp-tizimi",
        "title": "ERP tizimi",
        "shortDescription": "…",
        "categories": ["MANUFACTURING"],
        "coverImage": null
      }
    ],
    "updatedAt": "2026-11-04T10:10:34.879Z"
  }
}
```

Topilmasa — `404` (`error.status === 404`) → `<NotFoundPage />` (oq ekran emas). Yuklanmoqda — hero o'lchamida `Skeleton`.

## Bo'limlar (dizayn tartibida)

### 1. `SolutionHero` (qorong'i fon)

- Chapda: `Breadcrumbs` (Bosh sahifa › Yechimlar › CRM tizimi), kategoriya belgilari (ko'k pill), nom `h1`, `shortDescription`.
- Tugmalar: **«Narxini so'rash →»** (`showPriceRequest` true bo'lsa; `useLeadModal().open(solution.id)`), **«Demo ko'rish»** (chegara bilan; ariza modali, `solutionId` bilan — 10-o'quvchi `message` maydoniga «Demo» yozishni qo'llab-quvvatlaydi).
- `priceText` bo'lsa — tugmalar yonida yoki ostida kichik matn.
- 3 ta raqam (statik `stats`) — qiymat qalin, ostida izoh.
- O'ngda: rasm kartasi (radius) — `coverImage` yoki gradient + ikonka (`SolutionCard` dagi xaritadan).

### 2. Muammolar (statik `problems`)

Eyebrow «MUAMMO», sarlavha «Qaysi muammolarni hal qiladi». 3 ta och kulrang karta: ikonka (oq kvadrat), sarlavha, matn. `problems` bo'lmasa — bo'lim yo'q.

### 3. Imkoniyatlar (API `features` + statik izoh)

Och kulrang fon. Eyebrow «IMKONIYATLAR», sarlavha «Bir tizimda — hamma narsa», matn. 3×2 oq karta: ikonka, `features[i]` (sarlavha), izoh (statikdan; yo'q bo'lsa faqat sarlavha).

### 4. `body` (agar bo'sh bo'lmasa)

`<Prose html={solution.body} />` (06-o'quvchining komponenti) — imkoniyatlardan keyin, oq fonda, ~720px.

### 5. `ProcessTimeline` (statik `process`)

Eyebrow «JARAYON», sarlavha «Qanday joriy qilamiz». Gorizontal: raqamli doiralar `01`–`04` (birinchisi ko'k to'la, qolganlari chegara), orasida chiziq; har biri ostida sarlavha, muddat pill (`1–3 kun`), matn. 375px — vertikal.

### 6. FAQ

Och kulrang fon, 2 ustun: chapda eyebrow «FAQ», sarlavha «CRM haqida savollar» (`t("solution.faqTitle", ...)` + nom), matn «Javob topmadingizmi? Ma'lumot qoldiring — tushuntirib beramiz.»; o'ngda `<FaqAccordion items={solution.faq} />` (birinchisi ochiq). `faq` bo'sh — bo'lim yo'q.

### 7. `<CtaBand solutionId={solution.id} />`

### 8. Boshqa yechimlar

Eyebrow «YANA», sarlavha «Boshqa yechimlar», `solution.related` (3 ta) — `SolutionCard`.

## SEO

- `<Seo title={solution.seo.metaTitle || solution.title} description={solution.seo.metaDescription || solution.shortDescription} image={solution.coverImage?.url} />`
- `breadcrumbLd` JSON-LD.

## Qabul mezonlari

- [ ] Dizaynga mos (1440px), mobil versiya
- [ ] Mavjud bo'lmagan slug → 404
- [ ] «Narxini so'rash» / «Demo ko'rish» modalni ochadi, arizaga `solutionId` qo'shiladi
- [ ] Statik bo'limlar slug bo'yicha lug'atdan; lug'atda yo'q yechimda bu bo'limlar yashirinadi
- [ ] FAQ bo'sh bo'lsa bo'lim ko'rinmaydi; `related` kartalar ishlaydi
- [ ] Til almashganda shu yechimning boshqa tildagi versiyasi
- [ ] `npm run lint && npm test && npm run build` o'tadi
