import { cn } from "@/shared/lib/cn";
import styles from "./Toggle.module.css";

/**
 * TODO: Figma'dagi ko'rinish
 * @param {{ checked: boolean, onChange?: (checked: boolean) => void, disabled?: boolean, className?: string }} props
 */
export function Toggle({ checked, onChange, className, ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(styles.root, checked && styles.on, className)}
      onClick={() => onChange?.(!checked)}
      {...props}
    />
  );
}
