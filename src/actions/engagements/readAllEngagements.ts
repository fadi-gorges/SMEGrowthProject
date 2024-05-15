"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Engagement } from "@/payload-types";
import getPayloadClient from "@/payload/payloadClient";

export const readAllEngagements = async (): ActionResponse<{
  engagements: Engagement[];
}> => {
  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  const { docs: engagements } = await payload.find({
    collection: "engagements",
    where: {
      user: {
        equals: user.id,
      },
    },
    pagination: false,
  });

  return { success: true, engagements };
};
