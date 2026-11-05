import { useContacts } from "@/entities/settings";

// Chapda 2×2 kartalar (Manzil, Telefon, Telegram, Ish vaqti) va «Ijtimoiy tarmoqlar» tugmalari
export function ContactsInfo() {
  // contacts.address, contacts.phone + phoneHref, contacts.telegram + telegramHref, contacts.workHours,
  // contacts.emailHref, contacts.socials.instagram
  // Kartalar uchun ro'yxat tuzib (cards), ← shuni map qilasiz
  const contacts = useContacts();

  return <div className="contacts-info"></div>;
}
