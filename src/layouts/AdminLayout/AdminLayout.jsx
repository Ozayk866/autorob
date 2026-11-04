import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { AdminTopbar } from "./AdminTopbar";
import styles from "./AdminLayout.module.css";

export function AdminLayout() {
  return (
    <div className={styles.root}>
      <meta name="robots" content="noindex" />
      <title>AUTOROB — Admin</title>
      <Sidebar />
      <div className={styles.body}>
        <AdminTopbar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
