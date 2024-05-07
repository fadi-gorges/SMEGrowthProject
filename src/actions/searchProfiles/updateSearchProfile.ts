"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import {
  CreateSearchProfileData,
  createSearchProfileSchema,
} from "@/lib/validations/searchProfiles/createSearchProfileSchema";
import getPayloadClient from "@/payload/payloadClient";

export const updateSearchProfile = async (
  data: CreateSearchProfileData
): ActionResponse => {
  const validation = createSearchProfileSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Bad request." };
  }

  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  await payload.update({
    collection: "searchProfiles",
    where: {
      user: {
        equals: user.id,
      },
      name: {
        equals: validation.data.name,
      },
    },
    data: {
      searchQuery: validation.data.searchQuery,
      industrySector: validation.data.industrySector,
      minEmployees: validation.data.minEmployees,
      maxEmployees: validation.data.maxEmployees,
      minRevenue: validation.data.minRevenue,
      maxRevenue: validation.data.maxRevenue,
      minValuation: validation.data.minValuation,
      maxValuation: validation.data.maxValuation,
    },
  });

  return { success: true };
};
