# 10 — Ariza formasi, modal va CTA bloki

**Qayerda:** hamma sahifada — Header'dagi «Ma'lumot qoldirish», kartalardagi «Narxini so'rash», sahifalar oxiridagi `CtaBand`, Kontaktlar sahifasi  
**Dizayn:** «AUTOROB_10_Ariza_modali_holatlar» (4 holat) + bosh sahifadagi «Ariza formasi» bloki  
**Qiyinlik:** ⭐⭐⭐ (saytning **eng muhim** funksiyasi — ariza Telegram guruhga boradi)

## Maqsad

Mijoz ism va telefonini qoldiradi → backend arizani AUTOROB'ning Telegram guruhiga yuboradi → menejer qo'ng'iroq qiladi. Forma tez, tushunarli va xatosiz ishlashi kerak.

## Fayllar

| Fayl                                                              | Holat     | Nima qilasiz                                                                       |
| ----------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------- |
| `src/features/lead-form/schema.js`                                | ✅ tayyor | `leadSchema`, `buildLeadPayload`                                                   |
| `src/features/lead-form/useSubmitLead.js`                         | ✅ tayyor | `useSubmitLead` (formStartedAt, sahifa, til, UTM'ni o'zi qo'shadi), `leadErrorKey` |
| `src/features/lead-form/LeadModalProvider.jsx`, `useLeadModal.js` | ✅ tayyor | `open(solutionId?)` / `close()`                                                    |
| `src/features/lead-form/LeadForm.jsx`                             | TODO      | **Forma** (3 variant)                                                              |
| `src/features/lead-form/LeadModal.jsx`                            | TODO      | Modal + 4 holat                                                                    |
| `src/widgets/site/cta-band/CtaBand.jsx`                           | TODO      | Sahifa oxiridagi blok                                                              |
| `src/shared/ui/Input/`, `Textarea/`, `Select/`                    | shablon   | Forma elementlari (siz egasisiz)                                                   |
| `src/shared/ui/Modal/`                                            | shablon   | Umumiy modal (siz egasisiz)                                                        |
| `src/shared/form/FormField.jsx`, `setServerErrors.js`             | ✅ asosiy | Label + xato; server xatolari                                                      |

## API (backend kontrakti §8)

```
POST /api/public/leads
{ "name": "Aziz", "phone": "998901234567", "solutionId": "…", "message": "…",
  "pagePath": "/yechimlar/crm-tizimi", "locale": "uz", "utm": { "source": "google" },
  "website": "", "formStartedAt": 1793873419000 }

201 → { "data": { "received": true } }
400 → { "error": { "code": "VALIDATION_ERROR", "details": [ { "path": "phone", "message": "Telefon raqami noto'g'ri (+998 XX XXX XX XX)" } ] } }
429 → { "error": { "code": "TOO_MANY_REQUESTS" } }     // bitta IP'dan 10 daqiqada 5 tadan ortiq
```

`pagePath`, `locale`, `utm`, `formStartedAt` ni **`useSubmitLead` o'zi qo'shadi** — siz `submit.mutate(values)` ni chaqirasiz xolos.

**Spam himoyasi backend'da:** yashirin `website` to'ldirilgan yoki forma 2 soniyadan tez yuborilgan bo'lsa ham backend **201** qaytaradi, lekin Telegram'ga yubormaydi. Shuning uchun:

- `website` inputi yashirin bo'lsin (`className="visually-hidden"`, `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden`);
- `useSubmitLead()` ni **forma komponentining o'zida** chaqiring (forma ochilgan vaqt shu hook'da eslab qolinadi).

Mock (`npm run dev:mock`): ism **`429`** → 429 xatosi; noto'g'ri telefon → 400 `details`.

## 1. Forma elementlari (`shared/ui`)

`Input`, `Textarea`, `Select` — dizayn bo'yicha: label tepada, ~48px balandlik, radius, och chegara; **xato** — qizil chegara + ostida qizil ikonka va matn (`aria-invalid`, `aria-describedby`). Qorong'i variant (CtaBand ichida): to'q fon, shaffof chegara, oq matn — `theme="dark"`. `ref` va `...props` uzatiladi (React Hook Form uchun).

## 2. `LeadForm`

```jsx
<LeadForm variant="modal" | "inline" | "contacts" solutionId={id} onSuccess={(values) => …} />
```

| Maydon             | Qachon                          | Izoh                                                                                                |
| ------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| Ismingiz           | har doim                        | placeholder «Masalan, Aziz»                                                                         |
| Telefon raqamingiz | har doim                        | `+998 __ ___ __ __` niqob (`formatPhone`), `inputMode="tel"`, `autoComplete="tel"`                  |
| Qiziqtirgan yechim | `modal` va bosh sahifa `inline` | `Select` — `useSolutions(lang)` ro'yxati, «Tanlang»; `solutionId` berilgan bo'lsa tanlangan         |
| Izoh (ixtiyoriy)   | `contacts`                      | `Textarea` → `message` (≤ 1000). «Demo ko'rish» dan ochilsa — `message` boshlang'ich qiymati «Demo» |
| honeypot `website` | har doim                        | yashirin                                                                                            |

