import { cloneElement, useId } from "react";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";
import { Icon } from "@/shared/ui/Icon";
import styles from "./form.module.css";

/**
 * Label + maydon + xato/izoh. Maydonga `id`, `aria-invalid`, `aria-describedby` o'zi qo'shiladi:
 *   <FormField label="Ism"><Input {...register("name")} /></FormField>
 * Maydon o'ralgan bo'lsa (Controller) — funksiya: <FormField>{(a11y) => <Controller render={() => <Input {...a11y} />} />}</FormField>
 * Xato xabari i18n kaliti bo'lsa tarjima qilinadi (zod: "lead.errors.name"), oddiy matn bo'lsa — o'zi (server xatosi).
 * @param {{ label?: string, error?: { message?: string }, hint?: string, theme?: "light" | "dark",
 *   children: import("react").ReactElement | ((a11y: object) => import("react").ReactNode) }} props
 */
export function FormField({ label, error, hint, theme = "light", children }) {
  const t = useT();
  const id = useId();
  const messageId = `${id}-message`;
  const message = error?.message ? t(error.message) : hint;
  const a11y = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": message ? messageId : undefined,
  };

  return (
    <div className={cn(styles.field, theme === "dark" && styles.dark)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      {typeof children === "function" ? children(a11y) : cloneElement(children, a11y)}
      {error?.message ? (
        <p id={messageId} className={styles.error}>
          <Icon name="alert-circle" size={14} />
          {message}
        </p>
      ) : (
        hint && (
          <p id={messageId} className={styles.hint}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}
