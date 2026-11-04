import { cn } from "@/shared/lib/cn";
import styles from "./Button.module.css";

/**
 * TODO: o'lchamlar (sm / md / lg), loading holati, ikonka bilan
 * @param {{ variant?: "primary" | "secondary" | "ghost" } & import("react").ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export function Button({ variant = "primary", type = "button", className, ...props }) {
  return <button type={type} className={cn(styles.root, styles[variant], className)} {...props} />;
}
