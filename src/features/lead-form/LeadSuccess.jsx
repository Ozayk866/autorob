import { useEffect, useRef } from "react";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Button, Icon } from "@/shared/ui";
import styles from "./LeadForm.module.css";

/**
 * «Rahmat, Aziz!» — ariza qabul qilindi. Modalda «Yopish», sahifadagi formada «Yana ariza yuborish».
 * @param {{ name: string, phone: string, theme: "light" | "dark", onClose?: () => void, onReset: () => void }} props
 */
export function LeadSuccess({ name, phone, theme, onClose, onReset }) {
  const t = useT();
  const titleRef = useRef(null);

  // Ekran o'quvchi va klaviatura uchun fokus natijaga o'tadi
  useEffect(() => titleRef.current?.focus(), []);

  const [before, after] = t("lead.success.text").split("{phone}");

  return (
    <div className={cn(styles.success, theme === "dark" && styles.successDark)} role="status">
      <span className={styles.successIcon}>
        <Icon name="check" size={28} />
      </span>
      <h2 ref={titleRef} tabIndex={-1} className={styles.successTitle}>
        {t("lead.success.title", { name })}
      </h2>
      <p className={styles.successText}>
        {before}
        <strong>{phone}</strong>
        {after}
      </p>
      {onClose ? (
        <Button variant="secondary" size="lg" block onClick={onClose} className={styles.successAction}>
          {t("common.close")}
        </Button>
      ) : (
        <button type="button" className={styles.again} onClick={onReset}>
          {t("lead.success.again")}
        </button>
      )}
    </div>
  );
}
