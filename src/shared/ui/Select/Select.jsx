import { cn } from "@/shared/lib/cn";
import styles from "./Select.module.css";

/** TODO: Figma'dagi ko'rinish (o'q ikonkasi) */
export function Select({ className, children, ...props }) {
  return (
    <select className={cn(styles.root, className)} {...props}>
      {children}
    </select>
  );
}
