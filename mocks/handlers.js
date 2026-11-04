import { delay, http, HttpResponse } from "msw";
import { env } from "../src/shared/config/env";
import * as db from "./data";

// MSW handler'lar — backend kontraktini (API_CONTRACT.md) takrorlaydi. Testlar (mocks/server.js) va
// `npm run dev:mock` (mocks/browser.js) bir xil handler'larni ishlatadi.

export const API = env.VITE_API_URL;
const LOCALES = ["uz", "uz-Cyrl", "ru"];

const ok = (data, init) => HttpResponse.json({ data }, init);
const fail = (status, code, message, details) =>
  HttpResponse.json({ error: { code, message, ...(details ? { details } : {}) } }, { status });

const langOf = (request) => {
  const lang = new URL(request.url).searchParams.get("lang");
  return LOCALES.includes(lang) ? lang : "uz"; // noma'lum til xato emas — uz
};
const query = (request, key) => new URL(request.url).searchParams.get(key);

/** Tarjima obyektini ({ uz, ru }) tanlangan tilga aylantiradi; ichki obyekt va massivlarni ham */
function localize(value, lang) {
  if (Array.isArray(value)) return value.map((v) => localize(v, lang));
  if (value && typeof value === "object") {
    if (typeof value.uz === "string") return value[lang]?.trim() || value.uz;
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, lang)]));
  }
  return value;
}

// Brauzerda (dev:mock) haqiqiy tarmoq kabi biroz kutamiz — Skeleton va spinner'lar ko'rinsin
const wait = () => (import.meta.env.MODE === "test" ? undefined : delay(400));

const solutionListItem = ({ id, slug, title, shortDescription, categories, coverImage }) => ({
  id,
  slug,
  title,
  shortDescription,
  categories,
  coverImage,
});

const postListItem = (p) => {
  const category = db.postCategories.find((c) => c.slug === p.categorySlug);
  const { id, slug, title, excerpt, coverImage, authorName, publishedAt, readingMinutes } = p;
  return {
    id,
    slug,
    title,
    excerpt,
    coverImage,
    category: { slug: category.slug, name: category.name },
    authorName,
    publishedAt,
    readingMinutes,
  };
};

let session = null; // mock admin sessiyasi (sahifa yangilanganda yo'qoladi)
const leadTimes = [];

