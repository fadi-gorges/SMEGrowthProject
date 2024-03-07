import * as z from "zod";

export const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must contain at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must contain at least 6 characters"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    "Passwords do not match."
  );

export type PasswordData = z.infer<typeof passwordSchema>;
