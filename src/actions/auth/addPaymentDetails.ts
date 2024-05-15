"use server";

import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
import {
  PaymentData,
  paymentSchema,
} from "@/lib/validations/auth/paymentSchema";
import getPayloadClient from "@/payload/payloadClient";

export const addPaymentDetails = async (data: PaymentData): ActionResponse => {
  const validation = paymentSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Bad request." };
  }

  const user = await getServerUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const payload = await getPayloadClient();

  await payload.update({
    collection: "users",
    id: user.id,
    data: { paymentSuccessful: true },
  });

  return { success: true };
};
