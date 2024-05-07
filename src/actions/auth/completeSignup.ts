"use server";

import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { completeSignupSchema } from "@/lib/validations/auth/completeSignupSchema";
import getPayloadClient from "@/payload/payloadClient";

export const completeSignup = async (body: FormData): ActionResponse => {
  const data: {
    [key: string]: string | File;
  } = {};
  body.forEach((value, key) => (data[key] = value));

  const validation = completeSignupSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Bad request." };
  }

  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  // const picture = await payload.create({
  //   collection: "profilePictures",
  //   data: {},
  //   file: {
  //     data: await readBuffer(validation.data.picture),
  //     name: uuidv4(),
  //     mimetype: validation.data.picture.type,
  //     size: validation.data.picture.size,
  //   },
  // });

  const organisation = await payload.create({
    collection: "organisations",
    data: {
      name: validation.data.organisation,
      members: [user.email],
    },
  });

  await payload.update({
    collection: "users",
    id: user.id,
    data: {
      mobileNumber: validation.data.mobileNumber,
      userType: validation.data.userType,
      organisation: organisation.id,
      jobTitle: validation.data.jobTitle,
      // picture: picture.id,
      signupComplete: true,
    },
  });

  return { success: true };
};
