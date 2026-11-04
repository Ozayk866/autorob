import { localeFromParam, localizePath, stripLocale } from "./locales";

describe("locales", () => {
  it("URL prefiksidan tilni aniqlaydi, noma'lumini rad etadi", () => {
    expect(localeFromParam(undefined)).toBe("uz");
    expect(localeFromParam("ru")).toBe("ru");
    expect(localeFromParam("uz-cyrl")).toBe("uz-Cyrl");
    expect(localeFromParam("uz")).toBeNull(); // /uz/... → prefikssiz yo'lga redirect
    expect(localeFromParam("abc")).toBeNull(); // → 404
  });

  it("yo'lga prefiks qo'shadi va olib tashlaydi", () => {
    expect(localizePath("/", "uz")).toBe("/");
    expect(localizePath("/", "ru")).toBe("/ru");
    expect(localizePath("/yechimlar", "uz-Cyrl")).toBe("/uz-cyrl/yechimlar");
    expect(stripLocale("/ru")).toBe("/");
    expect(stripLocale("/ru/yechimlar/crm")).toBe("/yechimlar/crm");
    expect(stripLocale("/rus")).toBe("/rus");
  });
});
