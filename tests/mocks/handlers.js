import { http, HttpResponse } from "msw";

export const API = "http://localhost:4000";

// Standart javoblar. Testda boshqa holat kerak bo'lsa: server.use(http.post(...)) bilan almashtiring.
export const handlers = [
  http.post(`${API}/api/public/leads`, () => HttpResponse.json({ data: { ok: true } }, { status: 201 })),
  http.get(`${API}/api/admin/auth/me`, () =>
    HttpResponse.json({ error: { code: "UNAUTHORIZED" } }, { status: 401 }),
  ),
];
