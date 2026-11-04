import { Outlet } from "react-router";
import { LeadModalProvider } from "@/features/lead-form";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import styles from "./SiteLayout.module.css";

/** `children` berilsa (xato sahifasi), Outlet o'rniga shu ko'rsatiladi */
export function SiteLayout({ children }) {
  return (
    <LeadModalProvider>
      <div className={styles.root}>
        <TopBar />
        <Header />
        <main id="main" className={styles.main}>
          {children ?? <Outlet />}
        </main>
        <Footer />
      </div>
    </LeadModalProvider>
  );
}
