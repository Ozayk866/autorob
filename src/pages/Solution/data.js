// Yechim sahifasining backend'dan kelmaydigan matnlari — tayyor. Bo'lim fayllarida import qilingan,
// siz faqat map qilasiz. Matnlar hamma yechimlar uchun bir xil.

// SolutionHero — 3 ta raqam
export const HERO_STATS = [
  { value: "2–4 hafta", label: "joriy etish muddati" },
  { value: "50+", label: "bajarilgan loyiha" },
  { value: "24/7", label: "qo'llab-quvvatlash" },
];

// SolutionProblems — 3 ta karta
export const PROBLEMS = [
  {
    icon: "alert-circle",
    title: "Arizalar yo'qoladi",
    text: "Qo'ng'iroq, Telegram va saytdan kelgan arizalar turli joyda qoladi va unutiladi.",
  },
  {
    icon: "users",
    title: "Jarayon nazoratsiz",
    text: "Kim nima qilayotgani, ish qaysi bosqichda to'xtab qolgani ko'rinmaydi.",
  },
  {
    icon: "clock",
    title: "Hisobot qo'lda",
    text: "Har oy Excel'da soatlab hisobot yig'iladi, raqamlar esa baribir aniq emas.",
  },
];

// SolutionProcess — 4 bosqich (raqami: map'dagi i + 1)
export const PROCESS = [
  {
    title: "Tahlil",
    time: "1–3 kun",
    text: "Jarayonlaringizni o'rganamiz va yechim tuzilmasini loyihalaymiz.",
  },
  { title: "Sozlash", time: "1–2 hafta", text: "Tizimni sozlaymiz, integratsiya va hisobotlarni ulaymiz." },
  { title: "O'qitish", time: "2–3 kun", text: "Jamoangizni tizimda ishlashga amalda o'rgatamiz." },
  { title: "Qo'llab-quvvatlash", time: "doimiy", text: "Ishga tushgandan keyin ham yordam beramiz." },
];
