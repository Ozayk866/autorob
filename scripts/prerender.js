// Public sahifalarni HTML'ga prerender qiladi va sitemap.xml yaratadi.
// Ishga tushirish: npm run build:prerender (avval client va SSR build bo'ladi)
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const { render, getPrerenderPaths, SITE_URL } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const HTML_LANG = { ru: "ru", "uz-cyrl": "uz-Cyrl" };

// React 19 render qilingan qismdagi <title>/<meta>/<link> ni HTML boshiga chiqaradi — ularni <head> ga ko'chiramiz
function splitHead(html) {
  const head = [];
  const leadingTag = /^\s*(<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;
  let body = html;
  for (let m = body.match(leadingTag); m; m = body.match(leadingTag)) {
    // data-pr: hydrate qilinmasa (boshqa yo'l), main.jsx bu teglarni o'chiradi
    head.push(m[1].replace(/^<(\w+)/, "<$1 data-pr"));
    body = body.slice(m[0].length);
  }
  return { head: head.join("\n    "), body };
}

async function writePage(urlPath, file) {
  const result = await render(urlPath);
  if (result.redirect) return false;

  const { head, body } = splitHead(result.html);
  const state =
    `<script>window.__PRERENDER_PATH__=${json(urlPath)};` +
    `window.__staticRouterHydrationData=${json(result.hydration)};` +
    `window.__RQ_STATE__=${json(result.queryState)}</script>`;
  const lang = HTML_LANG[urlPath.split("/")[1]] ?? "uz-Latn";

  const page = template
    .replace('<html lang="uz">', `<html lang="${lang}">`)
    .replace("<!--app-head-->", `${head}\n    ${state}`)
    .replace("<!--app-html-->", body);

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page);
  return true;
}

const paths = await getPrerenderPaths();
const written = [];
for (const urlPath of paths) {
  const file = path.join(dist, urlPath === "/" ? "index.html" : path.join(urlPath, "index.html"));
  if (await writePage(urlPath, file)) written.push(urlPath);
}
await writePage("/__not-found__", path.join(dist, "404.html"));

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  written.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n") +
  `\n</urlset>\n`;
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);

console.log(`[prerender] ${written.length} ta sahifa + 404.html + sitemap.xml → dist/`);
