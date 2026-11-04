import { cn } from "@/shared/lib/cn";
import chevronDown from "./icons/chevron-down.svg?raw";
import clock from "./icons/clock.svg?raw";
import close from "./icons/close.svg?raw";
import globe from "./icons/globe.svg?raw";
import logoMark from "./icons/logo-mark.svg?raw";
import mapPin from "./icons/map-pin.svg?raw";
import menu from "./icons/menu.svg?raw";
import phone from "./icons/phone.svg?raw";
import send from "./icons/send.svg?raw";
import styles from "./Icon.module.css";

// Yangi ikonka: icons/ ga SVG qo'shing (stroke="currentColor", width/height'siz) va shu yerga yozing
const ICONS = {
  "chevron-down": chevronDown,
  clock,
  close,
  globe,
  "logo-mark": logoMark,
  "map-pin": mapPin,
  menu,
  phone,
  send,
};

/**
 * Rangi `color` dan olinadi (currentColor).
 * @param {{ name: keyof typeof ICONS, size?: number, label?: string, className?: string }} props
 * label bo'lmasa — dekorativ (aria-hidden)
 */
export function Icon({ name, size = 20, label, className }) {
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
