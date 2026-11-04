import { cn } from "@/shared/lib/cn";
import styles from "./EmptyState.module.css";

/** TODO: bo'sh ro'yxat holati: ikonka, matn, amal tugmasi */
export function EmptyState({ className, ...props }) {
  return <div className={cn(styles.root, className)} {...props} />;
}
