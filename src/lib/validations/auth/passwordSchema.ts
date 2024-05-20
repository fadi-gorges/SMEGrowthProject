import validator from "validator";
import * as z from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .refine(
        validator.isStrongPassword,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type PasswordData = z.infer<typeof passwordSchema>;
