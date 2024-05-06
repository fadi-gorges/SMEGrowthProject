import * as z from "zod";

export const initialSignupSchema = z
  .object({
    firstName: z
      .string()
      .refine(
        (str) => str.trim().indexOf(" ") === -1,
        "Please enter only one name"
      ),
    lastName: z
      .string()
      .refine(
        (str) => str.trim().indexOf(" ") === -1,
        "Please enter only one name"
      ),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
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