export const handlers = [
  // ───────── Public ─────────
  http.get(`${API}/api/public/settings`, async ({ request }) => {
    await wait();
    return ok(localize(db.settings, langOf(request)));
  }),

  http.get(`${API}/api/public/stats`, async ({ request }) => {
    await wait();
    return ok(localize(db.stats, langOf(request)));
  }),

  http.get(`${API}/api/public/solutions`, async ({ request }) => {
    await wait();
    const category = query(request, "category");
    if (category && !["service", "education", "manufacturing"].includes(category.toLowerCase())) {
      return fail(400, "VALIDATION_ERROR", "Kiritilgan ma'lumotlar noto'g'ri", [
        { path: "category", message: "Invalid option" },
      ]);
    }
    const list = category
      ? db.solutions.filter((s) => s.categories.includes(category.toUpperCase()))
      : db.solutions;
    return ok(localize(list.map(solutionListItem), langOf(request)));
  }),

  http.get(`${API}/api/public/solutions/:slug`, async ({ request, params }) => {
    await wait();
    const solution = db.solutions.find((s) => s.slug === params.slug);
    if (!solution) return fail(404, "NOT_FOUND", "Yechim topilmadi");
    const related = db.solutions
      .filter((s) => s.id !== solution.id)
      .slice(0, 3)
      .map(solutionListItem);
    const { features, ...rest } = solution;
    return ok(localize({ ...rest, features, related }, langOf(request)));
  }),

  http.get(`${API}/api/public/post-categories`, async ({ request }) => {
    await wait();
    return ok(localize(db.postCategories, langOf(request)));
  }),

  http.get(`${API}/api/public/posts`, async ({ request }) => {
    await wait();
    const page = Number(query(request, "page") ?? 1);
    const pageSize = Number(query(request, "pageSize") ?? 20);
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return fail(400, "VALIDATION_ERROR", "Kiritilgan ma'lumotlar noto'g'ri", [
        { path: page < 1 ? "page" : "pageSize", message: "Too small or too big" },
      ]);
    }
    const category = query(request, "category");
    const list = category ? db.posts.filter((p) => p.categorySlug === category) : db.posts;
    const items = list.slice((page - 1) * pageSize, page * pageSize).map(postListItem);
    return HttpResponse.json({
      data: localize(items, langOf(request)),
      meta: { page, pageSize, total: list.length },
    });
  }),

  http.get(`${API}/api/public/posts/:slug`, async ({ request, params }) => {
    await wait();
    const post = db.posts.find((p) => p.slug === params.slug);
    if (!post) return fail(404, "NOT_FOUND", "Maqola topilmadi");
    const sameCategory = db.posts.filter((p) => p.id !== post.id && p.categorySlug === post.categorySlug);
    const rest = db.posts.filter((p) => p.id !== post.id && p.categorySlug !== post.categorySlug);
    const related = [...sameCategory, ...rest].slice(0, 3).map(postListItem);
    const { body, seo, updatedAt } = post;
    return ok(localize({ ...postListItem(post), body, seo, related, updatedAt }, langOf(request)));
  }),

  http.get(`${API}/api/public/faq`, async ({ request }) => {
    await wait();
    const category = query(request, "category");
    const list = category ? db.faq.filter((c) => c.id === category) : db.faq;
    return ok(localize(list, langOf(request)));
  }),

  http.get(`${API}/api/public/team`, async ({ request }) => {
    await wait();
    return ok(localize(db.team, langOf(request)));
  }),

  http.get(`${API}/api/public/partners`, async ({ request }) => {
    await wait();
    const type = query(request, "type")?.toUpperCase();
    return ok(type ? db.partners.filter((p) => p.type === type) : db.partners);
  }),

  http.get(`${API}/api/public/milestones`, async ({ request }) => {
    await wait();
    return ok(localize(db.milestones, langOf(request)));
  }),

  // Sahifa matnlari hozircha statik (lug'atda) — bo'sh guruh
  http.get(`${API}/api/public/pages/:group`, () => ok({})),

  // Ariza: ism "429" → rate limit holatini tekshirish uchun. Bitta "IP"dan 10 daqiqada 5 tadan ortiq → 429.
  http.post(`${API}/api/public/leads`, async ({ request }) => {
    await wait();
    const body = await request.json().catch(() => null);
    const details = [];
    if (!body?.name || body.name.trim().length < 2)
      details.push({ path: "name", message: "Ism kamida 2 belgi" });
    if (!/^(998)?\d{9}$/.test(String(body?.phone ?? "").replace(/\D/g, ""))) {
      details.push({ path: "phone", message: "Telefon raqami noto'g'ri (+998 XX XXX XX XX)" });
    }
    if (details.length) return fail(400, "VALIDATION_ERROR", "Kiritilgan ma'lumotlar noto'g'ri", details);

    const now = Date.now();
    leadTimes.push(now);
    const recent = leadTimes.filter((t) => now - t < 10 * 60_000).length;
    if (body.name.trim() === "429" || recent > 5) {
      return fail(429, "TOO_MANY_REQUESTS", "Juda ko'p urinish, birozdan keyin qayta urinib ko'ring");
    }
    return ok({ received: true }, { status: 201 });
  }),

  // ───────── Admin auth ─────────
  http.get(`${API}/api/admin/auth/me`, () =>
    session ? ok(session) : fail(401, "UNAUTHENTICATED", "Avtorizatsiya talab qilinadi"),
  ),

  http.post(`${API}/api/admin/auth/login`, async ({ request }) => {
    await wait();
    const { email, password } = (await request.json().catch(() => null)) ?? {};
    if (email?.trim().toLowerCase() !== db.adminUser.email || !password || password === "xato") {
      return fail(401, "INVALID_CREDENTIALS", "Email yoki parol noto'g'ri");
    }
    session = { ...db.adminUser, lastLoginAt: new Date().toISOString() };
    return ok(session);
  }),

  http.post(`${API}/api/admin/auth/logout`, () => {
    session = null;
    return new HttpResponse(null, { status: 204 });
  }),

  http.post(`${API}/api/admin/auth/change-password`, () => {
    if (!session) return fail(401, "UNAUTHENTICATED", "Avtorizatsiya talab qilinadi");
    session = { ...session, mustChangePassword: false };
    return new HttpResponse(null, { status: 204 });
  }),
];
