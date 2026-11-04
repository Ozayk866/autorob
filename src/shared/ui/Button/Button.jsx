import { cn } from "@/shared/lib/cn";
import styles from "./Button.module.css";

/**
 * TODO: loading holati, ikonka bilan
 * @param {{ variant?: "primary" | "secondary" | "ghost", size?: "md" | "lg" } & import("react").ButtonHTMLAttributes<HTMLButtonElement>} props
 * lg — 50px (header CTA), md — 44px
 */
export function Button({ variant = "primary", size = "md", type = "button", className, ...props }) {
  return (
    <button type={type} className={cn(styles.root, styles[variant], styles[size], className)} {...props} />
  );
}
