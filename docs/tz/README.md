# AUTOROB sayti — o'quvchilar topshiriqlari

O'quvchilar uchun topshiriqlar — **Word fayllarda**: [`word/`](word/) papkasi. Har bir o'quvchiga bitta fayl.

| №   | Fayl                                | O'quvchi    | Sahifa             | Ishlaydigan fayllar                                                |
| --- | ----------------------------------- | ----------- | ------------------ | ------------------------------------------------------------------ |
| 02  | `02_Yechimlar_katalogi_Behruz.docx` | Behruz      | `/yechimlar`       | `src/pages/Solutions/`  |
| 03  | `03_Yechim_sahifasi_CRM.docx`       | —           | `/yechimlar/:slug` | `src/pages/Solution/`  |
| 04  | `04_Biz_haqimizda_Xolmirzayev.docx` | Xolmirzayev | `/biz-haqimizda`   | `src/pages/About/`  |
| 05  | `05_Blog_SkiLLzaR.docx`             | SkiLLzaR    | `/blog`            | `src/pages/Blog/`  |
| 06  | `06_Maqola_Abdulazeez.docx`         | Abdulazeez  | `/blog/:slug`      | `src/pages/Post/`  |
| 07  | `07_FAQ_Islombek.docx`              | Islombek    | `/faq`             | `src/pages/Faq/`  |
| 08  | `08_Kontaktlar_Dilmurod.docx`       | Dilmurod    | `/kontaktlar`      | `src/pages/Contacts/`  |
| 09  | `09_404_va_Maxfiylik_Islomjon.docx` | Islomjon    | `*`, `/maxfiylik`  | `src/pages/NotFound/`, `src/pages/Privacy/` |

## Loyiha tuzilishi

```
src/
  components/   umumiy komponentlar: Button, Icon, Header/Footer (Layout), LeadForm, PageHero, CtaBand, PostCard …
  pages/        sahifalar — har biri o'z papkasida, bo'limlarga bo'lingan (HomePage, BlogPage, BlogFilter …)
  i18n/         tarjimalar (uz, uz-Cyrl, ru), til, sahifa manzillari (routes), formatDate
  data/         ma'lumotlar: yechimlar, maqolalar, FAQ, jamoa, kontaktlar (backend kelguncha)
  styles/       ranglar va o'lchamlar (tokens.css), shriftlar, umumiy stillar
```

## Qisqa qoidalar

- Har bir o'quvchi faqat o'z sahifasi papkasida ishlaydi: bo'lim `.jsx` fayllari va oddiy `XxxPage.css`.
- Ma'lumot `@/data/...` dan import qilinadi, komponentlar `@/components` dan.
- CSS klasslari sahifa nomi bilan boshlanadi: `faq-`, `blog-`, `catalog-` …

> Word fayllar hali eski tuzilishni (pages/site, useTeam …) tushuntiradi — yangilanishi kerak.
