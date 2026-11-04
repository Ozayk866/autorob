# 05 — Blog (maqolalar ro'yxati)

**URL:** `/blog`, `/blog?kategoriya=crm&page=2&q=robot`, `/ru/blog` …  
**Dizayn:** «AUTOROB_05_Blog» (1440×2927)  
**Qiyinlik:** ⭐⭐⭐

> ✅ `PostCard` va `CoverArt` (rasm o'rnidagi gradient + ikonka) **tayyor** — bosh sahifa uchun yozilgan. Blog sahifasida `<PostCard post={post} />` (ikonka bilan) ishlatasiz, qayta yozmaysiz.

## Maqsad

Mijoz foydali maqolalarni ko'radi, kategoriya bo'yicha filtrlaydi, qidiradi va ochadi. Blog — SEO orqali yangi mijoz olib keladi.

## Fayllar

| Fayl                                 | Nima qilasiz                                                         |
| ------------------------------------ | -------------------------------------------------------------------- |
| `src/pages/site/blog/BlogPage.jsx`   | `PageHero` (02-o'quvchiniki) + `BlogList` + `CtaBand`, `<Seo>`       |
| `src/widgets/site/blog-list/`        | **Yangi widget**: filtr, qidiruv, tanlangan maqola, to'r, sahifalash |
| `src/entities/post/ui/PostCard.jsx`  | Maqola kartasi (01, 06 ham ishlatadi — siz egasisiz)                 |
| `src/shared/ui/Table/Pagination.jsx` | Sahifalash (siz egasisiz)                                            |

## Sahifa tuzilishi

### 1. `PageHero`

Breadcrumbs «Bosh sahifa › Blog», sarlavha «Blog», matn «Avtomatlashtirish, CRM, ERP va robotlashtirish bo'yicha amaliy maqolalar.», ikonka — kitob.

### 2. Filtr qatori

- Chap: chip'lar **Hammasi** + kategoriyalar: `usePostCategories(lang)` (`@/entities/post-category`) → `[{ id, slug, name }]`. URL: `?kategoriya=crm` → API'ga `category: "crm"`.
- O'ng: **qidiruv** input (lupa ikonkasi, «Maqola qidirish»). URL: `?q=...` (`useDebounce`, 300ms).

### 3. Ro'yxat — sahifalash

```js
usePosts(lang, { category, page, pageSize: 7 }); // → { data: [...], meta: { page, pageSize, total } }
```

`GET /api/public/posts?lang=uz&category=crm&page=1&pageSize=7`:

```json
{
  "data": [
    {
      "id": "…",
      "slug": "crm-joriy-qilish-5-qadam",
      "title": "CRM joriy qilish: ishlab chiqarish korxonasi uchun 5 qadam",
      "excerpt": "…",
      "coverImage": null,
      "category": { "slug": "crm", "name": "CRM" },
      "authorName": "AUTOROB",
      "publishedAt": "2026-10-12T00:00:00.000Z",
      "readingMinutes": 6
    }
  ],
  "meta": { "page": 1, "pageSize": 7, "total": 15 }
}
```

- Sahifalar soni: `Math.ceil(meta.total / meta.pageSize)`. `page` URL'da: `?page=2`.
- **Har sahifaning birinchi maqolasi — «Tanlangan maqola»** (katta karta), qolgan 6 tasi to'rda (3×2). Shunda dizayndagi tuzilish har sahifada bir xil.
- **Qidiruv:** backend'da qidiruv yo'q — **frontendda** filtrlanadi: `q` bo'lsa `pageSize: 100` bilan barchasini olib, `title` va `excerpt` bo'yicha (katta-kichik harf farqsiz) filtrlang va sahifalashni ham frontendda qiling (7 tadan). Natija yo'q — `EmptyState` «"robot" bo'yicha maqola topilmadi» + «Qidiruvni tozalash».
- Kategoriya yoki qidiruv o'zgarsa — `page` 1 ga qaytadi. Sahifa almashganda — ro'yxat tepasiga scroll.
- Yuklanmoqda — Skeleton (katta + 6 ta). Xato — matn + «Qayta urinish».

### 4. Tanlangan maqola (katta karta)

Chapda katta rasm (radius) — `coverImage` yoki gradient + ikonka (kategoriya bo'yicha); o'ngda: «Tanlangan maqola» pill, sarlavha (Unbounded ~32px), `excerpt`, `Kategoriya · 18 oktabr 2026 · 7 daqiqa`, «O'qish →».

### 5. `PostCard`

Rasm (16:9, radius) — `coverImage` yoki gradient + ikonka; ostida `CRM · 12 oktabr 2026` (kulrang, kichik), sarlavha (qalin, 2 qatordan oshsa `…`). **Excerpt yo'q** (dizaynda). Butun karta — bitta havola → `routes.post(slug, lang)`. Sana: `formatDate(publishedAt, lang)` (`@/shared/lib`), `<time dateTime>`.

### 6. `Pagination`

Markazda: `1 2 3 … 8 ›` — kvadrat tugmalar, joriysi qora. Har biri `<Link to="?page=3">` (havola — Google keyingi sahifalarni topadi), `aria-current="page"`. Props: `page`, `pages`, `getHref(page)`. Admin ham ishlatadi.

### 7. `<CtaBand />`

## SEO

`<Seo title={t("blog.seo.title")} />`; 2-sahifadan boshlab «— 2-sahifa». Qidiruv natijasi sahifasi `noindex`.

## Qabul mezonlari

- [ ] Dizaynga mos (1440 / 375)
- [ ] Kategoriya, qidiruv, sahifa — URL'da; sahifa yangilanganda saqlanadi
- [ ] Har sahifada birinchi maqola katta karta
- [ ] Qidiruv frontendda, natija yo'q holati bor
- [ ] Sana tanlangan tilda (`12 oktabr 2026` / `12 октября 2026 г.`)
- [ ] `PostCard`, `Pagination` eksport qilingan
- [ ] `npm run lint && npm test && npm run build` o'tadi

## Bonus

- `Pagination` testi (1, o'rta, oxirgi sahifa; `…` qachon chiqadi).
- Qidiruvda topilgan so'zni sarlavhada `<mark>` bilan belgilash.
