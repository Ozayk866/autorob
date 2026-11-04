import { useCallback, useMemo, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { ToastContext } from "./ToastContext";
import styles from "./Toast.module.css";

const DURATION = 4000;
let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = "success") => {
    const id = nextId++;
    setToasts((list) => [...list, { id, message, type }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), DURATION);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext value={value}>
      {children}
      <div className={styles.region} role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={cn(styles.toast, styles[t.type])}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext>
  );
}
