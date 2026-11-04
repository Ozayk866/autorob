import { cn } from "@/shared/lib/cn";
import { Icon } from "../Icon";
import styles from "./Logo.module.css";

/**
 * AUTOROB logotipi: belgi (32px) + so'z belgisi (Unbounded Medium 18).
 * @param {{ theme?: "dark" | "light", className?: string }} props  dark — qorong'i fon ustida (oq matn)
 */
export function Logo({ theme = "dark", className }) {
  return (
    <span className={cn(styles.root, styles[theme], className)}>
      <Icon name="logo-mark" size={32} />
      <span className={styles.word}>AUTOROB</span>
    </span>
  );
}
