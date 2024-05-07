"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { readBuffer } from "@/lib/utils/readBuffer";
import { updateUserSchema } from "@/lib/validations/auth/updateUserSchema";
import getPayloadClient from "@/payload/payloadClient";

export const updateUser = async (body: FormData): ActionResponse => {
  const user = await getServerUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to edit your profile.",
    };
  }

  const data: {
    [key: string]: string | File;
  } = {};
  body.forEach((value, key) => (data[key] = value));

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
    },
  });

  if (!validation.data.picture) return { success: true };

  await payload.update({
    collection: "profilePictures",
    id: user.picture as string,
    data: {},
    file: {
      data: await readBuffer(validation.data.picture),
      name: user.email,
      mimetype: validation.data.picture.type,
      size: validation.data.picture.size,
    },
    overwriteExistingFiles: true,
  });

  return { success: true };
};
