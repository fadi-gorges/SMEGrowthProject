"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import getPayloadClient from "@/payload/payloadClient";

export const deleteUser = async (): ActionResponse => {
  const user = await getServerUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const payload = await getPayloadClient();

  await payload.delete({
    collection: "users",
    id: user.id,
  });

  // TODO: Send user deletion alert email

  return { success: true };
};
