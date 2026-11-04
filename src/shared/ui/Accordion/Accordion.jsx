import styles from "./Accordion.module.css";

/** TODO: ochiluvchi ro'yxat (FAQ): <button aria-expanded> + panel */
export function Accordion({ children }) {
  return <div className={styles.root}>{children}</div>;
}
