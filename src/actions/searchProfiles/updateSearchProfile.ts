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
      employeesRange: validation.data.employeesRange,
      postcode: validation.data.postcode,
      growthPotentialRange: validation.data.growthPotentialRange
    },
  });

  return { success: true };
};
