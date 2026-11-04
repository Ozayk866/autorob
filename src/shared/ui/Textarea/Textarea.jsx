import { cn } from "@/shared/lib/cn";
import styles from "./Textarea.module.css";

/** @param {{ theme?: "light" | "dark" } & import("react").TextareaHTMLAttributes<HTMLTextAreaElement>} props */
export function Textarea({ theme = "light", className, ...props }) {
  return <textarea className={cn(styles.root, theme === "dark" && styles.dark, className)} {...props} />;
}
