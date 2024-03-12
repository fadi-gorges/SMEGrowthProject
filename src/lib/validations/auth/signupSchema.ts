import * as z from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export type SignupData = z.infer<typeof signupSchema>;
