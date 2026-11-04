import { http, HttpResponse } from "msw";
import { server } from "../../../tests/mocks/server";
import { API } from "../../../tests/mocks/handlers";
import { api } from "./client";
import { ApiError } from "./errors";

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

  it("xatoda ApiError tashlaydi (status, code, details bilan)", async () => {
    server.use(
      http.post(`${API}/fail`, () =>
        HttpResponse.json({ error: { code: "VALIDATION", details: { name: "x" } } }, { status: 422 }),
      ),
    );
    const error = await api("/fail", { method: "POST", body: {} }).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 422, code: "VALIDATION", details: { name: "x" } });
  });

  it("admin 401 da auth:unauthorized hodisasini chiqaradi", async () => {
    const listener = vi.fn();
    window.addEventListener("auth:unauthorized", listener);
    await api("/api/admin/auth/me").catch(() => {});
    window.removeEventListener("auth:unauthorized", listener);
    expect(listener).toHaveBeenCalledOnce();
  });
});
