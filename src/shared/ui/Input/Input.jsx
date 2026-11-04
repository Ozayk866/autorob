import { cn } from "@/shared/lib/cn";
import styles from "./Input.module.css";

/** TODO: matn maydoni (xato holati: aria-invalid) */
export function Input({ className, ...props }) {
  return <input className={cn(styles.root, className)} {...props} />;
}
