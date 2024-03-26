import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
});

export type LoginData = z.infer<typeof loginSchema>;
