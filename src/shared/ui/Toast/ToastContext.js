import { createContext } from "react";

/** @type {import("react").Context<{ show: (message: string, type?: "success" | "error") => void } | null>} */
export const ToastContext = createContext(null);
