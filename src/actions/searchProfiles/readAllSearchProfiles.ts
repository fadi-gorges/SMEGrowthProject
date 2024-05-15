"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { SearchProfile } from "@/payload-types";
import getPayloadClient from "@/payload/payloadClient";

export const readAllSearchProfiles = async (): ActionResponse<{
  searchProfiles: SearchProfile[];
}> => {
  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  const { docs: searchProfiles } = await payload.find({
    collection: "searchProfiles",
    where: {
      user: {
        equals: user.id,
      },
    },
    pagination: false,
  });

  return { success: true, searchProfiles };
};
