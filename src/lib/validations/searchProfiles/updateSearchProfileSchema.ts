import { baseSearchProfileSchema } from "@/lib/validations/searchProfiles/createSearchProfileSchema";
import * as z from "zod";

export const updateSearchProfileSchema = baseSearchProfileSchema
  .extend({
    id: z.string(),
  })
  .refine(
    (data) =>
      data.searchQuery ||
      data.manufacturer ||
      data.employeesRange ||
      data.postcode ||
      data.growthPotentialRange,
    { message: "At least one search parameter is required." }
  );

export type UpdateSearchProfileData = z.infer<typeof updateSearchProfileSchema>;
