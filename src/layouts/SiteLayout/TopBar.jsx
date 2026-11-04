import { useContacts } from "@/entities/settings";
import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";
import styles from "./TopBar.module.css";

/** Figma: Top bar (10:240) — ish vaqti, manzil | telefon, Telegram */
export function TopBar() {
  const contacts = useContacts();

  return (
    <div className={styles.root}>
      <div className={cn("container", styles.inner)}>
        <span className={cn(styles.item, styles.secondary)}>
          <Icon name="clock" size={16} className={styles.icon} />
          {contacts.workHours}
        </span>
        <span className={cn(styles.item, styles.secondary)}>
          <Icon name="map-pin" size={16} className={styles.icon} />
          {contacts.address}
        </span>
        <span className={styles.spacer} />
        <a href={contacts.phoneHref} className={cn(styles.item, styles.link)}>
          <Icon name="phone" size={16} className={styles.icon} />
          {contacts.phone}
        </a>
        <a
          href={contacts.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(styles.item, styles.link)}
        >
          <Icon name="send" size={16} className={styles.icon} />
          {contacts.telegram}
        </a>
      </div>
    </div>
  );
}
