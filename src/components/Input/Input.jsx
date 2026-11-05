import { cn } from "@/components/cn";
import "./Input.css";

/**
 * Matn maydoni. Xato holati — `aria-invalid` (FormField o'zi qo'yadi). React 19: `ref` oddiy prop.
 * @param {{ theme?: "light" | "dark" } & import("react").InputHTMLAttributes<HTMLInputElement>} props
 */
export function Input({ theme = "light", className, ...props }) {
  return (
    <input className={cn("control", "input", theme === "dark" && "control-dark", className)} {...props} />
  );
}
