import { cn } from "@/components/cn";
import "./SectionHeading.css";

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
    <div className={cn("section-heading", `section-heading-${align}`, `section-heading-${theme}`, className)}>
      {eyebrow && <p className="section-heading-eyebrow">{eyebrow}</p>}
      <Heading className="section-heading-title">{title}</Heading>
      {subtitle && <p className="section-heading-subtitle">{subtitle}</p>}
    </div>
  );
}
