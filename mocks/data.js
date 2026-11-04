// Mock ma'lumotlar — dizayndagi (Figma SVG) matnlar asosida, backend shaklida (docs: backend API_CONTRACT.md).
// Tarjima maydonlari admin shaklida ({ uz, ru, "uz-Cyrl" }) saqlanadi; handlers.js public javobda tanlangan
// tilga aylantiradi (tarjima yo'q bo'lsa — uz, xuddi backend kabi). uz-Cyrl ataylab ko'p joyda yo'q.

const L = (uz, ru, cyrl) => ({ uz, ...(ru ? { ru } : {}), ...(cyrl ? { "uz-Cyrl": cyrl } : {}) });
const id = (group, n) => `00000000-0000-4000-80${group}-${String(n).padStart(12, "0")}`;

export const settings = {
  phone: "+998 90 123 45 67",
  telegram: "@autorob_uz",
  email: "info@autorob.uz",
  address: L("Namangan sh., ____ ko'chasi, __-uy", "г. Наманган, ул. ____, дом __"),
  workHours: L("Du–Sha: 09:00–18:00", "Пн–Сб: 09:00–18:00", "Ду–Ша: 09:00–18:00"),
  map: { lat: 40.9983, lng: 71.6726 },
  socials: { instagram: "https://instagram.com/autorob_uz" },
  analytics: { gaId: null, metrikaId: null, metaPixelId: null },
};

export const stats = [
  { id: id("05", 1), value: "120+", label: L("bajarilgan loyiha", "выполненных проектов") },
  { id: id("05", 2), value: "8 yil", label: L("bozordagi tajriba", "опыта на рынке") },
  {
    id: id("05", 3),
    value: "3 soha",
    label: L("servis, ta'lim, ishlab chiqarish", "сервис, образование, производство"),
  },
  { id: id("05", 4), value: "24/7", label: L("texnik qo'llab-quvvatlash", "техническая поддержка") },
];

const crmFaq = [
  L("CRM'ni joriy qilish qancha vaqt oladi?", "Сколько времени занимает внедрение CRM?"),
  L("Narxi qanday hisoblanadi?", "Как рассчитывается стоимость?"),
  L("Mavjud Excel bazamizni ko'chirib berasizmi?", "Перенесёте нашу базу из Excel?"),
  L("Telegram va telefoniya bilan ishlaydimi?", "Работает с Telegram и телефонией?"),
];
const crmFaqAnswers = [
  L("Odatda 2–4 hafta. Muddat modullar soni, integratsiyalar va jamoangiz kattaligiga bog'liq."),
  L(
    "Narx foydalanuvchilar soni va kerakli modullarga qarab hisoblanadi. Ariza qoldiring — aniq taklif tayyorlaymiz.",
  ),
  L("Ha, mijozlar bazasi va tarixni Excel'dan bepul ko'chirib beramiz."),
  L("Ha. Qo'ng'iroqlar va Telegram xabarlari avtomatik CRM'ga tushadi."),
];

const solutionBody = (title) =>
  L(
    `<h2>${title}</h2><p>Bu namunaviy matn. Haqiqiy kontent admin paneldan kiritiladi.</p>`,
    `<h2>${title}</h2><p>Это пример текста. Реальный контент вводится в админ-панели.</p>`,
  );

