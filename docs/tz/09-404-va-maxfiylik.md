# 09 — 404 sahifa va Maxfiylik siyosati

**URL:** mavjud bo'lmagan har qanday yo'l (`/abc`, `/ru/yoq-sahifa`), `/maxfiylik`  
**Dizayn:** «AUTOROB_09_404» (maxfiylik sahifasi dizaynda yo'q — oddiy matn sahifasi)  
**Qiyinlik:** ⭐ (boshlovchi uchun)

## Maqsad

- **404:** adashgan foydalanuvchi saytdan chiqib ketmasin — tushunarli xabar va qaytish yo'li.
- **Maxfiylik siyosati:** ariza formasidagi «shaxsiy ma'lumotlarni qayta ishlashga roziman» shu sahifaga olib keladi.

## Fayllar

| Fayl                                                        | Nima qilasiz                            |
| ----------------------------------------------------------- | --------------------------------------- |
| `src/pages/site/not-found/NotFoundPage.jsx` + `.module.css` | 404 dizayni                             |
| `src/pages/site/privacy/PrivacyPage.jsx` + `.module.css`    | Maxfiylik siyosati                      |
| lug'atlar                                                   | `"notFound"` (bor), `"privacy"` (yangi) |

## 1. 404 sahifa

Dizayn (oq fon, markazda):

- Juda katta, **och ko'k** (deyarli shaffof) «4 4» raqamlari, o'rtadagi «0» o'rnida **ko'k doira ichida oq robot ikonkasi** (doira atrofida oq halqa). Robot ikonkasini `shared/ui/Icon/icons/` ga qo'shing.
- Sarlavha `h1` (Unbounded): «Sahifa topilmadi».
- Matn: «Siz izlagan sahifa o'chirilgan yoki manzil noto'g'ri kiritilgan. Bosh sahifaga qayting yoki yechimlar katalogini ko'ring.»
- Ikki tugma: **«Bosh sahifaga →»** (ko'k, `routes.home(lang)`), **«Yechimlar katalogi»** (oq, chegara, `routes.solutions(lang)`).

Uch holatda tekshiring:

1. `/abc/def` — mavjud bo'lmagan yo'l;
2. `/xx/yechimlar` — noto'g'ri til prefiksi;
3. `/yechimlar/yoq-slug` va `/blog/yoq-slug` — 03 va 06 o'quvchilar sizning komponentingizni chaqiradi.

- `<Seo title={t("notFound.title")} noindex />` — **tayyor**, o'chirmang.
- `npm run build:prerender` dan keyin `dist/404.html` ni ochib tekshiring.

## 2. Maxfiylik siyosati — statik

Matn **lug'atda** (backend'dan kelmaydi), 3 tilda:

```json
"privacy": {
  "title": "Maxfiylik siyosati",
  "updatedAt": "2026-11-01",
  "sections": [
    { "title": "1. Umumiy qoidalar", "paragraphs": ["…", "…"] },
    { "title": "2. Qanday ma'lumotlar yig'iladi", "paragraphs": ["Ism va telefon raqami — ariza formasida.", "…"] }
  ]
}
```

`const privacy = useMessages("privacy")`.

- Sarlavha `h1`, «Oxirgi yangilanish: 1 noyabr 2026» (`formatDate`), bo'limlar `h2` + paragraflar.
- Matn ustuni ~720px — `Prose` (06-o'quvchiniki) stillarini qayta ishlating (`<div className={proseStyles.prose}>` yoki `Prose` ga `children` qabul qilishni kelishib oling).
- Bo'limlar mazmuni (o'qituvchidan aniq matnni oling): yig'iladigan ma'lumotlar (ism, telefon, sahifa manzili, UTM belgilari), maqsad (bog'lanish), saqlanmasligi (ariza Telegram'ga yuboriladi, saytda saqlanmaydi), uchinchi shaxslar (Telegram, Google Analytics), foydalanuvchi huquqlari, bog'lanish.
- `<Seo title={privacy.title} />`.
- **Bonus:** yon tomonda mundarija (`h2` lardan), bosilganda scroll.

## Qabul mezonlari

- [ ] 404 dizaynga mos, uch holatda to'g'ri, 3 tilda, `noindex` saqlangan
- [ ] Maxfiylik sahifasi lug'atdan, 3 tilda, 375 da o'qish qulay
- [ ] Ariza formasidagi «maxfiylik siyosati» havolasi shu sahifaga olib keladi (10-o'quvchi bilan tekshiring)
- [ ] `npm run lint && npm test && npm run build` o'tadi
