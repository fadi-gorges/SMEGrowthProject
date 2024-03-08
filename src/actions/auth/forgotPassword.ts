"use server";

import { ActionError, actionError } from "@/lib/utils/actionError";
import { getUrl } from "@/lib/utils/getUrl";
import { EmailData, emailSchema } from "@/lib/validations/auth/emailSchema";
import getPayloadClient from "@/payload/payloadClient";

export const forgotPasswordAction = async (
  data: EmailData
): Promise<{ success: true } | ActionError> => {
  const validation = emailSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  const payload = await getPayloadClient();

  try {
    const { totalDocs: totalUsers } = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: validation.data.email,
        },
      },
      showHiddenFields: true,
      limit: 0,
    });

    if (!totalUsers) {
      return { success: false, error: "No user found with that email." };
    }

    await payload.forgotPassword({
      collection: "users",
      data: {
        email: validation.data.email,
      },
      disableEmail: true,
    });

    const user = await payload
      .find({
        collection: "users",
        where: {
          email: {
            equals: validation.data.email,
          },
        },
        showHiddenFields: true,
        limit: 1,
      })
      .then((res) => res.docs[0]);

    await payload.sendEmail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
      to: validation.data.email,
      subject: `Reset your ${process.env.EMAIL_NAME} password`,
      html: `
        <h1 style="margin-bottom: 16px;">Reset your password</h1>
        <p style="margin-bottom: 8px;">Hi ${validation.data.email},</p>
        <p style="margin-bottom: 16px;">Click the button below to reset your password:</p>
        <a href="${getUrl()}/auth/reset-password/${user.resetPasswordToken}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Reset your password</a>
        `,
    });

    return { success: true };
  } catch (e: any) {
    return actionError(e, "An error occured. Please try again later.");
  }
};
