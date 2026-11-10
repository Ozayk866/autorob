import { contacts } from "@/data/contacts";

// Xarita: contacts.map bo'lsa — Yandex iframe (contacts.map.lat, contacts.map.lng)
export function ContactsMap() {
  return <div className="contacts-map">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.2972855712665!2d71.63746717529966!3d40.996865920128535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4b53b3d1aa1d%3A0xf01247f941cd093c!2sNamangan%20IT%20School!5e0!3m2!1suz!2s!4v1793981089491!5m2!1suz!2s" width="1200" height="440" style={{border:0}} allowfullscreen={true} loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>;
}
