// Yechimlar. Backend qo'shilganda shu ma'lumot API'dan keladi.
// categories: "service" | "education" | "manufacturing" (nomi: t("solutionCategories." + c))

export const SOLUTION_CATEGORIES = ["service", "education", "manufacturing"];

export const solutions = [
  {
    id: 1,
    slug: "crm-tizimi",
    title: "CRM tizimi",
    shortDescription:
      "Mijozlar, arizalar va sotuvni bitta oynada boshqaring. Telefoniya va Telegram bilan integratsiya.",
    categories: ["service", "education"],
    coverImage: null,
    features: [
      "Mijozlar bazasi",
      "Sotuv voronkasi",
      "Telefoniya va Telegram",
      "Vazifa va eslatmalar",
      "Hisobotlar",
      "Integratsiyalar",
    ],
    faq: [
      {
        id: 1,
        question: "CRM'ni joriy qilish qancha vaqt oladi?",
        answer: "Odatda 2–4 hafta. Muddat modullar soni, integratsiyalar va jamoangiz kattaligiga bog'liq.",
      },
      {
        id: 2,
        question: "Narxi qanday hisoblanadi?",
        answer:
          "Narx foydalanuvchilar soni va kerakli modullarga qarab hisoblanadi. Ariza qoldiring — aniq taklif tayyorlaymiz.",
      },
      {
        id: 3,
        question: "Mavjud Excel bazamizni ko'chirib berasizmi?",
        answer: "Ha, mijozlar bazasi va tarixni Excel'dan bepul ko'chirib beramiz.",
      },
      {
        id: 4,
        question: "Telegram va telefoniya bilan ishlaydimi?",
        answer: "Ha. Qo'ng'iroqlar va Telegram xabarlari avtomatik CRM'ga tushadi.",
      },
    ],
  },
  {
    id: 2,
    slug: "erp-tizimi",
    title: "ERP tizimi",
    shortDescription: "Ombor, xarid, moliya va ishlab chiqarishni yagona hisobga bog'lang.",
    categories: ["manufacturing", "service"],
    coverImage: null,
    features: ["Ombor hisobi", "Xaridlar", "Moliya", "Ishlab chiqarish rejasi"],
    faq: [],
  },
  {
    id: 3,
    slug: "sanoat-robotlari",
    title: "Sanoat robotlari",
    shortDescription: "Takroriy va og'ir operatsiyalarni robotlar bajaradi: yuklash, saralash, qadoqlash.",
    categories: ["manufacturing"],
    coverImage: null,
    features: ["Yuklash va tushirish", "Saralash", "Qadoqlash"],
    faq: [],
  },
  {
    id: 4,
    slug: "robot-payvandlash",
    title: "Robot payvandlash",
    shortDescription: "Payvandlash sifatini barqaror qiling va ish unumdorligini 2–3 barobar oshiring.",
    categories: ["manufacturing"],
    coverImage: null,
    features: ["Barqaror chok sifati", "2–3 barobar tezroq"],
    faq: [],
  },
  {
    id: 5,
    slug: "stanok-liniyalari",
    title: "Stanok liniyalari (CNC)",
    shortDescription:
      "To'liq avtomatlashtirilgan ishlab chiqarish liniyasini loyihalash, o'rnatish va ishga tushirish.",
    categories: ["manufacturing"],
    coverImage: null,
    features: ["Loyihalash", "O'rnatish", "Ishga tushirish"],
    faq: [],
  },
  {
    id: 6,
    slug: "talim-markazlari-uchun-crm",
    title: "Ta'lim markazlari uchun CRM",
    shortDescription: "O'quvchilar, guruhlar, to'lovlar va dars jadvallarini avtomatlashtiring.",
    categories: ["education"],
    coverImage: null,
    features: ["O'quvchilar bazasi", "Guruhlar va jadval", "To'lovlar nazorati"],
    faq: [],
  },
];

/** Bitta yechim + «Boshqa yechimlar» (related) */
export function getSolution(slug) {
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return null;
  return { ...solution, related: solutions.filter((s) => s.slug !== slug).slice(0, 3) };
}
