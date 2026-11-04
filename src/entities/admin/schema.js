import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("auth.errors.email"),
  password: z.string().min(1, "auth.errors.password"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "auth.errors.password"),
    newPassword: z.string().min(10, "auth.errors.passwordLength"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "auth.errors.passwordMatch",
  });

export const createAdminSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email("auth.errors.email"),
});
