"use server";

import { ActionError } from "@/lib/utils/actionError";
import { getServerUser } from "@/lib/utils/getServerUser";
import { LoginData, loginSchema } from "@/lib/validations/auth/loginSchema";
import getPayloadClient from "@/payload/payloadClient";
import { UserWithPicture } from "@/providers/auth/types";
import type { CookieOptions } from "express";
import { cookies } from "next/headers";
import getCookieExpiration from "payload/dist/utilities/getCookieExpiration";

export const loginUser = async (
  data: LoginData
): Promise<{ success: true; user: UserWithPicture } | ActionError> => {
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  const currentUser = await getServerUser();

  if (currentUser) {
    return { success: true, user: currentUser };
  }

  const payload = await getPayloadClient();

  try {
    const user = await payload.login({
      collection: "users",
      data: {
        email: validation.data.email,
        password: validation.data.password,
      },
      depth: 1,
    });

    if (!user.token) {
      return {
        success: false,
        error: "The email or password provided is incorrect.",
      };
    }

    const cookieOptions: CookieOptions = {
      domain: undefined,
      expires: getCookieExpiration(user.exp),
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    };

    cookies().set("payload-token", user.token, cookieOptions);

    return { success: true, user: user.user as UserWithPicture };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
};
