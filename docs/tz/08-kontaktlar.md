# 08 — Kontaktlar

**URL:** `/kontaktlar`, `/ru/kontaktlar`, `/uz-cyrl/kontaktlar`  
**Dizayn:** «AUTOROB_08_Kontaktlar» (1440×2129)  
**Qiyinlik:** ⭐⭐

## Maqsad

Mijoz bog'lanish yo'lini tez topadi: qo'ng'iroq qiladi, Telegram'ga yozadi, ofisga keladi (xarita) yoki shu yerda ariza qoldiradi.

## Fayllar

| Fayl                                                | Nima qilasiz                                                         |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| `src/pages/site/contacts/ContactsPage.jsx`          | `PageHero` (02-o'quvchiniki) + `ContactsBlock` + `MapEmbed`, `<Seo>` |
| `src/widgets/site/contacts-block/ContactsBlock.jsx` | Kontakt kartalari + ijtimoiy tarmoqlar + forma                       |
| `src/widgets/site/contacts-block/MapEmbed.jsx`      | Xarita                                                               |

## Ma'lumot

**Tayyor hook** — o'zingiz so'rov yozmaysiz:

```js
const { phone, phoneHref, telegram, telegramHref, email, emailHref, address, workHours, map, socials } =
  useContacts();
// @/entities/settings — backend GET /api/public/settings, bo'lmasa standart qiymatlar
```

Backend javobi:

```json
{
  "data": {
    "phone": "+998 90 123 45 67",
    "telegram": "@autorob_uz",
    "email": "info@autorob.uz",
    "address": "Namangan sh., ____ ko'chasi, __-uy",
    "workHours": "Du–Sha: 09:00–18:00",
    "map": { "lat": 40.9983, "lng": 71.6726 },
    "socials": { "instagram": "https://instagram.com/autorob_uz" }
  }
}
```

`map` — `null` bo'lishi mumkin. `socials` — kalitlari admin tomonidan erkin (`instagram`, `facebook`, `youtube` …). TopBar va Footer ham `useContacts()` ni ishlatadi — **ular buzilmasin**.

## Sahifa tuzilishi

### 1. `PageHero`

Breadcrumbs «Bosh sahifa › Kontaktlar», sarlavha «Kontaktlar», matn «Savolingiz bormi yoki loyihani muhokama qilmoqchimisiz? Biz bilan bog'laning.», ikonka — telefon.

### 2. Chap ustun — 2×2 kartalar (och kulrang, radius)

Har kartada: oq kvadratda ikonka, kichik kulrang yorliq, qalin qiymat.

| Karta     | Qiymat      | Amal                                                                           |
| --------- | ----------- | ------------------------------------------------------------------------------ |
| Manzil    | `address`   | — (bonus: «Xaritada ochish» → `https://yandex.uz/maps/?pt=${lng},${lat}&z=16`) |
| Telefon   | `phone`     | `<a href={phoneHref}>`                                                         |
| Telegram  | `telegram`  | `<a href={telegramHref} target="_blank">`                                      |
| Ish vaqti | `workHours` | —                                                                              |

Ostida «Ijtimoiy tarmoqlar»: doira tugmalar — Telegram, `socials` dagi har biri (instagram ikonkasi, boshqalari uchun umumiy havola ikonkasi), Email (`emailHref`). `aria-label` bilan.

### 3. O'ng ustun — forma kartasi

Oq karta, chegara: sarlavha «Ma'lumot qoldirish», kichik matn, **`<LeadForm variant="contacts" />`** — Ism, Telefon, **Izoh (ixtiyoriy)** textarea, «Yuborish →», rozilik matni. Formani 10-o'quvchi yozadi — siz faqat joylashtirasiz.

### 4. `MapEmbed` (container kengligida, radius)

- Yandex xarita `<iframe src={`https://yandex.uz/map-widget/v1/?ll=${lng},${lat}&z=16&pt=${lng},${lat},pm2blm`}>`, `title={t("contacts.mapTitle")}`, `loading="lazy"`.
- Ustida (dizayndagidek) kichik karta: «AUTOROB ofisi» + manzil.
- Xarita og'ir: sahifa ochilganda darhol yuklanmasin — ekranga yaqinlashganda (IntersectionObserver) yoki «Xaritani ko'rsatish» bosilganda.
- `map` null — xarita bloki ko'rinmaydi.

## SEO

- `<Seo title={t("contacts.seo.title")} description={...} />`
- **LocalBusiness JSON-LD** — `shared/seo/jsonld.js` ga `localBusinessLd(contacts)`: `name`, `telephone`, `email`, `address`, `geo` (`map`), `openingHours`.

## Qabul mezonlari

- [ ] Dizaynga mos (1440 / 375 — 375 da kartalar 1 ustun, forma ostida)
- [ ] Telefon — qo'ng'iroq, Telegram/ijtimoiy — yangi oynada
- [ ] Hamma qiymat `useContacts()` dan; TopBar va Footer hamon to'g'ri
- [ ] Xarita lazy, `iframe` da `title`; `map` null bo'lsa yashirinadi
- [ ] `localBusinessLd`
- [ ] `npm run lint && npm test && npm run build` o'tadi

## Bonus

- Telefon/email yonida «Nusxalash» → `navigator.clipboard` + toast.
