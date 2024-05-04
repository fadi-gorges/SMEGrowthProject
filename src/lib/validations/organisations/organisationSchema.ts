import * as z from "zod";

export const organisationSchema = z.object({
  name: z.string(),
  members: z.array(z.string()),
});

export type OrganisationData = z.infer<typeof organisationSchema>;
