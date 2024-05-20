"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import getPayloadClient from "@/payload/payloadClient";

export const deleteEngagement = async (id: string): ActionResponse => {
  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  await payload.delete({
    collection: "engagements",
    id,
  });

  return { success: true };
};
