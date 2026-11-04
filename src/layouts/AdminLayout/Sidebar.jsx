import { NavLink } from "react-router";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { adminNav } from "./nav.config";
import styles from "./AdminLayout.module.css";

/** TODO: Icon komponenti tayyor bo'lgach item.icon ni ko'rsatish */
export function Sidebar() {
  const t = useT();

  return (
    <aside className={styles.sidebar}>
      {adminNav.map((group) => (
        <nav key={group.group} className={styles.navGroup}>
          <p className={styles.navGroupTitle}>{t(group.group)}</p>
          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => cn(styles.navLink, isActive && styles.navLinkActive)}
            >
              {t(item.label)}
            </NavLink>
          ))}
        </nav>
      ))}
    </aside>
  );
}
