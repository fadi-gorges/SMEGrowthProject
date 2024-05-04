import * as z from "zod";

export const baseSearchProfileSchema = z.object({
  name: z.string(),
  searchQuery: z.string().optional(),
  industrySector: z.array(z.string()).optional(),
  minEmployees: z.number().positive().optional(),
  maxEmployees: z.number().positive().optional(),
  minRevenue: z.number().positive().optional(),
  maxRevenue: z.number().positive().optional(),
  minValuation: z.number().positive().optional(),
  maxValuation: z.number().positive().optional(),
});

export const createSearchProfileSchema = baseSearchProfileSchema
  .refine(
    (data) =>
      data.searchQuery ||
      data.industrySector?.length ||
      data.minEmployees ||
      data.maxEmployees ||
      data.minRevenue ||
      data.maxRevenue ||
      data.minValuation ||
      data.maxValuation,
    { message: "At least one search parameter is required." }
  )
  .refine(
    (data) =>
      data.minEmployees &&
      data.maxEmployees &&
      data.minEmployees <= data.maxEmployees,
    {
      message:
        "Minimum employees must be less than or equal to maximum employees.",
    }
  )
  .refine(
    (data) =>
      data.minRevenue && data.maxRevenue && data.minRevenue <= data.maxRevenue,
    {
      message: "Minimum revenue must be less than or equal to maximum revenue.",
    }
  )
  .refine(
    (data) =>
      data.minValuation &&
      data.maxValuation &&
      data.minValuation <= data.maxValuation,
    {
      message:
        "Minimum valuation must be less than or equal to maximum valuation.",
    }
  );

export type CreateSearchProfileData = z.infer<typeof createSearchProfileSchema>;
