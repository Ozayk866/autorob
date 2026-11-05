// Ulashish tugmalari — tayyor. PostShare.jsx'da chaqirilgan, siz faqat map qilasiz.
// url — maqola manzili, instagram — kompaniya Instagram sahifasi
export function getShareLinks(url, instagram) {
  return [
    { icon: "send", label: "Telegram", href: `https://t.me/share/url?url=${encodeURIComponent(url)}` },
    { icon: "instagram", label: "Instagram", href: instagram || "https://instagram.com/autorob_uz" },
    { icon: "link", label: "Havolani nusxalash", copy: true }, // href yo'q — bosilganda navigator.clipboard.writeText(url)
  ];
}
