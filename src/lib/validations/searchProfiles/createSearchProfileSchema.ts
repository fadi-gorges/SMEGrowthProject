import * as z from "zod";

export const baseSearchProfileSchema = z.object({
  name: z.string(),
  searchQuery: z.string().optional(),
  manufacturer: z.boolean().optional(),
  employeesRange: z.string().optional(),
  postcode: z.number().positive().optional(),
  growthPotentialRange: z.string().optional(),
});

export const createSearchProfileSchema = baseSearchProfileSchema.refine(
  (data) =>
    data.searchQuery ||
    data.manufacturer ||
    data.employeesRange ||
    data.postcode ||
    data.growthPotentialRange,
  { message: "At least one search parameter is required." }
);

export type CreateSearchProfileData = z.infer<typeof createSearchProfileSchema>;
