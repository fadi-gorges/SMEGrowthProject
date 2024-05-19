"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { CreateSearchProfileData } from "@/lib/validations/searchProfiles/createSearchProfileSchema";
import { updateSearchProfileSchema } from "@/lib/validations/searchProfiles/updateSearchProfileSchema";
import getPayloadClient from "@/payload/payloadClient";

export const updateSearchProfile = async (
  data: CreateSearchProfileData
): ActionResponse => {
  const validation = updateSearchProfileSchema.safeParse(data);

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
      and: [
        {
          user: {
            equals: user.id,
          },
        },
        {
          id: {
            equals: validation.data.id,
          },
        },
      ],
    },
    data: {
      name: validation.data.name,
      searchQuery: validation.data.searchQuery,
      manufacturer: validation.data.manufacturer,
      employeesRange: validation.data.employeesRange,
      postcode: validation.data.postcode,
      growthPotentialRange: validation.data.growthPotentialRange,
    },
  });

  return { success: true };
};
