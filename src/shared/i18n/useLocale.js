import { useContext } from "react";
import { LocaleContext } from "./LocaleContext";

/** @returns {import("./locales").Locale} */
export const useLocale = () => useContext(LocaleContext);
