/** Faqat raqamlar, boshida 998 bilan: "90 123 45 67" → "998901234567" */
export function normalizePhone(value) {
  const digits = String(value).replace(/\D/g, "");
  return digits.startsWith("998") ? digits.slice(0, 12) : `998${digits}`.slice(0, 12);
}

/** Input niqobi: "998901234567" → "+998 90 123 45 67" (qisman kiritilganda ham ishlaydi) */
export function formatPhone(value) {
  const d = normalizePhone(value).slice(3);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return ["+998", ...parts].join(" ");
}

export const isFullPhone = (value) => /^998\d{9}$/.test(String(value).replace(/\D/g, ""));
