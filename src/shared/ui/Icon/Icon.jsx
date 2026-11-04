import styles from "./Icon.module.css";

// TODO: icons/*.svg fayllarini qo'shib, shu yerda import qiling: import dash from "./icons/dash.svg?raw";
const ICONS = {};

/** @param {{ name: string, size?: number, label?: string }} props  label bo'lmasa — dekorativ (aria-hidden) */
export function Icon({ name, size = 20, label }) {
  return (
    <span
      className={styles.root}
      style={{ width: size, height: size }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: ICONS[name] ?? "" }}
    />
  );
}
