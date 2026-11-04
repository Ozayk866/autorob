import { createBrowserRouter } from "react-router";
import { createSiteRoutes } from "./site-routes";
import { adminRoutes } from "./admin-routes";

/**
 * Sayt route'i ro'yxatda birinchi turadi: hech narsa mos kelmasa, React Router xatoni
 * birinchi route'ning errorElement'ida (sayt 404 sahifasida) ko'rsatadi.
 * Prerender qilingan sahifada `window.__staticRouterHydrationData` avtomatik o'qiladi.
 * @param {import("@tanstack/react-query").QueryClient} queryClient
 */
export const createRouter = (queryClient) =>
  createBrowserRouter([...createSiteRoutes(queryClient), ...adminRoutes]);
