import styles from "./Spinner.module.css";

/** @param {{ fullPage?: boolean }} props */
export function Spinner({ fullPage = false }) {
  const spinner = <span className={styles.spinner} role="status" aria-busy="true" />;
  return fullPage ? <div className={styles.fullPage}>{spinner}</div> : spinner;
}
