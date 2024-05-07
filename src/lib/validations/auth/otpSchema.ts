import { z } from "zod";

export const otpSchema = z.object({
  token: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .regex(/^\d+$/, {
      message: "Your one-time password must contain only digits.",
    }),
});

export type OtpData = z.infer<typeof otpSchema>;
