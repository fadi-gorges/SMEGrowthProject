"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Enterprise } from "@/payload-types";
import getPayloadClient from "@/payload/payloadClient";

export const readAllEnterprises = async (): ActionResponse<{
  enterprises: Enterprise[];
}> => {
  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  const { docs: enterprises } = await payload.find({
    collection: "enterprises",
    where: {
    },
    pagination: false,
  });

  return { success: true, enterprises };
};
