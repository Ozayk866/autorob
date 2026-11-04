import { useT } from "@/shared/i18n";
import styles from "./form.module.css";

/**
 * Label + maydon + xato/izoh. Xato xabari i18n kaliti bo'lsa tarjima qilinadi (zod sxemalardagi "lead.errors.name").
 * @param {{ label?: string, htmlFor?: string, error?: { message?: string }, hint?: string, children: import("react").ReactNode }} props
 */
export function FormField({ label, htmlFor, error, hint, children }) {
  const t = useT();
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
        </label>
      )}
      {children}
      {error?.message ? (
        <p className={styles.error} role="alert">
          {t(error.message)}
        </p>
      ) : (
        hint && <p className={styles.hint}>{hint}</p>
      )}
    </div>
  );
}
