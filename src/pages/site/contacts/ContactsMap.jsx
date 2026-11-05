import { useContacts } from "@/entities/settings";

// Xarita: contacts.map bo'lsa — Yandex iframe (contacts.map.lat, contacts.map.lng)
export function ContactsMap() {
  const contacts = useContacts();

  return <div className="contacts-map"></div>;
}
