import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";

/** Login va parol almashtirish uchun: markazda bitta karta */
export function AuthLayout() {
  return (
    <div className={styles.root}>
      <meta name="robots" content="noindex" />
      <title>AUTOROB — Admin</title>
      <div className={styles.card}>
        <Outlet />
      </div>
    </div>
  );
}
