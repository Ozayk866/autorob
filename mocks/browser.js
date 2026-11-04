import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// `npm run dev:mock` — backend'siz ishlash. public/mockServiceWorker.js kerak (npx msw init public).
export const worker = setupWorker(...handlers);
