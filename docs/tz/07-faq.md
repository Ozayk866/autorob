# 07 — FAQ (ko'p beriladigan savollar)

**URL:** `/faq`, `/faq?bolim=<id>`, `/ru/faq` …  
**Dizayn:** «AUTOROB_07_FAQ» (1440×1821)  
**Qiyinlik:** ⭐⭐ (+ umumiy `Accordion`)

## Maqsad

Mijoz o'z savoliga tez javob topadi (narx, muddat, uskunalar, texnik yordam). Topmasa — ariza qoldiradi.

## Fayllar

| Fayl                                              | Nima qilasiz                                              |
| ------------------------------------------------- | --------------------------------------------------------- |
| `src/pages/site/faq/FaqPage.jsx`                  | `PageHero` (02-o'quvchiniki) + FAQ + savol bloki, `<Seo>` |
| `src/widgets/site/faq-accordion/FaqAccordion.jsx` | Savollar ro'yxati (03 ham ishlatadi)                      |
| `src/widgets/site/faq-browser/`                   | **Yangi**: chapda bo'limlar, o'ngda `FaqAccordion`        |
| `src/shared/ui/Accordion/`                        | **Umumiy Accordion** (siz egasisiz)                       |

## API

`useFaq(lang)` (`@/entities/faq`) → `GET /api/public/faq?lang=uz`:

```json
{ "data": [
  { "id": "…-000000000001", "name": "Umumiy", "items": [
    { "id": "…", "question": "AUTOROB qaysi sohalarda ishlaydi?", "answer": "Servis kompaniyalari, ta'lim muassasalari…" }
  ] },
  { "id": "…-000000000002", "name": "Narx va to'lov", "items": [ … ] }
] }
```

- Faqat savoli bor bo'limlar keladi, admin tartibida.
- **`answer` — oddiy matn** (HTML emas): `{item.answer}`, `dangerouslySetInnerHTML` ishlatilmaydi. Qator ko'chishi bo'lsa — `white-space: pre-line`.
- Hamma bo'limlar bitta so'rovda keladi — bo'lim almashganda yangi so'rov shart emas (frontendda tanlanadi).

## 1. `PageHero`

Breadcrumbs «Bosh sahifa › FAQ», sarlavha «Ko'p beriladigan savollar», matn «Narx, muddat, joriy etish va texnik yordam haqida eng ko'p so'raladigan savollar.», ikonka — naushnik.

## 2. `FaqBrowser` — 2 ustun

- **Chap** (~220px, yopishib turadi): bo'limlar ro'yxati — Umumiy, Narx va to'lov, Joriy etish, Robotlar va uskunalar, Texnik yordam. Faol bo'lim — och ko'k fon, ko'k matn. Tanlangan bo'lim URL'da: `?bolim=<id>` (standart — birinchisi).
- **O'ng**: `<FaqAccordion items={activeCategory.items} />` — birinchi savol ochiq.
- 375px: bo'limlar tepada gorizontal chip'lar qatori (scroll).
- URL'da `#<savol-id>` bo'lsa — o'sha savolning bo'limi tanlanadi, savol ochiladi va unga scroll.

## 3. `Accordion` (umumiy)

```jsx
<Accordion items={[{ id, title, content }]} defaultOpenId={items[0]?.id} allowMultiple={false} />
```

- Har qator: savol (qalin) + o'ngda doira tugma: yopiq — kulrang `+`, ochiq — **ko'k doira, oq `−`**; qatorlar orasida ingichka chiziq.
- `<h3><button aria-expanded aria-controls>`, panel `role="region"` `aria-labelledby`.
- Silliq ochilish (`grid-template-rows: 0fr → 1fr`), `prefers-reduced-motion` da animatsiyasiz.
- Enter/Space; ↑ ↓ bilan savollar orasida (bonus).

`FaqAccordion` — `Accordion` ustidagi yupqa o'ram: `items` (`{ id, question, answer }`) → `{ id, title: question, content: answer }`.

## 4. «Savolingiz qoldimi?» bloki

O'ng ustun ostida och kulrang karta: chapda oq kvadratda naushnik ikonkasi, sarlavha «Savolingiz qoldimi?», matn «Ma'lumot qoldiring — mutaxassis 1 ish kuni ichida javob beradi.», o'ngda ko'k tugma «Ma'lumot qoldirish →» → `useLeadModal().open()`.

## SEO

- `<Seo title={t("faq.seo.title")} description={...} />`
- **FAQPage JSON-LD** — `shared/seo/jsonld.js` ga `faqLd(categories)` qo'shing (barcha bo'limlardagi savollar):
  ```js
  { "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": items.map(i => ({ "@type": "Question", "name": i.question,
      "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) }
  ```

## Qabul mezonlari

- [ ] Dizaynga mos (1440 / 375)
- [ ] `Accordion` ARIA bilan, klaviaturadan ishlaydi, animatsiya silliq; 03-o'quvchi ishlata oladi
- [ ] Bo'lim URL'da; `#id` bilan kelganda savol ochiq
- [ ] Javob oddiy matn sifatida chiqadi
- [ ] Loading (Skeleton) / xato holatlari
- [ ] `faqLd` qo'shilgan
- [ ] `Accordion` testi: bosilganda `aria-expanded` o'zgaradi
- [ ] `npm run lint && npm test && npm run build` o'tadi
