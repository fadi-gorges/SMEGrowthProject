"use server";

import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import { OtpData, otpSchema } from "@/lib/validations/auth/otpSchema";
import getPayloadClient from "@/payload/payloadClient";
import { customLogin } from "@/payload/utils/auth/customLogin";
import { customVerifyEmail } from "@/payload/utils/auth/customVerifyEmail";
import { cookies } from "next/headers";

export const verifyAndLoginUser = async (data: OtpData): ActionResponse => {
  const validation = otpSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Bad request." };
  }

  const user = await getServerUser();

  if (user) return { success: false, error: "Already logged in." };

  const payload = await getPayloadClient();

  const userEmail = await customVerifyEmail(payload, {
    collection: "users",
    token: validation.data.token,
  });

  const { token, exp } = await customLogin(payload, {
    collection: "users",
    data: { email: userEmail },
  });

  if (!token || !exp) throw new Error();

  cookies().set("payload-token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    expires: new Date(exp * 1000),
  });

  return { success: true };
};
