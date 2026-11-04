import { cn } from "@/shared/lib/cn";
import styles from "./Checkbox.module.css";

/** TODO: label bilan, Figma'dagi ko'rinish */
export function Checkbox({ className, ...props }) {
  return <input type="checkbox" className={cn(styles.root, className)} {...props} />;
}
