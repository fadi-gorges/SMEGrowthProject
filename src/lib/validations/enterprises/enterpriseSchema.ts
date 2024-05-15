import * as z from 'zod';

export const enterpriseSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  abn: z.string().length(11).optional(),
  industrySector: z.string().min(1).max(255).optional(),
  numEmployees: z.number().int().positive().optional(),
  website: z.string().url().optional(),
  address: z.string().min(1).max(255).optional(),
  revenue: z.number().int().positive().optional(),
  valuation: z.number().int().positive().optional(),
  establishedDate: z.date().optional(),
});

export type EnterpriseData = z.infer<typeof enterpriseSchema>;