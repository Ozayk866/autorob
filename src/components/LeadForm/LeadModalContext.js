import { createContext } from "react";

/** @type {import("react").Context<{ open: (solutionId?: string) => void, close: () => void } | null>} */
export const LeadModalContext = createContext(null);