export const solutions = [
  {
    id: id("01", 1),
    slug: "crm-tizimi",
    title: L("CRM tizimi", "CRM-система"),
    shortDescription: L(
      "Mijozlar, arizalar va sotuvni bitta oynada boshqaring. Telefoniya va Telegram bilan integratsiya.",
      "Клиенты, заявки и продажи в одном окне. Интеграция с телефонией и Telegram.",
    ),
    categories: ["SERVICE", "EDUCATION"],
    features: [
      L("Mijozlar bazasi"),
      L("Sotuv voronkasi"),
      L("Telefoniya va Telegram"),
      L("Vazifa va eslatmalar"),
      L("Hisobotlar"),
      L("Integratsiyalar"),
    ],
    priceText: L("Narx kelishiladi", "Цена по договорённости"),
    seo: { metaTitle: L("CRM tizimi — AUTOROB"), metaDescription: null },
    faq: crmFaq.map((q, i) => ({ id: id("04", 100 + i), question: q, answer: crmFaqAnswers[i] })),
  },
  {
    id: id("01", 2),
    slug: "erp-tizimi",
    title: L("ERP tizimi", "ERP-система"),
    shortDescription: L(
      "Ombor, xarid, moliya va ishlab chiqarishni yagona hisobga bog'lang.",
      "Склад, закупки, финансы и производство — в едином учёте.",
    ),
    categories: ["MANUFACTURING", "SERVICE"],
    features: [L("Ombor hisobi"), L("Xaridlar"), L("Moliya"), L("Ishlab chiqarish rejasi")],
  },
  {
    id: id("01", 3),
    slug: "sanoat-robotlari",
    title: L("Sanoat robotlari", "Промышленные роботы"),
    shortDescription: L(
      "Takroriy va og'ir operatsiyalarni robotlar bajaradi: yuklash, saralash, qadoqlash.",
      "Роботы выполняют повторяющиеся и тяжёлые операции: загрузку, сортировку, упаковку.",
    ),
    categories: ["MANUFACTURING"],
    features: [L("Yuklash va tushirish"), L("Saralash"), L("Qadoqlash")],
  },
  {
    id: id("01", 4),
    slug: "robot-payvandlash",
    title: L("Robot payvandlash", "Роботизированная сварка"),
    shortDescription: L(
      "Payvandlash sifatini barqaror qiling va ish unumdorligini 2–3 barobar oshiring.",
      "Стабильное качество сварки и рост производительности в 2–3 раза.",
    ),
    categories: ["MANUFACTURING"],
    features: [L("Barqaror chok sifati"), L("2–3 barobar tezroq")],
  },
  {
    id: id("01", 5),
    slug: "stanok-liniyalari",
    title: L("Stanok liniyalari (CNC)", "Станочные линии (ЧПУ)"),
    shortDescription: L(
      "To'liq avtomatlashtirilgan ishlab chiqarish liniyasini loyihalash, o'rnatish va ishga tushirish.",
      "Проектирование, монтаж и запуск полностью автоматизированной линии.",
    ),
    categories: ["MANUFACTURING"],
    features: [L("Loyihalash"), L("O'rnatish"), L("Ishga tushirish")],
  },
  {
    id: id("01", 6),
    slug: "talim-markazlari-uchun-crm",
    title: L("Ta'lim markazlari uchun CRM", "CRM для учебных центров"),
    shortDescription: L(
      "O'quvchilar, guruhlar, to'lovlar va dars jadvallarini avtomatlashtiring.",
      "Ученики, группы, оплаты и расписание — автоматически.",
    ),
    categories: ["EDUCATION"],
    features: [L("O'quvchilar bazasi"), L("Guruhlar va jadval"), L("To'lovlar nazorati")],
  },
].map((s) => ({
  coverImage: null,
  body: solutionBody(s.title.uz),
  showPriceRequest: true,
  priceText: null,
  seo: { metaTitle: null, metaDescription: null },
  faq: [],
  updatedAt: "2026-11-04T10:10:34.879Z",
  ...s,
}));

export const postCategories = [
  { id: id("07", 1), slug: "crm", name: L("CRM") },
  { id: id("07", 2), slug: "erp", name: L("ERP") },
  { id: id("07", 3), slug: "robotlashtirish", name: L("Robotlashtirish", "Роботизация") },
  { id: id("07", 4), slug: "ishlab-chiqarish", name: L("Ishlab chiqarish", "Производство") },
  { id: id("07", 5), slug: "talim", name: L("Ta'lim", "Образование") },
];

const articleBody = L(
  "<p>Ko'pchilik korxonalarda arizalar hali ham daftarga yoki Excel'ga yoziladi. Natijada mijozlarning bir qismi javobsiz qoladi, menejerlar ishini esa nazorat qilib bo'lmaydi. Quyida CRM'ni og'riqsiz joriy qilish uchun 5 ta amaliy qadamni ko'rib chiqamiz.</p>" +
    "<h2>1. Jarayonni qog'ozda chizing</h2><p>Ariza qayerdan keladi, kim qabul qiladi, qaysi bosqichlardan o'tadi va qachon yopiladi — bularni avval oddiy sxema ko'rinishida yozing. CRM shu sxemaning raqamli nusxasi bo'ladi.</p>" +
    "<blockquote><p><strong>Eng yaxshi CRM — jamoa har kuni ishlatadigan CRM. Shuning uchun murakkab emas, tushunarli tizimdan boshlang.</strong></p></blockquote>" +
    "<h2>2. Asosiy kanallarni ulang</h2><ul><li>Sayt formasi — arizalar avtomatik tushadi</li><li>Telegram bot va guruhlar</li><li>Telefoniya — qo'ng'iroqlar yozuvi bilan</li></ul>" +
    "<p>Qolgan qadamlar: maydonlarni soddalashtirish, jamoani o'qitish va birinchi oy natijalarini tahlil qilish. Bular haqida batafsil — keyingi maqolalarda.</p>",
);

const post = (n, slug, category, uz, ru, publishedAt, readingMinutes, excerpt) => ({
  id: id("08", n),
  slug,
  categorySlug: category,
  title: L(uz, ru),
  excerpt: L(excerpt ?? "Avtomatlashtirish bo'yicha amaliy maslahatlar va real tajriba."),
  body: articleBody,
  coverImage: null,
  authorName: "AUTOROB",
  publishedAt: `${publishedAt}T00:00:00.000Z`,
  readingMinutes,
  seo: { metaTitle: null, metaDescription: null },
  updatedAt: "2026-11-04T10:10:34.148Z",
});

