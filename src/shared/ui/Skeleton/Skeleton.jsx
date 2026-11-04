import { cn } from "@/shared/lib/cn";
import styles from "./Skeleton.module.css";

/** Yuklanayotgan joy o'rnida: <Skeleton style={{ height: 200 }} /> */
export function Skeleton({ className, ...props }) {
  return <span aria-hidden="true" className={cn(styles.root, className)} {...props} />;
}
