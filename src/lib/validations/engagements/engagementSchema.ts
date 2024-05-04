import * as z from "zod";

export const engagementSchema = z.object({
  enterprise: z.string(),
  contacted: z.boolean().optional(),
  connected: z.boolean().optional(),
  engaged: z.boolean().optional(),
});

export type EngagementData = z.infer<typeof engagementSchema>;
