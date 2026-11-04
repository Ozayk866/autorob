import { isBot, leadSchema } from "./schema";

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

  it("honeypot sxemada xato bermaydi, isBot uni aniqlaydi", () => {
    const values = leadSchema.parse({ name: "Ali", phone: "998901234567", website: "spam.com" });
    expect(isBot(values)).toBe(true);
    expect(isBot({ ...values, website: "" })).toBe(false);
  });
});
