import { cn } from "@/shared/lib/cn";
import styles from "./Input.module.css";

/**
 * Matn maydoni. Xato holati — `aria-invalid` (FormField o'zi qo'yadi). React 19: `ref` oddiy prop.
 * @param {{ theme?: "light" | "dark" } & import("react").InputHTMLAttributes<HTMLInputElement>} props
 */
export function Input({ theme = "light", className, ...props }) {
  return <input className={cn(styles.root, theme === "dark" && styles.dark, className)} {...props} />;
}
