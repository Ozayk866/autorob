import styles from "./Modal.module.css";

/**
 * TODO: markazdagi modal oyna (portal orqali document.body ga)
 * Kirish imkoniyati: fokus ichida ushlanadi, Esc bilan yopiladi, yopilganda fokus tugmaga qaytadi.
 * @param {{ isOpen: boolean, onClose: () => void, title?: string, children?: import("react").ReactNode }} props
 */
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={styles.root}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
