import { cn } from "@/components/cn";
import { Icon } from "../Icon/Icon";
import "./Logo.css";

/**
 * AUTOROB logotipi: belgi (32px) + so'z belgisi (Unbounded Medium 18).
 * @param {{ theme?: "dark" | "light", className?: string }} props  dark — qorong'i fon ustida (oq matn)
 */
export function Logo({ theme = "dark", className }) {
  return (
    <span className={cn("logo", `logo-${theme}`, className)}>
      <Icon name="logo-mark" size={32} />
      <span className="logo-word">AUTOROB</span>
    </span>
  );
}
