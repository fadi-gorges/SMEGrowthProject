import validator from "validator";
import * as z from "zod";

export const initialSignupSchema = z
  .object({
    firstName: z
      .string()
      .refine(validator.isAlpha, "Please enter a valid name"),
    lastName: z.string().refine(validator.isAlpha, "Please enter a valid name"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .refine(
        validator.isStrongPassword,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      ),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean({ required_error: "You must accept the terms and conditions" })
      .refine((v) => v, "You must accept the terms and conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type InitialSignupData = z.infer<typeof initialSignupSchema>;
