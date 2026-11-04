import { useContacts } from "@/entities/settings";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";
import styles from "./LeadForm.module.css";

/**
 * Maydonga bog'lanmagan xato: 429 → «juda ko'p urinish»; tarmoq/500 → «yuborilmadi» + telefon raqam.
 * @param {{ messageKey: string, theme: "light" | "dark" }} props
 */
export function LeadError({ messageKey, theme }) {
  const t = useT();
  const { phone, phoneHref } = useContacts();

  return (
    <p role="alert" className={cn(styles.alert, theme === "dark" && styles.alertDark)}>
      <Icon name="alert-circle" size={18} />
      <span>
        {t(messageKey)}
        {messageKey === "lead.errors.failed" && (
          <>
            {" "}
            <a href={phoneHref} className={styles.alertLink}>
              {phone}
            </a>
          </>
        )}
      </span>
    </p>
  );
}
