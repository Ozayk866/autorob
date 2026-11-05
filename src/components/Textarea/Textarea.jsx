import { cn } from "@/components/cn";
import "./Textarea.css";

/** @param {{ theme?: "light" | "dark" } & import("react").TextareaHTMLAttributes<HTMLTextAreaElement>} props */
export function Textarea({ theme = "light", className, ...props }) {
  return (
    <textarea
      className={cn("control", "textarea", theme === "dark" && "control-dark", className)}
      {...props}
    />
  );
}
