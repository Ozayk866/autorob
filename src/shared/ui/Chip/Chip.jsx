import { cn } from "@/shared/lib/cn";
import styles from "./Chip.module.css";

/** TODO: filtr chipi (yechimlar katalogi) */
export function Chip({ className, ...props }) {
  return <span className={cn(styles.root, className)} {...props} />;
}
