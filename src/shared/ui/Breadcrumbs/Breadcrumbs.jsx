import { Link } from "react-router";
import { cn } from "@/shared/lib/cn";
import { Icon } from "../Icon";
import styles from "./Breadcrumbs.module.css";

/**
 * «Bosh sahifa › Blog › CRM». Oxirgi element havola emas (joriy sahifa).
 * @param {{ items: { label: string, to?: string }[], theme?: "dark" | "light", className?: string }} props
 * dark — qorong'i fon ustida (PageHero), light — oq fonda (maqola sahifasi)
 */
export function Breadcrumbs({ items, theme = "dark", className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn(styles.root, styles[theme], className)}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {isLast || !item.to ? (
                <span aria-current={isLast ? "page" : undefined} className={styles.current}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              )}
              {!isLast && <Icon name="chevron-right" size={14} className={styles.separator} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
