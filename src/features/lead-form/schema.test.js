import { buildLeadPayload, leadSchema } from "./schema";

describe("leadSchema", () => {
  it("telefonni normallashtiradi", () => {
    const r = leadSchema.parse({ name: "Ali", phone: "+998 90 123-45-67" });
    expect(r.phone).toBe("998901234567");
  });

  it("qisqa ism va to'liq bo'lmagan telefonni rad etadi (i18n kalitlari bilan)", () => {
    const r = leadSchema.safeParse({ name: "A", phone: "+998 90" });
    expect(r.success).toBe(false);
    const messages = r.error.issues.map((i) => i.message);
    expect(messages).toEqual(expect.arrayContaining(["lead.errors.name", "lead.errors.phone"]));
  });
});

describe("buildLeadPayload", () => {
  const context = { formStartedAt: 1000, pagePath: "/yechimlar/crm-tizimi", locale: "uz" };

  it("backend kutgan maydonlarni yig'adi, bo'sh ixtiyoriy maydonlarni tashlab yuboradi", () => {
    const values = leadSchema.parse({ name: "Ali", phone: "+998 90 123 45 67", solutionId: "", message: "" });
    expect(buildLeadPayload(values, context)).toEqual({
      name: "Ali",
      phone: "998901234567",
      website: "",
      pagePath: "/yechimlar/crm-tizimi",
      locale: "uz",
      formStartedAt: 1000,
    });
  });

  it("honeypot va utm'ni o'zgartirmasdan yuboradi (spamni backend aniqlaydi)", () => {
    const values = leadSchema.parse({ name: "Ali", phone: "998901234567", website: "spam.com" });
    const payload = buildLeadPayload(values, { ...context, utm: { source: "google" } });
    expect(payload).toMatchObject({ website: "spam.com", utm: { source: "google" } });
  });
});
