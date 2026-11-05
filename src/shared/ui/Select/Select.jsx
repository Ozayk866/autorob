import { cn } from "@/shared/lib/cn";
import { Icon } from "../Icon";
import styles from "./Select.module.css";

/**
 * Oddiy select (native — mobilda qulay). `placeholder` berilsa — bo'sh qiymatli birinchi variant.
 * @param {{
 *   options: { value: string, label: string }[],
 *   placeholder?: string,
 *   theme?: "light" | "dark",
 * } & import("react").SelectHTMLAttributes<HTMLSelectElement>} props
 */
export function Select({ options, placeholder, theme = "light", className, value, ...props }) {
  return (
    <div className={styles.wrap}>
      <select
        className={cn(styles.root, theme === "dark" && styles.dark, !value && styles.empty, className)}
        value={value}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" size={18} className={styles.arrow} />
    </div>
  );
}