// Yangisi birinchi (backend publishedAt bo'yicha tartiblaydi)
export const posts = [
  post(
    1,
    "ishlab-chiqarishni-avtomatlashtirish-qayerdan-boshlash",
    "ishlab-chiqarish",
    "Ishlab chiqarishni avtomatlashtirish: qayerdan boshlash kerak?",
    "Автоматизация производства: с чего начать?",
    "2026-10-18",
    7,
    "CRM, ERP va robotlar — qaysi ketma-ketlikda joriy qilish foydali va qancha vaqt oladi. Uch korxona tajribasi.",
  ),
  post(
    2,
    "crm-joriy-qilish-5-qadam",
    "crm",
    "CRM joriy qilish: ishlab chiqarish korxonasi uchun 5 qadam",
    "Внедрение CRM: 5 шагов для производства",
    "2026-10-12",
    6,
  ),
  post(
    3,
    "sanoat-roboti-qachon-ozini-oqlaydi",
    "robotlashtirish",
    "Sanoat roboti qachon o'zini oqlaydi? Oddiy hisob-kitob",
    "Когда окупается промышленный робот?",
    "2026-09-28",
    5,
  ),
  post(
    4,
    "excel-dan-erp-ga-kochirish",
    "erp",
    "Ombor hisobini Excel'dan ERP'ga ko'chirish tajribasi",
    "Перенос складского учёта из Excel в ERP",
    "2026-09-09",
    8,
  ),
  post(
    5,
    "oquv-markazida-tolovlarni-nazorat-qilish",
    "talim",
    "O'quv markazida to'lovlarni nazorat qilishning 3 usuli",
    "3 способа контролировать оплаты в учебном центре",
    "2026-09-02",
    4,
  ),
  post(
    6,
    "stanok-liniyasini-tanlashda-7-savol",
    "ishlab-chiqarish",
    "Stanok liniyasini tanlashda 7 ta savol",
    "7 вопросов при выборе станочной линии",
    "2026-08-20",
    6,
  ),
  post(
    7,
    "telegram-arizalarni-crm-ga-tushirish",
    "crm",
    "Telegram orqali kelgan arizalarni CRM'ga avtomatik tushirish",
    "Заявки из Telegram — автоматически в CRM",
    "2026-08-06",
    5,
  ),
  post(8, "erp-tanlashda-xatolar", "erp", "ERP tanlashda eng ko'p qilinadigan 5 xato", null, "2026-07-22", 6),
  post(
    9,
    "robot-payvandlash-qachon-kerak",
    "robotlashtirish",
    "Robot payvandlash qachon kerak bo'ladi?",
    null,
    "2026-07-10",
    4,
  ),
  post(10, "sotuv-voronkasini-qurish", "crm", "Sotuv voronkasini qanday qurish kerak", null, "2026-06-28", 7),
  post(
    11,
    "oquvchilar-davomatini-avtomatlashtirish",
    "talim",
    "O'quvchilar davomatini avtomatlashtirish",
    null,
    "2026-06-15",
    3,
  ),
  post(
    12,
    "cnc-xizmat-korsatish",
    "ishlab-chiqarish",
    "CNC stanoklariga xizmat ko'rsatish jadvali",
    null,
    "2026-06-01",
    5,
  ),
  post(
    13,
    "omborda-qoldiqlarni-nazorat",
    "erp",
    "Omborda qoldiqlarni real vaqtda nazorat qilish",
    null,
    "2026-05-18",
    6,
  ),
  post(
    14,
    "robot-xavfsizligi",
    "robotlashtirish",
    "Sanoat robotlari bilan ishlashda xavfsizlik",
    null,
    "2026-05-02",
    5,
  ),
  post(15, "kichik-biznes-uchun-crm", "crm", "Kichik biznes uchun CRM: kerakmi?", null, "2026-04-20", 4),
];

const faqCategory = (n, name, items) => ({
  id: id("03", n),
  name,
  items: items.map(([q, a], i) => ({ id: id("04", n * 10 + i), question: L(q), answer: L(a) })),
});

