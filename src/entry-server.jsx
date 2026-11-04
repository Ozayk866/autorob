// Faqat prerender uchun: `vite build --ssr src/entry-server.jsx` → dist-ssr/entry-server.js → scripts/prerender.js
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "@/shared/api";
import { env } from "@/shared/config";
import { Providers } from "@/app/providers";
import { createSiteRoutes } from "@/app/site-routes";
import "@/app/styles/tokens.css";
import "@/app/styles/fonts.css";
import "@/app/styles/globals.css";

export { getPrerenderPaths } from "@/app/prerender-paths";
export const SITE_URL = env.VITE_SITE_URL;

/**
 * @param {string} path  masalan "/ru/yechimlar"
 * @returns {Promise<{ redirect: string } | { status: number, html: string, hydration: object, queryState: object }>}
 */
export async function render(path) {
  const queryClient = createQueryClient();
  const { query, dataRoutes } = createStaticHandler(createSiteRoutes(queryClient));
  const context = await query(new Request(new URL(path, env.VITE_SITE_URL)));
  if (context instanceof Response) return { redirect: context.headers.get("Location") };

  const router = createStaticRouter(dataRoutes, context);
  // hydrate={false}: hydration skriptini #root ichiga emas, prerender.js <head> ga o'zi qo'yadi
  const html = renderToString(
    <Providers queryClient={queryClient}>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </Providers>,
  );

  return {
    status: context.statusCode,
    html,
    hydration: { loaderData: context.loaderData, actionData: context.actionData, errors: null },
    queryState: dehydrate(queryClient),
  };
}
