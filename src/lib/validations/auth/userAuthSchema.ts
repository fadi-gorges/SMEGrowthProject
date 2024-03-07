import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export type UserAuthData = z.infer<typeof userAuthSchema>;
