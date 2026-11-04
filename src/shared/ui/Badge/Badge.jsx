import { cn } from "@/shared/lib/cn";
import styles from "./Badge.module.css";

/** TODO: holat belgisi (published / draft / tarjima) */
export function Badge({ className, ...props }) {
  return <span className={cn(styles.root, className)} {...props} />;
}
