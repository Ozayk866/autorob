import { contacts } from "@/data/contacts";
import { Icon } from "@/components/Icon/Icon";
import "./TopBar.css";

/** Figma: Top bar (10:240) — ish vaqti, manzil | telefon, Telegram */
export function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        <span className="top-bar-item top-bar-secondary">
          <Icon name="clock" size={16} className="top-bar-icon" />
          {contacts.workHours}
        </span>
        <span className="top-bar-item top-bar-secondary">
          <Icon name="map-pin" size={16} className="top-bar-icon" />
          {contacts.address}
        </span>
        <span className="top-bar-spacer" />
        <a href={contacts.phoneHref} className="top-bar-item top-bar-link">
          <Icon name="phone" size={16} className="top-bar-icon" />
          {contacts.phone}
        </a>
        <a
          href={contacts.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="top-bar-item top-bar-link"
        >
          <Icon name="send" size={16} className="top-bar-icon" />
          {contacts.telegram}
        </a>
      </div>
    </div>
  );
}
