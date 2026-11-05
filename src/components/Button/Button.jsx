import { Link } from "react-router";
import { cn } from "@/components/cn";
import { Icon } from "../Icon/Icon";
import "./Button.css";

/**
 * Tugma yoki tugma ko'rinishidagi havola (`to` berilsa — react-router Link).
 * @param {{
 *   variant?: "primary" | "secondary" | "light" | "outline" | "ghost",
 *   size?: "md" | "lg",
 *   block?: boolean,
 *   to?: string,
 *   iconRight?: string,
 * } & import("react").ButtonHTMLAttributes<HTMLButtonElement>} props
 * lg — 50px (hero, CTA), md — 44px; block — to'liq kenglik; iconRight — o'ngdagi ikonka (masalan "arrow-right")
 */
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  to,
  iconRight,
  type = "button",
  className,
  children,
  ...props
}) {
  const classes = cn("button", `button-${variant}`, `button-${size}`, block && "button-block", className);
  const content = (
    <>
      {children}
      {iconRight && <Icon name={iconRight} size={18} className="button-icon" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
