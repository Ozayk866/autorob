import { cn } from "@/shared/lib/cn";
import { Icon } from "../Icon";
import styles from "./CoverArt.module.css";

/**
 * Rasm bo'lmaganda (coverImage: null) — dizayndagi rangli gradient + to'r naqsh + markazda ikonka.
 * Rasm bo'lsa — o'sha rasm (`srcSet` bilan).
 * @param {{
 *   image?: import("@/shared/api/types").Image | null,
 *   tone?: "blue" | "teal" | "slate" | "indigo" | "sky",
 *   icon?: string,
 *   sizes?: string,
 *   priority?: boolean,
 *   className?: string,
 * }} props  icon berilmasa — faqat gradient; priority — birinchi ekrandagi rasm (lazy emas)
 */
export function CoverArt({
  image,
  tone = "blue",
  icon,
  sizes = "(max-width: 767px) 100vw, 33vw",
  priority,
  className,
}) {
  if (image?.url) {
    const srcSet = Object.entries(image.variants ?? {})
      .map(([w, url]) => `${url} ${w}w`)
      .join(", ");
    return (
      <img
        className={cn(styles.root, styles.image, className)}
        src={image.url}
        srcSet={srcSet || undefined}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt ?? ""}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <div className={cn(styles.root, styles[tone], className)} aria-hidden="true">
      {icon && (
        <span className={styles.badge}>
          <Icon name={icon} size={36} />
        </span>
      )}
    </div>
  );
}
