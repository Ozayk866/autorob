import { z } from "zod";

const schema = z.object({
  VITE_API_URL: z.string().url().default("http://localhost:4000"),
  VITE_SITE_URL: z.string().url().default("http://localhost:5173"),
  VITE_GA_ID: z.string().optional(),
});

// Bo'sh qatorlar (VITE_GA_ID=) berilmagan deb hisoblanadi
const raw = Object.fromEntries(Object.entries(import.meta.env).filter(([, v]) => v !== ""));
const parsed = schema.parse(raw);

export const env = {
  ...parsed,
  VITE_API_URL: parsed.VITE_API_URL.replace(/\/$/, ""),
  VITE_SITE_URL: parsed.VITE_SITE_URL.replace(/\/$/, ""),
};
