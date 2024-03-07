"use server";
import { ActionError, actionError } from "@/lib/utils/actionError";
import {
  UserAuthData,
  userAuthSchema,
} from "@/lib/validations/auth/userAuthSchema";
import getPayloadClient from "@/payload/payloadClient";

export const createUser = async (
  data: UserAuthData
): Promise<{ success: true } | ActionError> => {
  const validation = userAuthSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  const payload = await getPayloadClient();

  try {
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
      },
      showHiddenFields: true,
      disableVerificationEmail: true,
    });

    await payload.sendEmail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Verify your ${process.env.EMAIL_NAME} account`,
      html: `
        <h1 style="margin-bottom: 16px;">Verify your email</h1>
        <p style="margin-bottom: 8px;">Hi ${user.email},</p>
        <p style="margin-bottom: 16px;">Click the button below to verify your email address:</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify/${user._verificationToken}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Verify your email</a>
      `,
    });

    return { success: true };
  } catch (e) {
    return actionError(e, "Error creating user.");
  }
};
