# AUTOROB sayti — sahifalar bo'yicha topshiriqlar (TZ)

Har bir o'quvchi bitta sahifani oladi. Avval shu faylni, keyin o'z TZ faylini oxirigacha o'qing.

| №     | Fayl                                                 | Sahifa                            | URL                | Dizayn (Figma frame)                       |
| ----- | ---------------------------------------------------- | --------------------------------- | ------------------ | ------------------------------------------ |
| 01 ✅ | [01-bosh-sahifa.md](01-bosh-sahifa.md)               | Bosh sahifa                       | `/`                | «Bosh sahifa — Desktop 1440», «HeroSlider» |
| 02    | [02-yechimlar-katalogi.md](02-yechimlar-katalogi.md) | Yechimlar katalogi                | `/yechimlar`       | AUTOROB_02_Yechimlar_katalogi              |
| 03    | [03-yechim-sahifasi.md](03-yechim-sahifasi.md)       | Bitta yechim                      | `/yechimlar/:slug` | AUTOROB_03_Yechim_sahifasi_CRM             |
| —     | —                                                    | Biz haqimizda                     | `/biz-haqimizda`   | AUTOROB_04 — **o'qituvchi qiladi**         |
| 05    | [05-blog.md](05-blog.md)                             | Blog ro'yxati                     | `/blog`            | AUTOROB_05_Blog                            |
| 06    | [06-maqola.md](06-maqola.md)                         | Maqola                            | `/blog/:slug`      | AUTOROB_06_Maqola                          |
| 07    | [07-faq.md](07-faq.md)                               | FAQ                               | `/faq`             | AUTOROB_07_FAQ                             |
| 08    | [08-kontaktlar.md](08-kontaktlar.md)                 | Kontaktlar                        | `/kontaktlar`      | AUTOROB_08_Kontaktlar                      |
| 09    | [09-404-va-maxfiylik.md](09-404-va-maxfiylik.md)     | 404 + Maxfiylik siyosati          | `*`, `/maxfiylik`  | AUTOROB_09_404                             |
| 10 ✅ | [10-ariza-formasi.md](10-ariza-formasi.md)           | Ariza formasi, modal va CTA bloki | (hamma sahifada)   | AUTOROB_10_Ariza_modali_holatlar           |

Header, Footer, TopBar, til tanlagich, **bosh sahifa (01)** va **ariza formasi / modal / CtaBand (10)** tayyor — ularga tegmang, namuna sifatida o'rganing. ✅ belgisi — bajarilgan.

## 1. Ishni boshlash

```bash
git checkout feat/frontend-skeleton
git pull
git checkout -b page/<sahifa-nomi>      # masalan: page/faq
npm install
npm run dev:mock                         # backend'siz, mock ma'lumot bilan — http://localhost:5173
```

Backend ishlab tursa (`http://localhost:4000`) — `npm run dev`. Ikkalasida ham kod bir xil.

Ish tugagach:

```bash
npm run lint && npm test && npm run build   # uchalasi ham xatosiz o'tishi shart
git push -u origin page/<sahifa-nomi>
```

GitHub'da `feat/frontend-skeleton` ga **Pull Request** oching. PR tavsifiga: 1440px va 375px dagi skrinshot, TZ'dagi qabul mezonlari ro'yxati (✅ belgilangan holda).

## 2. Loyihani tushunish (majburiy o'qish)

