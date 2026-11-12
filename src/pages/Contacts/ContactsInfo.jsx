import { Icon } from "@/components";
import { contacts } from "@/data/contacts";

// Chapda 2×2 kartalar (Manzil, Telefon, Telegram, Ish vaqti) va «Ijtimoiy tarmoqlar» tugmalari
export function ContactsInfo() {
  // ← shuni map qilasiz: cards.map((card) => …) — card.icon, card.label (key), card.value
  //    card.href bo'lsa — qiymat <a href={card.href}>, bo'lmasa oddiy matn
  const cards = [
    { icon: "map-pin", label: "Manzil", value: contacts.address },
    { icon: "phone", label: "Telefon", value: contacts.phone, href: contacts.phoneHref },
    { icon: "send", label: "Telegram", value: contacts.telegram, href: contacts.telegramHref },
    { icon: "clock", label: "Ish vaqti", value: contacts.workHours },
  ];

  // ← shuni map qilasiz: socials.map((s) => …) — s.icon, s.label (key), s.href — doira tugmalar
  const socials = [
    { icon: "send", label: "Telegram", href: contacts.telegramHref },
    { icon: "instagram", label: "Instagram", href: contacts.socials.instagram },
    { icon: "mail", label: "Email", href: contacts.emailHref },
  ].filter((s) => s.href);

  return <div className="contacts-info">
    {cards.map((card) =>
      <li key={card.label} className="cards-li">
        <Icon className="card-icon" name={card.icon} />
        <p className="card-p">{card.label}</p>
        <h5 className="card-h5">{card.href ? <a href={card.href}>{card.value}</a> : <strong>{card.value}</strong>}</h5>
      </li>
    )}
    <div className="contacts-div">
      <p className="contacts-p">Ijtimoiy tarmoqlar</p>
      <div>
        {socials.map((s) =>
          <li className="s-li">
            <Icon className="s-icon" name={s.icon} />
          </li>
        )}
      </div></div>
  </div>;
}
