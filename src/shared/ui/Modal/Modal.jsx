import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";
import { Icon } from "../Icon";
import styles from "./Modal.module.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Markazdagi modal oyna (portal → document.body).
 * Kirish imkoniyati: ochilganda fokus ichkariga o'tadi va ichida aylanadi, Esc va fon bosilganda yopiladi,
 * yopilganda fokus modalni ochgan elementga qaytadi; ochiqligida sahifa scroll bo'lmaydi.
 * @param {{ isOpen: boolean, onClose: () => void, labelledBy?: string, closeLabel: string,
 *   className?: string, children?: import("react").ReactNode }} props
 * labelledBy — sarlavha elementining id'si; closeLabel — «✕» tugmasi uchun matn (ekran o'quvchi)
 */
export function Modal({ isOpen, onClose, labelledBy, closeLabel, className, children }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    const dialog = dialogRef.current;
    const focusables = () => [...dialog.querySelectorAll(FOCUSABLE)];
    (focusables().find((el) => el.tagName !== "BUTTON") ?? dialog).focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(styles.dialog, className)}
      >
        <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
          <Icon name="close" size={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
