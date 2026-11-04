# 06 — Maqola sahifasi

**URL:** `/blog/:slug` (masalan `/blog/crm-joriy-qilish-5-qadam`)  
**Dizayn:** «AUTOROB_06_Maqola» (1440×2869)  
**Qiyinlik:** ⭐⭐ (+ umumiy `Prose`)

## Maqsad

Mijoz maqolani qulay o'qiydi: toza tipografiya, sarlavhalar, iqtibos, ro'yxatlar. Oxirida ulashadi va o'xshash maqolalarni ochadi.

## Fayllar

| Fayl                               | Nima qilasiz                                                          |
| ---------------------------------- | --------------------------------------------------------------------- |
| `src/pages/site/post/PostPage.jsx` | `slug` → ma'lumot, 404, `<Seo>`, bo'limlar                            |
| `src/widgets/site/article/`        | **Yangi**: `ArticleHeader.jsx`, `ArticleBody.jsx`, `ShareButtons.jsx` |
| `src/widgets/site/related-posts/`  | **Yangi**: «O'xshash maqolalar»                                       |
| `src/shared/ui/Prose/`             | **Yangi umumiy**: HTML matn stillari (03, 09 ham ishlatadi)           |

## API

`usePost(slug, lang)` → `GET /api/public/posts/crm-joriy-qilish-5-qadam?lang=uz`:

```json
{
  "data": {
    "id": "…",
    "slug": "crm-joriy-qilish-5-qadam",
    "title": "CRM joriy qilish: ishlab chiqarish korxonasi uchun 5 qadam",
    "excerpt": "…",
    "coverImage": null,
    "category": { "slug": "crm", "name": "CRM" },
    "authorName": "AUTOROB",
    "publishedAt": "2026-10-12T00:00:00.000Z",
    "readingMinutes": 6,
    "body": "<p>Ko'pchilik korxonalarda…</p><h2>1. Jarayonni qog'ozda chizing</h2><p>…</p><blockquote><p><strong>Eng yaxshi CRM…</strong></p></blockquote><ul><li>…</li></ul>",
    "seo": { "metaTitle": null, "metaDescription": null },
    "related": [{ "...": "PostCard shakli" }],
    "updatedAt": "…"
  }
}
```

Topilmasa — `404` → `<NotFoundPage />`. Yuklanmoqda — Skeleton (sarlavha + rasm + 5 qator).

**`body` — HTML** (backend tozalagan). Faqat shu teglar keladi: `h2, h3, p, br, strong, em, u, ul, ol, li, blockquote, a[href], img[src, alt]`. Markdown yo'q, o'zingiz parse qilmaysiz.

## 1. `Prose` — umumiy komponent (asosiy vazifa)

```jsx
<Prose html={post.body} /> // <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
```

Dizayn bo'yicha stillar (`.prose h2`, `.prose p` …):

- matn ustuni ~640–720px, markazda; paragraf 16px, qator oralig'i ~1.7, kulrang-qora;
- `h2` — Unbounded ~22px, yuqorida katta oraliq; `h3` — kichikroq;
- `blockquote` — och ko'k fon, chapda ko'k chiziq, qo'shtirnoq ikonkasi, qalin matn;
- `ul` — ko'k nuqtali marker; `ol` — raqamli;
- `a` — ko'k, tagiga chiziq; tashqi havolalar `target="_blank"` (backend `rel="noopener"` qo'yadi);
- `img` — `max-width: 100%`, radius, `loading="lazy"` (effekt bilan qo'shing).

## 2. Sahifa tuzilishi (oq fon, header ostida)

- **ArticleHeader** (matn ustuni kengligida): `Breadcrumbs` (02-o'quvchiniki, `theme="light"`): Bosh sahifa › Blog › CRM; kategoriya pill + `12 oktabr 2026 · 6 daqiqa o'qish`; sarlavha `h1` (Unbounded ~40px); muallif: avatar o'rnida odam ikonkasi (doira) + `authorName` (lavozim backend'da yo'q — chiqarilmaydi).
- **Muqova** — container kengligida (16:9, radius): `coverImage` yoki gradient + ikonka. `loading="eager"`.
- **ArticleBody** — `<Prose html={post.body} />`.
- **ShareButtons** — ingichka chiziq ostida «Ulashish:» + doira tugmalar: **Telegram** (`https://t.me/share/url?url=…&text=…`), **Facebook** (`https://www.facebook.com/sharer/sharer.php?u=…`), **Havolani nusxalash** (`navigator.clipboard.writeText(location.href)` + `useToast().success(t("article.copied"))`). Har birida `aria-label`. Mobil qurilmada `navigator.share` bo'lsa — bitta «Ulashish» tugmasi (bonus).
- **RelatedPosts** — och kulrang fon, «O'xshash maqolalar», `post.related` (3 ta) — `PostCard` (05-o'quvchiniki).

## SEO

- `<Seo title={post.seo.metaTitle || post.title} description={post.seo.metaDescription || post.excerpt} image={post.coverImage?.url} type="article" />`
- `articleLd(post)` (`@/shared/seo/jsonld.js`) — maydonlarni haqiqiy shaklga moslang: `headline`, `datePublished: publishedAt`, `dateModified: updatedAt`, `author: { "@type": "Organization", name: authorName }`, `image: coverImage?.url`.
- `breadcrumbLd`.

## Qabul mezonlari

- [ ] Dizaynga mos (1440 / 375), o'qish qulay
- [ ] `Prose` hamma ruxsat etilgan teglarni dizayn bo'yicha ko'rsatadi, boshqalar ishlata oladi
- [ ] Mavjud bo'lmagan slug → 404
- [ ] Ulashish: Telegram, Facebook, nusxalash + toast
- [ ] `type="article"`, `articleLd`, breadcrumbs
- [ ] `npm run lint && npm test && npm run build` o'tadi

## Bonus

- Mundarija: `body` dagi `h2` lardan (render qilingandan keyin DOM'dan `id` qo'yib), yon tomonda yopishib turadi.
- Sahifa tepasida o'qish progress chizig'i.
