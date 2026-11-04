import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { API } from "../../../mocks/handlers";
import { api } from "./client";
import { ApiError, fieldErrors } from "./errors";

describe("api client", () => {
  it("JSON body'ni stringify qiladi va Content-Type qo'yadi", async () => {
    let received;
    server.use(
      http.post(`${API}/echo`, async ({ request }) => {
        received = { type: request.headers.get("content-type"), body: await request.json() };
        return HttpResponse.json({ data: "ok" });
      }),
    );
    await expect(api("/echo", { method: "POST", body: { a: 1 } })).resolves.toBe("ok");
    expect(received).toEqual({ type: "application/json", body: { a: 1 } });
  });

  it("FormData'ni o'zgartirmaydi va Content-Type'ni brauzerga qoldiradi", async () => {
    let type;
    server.use(
      http.post(`${API}/upload`, ({ request }) => {
        type = request.headers.get("content-type");
        return HttpResponse.json({ data: "ok" });
      }),
    );
    const form = new FormData();
    form.append("file", new Blob(["x"]), "a.png");
    await api("/upload", { method: "POST", body: form });
    expect(type).toMatch(/^multipart\/form-data; boundary=/);
  });

  it("CSRF sarlavhasini faqat admin so'rovlariga qo'shadi", async () => {
    const seen = {};
    server.use(
      http.post(`${API}/api/admin/x`, ({ request }) => {
        seen.admin = request.headers.get("x-requested-with");
        return HttpResponse.json({ data: null });
      }),
      http.get(`${API}/api/public/x`, ({ request }) => {
        seen.public = request.headers.get("x-requested-with");
        return HttpResponse.json({ data: null });
      }),
    );
    await api("/api/admin/x", { method: "POST", body: {} });
    await api("/api/public/x");
    expect(seen).toEqual({ admin: "autorob-admin", public: null });
  });

  it("withMeta bilan sahifalash ma'lumotini qaytaradi", async () => {
    server.use(
      http.get(`${API}/list`, () =>
        HttpResponse.json({ data: [1, 2], meta: { page: 1, pageSize: 2, total: 5 } }),
      ),
    );
    await expect(api("/list", { withMeta: true })).resolves.toEqual({
      data: [1, 2],
      meta: { page: 1, pageSize: 2, total: 5 },
    });
  });

  it("xatoda ApiError tashlaydi, maydon xatolarini beradi", async () => {
    const details = [{ path: "title.uz", message: "Majburiy" }];
    server.use(
      http.post(`${API}/fail`, () =>
        HttpResponse.json({ error: { code: "VALIDATION_ERROR", message: "x", details } }, { status: 400 }),
      ),
    );
    const error = await api("/fail", { method: "POST", body: {} }).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 400, code: "VALIDATION_ERROR" });
    expect(fieldErrors(error)).toEqual(details);
  });

  it("admin 401 da auth:unauthorized hodisasini chiqaradi", async () => {
    const listener = vi.fn();
    window.addEventListener("auth:unauthorized", listener);
    await api("/api/admin/auth/me").catch(() => {});
    window.removeEventListener("auth:unauthorized", listener);
    expect(listener).toHaveBeenCalledOnce();
  });
});