- Pastda to'liq kenglikdagi ko'k tugma «Yuborish →» va kichik rozilik matni: «Tugmani bosib, shaxsiy ma'lumotlarni qayta ishlashga rozilik bildirasiz.» — «shaxsiy ma'lumotlarni qayta ishlash» → `routes.privacy(lang)` havolasi.
- `useForm({ resolver: zodResolver(leadSchema), mode: "onTouched" })`.
- Server 400 qaytarsa: `setServerErrors(form.setError, error)` — xato maydon ostida chiqadi.

## 3. Holatlar (dizayn: 4 holat + bittasi qo'shimcha)

| Holat                                              | Qachon              | Ko'rinish                                                                                                                                                                                        |
| -------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Bo'sh                                           | boshlanishi         | sarlavha «Ma'lumot qoldirish», matn «Ism va telefon raqamingizni qoldiring — tez orada bog'lanamiz.»                                                                                             |
| 2. Xato (validatsiya)                              | zod yoki server 400 | maydon qizil chegara, ostida «⊘ Telefon raqamini to'liq kiriting»                                                                                                                                |
| 3. Yuborilmoqda                                    | so'rov ketdi        | tugma och ko'k, spinner + «Yuborilmoqda…», `disabled`, ikki marta yuborib bo'lmaydi                                                                                                              |
| 4. Muvaffaqiyatli                                  | 201                 | forma o'rnida: och yashil doirada ✓, **«Rahmat, {name}!»**, «Arizangiz qabul qilindi. Mutaxassisimiz 1 ish kuni ichida **{telefon}** raqamiga qo'ng'iroq qiladi.», pastda «Yopish» (oq, chegara) |
| 5. Server xatosi _(dizaynda yo'q — xato uslubida)_ | 429, tarmoq, 500    | forma ustida qizil xabar: 429 → `t("lead.errors.tooMany")`; boshqasi → `t("lead.errors.failed")` + telefon havola (`useContacts().phone`); kiritilgan ma'lumot o'chmaydi                         |

## 4. `Modal` (umumiy) va `LeadModal`

Dizayn: fon `ink/900` 60% shaffof; oq karta (~400px, radius), o'ng yuqorida doira «✕».

- `createPortal` → `document.body`; `role="dialog"`, `aria-modal`, `aria-labelledby`.
- Ochilganda fokus birinchi input'ga, **fokus modal ichida aylanadi**, yopilganda ochgan tugmaga qaytadi.
- Esc va fon bosilganda yopiladi; ochiqligida sahifa scroll bo'lmaydi.
- Fade + scale animatsiya, `prefers-reduced-motion` hisobga olinadi.

`LeadModal` — `Modal` + `LeadForm variant="modal"` + muvaffaqiyat holati. Yopib qayta ochilganda forma toza.

## 5. `CtaBand` — sahifa oxiridagi blok

Container ichida katta qorong'i ko'k gradient karta (radius ~24px):

- chapda: eyebrow «BEPUL KONSULTATSIYA» (ko'k), sarlavha «Qaysi bosqichdan boshlashni birga aniqlaymiz» (oq, Unbounded), matn «Ism va telefon raqamingizni qoldiring — mutaxassisimiz 1 ish kuni ichida bog'lanadi.»; **bosh sahifada** ostida telefon va Telegram (ikonka bilan, `useContacts()`);
- o'ngda: to'qroq ichki karta — «Ma'lumot qoldirish» + `LeadForm variant="inline"` (qorong'i inputlar). Bosh sahifada 3 maydon (yechim tanlash bilan), boshqa sahifalarda 2 maydon.
- Props: `solutionId?`, `showContacts?`, `showSolutionSelect?`. Matnlar lug'atda (`cta.*`). 375px — ustma-ust.

## 6. Testlar (majburiy)

`src/features/lead-form/LeadForm.test.jsx` (MSW, `mocks/handlers.js`):

- [ ] bo'sh forma → ism va telefon xatolari
- [ ] to'g'ri ma'lumot → «Rahmat, Aziz!» va kiritilgan telefon
- [ ] ism «429» → «Juda ko'p urinish»
- [ ] server 400 `details` → xato o'sha maydon ostida (`server.use(...)` bilan)
- [ ] telefon niqobi: `901234567` → `+998 90 123 45 67`
- [ ] yuborilayotganda tugma `disabled`

## Qabul mezonlari

- [ ] Dizayndagi 4 holat + server xatosi holati
- [ ] Header, kartalar («Narxini so'rash»), yechim sahifasi, CtaBand, Kontaktlar — hammasidan ishlaydi; yechimdan ochilganda `solutionId` ketadi
- [ ] Modal: fokus ushlanadi, Esc/fon yopadi, fokus qaytadi
- [ ] Testlar yozilgan va o'tadi
- [ ] Ism/telefon hech qayerga log qilinmaydi (`console.log` ham yo'q), analitikaga faqat `lead_submitted`
- [ ] 3 tilda, 375px da qulay
- [ ] `npm run lint && npm test && npm run build` o'tadi
