"use server";
import { actionError } from "@/lib/utils/actionError";
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

  try {
    await payload.delete({
      collection: "users",
      id: user.id,
    });

    // TODO: Send user deletion alert email

    return { success: true };
  } catch (e: any) {
    return actionError(e, "Error deleting user.");
  }
};
