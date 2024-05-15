"use server";

import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { Organisation } from "@/payload-types";
import getPayloadClient from "@/payload/payloadClient";

export const getOrganisation = async (): ActionResponse<{
  organisation: Organisation;
}> => {
  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  const organisation = await payload.findByID({
    collection: "organisations",
    id: user.organisation as string,
  });

  return { success: true, organisation };
};
