import { useEffect, useRef } from "react";

/** useHotkey("mod+s", save) — mod = Ctrl (Windows) yoki Cmd (macOS) */
export function useHotkey(combo, handler) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const keys = combo.toLowerCase().split("+");
    const key = keys.at(-1);
    const needMod = keys.includes("mod");
    const onKeyDown = (e) => {
      if (e.key.toLowerCase() !== key) return;
      if (needMod && !(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      handlerRef.current(e);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [combo]);
}
