import { useContext } from "react";
import { ToastContext } from "./ToastContext";

/** const toast = useToast(); toast.success("Saqlandi"); toast.error(message) */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast: ToastProvider topilmadi");
  return { success: (m) => ctx.show(m, "success"), error: (m) => ctx.show(m, "error") };
}
