import * as z from 'zod';

export const enterpriseSchema = z.object({
  name: z.string().nullable(),
  abn: z.string().length(11).nullable(),
  numEmployees: z.number().int().positive().nullable(),
  website: z.string().nullable(),
  suburb: z.string().nullable(),
  industrySector: z.string().nullable(),
  postCode: z.number().int().positive().nullable(),
  sme: z.boolean().nullable(),
  manufacturer: z.boolean().nullable(),
  growthPotential: z.number().int().positive().nullable(),
  description: z.string().nullable(),
});

export type EnterpriseData = z.infer<typeof enterpriseSchema>;