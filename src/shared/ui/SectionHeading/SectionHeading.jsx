import { cn } from "@/shared/lib/cn";
import styles from "./SectionHeading.module.css";

/**
 * Bo'lim sarlavhasi: eyebrow (kichik ko'k ustki yozuv) + sarlavha + matn.
 * @param {{ eyebrow?: string, title: string, subtitle?: string, as?: "h1" | "h2",
 *   align?: "left" | "center", theme?: "light" | "dark", className?: string }} props
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Heading = "h2",
  align = "left",
  theme = "light",
  className,
}) {
  return (
    <div className={cn(styles.root, styles[align], styles[theme], className)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Heading className={styles.title}>{title}</Heading>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
