import styles from "./Tabs.module.css";

/** TODO: tablar (LocalizedField'da tillar uchun ham ishlatiladi): role=tablist, strelkalar bilan o'tish */
export function Tabs({ children }) {
  return <div className={styles.root}>{children}</div>;
}
