import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { hydrate } from "@tanstack/react-query";
import { createQueryClient } from "@/shared/api";
import { createRouter } from "@/app/router";
import { App } from "@/app/App";

// Prerender HTML aynan shu yo'l uchunmi? Hosting SPA fallback'da (admin, noma'lum yo'l,
// "/ru/yechimlar" → index.html) boshqa sahifaning HTML'ini berishi mumkin — unda hydrate qilinmaydi.
const normalize = (p) => p.replace(/\/+$/, "") || "/";
const prerenderPath = window.__PRERENDER_PATH__;
const isPrerendered =
  prerenderPath !== undefined && normalize(prerenderPath) === normalize(location.pathname);

if (!isPrerendered) {
  delete window.__staticRouterHydrationData;
  document.querySelectorAll("head [data-pr]").forEach((el) => el.remove());
}

const queryClient = createQueryClient();
if (isPrerendered && window.__RQ_STATE__) hydrate(queryClient, window.__RQ_STATE__);
const router = createRouter(queryClient);

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App queryClient={queryClient} router={router} />
  </StrictMode>
);

if (isPrerendered) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
