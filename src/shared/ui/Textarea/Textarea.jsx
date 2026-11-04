import { cn } from "@/shared/lib/cn";
import styles from "./Textarea.module.css";

/** TODO: ko'p qatorli matn maydoni */
export function Textarea({ className, ...props }) {
  return <textarea className={cn(styles.root, className)} {...props} />;
}
