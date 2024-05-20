"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import {
  UpdateUserData,
  updateUserSchema,
} from "@/lib/validations/auth/updateUserSchema";
import getPayloadClient from "@/payload/payloadClient";

export const updateUser = async (data: UpdateUserData): ActionResponse => {
  const user = await getServerUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to edit your profile.",
    };
  }

  const validation = updateUserSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Bad request." };
  }

  const payload = await getPayloadClient();

  await payload.update({
    collection: "users",
    id: user.id,
    data: {
      firstName: validation.data.firstName,
      lastName: validation.data.lastName,
      jobTitle: validation.data.jobTitle,
      mobileNumber: validation.data.mobileNumber,
      userType: validation.data.userType,
    },
  });

  return { success: true };
};
