import { useSyncExternalStore } from "react";

/** useMediaQuery("(max-width: 767px)") → boolean. Serverda (prerender) har doim false. */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
