import * as z from 'zod';

export const enterpriseSchema = z.object({
  name: z.string().nullable(),
  abn: z.string().length(11).nullable(),
  industrySector: z.string().nullable(),
  numEmployees: z.number().int().positive().nullable(),
  website: z.string().url().nullable(),
  address: z.string().nullable(),
  revenue: z.number().int().positive().nullable(),
  valuation: z.number().int().positive().nullable(),
  establishedDate: z.date().nullable(),
});

export type EnterpriseData = z.infer<typeof enterpriseSchema>;