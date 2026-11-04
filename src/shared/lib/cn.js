/** cn(styles.root, active && styles.active, className) → "a b c" */
export const cn = (...classes) => classes.filter(Boolean).join(" ");
