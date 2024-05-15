"use server";

import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import {
  EngagementData,
  engagementSchema,
} from "@/lib/validations/engagements/engagementSchema";
import getPayloadClient from "@/payload/payloadClient";

export const setEngagement = async (data: EngagementData): ActionResponse => {
  const validation = engagementSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Bad request." };
  }

  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "engagements",
    where: {
      user: {
        equals: user.id,
      },
      enterprise: {
        equals: validation.data.enterprise,
      },
    },
    limit: 1,
    pagination: false,
  });

  if (!docs.length) {
    await payload.create({
      collection: "engagements",
      data: {
        user: user.id,
        enterprise: validation.data.enterprise,
        contacted: validation.data.contacted,
        connected: validation.data.connected,
        engaged: validation.data.engaged,
      },
    });
  } else {
    await payload.update({
      collection: "engagements",
      where: {
        user: {
          equals: user.id,
        },
        enterprise: {
          equals: validation.data.enterprise,
        },
      },
      data: {
        contacted: validation.data.contacted,
        connected: validation.data.connected,
        engaged: validation.data.engaged,
      },
    });
  }

  return { success: true };
};
