import { cn } from "@/shared/lib/cn";
import styles from "./form.module.css";

/** SEO maydonlari uchun: 54/60 */
export function CharCounter({ value = "", max }) {
  return (
    <span className={cn(styles.counter, value.length > max && styles.counterOver)}>
      {value.length}/{max}
    </span>
  );
}
