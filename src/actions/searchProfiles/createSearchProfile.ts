"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import {
  CreateSearchProfileData,
  createSearchProfileSchema,
} from "@/lib/validations/searchProfiles/createSearchProfileSchema";
import getPayloadClient from "@/payload/payloadClient";

export const createSearchProfile = async (
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

  await payload.create({
    collection: "searchProfiles",
    data: {
      user: user.id,
      name: validation.data.name,
      searchQuery: validation.data.searchQuery,
      industrySector: validation.data.industrySector,
      employeesRange: validation.data.employeesRange,
      postcode: validation.data.postcode,
      growthPotentialRange: validation.data.growthPotentialRange
    },
  });

  return { success: true };
};
