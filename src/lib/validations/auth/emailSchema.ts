import * as z from "zod";

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type EmailData = z.infer<typeof emailSchema>;
