import { z } from "zod";
import { localizedText } from "@/shared/i18n";

// Admin formasi — kontrakt §10 «Maqolalar». readingMinutes server hisoblaydi — yuborilmaydi.
export const postSchema = z
  .object({
    title: localizedText(true),
    excerpt: localizedText(true),
    body: localizedText(true), // HTML
    categoryId: z.string().uuid(),
    authorName: z.string().trim().min(2).max(80),
    slug: z
      .string()
      .regex(/^[a-z0-9-]*$/, "form.slug")
      .max(120)
      .optional(),
    coverImageId: z.string().uuid().nullable().optional(),
    status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]),
    publishedAt: z.string().datetime().nullable().optional(),
    seo: z.object({ metaTitle: localizedText().optional(), metaDescription: localizedText().optional() }),
  })
  .refine((v) => v.status !== "SCHEDULED" || v.publishedAt, {
    path: ["publishedAt"],
    message: "form.required",
  });
