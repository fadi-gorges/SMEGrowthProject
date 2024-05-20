"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import getPayloadClient from "@/payload/payloadClient";

export const updateSubscription = async (
  subscribe: boolean
): ActionResponse => {
  const user = await getServerUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to edit your profile.",
    };
  }

  const payload = await getPayloadClient();

  await payload.update({
    collection: "users",
    id: user.id,
    data: {
      paymentSuccessful: subscribe,
    },
  });

  return { success: true };
};
