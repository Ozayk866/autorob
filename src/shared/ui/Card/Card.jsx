import { cn } from "@/shared/lib/cn";
import styles from "./Card.module.css";

/** TODO: umumiy karta */
export function Card({ className, ...props }) {
  return <div className={cn(styles.root, className)} {...props} />;
}
