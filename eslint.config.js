import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import boundaries from "eslint-plugin-boundaries";

// Qatlamlar: yuqoridagi faqat pastdagilardan import qiladi (docs/FRONTEND_ARCHITECTURE.md, 2-bo'lim)
// app ─► pages ─► layouts ─► widgets ─► features ─► entities ─► shared
const below = {
  app: [
    "pages-site",
    "pages-admin",
    "layouts",
    "widgets-site",
    "widgets-admin",
    "features",
    "entities",
    "shared",
  ],
  "pages-site": ["layouts", "widgets-site", "features", "entities", "shared"],
  "pages-admin": ["layouts", "widgets-admin", "features", "entities", "shared"],
  layouts: ["widgets-site", "widgets-admin", "features", "entities", "shared"],
  "widgets-site": ["features", "entities", "shared"],
  "widgets-admin": ["features", "entities", "shared"],
  features: ["entities", "shared"],
  entities: ["shared"],
  shared: ["shared"],
};

export default [
  { ignores: ["dist", "dist-ssr", "node_modules", "coverage"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    plugins: { react, "react-hooks": reactHooks },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": {
        alias: { map: [["@", "./src"]], extensions: [".js", ".jsx", ".json"] },
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "pages-site", pattern: "src/pages/site/*", capture: ["slice"] },
        { type: "pages-admin", pattern: "src/pages/admin/*", capture: ["slice"] },
        { type: "layouts", pattern: "src/layouts/*", capture: ["slice"] },
        { type: "widgets-site", pattern: "src/widgets/site/*", capture: ["slice"] },
        { type: "widgets-admin", pattern: "src/widgets/admin/*", capture: ["slice"] },
        { type: "features", pattern: "src/features/*", capture: ["slice"] },
        { type: "entities", pattern: "src/entities/*", capture: ["slice"] },
        { type: "shared", pattern: "src/shared/*", capture: ["segment"] },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: Object.entries(below).map(([from, allow]) => ({ from, allow })),
        },
      ],
      // Boshqa slice'ga faqat uning index.js (public API) orqali kiriladi
      "boundaries/entry-point": [
        "error",
        {
          default: "disallow",
          rules: [
            { target: ["shared", "app"], allow: "**" },
            {
              target: [
                "pages-site",
                "pages-admin",
                "layouts",
                "widgets-site",
                "widgets-admin",
                "features",
                "entities",
              ],
              allow: "index.js",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["tests/**/*.{js,jsx}", "src/**/*.test.{js,jsx}"],
    languageOptions: { globals: { ...globals.vitest } },
  },
];
