import styles from "./Tooltip.module.css";

/** TODO: hover/focus'da ko'rinadigan izoh */
export function Tooltip({ children }) {
  return <div className={styles.root}>{children}</div>;
}
