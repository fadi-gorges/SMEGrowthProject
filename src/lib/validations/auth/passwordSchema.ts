import * as z from "zod";

export const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type PasswordData = z.infer<typeof passwordSchema>;
