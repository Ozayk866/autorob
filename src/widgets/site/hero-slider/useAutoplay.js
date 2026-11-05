import { useCallback, useState } from "react";
import { useMediaQuery } from "@/shared/hooks";

/**
 * Slayder holati. Vaqtni JS taymer emas, progress chizig'ining CSS animatsiyasi o'lchaydi:
 * animatsiya tugaganda (`onAnimationEnd`) keyingi slaydga o'tiladi. Shunda pauza va progress doim mos.
 * - sichqoncha ustida yoki fokus ichida — pauza
 * - `prefers-reduced-motion` — avtomatik o'tish yo'q
 * @param {number} count  slaydlar soni
 */
export function useAutoplay(count) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  return {
    index,
    goTo,
    next,
    prev,
    /** Avtomatik o'tish yoqilganmi (progress animatsiyasi yuradimi) */
    autoplay: !reducedMotion && count > 1,
    paused: hovered || focused,
    /** Slayder konteyneriga yoyiladi */
    containerProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false),
      onKeyDown: (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      },
    },
  };
}
