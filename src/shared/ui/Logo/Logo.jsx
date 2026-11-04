import { cn } from "@/shared/lib/cn";
import styles from "./Logo.module.css";

/** TODO: AUTOROB logotipi (SVG) */
export function Logo({ className, ...props }) {
  return <span className={cn(styles.root, className)} {...props} />;
}
