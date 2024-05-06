"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { capitalise } from "@/lib/utils/capitalise";
import {
  InitialSignupData,
  initialSignupSchema,
} from "@/lib/validations/auth/initialSignupSchema";
import getPayloadClient from "@/payload/payloadClient";

export const createUser = async (data: InitialSignupData): ActionResponse => {
  const validation = initialSignupSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Bad request." };
  }

  const payload = await getPayloadClient();

  await payload.delete({
    collection: "users",
    where: {
      and: [
        {
          _verified: {
            equals: false,
          },
        },
        {
          email: {
            equals: validation.data.email,
          },
        },
      ],
    },
  });

  const user = await payload.create({
    collection: "users",
    data: {
      email: validation.data.email,
      password: validation.data.password,
      firstName: capitalise(validation.data.firstName),
      lastName: capitalise(validation.data.lastName),
    },
    showHiddenFields: true,
    disableVerificationEmail: true,
  });

  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  await payload.update({
    collection: "users",
    id: user.id,
    data: {
      _verificationToken: verificationToken,
    },
  });

  await payload.sendEmail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `${verificationToken} is your AusBizGrowth passcode`,
    html: `
        <h1 style="margin-bottom: 16px;">Verify your email</h1>
        <p style="margin-bottom: 8px;">Hi ${user.firstName},</p>
        <p>Please enter this one-time passcode to verify your ${process.env.EMAIL_NAME} account:</p>
        <h2 style="font-weight: bold;">${verificationToken}</h2>
      `,
  });

  return { success: true };
};
