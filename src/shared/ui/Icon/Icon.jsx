import { cn } from "@/shared/lib/cn";
import styles from "./Icon.module.css";

// icons/ papkasidagi barcha SVG'lar avtomatik ulanadi: icons/arrow-right.svg → <Icon name="arrow-right" />.
// Yangi ikonka: SVG'ni qo'shing (viewBox="0 0 24 24", stroke="currentColor", width/height'siz).
const files = import.meta.glob("./icons/*.svg", { query: "?raw", import: "default", eager: true });
const ICONS = Object.fromEntries(
  Object.entries(files).map(([path, svg]) => [path.slice("./icons/".length, -".svg".length), svg]),
);

/**
 * Rangi `color` dan olinadi (currentColor).
 * @param {{ name: string, size?: number, label?: string, className?: string }} props
 * label bo'lmasa — dekorativ (aria-hidden)
 */
export function Icon({ name, size = 20, label, className }) {
  if (import.meta.env.DEV && !ICONS[name]) console.warn(`[Icon] "${name}" topilmadi (shared/ui/Icon/icons/)`);
  return (
    <span
      className={cn(styles.root, className)}
      style={{ width: size, height: size }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: ICONS[name] ?? "" }}
    />
  );
}
