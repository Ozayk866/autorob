import { useEffect } from "react";
import { useBlocker } from "react-router";

/**
 * Admin formada saqlanmagan o'zgarish bo'lsa, sahifadan chiqishda ogohlantiradi.
 * @param {boolean} isDirty  react-hook-form: formState.isDirty
 * @returns blocker — blocker.state === "blocked" bo'lsa tasdiqlash modalini ko'rsating (proceed / reset)
 */
export function useUnsavedChanges(isDirty) {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (!isDirty) return;
    const onBeforeUnload = (e) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  return blocker;
}
