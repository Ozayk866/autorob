// Mock API'ni oddiy HTTP server sifatida ishga tushiradi: `npm run mock:api` → http://localhost:4000
// `npm run dev:mock` (brauzerdagi Service Worker) ishlamaydigan holatlar uchun — masalan, Service Worker
// bloklangan brauzer yoki prerender'ni mock ma'lumot bilan sinash. Keyin oddiy `npm run dev` ishlatiladi.
// Handler'lar bitta: mocks/handlers.js. vite-node orqali ishlaydi (import.meta.env va "@/" alias uchun).
import http from "node:http";
import { getResponse } from "msw";
import { handlers } from "../mocks/handlers.js";

const PORT = Number(process.env.MOCK_PORT ?? 4000);
// Faqat lokal sahifalarga ruxsat (dev 5173, preview 4173 va boshqa portlar)
const isLocalOrigin = (origin) => /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin ?? "");

http
  .createServer(async (req, res) => {
    const origin = isLocalOrigin(req.headers.origin) ? req.headers.origin : "http://localhost:5173";
    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
      "Access-Control-Allow-Headers": req.headers["access-control-request-headers"] ?? "*",
    };
    if (req.method === "OPTIONS") {
      res.writeHead(204, cors).end();
      return;
    }

    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const request = new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
    });

    const response = await getResponse(handlers, request);
    if (!response) {
      res.writeHead(404, { ...cors, "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: { code: "NOT_FOUND", message: `Mock'da yo'q: ${req.method} ${req.url}` } }),
      );
      return;
    }
    res.writeHead(response.status, { ...cors, "Content-Type": "application/json" });
    res.end(Buffer.from(await response.arrayBuffer()));
  })
  .listen(PORT, () => console.log(`[mock-api] http://localhost:${PORT}`));
