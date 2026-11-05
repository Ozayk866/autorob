import { cn } from "@/components/cn";
import { Icon } from "../Icon/Icon";
import "./CoverArt.css";

/**
 * Rasm: image="/images/crm.jpg" (fayl public/images/ papkasida). Rasm yo'q bo'lsa (null) —
 * rangli gradient va markazda ikonka.
 *   <CoverArt image={solution.coverImage} tone="blue" icon="layers" />
 * tone: "blue" | "teal" | "slate" | "indigo" | "sky"
 */
export function CoverArt({ image, tone = "blue", icon, alt = "", className }) {
  if (image) {
    return (
      <img className={cn("cover-art", "cover-art-image", className)} src={image} alt={alt} loading="lazy" />
    );
  }

  return (
    <div className={cn("cover-art", `cover-art-${tone}`, className)} aria-hidden="true">
      {icon && (
        <span className="cover-art-badge">
          <Icon name={icon} size={36} />
        </span>
      )}
    </div>
  );
}
