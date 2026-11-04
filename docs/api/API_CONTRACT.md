# AUTOROB API — frontend uchun kontrakt

> Bu hujjat **hozir kodda bor** narsani tasvirlaydi (commit `8afa322`, 6-bosqich). JSON namunalari
> ishlab turgan API'dan olingan haqiqiy javoblar; ro'yxatlarda bitta element ko'rsatilgan.
> Interaktiv hujjat (dev muhitida): `GET /api/docs` (Swagger UI), `GET /api/openapi.json`.

## Mundarija

1. [Umumiy qoidalar](#1-umumiy-qoidalar)
2. [Tarjima maydonlari](#2-tarjima-maydonlari)
3. [Rasm obyekti](#3-rasm-obyekti)
4. [Sahifalash](#4-sahifalash)
5. [Auth: sessiya cookie](#5-auth-sessiya-cookie)
6. [CORS va kesh](#6-cors-va-kesh)
7. [Xatolar](#7-xatolar)
8. [Public API — sayt uchun](#8-public-api--sayt-uchun)
9. [Admin API — auth](#9-admin-api--auth)
10. [Admin API — kontent](#10-admin-api--kontent)
11. [Admin API — media](#11-admin-api--media)
12. [Boshqa yo'llar](#12-boshqa-yollar)

---

## 1. Umumiy qoidalar

|                 |                                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| Base URL (dev)  | `http://localhost:4000`                                                         |
| Public API      | `/api/public/*` — auth'siz                                                      |
| Admin API       | `/api/admin/*` — sessiya cookie bilan                                           |
| Format          | JSON (`Content-Type: application/json`), rasm yuklash — `multipart/form-data`   |
| Muvaffaqiyat    | `{ "data": ... }`, sahifalangan ro'yxatlarda `{ "data": [...], "meta": {...} }` |
| Xato            | `{ "error": { "code", "message", "details"? } }`                                |
| `204` javoblar  | Tanasiz (logout, o'chirish, reorder, parol o'zgartirish)                        |
| Sanalar         | ISO 8601, UTC: `"2026-11-04T10:10:34.427Z"`                                     |
| ID'lar          | UUID (faqat sozlamalar `id: 1`)                                                 |
| JSON body hajmi | 1 MB gacha                                                                      |

**`PATCH` qoidasi:** faqat yuborilgan yuqori darajadagi maydonlar o'zgaradi. Ichki obyektlar
(`title`, `seo`, `features`, `primaryCta` …) **to'liq almashtiriladi** — masalan, `title` ichida
faqat `ru` ni o'zgartirish uchun ham `{ "uz": "...", "ru": "..." }` ni to'liq yuboring.

**`null`:** ixtiyoriy maydonni tozalash uchun `null` yuboriladi (masalan, `"coverImageId": null`,
`"priceText": null`). Maydonni yubormaslik — o'zgartirmaslik.

---

## 2. Tarjima maydonlari

Tillar: `uz` (lotin, majburiy), `uz-Cyrl` (kirill), `ru`.

### Admin API — to'liq obyekt

Admin har doim `LocalizedText` obyektini oladi va yuboradi:

```json
{ "uz": "CRM tizimi", "ru": "CRM-система" }
```

- `uz` majburiy, bo'sh bo'lmasligi kerak (aks holda `400`, `path: "title.uz"`).
- `uz-Cyrl` va `ru` ixtiyoriy. Bo'sh qator yoki faqat probel yuborilsa — saqlanmaydi.
- Javobda tarjima qilinmagan til **kalit sifatida umuman kelmaydi** (`"ru": ""` emas, kalit yo'q).
- Kalitlar tartibi kafolatlanmaydi (`{"ru": ..., "uz": ...}` ham bo'lishi mumkin).

Admin ro'yxatlari va bitta yozuv javoblarida `translationStatus` bor:

```json
"translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "partial" }
```

Har bir til uchun yozuvdagi **barcha** tarjima maydonlari hisoblanadi
(massivlar — har elementi, SEO maydonlari — bor bo'lsa):
`complete` — hammasi to'la, `partial` — bir qismi, `missing` — hech biri.

`translationStatus` bor joylar: yechimlar, hero, maqolalar, FAQ bo'limlari va savollari, jamoa,
tarix, raqamlar, sahifa matnlari. **Yo'q joylar:** blog kategoriyalari, hamkorlar (nomi oddiy
qator), sozlamalar, media.

### Public API — oddiy qator

Public API `?lang=uz|uz-Cyrl|ru` parametrini oladi (default `uz`) va tarjima maydonlarini
**oddiy qator** qilib qaytaradi. So'ralgan tilda matn bo'lmasa — `uz` matni qaytadi.

```
GET /api/public/solutions/crm-tizimi?lang=ru
→ "title": "CRM-система"                     (ru bor)
→ "shortDescription": "Mijozlar, sotuvlar…"  (ru yo'q → uz)
```

- Noma'lum `lang` qiymati (`?lang=en`) xato bermaydi — `uz` deb olinadi.
- Ixtiyoriy tarjima maydoni (masalan, `priceText`, `seo.metaTitle`) bo'lmasa — `null`.
- Rasm `alt` matni bo'lmasa — `""` (bo'sh qator).

### Rich text (HTML)

`body` maydonlari (yechimlar, maqolalar) — HTML. Saqlashda server tozalaydi; ruxsat etilgan teglar:
`h2, h3, p, br, strong, em, u, ul, ol, li, blockquote, a[href], img[src, alt]`.
`<a>` ga avtomatik `rel="noopener"` qo'shiladi; `javascript:` havolalar olib tashlanadi.
Boshqa teglar va atributlar (`<script>`, `onclick`, `class`, `style` …) o'chiriladi.

Masalan, `"<p>Matn <script>x</script></p>"` → `"<p>Matn </p>"`.

**FAQ javoblari (`answer`) HTML emas** — oddiy matn, tozalanmaydi; matn sifatida chiqaring.

---

## 3. Rasm obyekti

Rasmlar alohida yuklanadi (`POST /api/admin/media`), kontentga esa ID orqali biriktiriladi:
`coverImageId`, `backgroundImageId`, `mobileImageId`, `photoId`, `logoId`.

### Admin javoblarida (biriktirilgan rasm)

```json
"coverImage": {
  "id": "55a774f9-1d58-4bf2-86ff-63ab6685b6bc",
  "url": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp",
  "variants": {
    "480": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-480.webp",
    "1024": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp"
  },
  "width": 1024,
  "height": 576,
  "alt": { "ru": "Роботизированная линия", "uz": "Robot liniyasi" }
}
```

Rasm biriktirilmagan bo'lsa — `null`. `alt` admin'da `LocalizedText | null`.

### Public javoblarida

```json
"coverImage": {
  "url": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp",
  "variants": {
    "480": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-480.webp",
    "1024": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp"
  },
  "width": 1024,
  "height": 576,
  "alt": "Роботизированная линия"
}
```

Public'da `id` yo'q, `alt` — tanlangan tildagi qator (yo'q bo'lsa `""`).

### Qoidalar

- Barcha rasmlar **WebP**.
- `variants` — `{ "<kenglik px>": url }`. Kalitlar **qator** (`"480"`), mumkin bo'lganlari:
  `"1920"`, `"1024"`, `"480"`. Asl rasmdan katta o'lcham yaratilmaydi: 1600 px rasmda faqat
  `"1024"` va `"480"` bo'ladi; 480 px dan kichik rasmda bitta kalit — asl kenglik (masalan `"300"`).
- `url` — eng katta variant; `width`/`height` — shu variantning o'lchami (asl rasmniki emas).
- `srcset` uchun: `Object.entries(variants).map(([w, url]) => \`${url} ${w}w\`).join(", ")`.
- URL'lar to'liq (absolute), `PUBLIC_MEDIA_BASE_URL` bilan boshlanadi.

---

## 4. Sahifalash

Sahifalash faqat uch joyda bor: `GET /api/public/posts`, `GET /api/admin/posts`,
`GET /api/admin/media`. Qolgan ro'yxatlar hammasini birdaniga qaytaradi (`meta` yo'q).

| Parametr   | Default | Chegara |
| ---------- | ------- | ------- |
| `page`     | `1`     | ≥ 1     |
| `pageSize` | `20`    | 1–100   |

`limit`, `offset`, `perPage` parametrlari **yo'q** — faqat `page` va `pageSize`.
Chegaradan tashqari qiymat (`page=0`, `pageSize=500`) → `400 VALIDATION_ERROR`.

```json
{
  "data": [ ... ],
  "meta": { "page": 1, "pageSize": 2, "total": 3 }
}
```

`total` — filtrlardan keyingi umumiy son. Sahifalar soni: `Math.ceil(total / pageSize)`.

---

## 5. Auth: sessiya cookie

Token yoki `Authorization` sarlavhasi **yo'q**. Sessiya httpOnly cookie orqali ishlaydi.

|               |                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------- |
| Cookie nomi   | `autorob_sid`                                                                                 |
| Atributlar    | `HttpOnly; SameSite=Lax; Path=/`, production'da `Secure`                                      |
| Muddat        | 12 soat; login'da `remember: true` bo'lsa 30 kun (`Max-Age=2592000`)                          |
| Sliding       | Har so'rovda muddat uzaytiriladi (ko'pi bilan daqiqasiga bir marta, yangi `Set-Cookie` bilan) |
| JS'dan o'qish | Mumkin emas (httpOnly). Kirganlikni bilish uchun `GET /api/admin/auth/me`                     |

### Frontend'dan so'rov

```ts
fetch(`${API}/api/admin/solutions`, {
  method: "POST",
  credentials: "include", // cookie yuborilishi uchun shart
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "autorob-admin", // CSRF himoyasi
  },
  body: JSON.stringify(payload),
});
```

### CSRF

`/api/admin/*` dagi **GET/HEAD/OPTIONS bo'lmagan** har bir so'rovda:

1. `X-Requested-With: autorob-admin` sarlavhasi bo'lishi shart.
2. `Origin` sarlavhasi bo'lsa — `WEB_ORIGIN` (dev: `http://localhost:5173`) yoki API'ning o'z
   manzili bo'lishi kerak.

Bajarilmasa: `403 CSRF_FAILED`. Bu login'ga ham tegishli. Sarlavhani hamma admin so'rovlariga
qo'shib qo'yish xavfsiz.

### Holatlar

| Holat                                 | Javob                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| Cookie yo'q / sessiya tugagan         | `401 UNAUTHENTICATED` (tugagan sessiya cookie'si tozalanadi)                       |
| `mustChangePassword: true`            | `/api/admin/auth/*` dan boshqa hamma admin yo'llari `403 PASSWORD_CHANGE_REQUIRED` |
| 5 marta noto'g'ri parol               | Akkaunt 15 daqiqaga bloklanadi: `423 ACCOUNT_LOCKED`                               |
| IP'dan 15 daqiqada 20 dan ortiq login | `429 TOO_MANY_REQUESTS`                                                            |

Sessiyasiz admin so'rovi (mavjud bo'lmagan yo'l ham) `401` qaytaradi; kirilgan holatda mavjud
bo'lmagan yo'l — `404 NOT_FOUND`.

Rol bitta — admin. Rollar/ruxsatlar bo'yicha farq yo'q.

---

## 6. CORS va kesh

### CORS

- Faqat bitta origin ruxsat etilgan: `WEB_ORIGIN` env'i (dev `.env`: `http://localhost:5173`).
  Bu public va admin API'ga ham tegishli.
- `Access-Control-Allow-Credentials: true` — `credentials: "include"` ishlaydi.
- Ruxsat etilgan metodlar: `GET, HEAD, PUT, PATCH, POST, DELETE`; so'ralgan sarlavhalar
  (masalan, `Content-Type`, `X-Requested-With`) preflight'da qaytariladi.
- `Access-Control-Allow-Origin` har doim `WEB_ORIGIN` qiymatini qaytaradi (so'rov qaysi
  origin'dan kelganidan qat'i nazar). Boshqa origin'dagi sahifa uchun bu mos kelmaydi, shuning
  uchun brauzer javobni bloklaydi. Server tomonida so'rov baribir bajariladi.
- Preflight (`OPTIONS`) — `204`.

**Cookie va domenlar:** cookie `SameSite=Lax` va `Domain` atributisiz (faqat API host'i uchun).
Brauzer uni `fetch` bilan faqat sayt va API **bir xil "site"** bo'lganda yuboradi
(port farqi ahamiyatsiz: `localhost:5173` → `localhost:4000` ishlaydi;
`autorob.uz` → `api.autorob.uz` ham bir site). `localhost:5173` dan `192.168.0.152:4000` ga
yuborilgan admin so'rovida cookie ketmaydi.

### Kesh

- Barcha `GET /api/public/*` javoblarida (xato javoblarida ham):
  `Cache-Control: public, max-age=60, stale-while-revalidate=300`.
  Admin'da o'zgartirilgan kontent saytda 60 soniyagacha eski ko'rinishi mumkin.
- `/uploads/*` (rasmlar, `STORAGE_DRIVER=local`): `max-age` 1 yil, `immutable`,
  `Cross-Origin-Resource-Policy: cross-origin`.

---

## 7. Xatolar

Barcha xatolar bir xil shaklda:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Kiritilgan ma'lumotlar noto'g'ri",
    "details": [
      { "path": "title.uz", "message": "Invalid input: expected string, received undefined" },
      { "path": "shortDescription", "message": "Invalid input: expected object, received undefined" }
    ]
  }
}
```

- `code` — dastur uchun (barqaror), `message` — odam uchun (o'zbekcha; zod'ning standart
  xabarlari inglizcha bo'lishi mumkin, masalan yuqoridagi kabi).
- `details` — faqat ba'zi xatolarda. Validatsiya xatolarida `[{ path, message }]`:
  `path` — nuqta bilan (`"title.uz"`, `"features.0.uz"`, `"primaryCta.href"`), body'ning o'zi
  noto'g'ri bo'lsa `""`. Forma maydoni ostida xato ko'rsatish uchun shu `path` ishlatiladi.

| Status | `code`                     | Qachon                                                                        | `details`                              |
| ------ | -------------------------- | ----------------------------------------------------------------------------- | -------------------------------------- |
| 400    | `VALIDATION_ERROR`         | Body/query/sxema xatosi; hero `accentWord`; `SCHEDULED` sanasiz               | `[{ path, message }]`                  |
| 400    | `BAD_REQUEST`              | Buzuq JSON (`message` — parserning inglizcha xabari)                          | —                                      |
| 400    | `INVALID_PASSWORD`         | Parol o'zgartirishda joriy parol noto'g'ri                                    | `[{ "path": "currentPassword", ... }]` |
| 400    | `INVALID_IDS`              | Reorder'da mavjud bo'lmagan id (hech narsa o'zgarmaydi)                       | —                                      |
| 400    | `MEDIA_NOT_FOUND`          | Biriktirilayotgan rasm ID'si yo'q                                             | —                                      |
| 400    | `CATEGORY_NOT_FOUND`       | Maqola/FAQ savoli uchun kategoriya yo'q                                       | —                                      |
| 400    | `SOLUTION_NOT_FOUND`       | FAQ `solutionIds` ichida noma'lum yechim                                      | —                                      |
| 400    | `UNSUPPORTED_FILE`         | Rasm JPEG/PNG/WebP emas (fayl mazmuni bo'yicha)                               | —                                      |
| 400    | `INVALID_IMAGE`            | Rasm buzilgan, o'qib bo'lmadi                                                 | —                                      |
| 400    | `INVALID_UPLOAD`           | `file` maydoni yo'q yoki bir nechta fayl                                      | —                                      |
| 401    | `INVALID_CREDENTIALS`      | Email yoki parol noto'g'ri (noma'lum email uchun ham xuddi shunday)           | —                                      |
| 401    | `UNAUTHENTICATED`          | Sessiya yo'q yoki tugagan                                                     | —                                      |
| 403    | `CSRF_FAILED`              | `X-Requested-With` yo'q yoki begona `Origin`                                  | —                                      |
| 403    | `PASSWORD_CHANGE_REQUIRED` | Avval parolni almashtirish kerak                                              | —                                      |
| 404    | `NOT_FOUND`                | Yozuv yoki yo'l topilmadi (noto'g'ri UUID ham)                                | —                                      |
| 409    | `ALREADY_EXISTS`           | Slug band                                                                     | —                                      |
| 409    | `IN_USE`                   | O'chirilayotgan yozuv ishlatilmoqda (masalan, maqolasi bor blog kategoriyasi) | media'da `{ usedIn: [...] }`           |
| 413    | `FILE_TOO_LARGE`           | Rasm 5 MB dan katta                                                           | —                                      |
| 413    | `BAD_REQUEST`              | JSON body 1 MB dan katta                                                      | —                                      |
| 423    | `ACCOUNT_LOCKED`           | 5 noto'g'ri urinishdan keyin                                                  | `{ "lockedUntil": "<ISO sana>" }`      |
| 429    | `TOO_MANY_REQUESTS`        | Rate limit (login, ariza)                                                     | —                                      |
| 500    | `INTERNAL_ERROR`           | Kutilmagan xato                                                               | dev'da stack trace, production'da yo'q |

Rate limit javoblarida `RateLimit-Policy` va `RateLimit` sarlavhalari (IETF draft-8) bor,
masalan ariza uchun: `RateLimit: "5-in-10min"; r=0; t=600` (`r` — qolgan urinishlar,
`t` — necha soniyadan keyin yangilanadi).

---

## 8. Public API — sayt uchun

Hamma GET yo'llari `?lang=uz|uz-Cyrl|ru` oladi (§2). Faqat ko'rinadigan yozuvlar qaytadi:
yechimlar — `PUBLISHED`; maqolalar — nashr vaqti kelganlari; hero, FAQ, jamoa, hamkorlar —
`isActive: true`. Tartib — admin paneldagi (`sortOrder`).

### `GET /api/public/settings`

```json
{
  "data": {
    "phone": "+998 90 123 45 67",
    "telegram": "@autorob_uz",
    "email": "info@autorob.uz",
    "address": "г. Ташкент, Чиланзар",
    "workHours": "Du–Sha: 09:00–18:00",
    "map": { "lat": 41.2995, "lng": 69.2401 },
    "socials": { "instagram": "https://instagram.com/autorob" },
    "analytics": { "gaId": "G-XXXXXXX", "metrikaId": null, "metaPixelId": null }
  }
}
```

`map` — koordinatalardan biri bo'lmasa `null`. `socials` — `{ nom: url }` (kalitlar admin
tomonidan erkin beriladi, masalan `instagram`, `facebook`). Telegram bot tokeni hech qachon
qaytmaydi.

### `GET /api/public/hero-slides`

```json
{
  "data": [
    {
      "id": "00000000-0000-4000-8002-000000000001",
      "title": "Har bir mijoz — nazoratda",
      "accentWord": "nazoratda",
      "text": "Biznesingizni avtomatlashtirishda yordam beramiz.",
      "primaryCta": { "label": "Ma'lumot qoldirish", "href": "#ariza" },
      "secondaryCta": { "label": "Batafsil", "href": "/yechimlar/crm-tizimi" },
      "backgroundImage": null,
      "mobileImage": null,
      "durationSec": 5
    }
  ]
}
```

`accentWord` har doim shu tildagi `title` ichida bor (server tekshiradi) — ajratib ko'rsatish
uchun. `secondaryCta`, rasmlar — `null` bo'lishi mumkin. `href` `/`, `#` yoki `http(s)://` bilan
boshlanadi.

### `GET /api/public/solutions`

| Query      | Qiymat                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `category` | `service` \| `education` \| `manufacturing` (katta-kichik harf farqsiz). Noto'g'ri qiymat → `400` |

```json
{
  "data": [
    {
      "id": "00000000-0000-4000-8001-000000000001",
      "slug": "crm-tizimi",
      "title": "CRM-система",
      "shortDescription": "Mijozlar, sotuvlar va qo'ng'iroqlarni bitta oynada boshqaring.",
      "categories": ["SERVICE"],
      "coverImage": {
        "url": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp",
        "variants": {
          "480": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-480.webp",
          "1024": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp"
        },
        "width": 1024,
        "height": 576,
        "alt": "Роботизированная линия"
      }
    }
  ]
}
```

`categories` — `SERVICE`, `EDUCATION`, `MANUFACTURING` dan 0–3 tasi (javobda doim katta harf).

### `GET /api/public/solutions/:slug`

Yechim + unga bog'langan faol FAQ + 3 ta boshqa nashr qilingan yechim (`related`).
Topilmasa yoki `DRAFT` bo'lsa — `404 NOT_FOUND`.

```json
{
  "data": {
    "id": "00000000-0000-4000-8001-000000000001",
    "slug": "crm-tizimi",
    "title": "CRM-система",
    "shortDescription": "Mijozlar, sotuvlar va qo'ng'iroqlarni bitta oynada boshqaring.",
    "categories": ["SERVICE"],
    "coverImage": {
      "url": "…",
      "variants": { "480": "…", "1024": "…" },
      "width": 1024,
      "height": 576,
      "alt": "Роботизированная линия"
    },
    "body": "<h2>CRM tizimi</h2><p>Bu namunaviy matn. Haqiqiy kontent admin paneldan kiritiladi.</p>",
    "features": ["Mijozlar bazasi", "Sotuv voronkasi", "Telefoniya va Telegram integratsiyasi"],
    "showPriceRequest": true,
    "priceText": "Narx kelishiladi",
    "seo": { "metaTitle": "CRM tizimi — AUTOROB", "metaDescription": null },
    "faq": [
      {
        "id": "00000000-0000-4000-8004-000000000006",
        "question": "Joriy etish qancha vaqt oladi?",
        "answer": "CRM — 2–4 hafta, ERP — 2–6 oy, loyihaga bog'liq."
      }
    ],
    "related": [
      {
        "id": "00000000-0000-4000-8001-000000000002",
        "slug": "erp-tizimi",
        "title": "ERP tizimi",
        "shortDescription": "Ombor, ishlab chiqarish, moliya va kadrlar — bitta tizimda.",
        "categories": ["SERVICE", "MANUFACTURING"],
        "coverImage": null
      }
    ],
    "updatedAt": "2026-11-04T10:10:34.879Z"
  }
}
```

`related` elementlari ro'yxatdagi element shaklida. `priceText` va `seo.*` — `null` bo'lishi
mumkin. `showPriceRequest: true` — «narx so'rash» tugmasini ko'rsatish.

### `GET /api/public/posts`

| Query              | Qiymat                                                 |
| ------------------ | ------------------------------------------------------ |
| `category`         | Blog kategoriyasi `slug`'i (masalan `robotlashtirish`) |
| `page`, `pageSize` | §4                                                     |

Nashr qilingan maqolalar va nashr vaqti kelgan rejalashtirilganlar, **yangisi birinchi**
(`publishedAt` bo'yicha).

```json
{
  "data": [
    {
      "id": "00000000-0000-4000-8008-000000000003",
      "slug": "robot-payvandlash-qachon-ozini-oqlaydi",
      "title": "Robot payvandlash: qachon o'zini oqlaydi?",
      "excerpt": "Investitsiya qaytimini hisoblash bo'yicha qo'llanma.",
      "coverImage": null,
      "category": { "slug": "robotlashtirish", "name": "Robotlashtirish" },
      "authorName": "AUTOROB",
      "publishedAt": "2026-10-15T00:00:00.000Z",
      "readingMinutes": 1
    }
  ],
  "meta": { "page": 1, "pageSize": 2, "total": 3 }
}
```

`readingMinutes` — `uz` matnidan hisoblanadi (200 so'z/daqiqa, kamida 1).

### `GET /api/public/posts/:slug`

Maqola + 3 ta o'xshash (`related`: avval shu kategoriyadan, yetmasa — eng yangilaridan).
Ko'rinmaydigan maqola → `404`.

```json
{
  "data": {
    "id": "00000000-0000-4000-8008-000000000001",
    "slug": "crm-tizimi-biznesga-nima-beradi",
    "title": "CRM tizimi biznesga nima beradi?",
    "excerpt": "Mijozlarni yo'qotmaslik va sotuvni oshirishning 5 usuli.",
    "coverImage": null,
    "category": { "slug": "crm", "name": "CRM" },
    "authorName": "AUTOROB",
    "publishedAt": "2026-10-01T00:00:00.000Z",
    "readingMinutes": 1,
    "body": "<h2>CRM tizimi biznesga nima beradi?</h2><p>Bu namunaviy matn. Haqiqiy kontent admin paneldan kiritiladi.</p>",
    "seo": { "metaTitle": null, "metaDescription": null },
    "related": [
      {
        "id": "00000000-0000-4000-8008-000000000003",
        "slug": "robot-payvandlash-qachon-ozini-oqlaydi",
        "title": "Robot payvandlash: qachon o'zini oqlaydi?",
        "excerpt": "Investitsiya qaytimini hisoblash bo'yicha qo'llanma.",
        "coverImage": null,
        "category": { "slug": "robotlashtirish", "name": "Robotlashtirish" },
        "authorName": "AUTOROB",
        "publishedAt": "2026-10-15T00:00:00.000Z",
        "readingMinutes": 1
      }
    ],
    "updatedAt": "2026-11-04T10:10:34.148Z"
  }
}
```

### `GET /api/public/post-categories`

```json
{ "data": [{ "id": "00000000-0000-4000-8007-000000000001", "slug": "crm", "name": "CRM" }] }
```

Barcha kategoriyalar (maqolasi bo'lmaganlari ham).

### `GET /api/public/faq`

| Query      | Qiymat                                                      |
| ---------- | ----------------------------------------------------------- |
| `category` | FAQ bo'limi **UUID**'si (ixtiyoriy). Noto'g'ri UUID → `400` |

Bo'limlar ichida savollar bilan; faqat kamida bitta faol savoli bor bo'limlar qaytadi.

```json
{
  "data": [
    {
      "id": "00000000-0000-4000-8003-000000000001",
      "name": "Umumiy",
      "items": [
        {
          "id": "00000000-0000-4000-8004-000000000001",
          "question": "AUTOROB qanday xizmatlar ko'rsatadi?",
          "answer": "CRM, ERP, sanoat robotlari va CNC liniyalarini joriy etamiz."
        }
      ]
    }
  ]
}
```

### `GET /api/public/team`

```json
{
  "data": [
    {
      "id": "37e75603-4895-4e42-9735-d38538851f8a",
      "name": "Aziz Karimov",
      "role": "Главный инженер",
      "photo": {
        "url": "…",
        "variants": { "480": "…", "1024": "…" },
        "width": 1024,
        "height": 576,
        "alt": "Роботизированная линия"
      }
    }
  ]
}
```

### `GET /api/public/partners`

| Query  | Qiymat                                                                           |
| ------ | -------------------------------------------------------------------------------- |
| `type` | `partner` \| `certificate` (katta-kichik harf farqsiz). Noto'g'ri qiymat → `400` |

```json
{
  "data": [
    {
      "id": "d253a276-fee2-4655-b9a1-157c62c02a16",
      "name": "Siemens",
      "url": "https://siemens.com",
      "type": "PARTNER",
      "logo": null
    }
  ]
}
```

`name` tarjima qilinmaydi. `url`, `logo` — `null` bo'lishi mumkin.

### `GET /api/public/milestones`

```json
{
  "data": [
    {
      "id": "00000000-0000-4000-8006-000000000001",
      "year": 2018,
      "title": "Kompaniya tashkil topdi",
      "text": "Birinchi CRM loyihalari."
    }
  ]
}
```

### `GET /api/public/stats`

```json
{ "data": [{ "id": "00000000-0000-4000-8005-000000000001", "value": "120+", "label": "loyiha" }] }
```

`value` — qator (`"120+"`, `"24/7"`), son emas.

### `GET /api/public/pages/:group`

Guruhdagi statik matnlar: `{ kalit: matn }`. Guruhda hech narsa bo'lmasa — `{ "data": {} }`.

```json
{ "data": { "home.hero.lead": "Автоматизируем ваш бизнес" } }
```

Kalitlar admin tomonidan yaratiladi; seed'da sahifa matnlari yo'q.

### `POST /api/public/leads` — «Ma'lumot qoldirish»

Ariza Telegram guruhga yuboriladi, **bazaga yozilmaydi**. Javob Telegram'ni kutmaydi.

**Body:**

| Maydon          | Turi                                               | Qoida                                                                                 |
| --------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `name`          | string                                             | majburiy, 2–80 belgi                                                                  |
| `phone`         | string                                             | majburiy; `+998 90 123 45 67`, `+998 (90) 123-45-67`, `998901234567` yoki `901234567` |
| `solutionId`    | uuid                                               | ixtiyoriy; topilmasa xato emas, shunchaki xabarga qo'shilmaydi                        |
| `message`       | string                                             | ixtiyoriy, ≤ 1000                                                                     |
| `pagePath`      | string                                             | ixtiyoriy, `/` bilan boshlanadi, ≤ 300                                                |
| `locale`        | `uz` \| `uz-Cyrl` \| `ru`                          | ixtiyoriy                                                                             |
| `utm`           | `{ source?, medium?, campaign?, content?, term? }` | ixtiyoriy, har biri ≤ 200                                                             |
| `website`       | string                                             | **honeypot** — inputni yashiring va bo'sh qoldiring                                   |
| `formStartedAt` | number                                             | forma ochilgan vaqt, `Date.now()` (ms)                                                |

```json
{
  "name": "Aziz Rahimov",
  "phone": "+998 90 123 45 67",
  "solutionId": "00000000-0000-4000-8001-000000000001",
  "message": "CRM bo'yicha maslahat",
  "pagePath": "/yechimlar/crm-tizimi",
  "locale": "uz",
  "utm": { "source": "google" },
  "website": "",
  "formStartedAt": 1793873419000
}
```

**`201`:**

```json
{ "data": { "received": true } }
```

Ariza raqami (ID) qaytmaydi.

**Xatolar:** `400 VALIDATION_ERROR` (masalan `path: "phone"` — «Telefon raqami noto'g'ri (+998 XX XXX XX XX)»,
`path: "name"` — «Ism kamida 2 belgi»), `429 TOO_MANY_REQUESTS` — bitta IP'dan 10 daqiqada 5 tadan ortiq.

**Spam:** `website` to'ldirilgan yoki `formStartedAt` dan 2 soniyadan kam o'tgan bo'lsa ham
javob **`201` bir xil**, lekin xabar yuborilmaydi. Shuning uchun `formStartedAt` ni forma
ochilganda (birinchi render) belgilang, yuborish paytida emas.

---

## 9. Admin API — auth

### `POST /api/admin/auth/login`

```json
{ "email": "admin@autorob.uz", "password": "dev-parol-12345", "remember": true }
```

`email` — katta-kichik harf va chetdagi probel farqsiz; `remember` — ixtiyoriy, default `false`.

**`200`** + `Set-Cookie: autorob_sid=…; Max-Age=2592000; Path=/; HttpOnly; SameSite=Lax`

```json
{
  "data": {
    "id": "08a9464d-b2d3-4cbf-b14a-80b370d94ce2",
    "name": "Administrator",
    "email": "admin@autorob.uz",
    "mustChangePassword": true,
    "lastLoginAt": "2026-11-04T10:10:34.427Z"
  }
}
```

`mustChangePassword: true` bo'lsa — parolni o'zgartirish sahifasiga yo'naltiring.

**Xatolar:** `400 VALIDATION_ERROR`, `401 INVALID_CREDENTIALS`, `403 CSRF_FAILED`,
`423 ACCOUNT_LOCKED` (`details.lockedUntil`), `429 TOO_MANY_REQUESTS`.

### `POST /api/admin/auth/logout`

Body yo'q. **`204`**, cookie tozalanadi. Sessiya bo'lmasa ham `204`.

### `GET /api/admin/auth/me`

**`200`** — login javobidagi `data` bilan bir xil shakl. Sessiya yo'q → `401 UNAUTHENTICATED`.

### `POST /api/admin/auth/change-password`

```json
{ "currentPassword": "dev-parol-12345", "newPassword": "yangi-parol-123" }
```

`newPassword` — 10–200 belgi, eskisidan farqli. **`204`**. Joriy sessiya qoladi, boshqa
qurilmalardagi sessiyalar yopiladi; `mustChangePassword` `false` bo'ladi.

**Xatolar:** `400 VALIDATION_ERROR` (`path: "newPassword"`), `400 INVALID_PASSWORD`, `401`.

---

## 10. Admin API — kontent

### Umumiy CRUD shakli

Quyidagi resurslar bir xil yo'llarga ega:

| Resurs              | Yo'l                         | Reorder |
| ------------------- | ---------------------------- | ------- |
| Yechimlar           | `/api/admin/solutions`       | ✓       |
| Hero slaydlar       | `/api/admin/hero-slides`     | ✓       |
| Maqolalar           | `/api/admin/posts`           | —       |
| Blog kategoriyalari | `/api/admin/post-categories` | ✓       |
| FAQ bo'limlari      | `/api/admin/faq-categories`  | ✓       |
| FAQ savollari       | `/api/admin/faq-items`       | ✓       |
| Jamoa               | `/api/admin/team`            | ✓       |
| Hamkorlar           | `/api/admin/partners`        | ✓       |
| Tarix               | `/api/admin/milestones`      | ✓       |
| Raqamlar            | `/api/admin/stats`           | ✓       |

| So'rov           | Javob                                          |
| ---------------- | ---------------------------------------------- |
| `GET /`          | `200 { data: [...] }` (maqolalarda `meta` ham) |
| `POST /`         | `201 { data: {...} }`                          |
| `GET /:id`       | `200 { data: {...} }` yoki `404`               |
| `PATCH /:id`     | `200 { data: {...} }` — qisman (§1)            |
| `DELETE /:id`    | `204` yoki `404` / `409 IN_USE`                |
| `PATCH /reorder` | `204`                                          |

`GET /:id`, `POST`, `PATCH` javobidagi yozuv `GET /` ro'yxatidagi element bilan bir xil shaklda.
Barcha o'zgarishlar audit jurnaliga yoziladi (frontend uchun API yo'q).

**Reorder body** (sudrab tartiblashdan keyin):

```json
[
  { "id": "00000000-0000-4000-8001-000000000003", "sortOrder": 0 },
  { "id": "00000000-0000-4000-8001-000000000001", "sortOrder": 1 }
]
```

1–500 element, `id` takrorlanmasin, `sortOrder` — 0 dan katta butun son. Hammasi bitta
tranzaksiyada: bitta noma'lum `id` bo'lsa `400 INVALID_IDS` va hech narsa o'zgarmaydi.
Faqat yuborilgan yozuvlar o'zgaradi. Yangi yozuvda `sortOrder` berilmasa — oxiriga qo'yiladi.

**Slug:** `slug` yuborilmasa `title.uz` (kategoriyalarda `name.uz`) dan avtomatik yasaladi
(`Ta'lim markazlari uchun CRM` → `talim-markazlari-uchun-crm`); band bo'lsa `-2`, `-3`
qo'shiladi. Qo'lda berilgan slug: kichik lotin harf, raqam va tire, ≤ 120; band bo'lsa
`409 ALREADY_EXISTS`. `PATCH`'da slug faqat yuborilganda o'zgaradi.

**`LT`** — `LocalizedText` (§2), qavsda `uz` uchun maksimal uzunlik.

### Yechimlar — `/api/admin/solutions`

**POST body:**

| Maydon             | Turi                                                   | Default   |
| ------------------ | ------------------------------------------------------ | --------- |
| `title`            | LT (200)                                               | majburiy  |
| `shortDescription` | LT (500)                                               | majburiy  |
| `body`             | LT, HTML                                               | majburiy  |
| `slug`             | string                                                 | avtomatik |
| `features`         | LT (200)[], ≤ 30                                       | `[]`      |
| `categories`       | (`SERVICE` \| `EDUCATION` \| `MANUFACTURING`)[], ≤ 3   | `[]`      |
| `coverImageId`     | uuid \| null                                           | —         |
| `showPriceRequest` | boolean                                                | `true`    |
| `priceText`        | LT (200) \| null                                       | —         |
| `status`           | `DRAFT` \| `PUBLISHED`                                 | `DRAFT`   |
| `sortOrder`        | int                                                    | oxiriga   |
| `seo`              | `{ metaTitle?: LT (120), metaDescription?: LT (300) }` | `{}`      |

`PATCH` — xuddi shu maydonlar, hammasi ixtiyoriy.

**Element:**

```json
{
  "id": "00000000-0000-4000-8001-000000000001",
  "slug": "crm-tizimi",
  "title": { "ru": "CRM-система", "uz": "CRM tizimi" },
  "shortDescription": { "uz": "Mijozlar, sotuvlar va qo'ng'iroqlarni bitta oynada boshqaring." },
  "body": { "uz": "<h2>CRM tizimi</h2><p>Bu namunaviy matn. Haqiqiy kontent admin paneldan kiritiladi.</p>" },
  "features": [
    { "uz": "Mijozlar bazasi" },
    { "uz": "Sotuv voronkasi" },
    { "uz": "Telefoniya va Telegram integratsiyasi" }
  ],
  "categories": ["SERVICE"],
  "coverImageId": "55a774f9-1d58-4bf2-86ff-63ab6685b6bc",
  "showPriceRequest": true,
  "priceText": { "uz": "Narx kelishiladi" },
  "status": "PUBLISHED",
  "sortOrder": 0,
  "seo": { "metaTitle": { "uz": "CRM tizimi — AUTOROB" } },
  "updatedById": "08a9464d-b2d3-4cbf-b14a-80b370d94ce2",
  "createdAt": "2026-11-04T10:10:33.689Z",
  "updatedAt": "2026-11-04T10:10:34.879Z",
  "coverImage": {
    "id": "55a774f9-…",
    "url": "…",
    "variants": { "480": "…", "1024": "…" },
    "width": 1024,
    "height": 576,
    "alt": { "uz": "Robot liniyasi" }
  },
  "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "partial" }
}
```

Ro'yxat `sortOrder` bo'yicha, `DRAFT`lar ham kiradi.

### Hero slaydlar — `/api/admin/hero-slides`

| Maydon                               | Turi                               | Default  |
| ------------------------------------ | ---------------------------------- | -------- |
| `title`                              | LT (200)                           | majburiy |
| `accentWord`                         | LT (100)                           | majburiy |
| `text`                               | LT (500)                           | majburiy |
| `primaryCta`                         | `{ label: LT (60), href: string }` | majburiy |
| `secondaryCta`                       | shu shakl \| null                  | —        |
| `backgroundImageId`, `mobileImageId` | uuid \| null                       | —        |
| `durationSec`                        | int 2–30                           | `5`      |
| `isActive`                           | boolean                            | `true`   |
| `sortOrder`                          | int                                | oxiriga  |

`href` — `/`, `#` yoki `http(s)://` bilan boshlanadi, ≤ 300.
`accentWord` ning har bir tildagi qiymati shu tildagi `title` ichida bo'lishi kerak (katta-kichik
harf farqsiz); aks holda `400`, `path: "accentWord.uz"` (yoki `.ru`, `.uz-Cyrl`). `PATCH`'da ham
tekshiriladi.

**Element:**

```json
{
  "id": "00000000-0000-4000-8002-000000000001",
  "title": { "uz": "Har bir mijoz — nazoratda" },
  "accentWord": { "uz": "nazoratda" },
  "text": { "uz": "Biznesingizni avtomatlashtirishda yordam beramiz." },
  "primaryCta": { "href": "#ariza", "label": { "uz": "Ma'lumot qoldirish" } },
  "secondaryCta": { "href": "/yechimlar/crm-tizimi", "label": { "uz": "Batafsil" } },
  "backgroundImageId": null,
  "mobileImageId": null,
  "durationSec": 5,
  "isActive": true,
  "sortOrder": 0,
  "createdAt": "2026-11-04T10:10:33.765Z",
  "updatedAt": "2026-11-04T10:10:33.765Z",
  "backgroundImage": null,
  "mobileImage": null,
  "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "missing" }
}
```

### Maqolalar — `/api/admin/posts`

**`GET` query:** `page`, `pageSize` (§4), `status` (`DRAFT` \| `SCHEDULED` \| `PUBLISHED`),
`categoryId` (uuid), `q` (≤ 100). `q` ikki joydan qidiradi: `title.uz` ichida (katta-kichik
harf farqli) yoki slug ichida (`q` slug ko'rinishiga keltiriladi, shuning uchun lotin so'zlar
amalda harf registridan qat'i nazar topiladi: `crm` va `CRM` bir xil natija). Tartib: yaratilgan
sana, yangisi birinchi.

| Maydon         | Turi                                  | Default                                         |
| -------------- | ------------------------------------- | ----------------------------------------------- |
| `title`        | LT (200)                              | majburiy                                        |
| `excerpt`      | LT (500)                              | majburiy                                        |
| `body`         | LT, HTML                              | majburiy                                        |
| `categoryId`   | uuid                                  | majburiy (yo'q bo'lsa `400 CATEGORY_NOT_FOUND`) |
| `authorName`   | string 2–80                           | majburiy                                        |
| `slug`         | string                                | avtomatik                                       |
| `coverImageId` | uuid \| null                          | —                                               |
| `status`       | `DRAFT` \| `SCHEDULED` \| `PUBLISHED` | `DRAFT`                                         |
| `publishedAt`  | ISO sana \| null                      | —                                               |
| `seo`          | yechimlardagidek                      | `{}`                                            |

**Nashr qoidalari:** `PUBLISHED` + `publishedAt` yo'q → server hozirgi vaqtni qo'yadi.
`SCHEDULED` + `publishedAt` yo'q → `400`, `path: "publishedAt"`. `SCHEDULED` maqola
`publishedAt` kelganda saytda o'zi ko'rinadi (statusi o'zgarmaydi). `readingMinutes` server
tomonidan `body.uz` dan hisoblanadi — yubormang.

**Javob (`GET /`):**

```json
{
  "data": [
    {
      "id": "00000000-0000-4000-8008-000000000003",
      "slug": "robot-payvandlash-qachon-ozini-oqlaydi",
      "title": { "uz": "Robot payvandlash: qachon o'zini oqlaydi?" },
      "excerpt": { "uz": "Investitsiya qaytimini hisoblash bo'yicha qo'llanma." },
      "body": {
        "uz": "<h2>Robot payvandlash: qachon o'zini oqlaydi?</h2><p>Bu namunaviy matn. Haqiqiy kontent admin paneldan kiritiladi.</p>"
      },
      "coverImageId": null,
      "categoryId": "00000000-0000-4000-8007-000000000003",
      "authorName": "AUTOROB",
      "status": "PUBLISHED",
      "publishedAt": "2026-10-15T00:00:00.000Z",
      "readingMinutes": 1,
      "seo": {},
      "createdAt": "2026-11-04T10:10:34.172Z",
      "updatedAt": "2026-11-04T10:10:34.172Z",
      "coverImage": null,
      "category": {
        "id": "00000000-0000-4000-8007-000000000003",
        "slug": "robotlashtirish",
        "name": { "uz": "Robotlashtirish" },
        "sortOrder": 2
      },
      "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "missing" }
    }
  ],
  "meta": { "page": 1, "pageSize": 1, "total": 3 }
}
```

### Blog kategoriyalari — `/api/admin/post-categories`

Body: `name` LT (100) majburiy, `slug` (avtomatik), `sortOrder`.
Maqolasi bor kategoriyani o'chirish → `409 IN_USE`.

```json
{ "id": "00000000-0000-4000-8007-000000000001", "slug": "crm", "name": { "uz": "CRM" }, "sortOrder": 0 }
```

### FAQ bo'limlari — `/api/admin/faq-categories`

Body: `name` LT (100) majburiy, `sortOrder`. **O'chirilsa, uning savollari ham o'chadi.**

```json
{
  "id": "00000000-0000-4000-8003-000000000001",
  "name": { "uz": "Umumiy" },
  "sortOrder": 0,
  "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "missing" }
}
```

`translationStatus` faqat ro'yxatda (`GET /`) bor; `POST`/`PATCH`/`GET /:id` javobida yo'q.

### FAQ savollari — `/api/admin/faq-items`

**`GET` query:** `categoryId` (uuid, ixtiyoriy).

| Maydon        | Turi                  | Default                                          |
| ------------- | --------------------- | ------------------------------------------------ |
| `categoryId`  | uuid                  | majburiy                                         |
| `question`    | LT (500)              | majburiy                                         |
| `answer`      | LT (5000), oddiy matn | majburiy                                         |
| `isActive`    | boolean               | `true`                                           |
| `sortOrder`   | int                   | bo'lim oxiriga                                   |
| `solutionIds` | uuid[] ≤ 50           | `[]` — savol shu yechim sahifalarida ham chiqadi |

`PATCH`'da `solutionIds` yuborilsa — ro'yxat to'liq almashtiriladi.

```json
{
  "id": "00000000-0000-4000-8004-000000000001",
  "categoryId": "00000000-0000-4000-8003-000000000001",
  "question": { "uz": "AUTOROB qanday xizmatlar ko'rsatadi?" },
  "answer": { "uz": "CRM, ERP, sanoat robotlari va CNC liniyalarini joriy etamiz." },
  "isActive": true,
  "sortOrder": 0,
  "solutions": [],
  "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "missing" }
}
```

`solutions` elementi: `{ "id": "…", "slug": "crm-tizimi", "title": { "uz": "CRM tizimi" } }`.

### Jamoa — `/api/admin/team`

Body: `name` LT (100), `role` LT (150) — majburiy; `photoId` uuid \| null; `isActive` (`true`);
`sortOrder`.

```json
{
  "id": "37e75603-4895-4e42-9735-d38538851f8a",
  "name": { "uz": "Aziz Karimov" },
  "role": { "ru": "Главный инженер", "uz": "Bosh muhandis" },
  "photoId": "55a774f9-1d58-4bf2-86ff-63ab6685b6bc",
  "isActive": true,
  "sortOrder": 0,
  "photo": {
    "id": "55a774f9-…",
    "url": "…",
    "variants": { "480": "…", "1024": "…" },
    "width": 1024,
    "height": 576,
    "alt": { "uz": "Robot liniyasi" }
  },
  "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "partial" }
}
```

### Hamkorlar — `/api/admin/partners`

Body: `name` string 1–120 (tarjimasiz) majburiy; `logoId` uuid \| null; `url` `http(s)://` ≤ 300
\| null; `type` `PARTNER` \| `CERTIFICATE` (`PARTNER`); `isActive` (`true`); `sortOrder`.

```json
{
  "id": "d253a276-fee2-4655-b9a1-157c62c02a16",
  "name": "Siemens",
  "logoId": null,
  "url": "https://siemens.com",
  "type": "PARTNER",
  "isActive": true,
  "sortOrder": 0,
  "logo": null
}
```

### Tarix — `/api/admin/milestones`

Body: `year` int 1900–2100, `title` LT (200), `text` LT (1000) — majburiy; `sortOrder`.

```json
{
  "id": "00000000-0000-4000-8006-000000000001",
  "year": 2018,
  "title": { "uz": "Kompaniya tashkil topdi" },
  "text": { "uz": "Birinchi CRM loyihalari." },
  "sortOrder": 0,
  "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "missing" }
}
```

### Raqamlar — `/api/admin/stats`

Body: `value` string 1–20 (`"120+"`), `label` LT (100) — majburiy; `sortOrder`.

```json
{
  "id": "00000000-0000-4000-8005-000000000001",
  "value": "120+",
  "label": { "uz": "loyiha" },
  "sortOrder": 0,
  "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "missing" }
}
```

### Sahifa matnlari — `/api/admin/pages`

Bu resurs umumiy CRUD shaklida **emas**: faqat ikki yo'l bor, o'chirish yo'q.

**`GET /api/admin/pages?group=home`** (`group` ixtiyoriy) — guruh, keyin kalit bo'yicha tartiblangan:

```json
{
  "data": [
    {
      "id": "b4c91489-9bfa-4293-9d12-472b09a8abea",
      "key": "home.hero.lead",
      "group": "home",
      "value": { "ru": "Автоматизируем ваш бизнес", "uz": "Biznesingizni avtomatlashtiramiz" },
      "updatedAt": "2026-11-04T10:10:35.302Z",
      "translationStatus": { "uz": "complete", "uz-Cyrl": "missing", "ru": "complete" }
    }
  ]
}
```

**`PUT /api/admin/pages/:key`** — kalit bo'lmasa yaratiladi, bo'lsa yangilanadi.

- `key` — `guruh.nom` ko'rinishida: `^[a-z0-9_-]+(\.[a-zA-Z0-9_-]+)+$`, ≤ 100 (masalan
  `home.hero.lead`). Noto'g'ri → `400`, `path: "key"`.
- Body: `{ "group": "home", "value": { "uz": "…", "ru": "…" } }` — `group`:
  `^[a-z0-9_-]+$`, ≤ 50; `value` LT (5000).

**`200`** — `translationStatus`'siz yozuv:

```json
{
  "data": {
    "id": "b4c91489-9bfa-4293-9d12-472b09a8abea",
    "key": "home.hero.lead",
    "group": "home",
    "value": { "ru": "Автоматизируем ваш бизнес", "uz": "Biznesingizni avtomatlashtiramiz" },
    "updatedAt": "2026-11-04T10:10:35.302Z"
  }
}
```

### Sozlamalar — `/api/admin/settings`

**`GET`** — yagona yozuv (bo'lmasa bo'sh holda yaratiladi):

```json
{
  "data": {
    "id": 1,
    "phone": "+998 90 123 45 67",
    "telegram": "@autorob_uz",
    "email": "info@autorob.uz",
    "address": { "ru": "г. Ташкент, Чиланзар", "uz": "Toshkent sh., Chilonzor" },
    "workHours": { "uz": "Du–Sha: 09:00–18:00" },
    "mapLat": 41.2995,
    "mapLng": 69.2401,
    "socials": { "instagram": "https://instagram.com/autorob" },
    "gaId": "G-XXXXXXX",
    "metrikaId": null,
    "metaPixelId": null,
    "updatedAt": "2026-11-04T10:10:35.353Z"
  }
}
```

**`PUT`** — **barcha maydonlar majburiy** (to'liq almashtirish), javob — `GET` bilan bir xil.

| Maydon                             | Turi                                                                                      |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| `phone`                            | string ≤ 50                                                                               |
| `telegram`                         | string ≤ 100                                                                              |
| `email`                            | email yoki `""`                                                                           |
| `address`                          | LT (300)                                                                                  |
| `workHours`                        | LT (200)                                                                                  |
| `mapLat`                           | -90…90 \| null                                                                            |
| `mapLng`                           | -180…180 \| null                                                                          |
| `socials`                          | `{ [kalit]: url }` — kalit `^[a-z0-9_]{1,30}$`, url `http(s)://` ≤ 300, ko'pi bilan 15 ta |
| `gaId`, `metrikaId`, `metaPixelId` | string ≤ 50 \| null                                                                       |

Telegram bot sozlamalari bu yerda yo'q (server `.env` faylida).

---

## 11. Admin API — media

### `POST /api/admin/media` — rasm yuklash

`multipart/form-data`, bitta fayl `file` maydonida. JPEG, PNG yoki WebP, ≤ 5 MB.
Turi fayl mazmunidan aniqlanadi (kengaytma va `Content-Type` hisobga olinmaydi).
`Content-Type` sarlavhasini qo'lda qo'ymang — brauzer `FormData` uchun o'zi qo'yadi.

```ts
const form = new FormData();
form.append("file", file);
await fetch(`${API}/api/admin/media`, {
  method: "POST",
  credentials: "include",
  headers: { "X-Requested-With": "autorob-admin" },
  body: form,
});
```

**`201`:**

```json
{
  "data": {
    "id": "55a774f9-1d58-4bf2-86ff-63ab6685b6bc",
    "storageKey": "2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp",
    "url": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp",
    "variants": {
      "480": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-480.webp",
      "1024": "http://localhost:4000/uploads/2026/11/3bc9b37e-2f96-443f-983c-fd79ecd7a819-1024.webp"
    },
    "mime": "image/webp",
    "sizeBytes": 1134,
    "width": 1024,
    "height": 576,
    "alt": null,
    "createdAt": "2026-11-04T10:10:34.738Z"
  }
}
```

(Bu namunada asl rasm 1600 px edi — shuning uchun `1920` varianti yo'q.)
`sizeBytes` — eng katta variantning hajmi.

**Xatolar:** `400 UNSUPPORTED_FILE`, `400 INVALID_IMAGE`, `400 INVALID_UPLOAD`,
`413 FILE_TOO_LARGE`.

### `GET /api/admin/media?page=1&pageSize=20`

Yangisi birinchi. `{ data: [<yuklash javobidagi obyekt>], meta: { page, pageSize, total } }`.

### `PATCH /api/admin/media/:id` — alt matni

```json
{ "alt": { "uz": "Robot liniyasi", "ru": "Роботизированная линия" } }
```

`alt` — LT (300) yoki `null` (tozalash); maydon **majburiy**. **`200`** — to'liq media obyekti.

### `DELETE /api/admin/media/:id`

**`204`** — yozuv va barcha fayllari o'chadi.

Rasm biror joyda biriktirilgan bo'lsa — **`409 IN_USE`**:

```json
{
  "error": {
    "code": "IN_USE",
    "message": "Rasm ishlatilmoqda — avval uni shu joylardan olib tashlang",
    "details": {
      "usedIn": [
        { "entity": "Solution", "id": "00000000-0000-4000-8001-000000000001", "title": "CRM tizimi" }
      ]
    }
  }
}
```

`entity`: `Solution`, `HeroSlide`, `Post`, `TeamMember`, `Partner`; `title` — `uz` sarlavha/ism.
Faqat biriktirilgan rasmlar tekshiriladi; maqola matni (`body`) ichidagi `<img>` hisobga
olinmaydi.

---

## 12. Boshqa yo'llar

| Yo'l                    | Javob                                                                           |
| ----------------------- | ------------------------------------------------------------------------------- |
| `GET /health`           | `{ "data": { "status": "ok" } }`                                                |
| `GET /uploads/*`        | Rasm fayllari (faqat `STORAGE_DRIVER=local`)                                    |
| `GET /api/docs`         | Swagger UI (production'da yo'q)                                                 |
| `GET /api/openapi.json` | OpenAPI 3.1 (production'da yo'q)                                                |
| Boshqa har qanday yo'l  | `404 { "error": { "code": "NOT_FOUND", "message": "Yo'l topilmadi: GET /…" } }` |