export const faq = [
  faqCategory(1, L("Umumiy", "Общие"), [
    [
      "AUTOROB qaysi sohalarda ishlaydi?",
      "Servis kompaniyalari, ta'lim muassasalari va ishlab chiqarish korxonalari bilan. Har bir soha uchun tayyor yechim bor, lekin u sizning jarayonlaringizga moslab sozlanadi.",
    ],
    [
      "Kichik biznes uchun ham mosmi?",
      "Ha. Kichik jamoalar uchun CRM'ning yengil versiyasidan boshlash mumkin.",
    ],
    [
      "Avval nimadan boshlash kerak: CRM yoki ERP?",
      "Odatda mijozlar bilan ishlashni tartibga solish — CRM'dan boshlanadi. Keyin ombor va ishlab chiqarish — ERP.",
    ],
    [
      "Yechim narxi qanday hisoblanadi?",
      "Foydalanuvchilar soni, modullar va integratsiyalarga qarab. Ariza qoldiring — aniq taklif beramiz.",
    ],
    [
      "Joriy etish qancha vaqt oladi?",
      "CRM — 2–4 hafta, ERP — 2–6 oy, robot va liniyalar — loyihaga bog'liq.",
    ],
    [
      "Mavjud dasturlarimiz (1C, Excel) bilan bog'lasa bo'ladimi?",
      "Ha, 1C, Excel, Click, Payme va boshqa servislar bilan integratsiya qilamiz.",
    ],
    ["Kafolat va texnik yordam bormi?", "Ha. O'rnatilgandan keyin ham texnik yordam va xizmat ko'rsatamiz."],
  ]),
  faqCategory(2, L("Narx va to'lov", "Цены и оплата"), [
    ["To'lovni bo'lib to'lash mumkinmi?", "Ha, loyiha bosqichlari bo'yicha bo'lib to'lash mumkin."],
    [
      "Oylik abonent to'lovi bormi?",
      "CRM uchun — foydalanuvchilar soniga qarab oylik to'lov. ERP va uskunalar — bir martalik.",
    ],
  ]),
  faqCategory(3, L("Joriy etish", "Внедрение"), [
    ["Xodimlarni o'qitasizmi?", "Ha, tizim bilan ishlashni jamoangizga amalda o'rgatamiz."],
    ["Ish to'xtab qolmaydimi?", "Bosqichma-bosqich joriy qilamiz — ishni to'xtatmasdan."],
  ]),
  faqCategory(4, L("Robotlar va uskunalar", "Роботы и оборудование"), [
    [
      "Robotlarni qayerdan olib kelasiz?",
      "Ishonchli ishlab chiqaruvchilardan, kafolat bilan yetkazib beramiz.",
    ],
    [
      "Robot uchun alohida xona kerakmi?",
      "Ko'p hollarda yo'q — xavfsizlik to'siqlari bilan mavjud sexga o'rnatiladi.",
    ],
  ]),
  faqCategory(5, L("Texnik yordam", "Техподдержка"), [
    ["Muammo bo'lsa qanchada javob berasiz?", "Ish vaqtida — 1 soat ichida, kritik holatlarda 24/7."],
    ["Yangilanishlar pullikmi?", "Kafolat davrida — bepul."],
  ]),
];

export const team = [
  { id: id("09", 1), name: L("Aziz Karimov"), role: L("Bosh muhandis", "Главный инженер"), photo: null },
  {
    id: id("09", 2),
    name: L("Dilnoza Rahimova"),
    role: L("CRM loyihalar rahbari", "Руководитель CRM-проектов"),
    photo: null,
  },
  {
    id: id("09", 3),
    name: L("Jasur Tursunov"),
    role: L("Robototexnika muhandisi", "Инженер-робототехник"),
    photo: null,
  },
  {
    id: id("09", 4),
    name: L("Malika Yusupova"),
    role: L("Mijozlar bilan ishlash", "Работа с клиентами"),
    photo: null,
  },
];

export const partners = [
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    id: id("10", n),
    name: `Hamkor ${n}`,
    url: null,
    type: "PARTNER",
    logo: null,
  })),
  { id: id("10", 7), name: "ISO 9001", url: null, type: "CERTIFICATE", logo: null },
];

export const milestones = [
  {
    id: id("06", 1),
    year: 2018,
    title: L("Kompaniya tashkil topdi", "Основание компании"),
    text: L("Birinchi CRM loyihalari."),
  },
  {
    id: id("06", 2),
    year: 2020,
    title: L("ERP yo'nalishi"),
    text: L("Ishlab chiqarish korxonalari uchun ERP."),
  },
  {
    id: id("06", 3),
    year: 2023,
    title: L("Birinchi sanoat roboti"),
    text: L("Payvandlash robotini o'rnatdik."),
  },
  { id: id("06", 4), year: 2026, title: L("120+ loyiha"), text: L("Servis, ta'lim va ishlab chiqarishda.") },
];

/** Mock admin (dev:mock rejimida login: admin@autorob.uz, istalgan parol; "xato" → 401) */
export const adminUser = {
  id: "08a9464d-b2d3-4cbf-b14a-80b370d94ce2",
  name: "Administrator",
  email: "admin@autorob.uz",
  mustChangePassword: false,
  lastLoginAt: "2026-11-04T10:10:34.427Z",
};