- [docs/FRONTEND_ARCHITECTURE.md](../FRONTEND_ARCHITECTURE.md) — 2-bo'lim (qatlamlar), 5-bo'lim (ma'lumot oqimi), 7-bo'lim (kod qoidalari).
- [docs/api/API_CONTRACT.md](../api/API_CONTRACT.md) — backend qaytaradigan **aniq** JSON. TZ'dagi namunalar shu fayldan.

Qisqacha:

```
pages (sahifa)  →  widgets (katta blok)  →  features (harakat)  →  entities (ma'lumot)  →  shared (UI kit, utils)
```

- **Sahifa** (`src/pages/site/...`) faqat widget'larni joylashtiradi va `<Seo/>` qo'yadi. Sahifada katta JSX bo'lmaydi.
- **Widget** (`src/widgets/site/...`) — sahifadagi bitta bo'lim. Ma'lumotni entity hook'idan oladi.
- **Entity** (`src/entities/...`) — API so'rovlari va hook'lar **tayyor**: `useSolutions`, `usePosts`, `useFaq`, `useStats`, `useContacts`… Har birida JSDoc bilan javob shakli yozilgan — VS Code'da hook ustiga sichqonchani olib boring.
- **shared/ui** — Button, Input, Modal, Accordion… Barcha sahifalar uchun umumiy.
- Boshqa slice'ga faqat `index.js` orqali kiriladi: `import { SolutionCard } from "@/entities/solution"`. Noto'g'ri import'ni `npm run lint` ushlaydi.

Har bir faylda `TODO:` izohi bor — nima qilish kerakligi yozilgan.

## 3. Ma'lumot qayerdan keladi: API yoki statik

| Turi                               | Qayerda                                             | Misol                                                                                              |
| ---------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **API** (admin paneldan o'zgaradi) | entity hook'lari                                    | yechimlar, maqolalar, FAQ, raqamlar, hamkorlar, kontaktlar                                         |
| **Statik** (bir marta yoziladi)    | `src/shared/i18n/dictionaries/{uz,ru,uz-Cyrl}.json` | hero slayder, bosh sahifa bloklari, yechim sahifasidagi «muammolar», «bosqichlar», maxfiylik matni |

Statik matn **kodga yozilmaydi** — lug'atga yoziladi va 3 tilda bo'ladi:

```js
const t = useT(); // bitta qator
t("faq.title");

const steps = useMessages("home.path.steps"); // massiv yoki obyekt
steps.map((step) => <StepCard key={step.title} {...step} />);
```

Har kim **o'z bo'limi kalitini** ishlatadi (`"home": {...}`, `"catalog": {...}`, `"faq": {...}`) — shunda PR'lar to'qnashmaydi. Tarjima qilib bo'lmasa, avval `uz.json` ni to'ldiring (boshqa tillarda topilmasa uz ko'rsatiladi), `ru` va `uz-Cyrl` ni PR'gacha qo'shing.

**HTML matn:** yechim va maqolaning `body` maydoni — backend tozalagan HTML. `<div className={styles.prose} dangerouslySetInnerHTML={{ __html: body }} />` bilan chiqariladi. FAQ javobi (`answer`) esa **oddiy matn** — `{answer}` bilan.

## 4. Mock ma'lumot (backend'siz ishlash)

- Brauzeringizda Service Worker ishlamasa (mock ma'lumot chiqmasa): ikkita terminalda `npm run mock:api` (mock'lar oddiy server sifatida, http://localhost:4000) va `npm run dev`.
- `npm run dev:mock` — so'rovlarni brauzer ichida **MSW** ushlaydi va `mocks/data.js` dagi ma'lumotni backend shaklida qaytaradi (`mocks/handlers.js`). Chrome yoki Edge'da ishlating.
- Ma'lumot dizayndagi matnlardan olingan: 6 ta yechim, 15 ta maqola, 5 ta FAQ bo'limi, 4 ta raqam, kontaktlar…
- Holatlarni sinash: ariza formasida ism **`429`** → «juda ko'p urinish» xatosi; mavjud bo'lmagan slug → 404; har so'rov ~0.4 soniya kechikadi (Skeleton ko'rinishi uchun).
- Mock'ga ma'lumot qo'shsangiz — shakli [API_CONTRACT.md](../api/API_CONTRACT.md) bilan bir xil bo'lsin. `npm test` ichidagi `mocks/handlers.test.js` buni tekshiradi.

## 5. Kod qoidalari

1. **Stillar — faqat CSS Modules.** Rang, oraliq, radius — faqat `src/app/styles/tokens.css` dagi o'zgaruvchilar: `color: var(--ink-900)`, `gap: var(--space-6)`. Kodda `#0b1220` yoki `24px` yozilmaydi (tokenda yo'q bo'lsa — qo'shing va PR'da ayting).
2. **Container:** bo'lim kontenti `<div className="container">` ichida (1140px).
3. **Uch til.** Har sahifa `/`, `/ru/...`, `/uz-cyrl/...` da ishlashi kerak. Havolalar faqat `routes` orqali: `routes.solution(slug, lang)`. `lang` → `useLocale()`.
4. **Bitta komponent ≤ 150 qator.**
5. **Rasmlar:** API rasmi `{ url, variants, width, height, alt }` — `<img src={img.url} srcSet={srcSet(img)} width={img.width} height={img.height} alt={img.alt} loading="lazy" />` (`srcSet` — `@/entities/media`). Rasm `null` bo'lishi mumkin — dizayndagi rangli fon + ikonka ko'rsatiladi.
6. **Kirish imkoniyati:** hamma tugma/havola klaviaturadan ishlaydi, fokus ko'rinadi, ikonka-tugmada `aria-label`.
7. **Responsiv:** 1440, 1024, 768, 375px. Gorizontal scroll bo'lmasin.
8. **Uch holat:** yuklanmoqda — `Skeleton`, bo'sh — `EmptyState`, xato — matn + «Qayta urinish». Oq ekran bo'lmasin.

## 6. Umumiy komponentlar — kim qiladi

Bir xil faylni ikki kishi o'zgartirsa, PR'lar to'qnashadi. **Boshqaning komponenti hali tayyor bo'lmasa — import qilib ishlataverasiz** (shablon bor), tayyor bo'lgach o'zi ko'rinadi.

| Komponent                                                                                | Fayl                                            | Egasi        | Kim ishlatadi          |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------ | ---------------------- |
| `SectionHeading` — eyebrow + sarlavha + matn                                             | `shared/ui/SectionHeading/` (yangi)             | 01 ✅ tayyor | hamma                  |
| `CoverArt` — rasm yo'q bo'lsa gradient + ikonka                                          | `shared/ui/CoverArt/`                           | 01 ✅ tayyor | 01, 02, 03, 05, 06     |
| `Button` — `variant`: primary / secondary / light / outline, `iconRight`, `to` (havola)  | `shared/ui/Button/`                             | ✅ tayyor    | hamma                  |
| `Card`                                                                                   | `shared/ui/Card/`                               | 01           | hamma                  |
| `PageHero` — ichki sahifa boshi (qorong'i, breadcrumbs, sarlavha, o'ngda ikonka doirasi) | `widgets/site/page-hero/` (yangi)               | 02           | 02, 05, 07, 08         |
| `Breadcrumbs`                                                                            | `shared/ui/Breadcrumbs/` (yangi)                | 02           | 02, 03, 05, 06, 07, 08 |
| `Chip`, `Badge`, `Skeleton`, `EmptyState`                                                | `shared/ui/...`                                 | 02           | hamma                  |
| `SolutionCard`                                                                           | `entities/solution/ui/`                         | 02           | 01, 02, 03             |
| `PostCard`                                                                               | `entities/post/ui/`                             | 05 ✅ tayyor | 01, 05, 06             |
| `Pagination`                                                                             | `shared/ui/Table/Pagination.jsx`                | 05           | 05, admin              |
| `Prose` — HTML matn stillari                                                             | `shared/ui/Prose/` (yangi)                      | 06           | 03, 06, 09             |
| `Accordion`                                                                              | `shared/ui/Accordion/`                          | 07           | 03, 07                 |
| `Input`, `Textarea`, `Select`, `Modal`, `FormField`                                      | `shared/ui/...`, `shared/form/`                 | 10 ✅ tayyor | hamma                  |
| `LeadForm`, `LeadModal`, `CtaBand` (sahifa oxiridagi ariza bloki)                        | `features/lead-form/`, `widgets/site/cta-band/` | 10 ✅ tayyor | hamma                  |

## 7. Baholash

| Mezon                                                          | Ball |
| -------------------------------------------------------------- | ---- |
| Dizayn bilan moslik (1440px)                                   | 25   |
| Responsiv (1024 / 768 / 375)                                   | 15   |
| Ma'lumot (API + statik), holatlar (loading / bo'sh / xato)     | 20   |
| 3 til, SEO                                                     | 10   |
| Kod qoidalari (qatlamlar, CSS tokenlar, ≤150 qator), lint toza | 20   |
| Kirish imkoniyati (klaviatura, alt, aria)                      | 10   |
| **Bonus** (TZ'dagi qo'shimcha vazifalar)                       | +10  |
