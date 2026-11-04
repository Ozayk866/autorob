// Mock'lar backend kontraktiga mosligini tekshiradi — entity funksiyalari orqali (sayt aynan shularni chaqiradi)
import { getSolution, getSolutions } from "@/entities/solution";
import { getPost, getPosts } from "@/entities/post";
import { getFaq } from "@/entities/faq";
import { getSettings } from "@/entities/settings";
import { submitLead } from "@/features/lead-form/useSubmitLead";
import { ApiError, fieldErrors } from "@/shared/api";

describe("mock API (kontrakt shakli)", () => {
  it("yechimlar: tanlangan til, tarjima yo'q bo'lsa — uz, kategoriya filtri", async () => {
    const all = await getSolutions("ru");
    expect(all).toHaveLength(6);
    expect(all[0]).toEqual({
      id: expect.any(String),
      slug: "crm-tizimi",
      title: "CRM-система",
      shortDescription: expect.any(String),
      categories: ["SERVICE", "EDUCATION"],
      coverImage: null,
    });
    const education = await getSolutions("uz-Cyrl", { category: "education" });
    expect(education.map((s) => s.slug)).toEqual(["crm-tizimi", "talim-markazlari-uchun-crm"]);
    expect(education[0].title).toBe("CRM tizimi"); // uz-Cyrl yo'q → uz
  });

  it("bitta yechim: faq va related bilan, topilmasa 404", async () => {
    const crm = await getSolution("crm-tizimi", "uz");
    expect(crm.faq).toHaveLength(4);
    expect(crm.related).toHaveLength(3);
    expect(typeof crm.features[0]).toBe("string");
    const error = await getSolution("yoq", "uz").catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(404);
  });

  it("maqolalar: sahifalash meta bilan, kategoriya filtri, bitta maqola related bilan", async () => {
    const { data, meta } = await getPosts("uz", { page: 2, pageSize: 7 });
    expect(data).toHaveLength(7);
    expect(meta).toEqual({ page: 2, pageSize: 7, total: 15 });
    expect(data[0].category).toEqual({ slug: expect.any(String), name: expect.any(String) });

    const crm = await getPosts("uz", { category: "crm" });
    expect(crm.data.every((p) => p.category.slug === "crm")).toBe(true);

    const post = await getPost(data[0].slug, "uz");
    expect(post.body).toMatch(/^<p>/);
    expect(post.related).toHaveLength(3);
  });

  it("FAQ: bo'limlar ichida savollar, javob oddiy matn", async () => {
    const faq = await getFaq("ru");
    expect(faq[0]).toMatchObject({ name: "Общие", items: expect.any(Array) });
    expect(typeof faq[0].items[0].answer).toBe("string");
  });

  it("sozlamalar: telefon formatlangan, manzil tanlangan tilda", async () => {
    const s = await getSettings("ru");
    expect(s).toMatchObject({
      phone: "+998 90 123 45 67",
      telegram: "@autorob_uz",
      map: { lat: expect.any(Number) },
    });
    expect(s.address).toMatch(/Наманган/);
  });

  it("ariza: 201, validatsiya 400 (details.path), ism «429» → 429", async () => {
    await expect(submitLead({ name: "Aziz", phone: "998901234567" })).resolves.toEqual({ received: true });

    const invalid = await submitLead({ name: "A", phone: "12" }).catch((e) => e);
    expect(invalid.status).toBe(400);
    expect(fieldErrors(invalid).map((d) => d.path)).toEqual(["name", "phone"]);

    const limited = await submitLead({ name: "429", phone: "998901234567" }).catch((e) => e);
    expect(limited.status).toBe(429);
  });
});
