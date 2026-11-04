# 02 — Yechimlar katalogi

**URL:** `/yechimlar`, `/yechimlar?soha=service`, `/ru/yechimlar` …  
**Dizayn:** «AUTOROB_02_Yechimlar_katalogi» (1440×2637)  
**Qiyinlik:** ⭐⭐ (+ umumiy `PageHero` va `Breadcrumbs` — boshqalar kutadi)

## Maqsad

Mijoz barcha yechimlarni ko'radi, **soha bo'yicha filtrlaydi** (Servis, Ta'lim, Ishlab chiqarish), yechimni ochadi yoki darhol **narxini so'raydi**.

## Fayllar

| Fayl                                                        | Nima qilasiz                                         |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| `src/pages/site/solutions/SolutionsPage.jsx`                | `PageHero` + `SolutionsGrid` + `CtaBand`, `<Seo>`    |
| `src/widgets/site/page-hero/`                               | **Yangi umumiy widget** (pastda) — birinchi navbatda |
| `src/shared/ui/Breadcrumbs/`                                | **Yangi umumiy komponent** — birinchi navbatda       |
| `src/widgets/site/solutions-grid/SolutionsGrid.jsx`         | Filtr + son + kartalar + holatlar                    |
| `src/features/solutions-filter/SolutionsFilter.jsx`         | Chip'lar                                             |
| `src/features/solutions-filter/useCategoryParam.js`         | **Tayyor** — `?soha=`                                |
| `src/entities/solution/ui/SolutionCard.jsx`                 | Karta (01, 03 ham ishlatadi)                         |
| `src/shared/ui/Chip/`, `Badge/`, `Skeleton/`, `EmptyState/` | Umumiy (siz egasisiz)                                |

## 1. `PageHero` (umumiy, 02/05/07/08 sahifalar boshi)

Qorong'i ko'k gradient fon (~260px), chapda: `Breadcrumbs` (och kulrang, oxirgisi oq), sarlavha `h1` (Unbounded ~44px), matn. O'ngda: katta ko'k doira ichida oq ikonka, atrofida ingichka nuqtali aylanalar.

```jsx
<PageHero
  breadcrumbs={[{ label: t("nav.home"), to: routes.home(lang) }, { label: t("catalog.title") }]}
  title={t("catalog.title")}
  subtitle={t("catalog.subtitle")}
  icon="layers"
/>
```

Ikonka uchun `shared/ui/Icon/icons/` ga SVG qo'shing (layers, book, headset, phone — 05/07/08 uchun ham).

## 2. `Breadcrumbs` (umumiy)

`Bosh sahifa › Yechimlar`. `<nav aria-label="Breadcrumb"><ol>`, oxirgisi havola emas (`aria-current="page"`). Props: `items: { label, to? }[]`, `theme` (`dark` | `light` — maqola sahifasida oq fonda). `breadcrumbLd(items)` JSON-LD ham qo'shilsin.

## 3. Filtr qatori

- Chap: chip'lar **Hammasi · Servis · Ta'lim · Ishlab chiqarish**. Faol chip — qora fon, oq matn. Qiymatlar: `CATALOG_CATEGORIES` (`@/shared/config`) = `service | education | manufacturing`, nomlari `t("solutionCategories.service")`.
- O'ng: **«6 ta yechim»** — topilgan son.
- `const [soha, setSoha] = useCategoryParam()` → URL `?soha=education`. Sahifa yangilansa yoki havola ulashilsa — filtr saqlanadi. Chip'da `aria-pressed`.
- 375px: chip'lar qatori gorizontal scroll.

## 4. Kartalar to'ri

```js
const { data = [], isPending, isError, refetch } = useSolutions(lang, soha ? { category: soha } : undefined);
```

`GET /api/public/solutions?lang=uz&category=education`:

```json
{
  "data": [
    {
      "id": "…",
      "slug": "crm-tizimi",
      "title": "CRM tizimi",
      "shortDescription": "Mijozlar, arizalar va sotuvni bitta oynada boshqaring…",
      "categories": ["SERVICE", "EDUCATION"],
      "coverImage": null
    }
  ]
}
```

- 3 / 2 / 1 ustun (1440 / 1024 / 375). Yuklanmoqda — 6 ta Skeleton karta. Bo'sh — `EmptyState` + «Hammasini ko'rish» (filtrni tozalaydi). Xato — matn + «Qayta urinish».

## 5. `SolutionCard`

Oq karta, ingichka chegara, radius:

- **Rasm bloki** (16:10, ichki radius): `coverImage` bo'lsa — rasm (`srcSet`). `null` bo'lsa — dizayndagidek **rangli gradient + to'r naqsh + markazda shaffof kvadratda oq ikonka**. Rang va ikonka birinchi kategoriyaga qarab (SERVICE — ko'k/odamlar, MANUFACTURING — binafsha/zavod, EDUCATION — havorang/shapka) — xarita `SolutionCard` ichida.
- Kategoriya belgilari (`Badge`, och kulrang pill): `categories` → `t("solutionCategories." + c.toLowerCase())`.
- Nom (Unbounded, ~20px), `shortDescription` (3 qatordan oshsa `…`).
- Pastda: **«Batafsil →»** (ko'k matn havola → `routes.solution(slug, lang)`) va **«Narxini so'rash»** (ko'k tugma → `useLeadModal().open(solution.id)`).
- Karta ichida ikkita bosiladigan element bor — butun kartani havola qilmang.
- Props: `solution`, `headingLevel` (standart `h3`).

## SEO

`<Seo title={...} />`. Filtr tanlanganda sarlavha: «Ta'lim uchun yechimlar — AUTOROB».

## Qabul mezonlari

- [ ] Dizaynga mos (1440px), 3/2/1 ustun
- [ ] Filtr URL'da, son to'g'ri, sahifa yangilanganda saqlanadi
- [ ] Rasm yo'q kartalarda gradient + ikonka; rasm bor bo'lsa `srcSet`
- [ ] «Narxini so'rash» ariza modalini shu yechim bilan ochadi
- [ ] Loading / bo'sh / xato holatlari
- [ ] `PageHero`, `Breadcrumbs`, `Chip`, `Badge`, `Skeleton`, `EmptyState`, `SolutionCard` eksport qilingan
- [ ] `npm run lint && npm test && npm run build` o'tadi

## Bonus

- `SolutionsFilter` testi: chip bosilganda URL'da `?soha=` o'zgaradi.
