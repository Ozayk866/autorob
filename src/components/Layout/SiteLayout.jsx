import { Outlet } from "react-router";
import { LeadModalProvider } from "@/components/LeadForm/LeadModalProvider";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./SiteLayout.css";

/** `children` berilsa (xato sahifasi), Outlet o'rniga shu ko'rsatiladi */
export function SiteLayout({ children }) {
  return (
    <LeadModalProvider>
      <div className="site-layout">
        <TopBar />
        <Header />
        <main id="main" className="site-layout-main">
          {children ?? <Outlet />}
        </main>
        <Footer />
      </div>
    </LeadModalProvider>
  );
}
