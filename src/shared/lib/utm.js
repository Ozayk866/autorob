// UTM belgilari (reklama manbasi) arizaga qo'shiladi. Foydalanuvchi saytga kirgan birinchi URL'dan olinadi
// va sessiya davomida saqlanadi — keyin boshqa sahifaga o'tsa ham yo'qolmaydi.

const KEY = "autorob_utm";
const FIELDS = ["source", "medium", "campaign", "content", "term"];

/** main.jsx da bir marta chaqiriladi */
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      FIELDS.map((f) => [f, params.get(`utm_${f}`)?.slice(0, 200)]).filter(([, v]) => v),
    );
    if (Object.keys(utm).length) sessionStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    // sessionStorage yopiq bo'lishi mumkin (maxfiy rejim) — UTM shunchaki yuborilmaydi
  }
}

/** @returns {{ source?: string, medium?: string, campaign?: string, content?: string, term?: string } | undefined} */
export function getUtm() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
