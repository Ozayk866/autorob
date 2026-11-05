import { contacts } from "@/data/contacts";
import { getShareLinks } from "./data";

// «Ulashish:» + 3 ta doira tugma: Telegram, Instagram, havolani nusxalash
export function PostShare() {
  const url = typeof window === "undefined" ? "" : window.location.href; // maqola manzili
  const links = getShareLinks(url, contacts.socials.instagram);

  // ← shuni map qilasiz: links.map((link) => …) — link.icon, link.label (key), link.href
  //    link.copy bo'lsa — <a> emas, <button onClick={() => navigator.clipboard.writeText(url)}>
  return <div className="post-share"></div>;
}
