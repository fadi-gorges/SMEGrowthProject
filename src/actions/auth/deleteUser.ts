"use server";
import { ActionError } from "@/lib/utils/actionError";
import { getServerUser } from "@/lib/utils/getServerUser";
import getPayloadClient from "@/payload/payloadClient";

export const deleteUser = async (): Promise<
  { success: true } | ActionError
> => {
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
