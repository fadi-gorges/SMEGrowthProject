"use server";
import { ActionError } from "@/lib/utils/actionError";
import { capitalise } from "@/lib/utils/capitalise";
import { getBuffer } from "@/lib/utils/getBuffer";
import { getUrl } from "@/lib/utils/getUrl";
import { signupSchema } from "@/lib/validations/auth/signupSchema";
import getPayloadClient from "@/payload/payloadClient";
import { actionError } from "./../../lib/utils/actionError";

export const createUser = async (
  body: FormData
): Promise<{ success: true } | ActionError> => {
  const data: {
    [key: string]: string | File;
  } = {};
  body.forEach((value, key) => (data[key] = value));

  const validation = signupSchema.safeParse(data);

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

    const picture = await payload.create({
      collection: "profilePictures",
      data: {},
      file: {
        data: await getBuffer(validation.data.picture),
        name: validation.data.picture.name,
        mimetype: validation.data.picture.type,
        size: validation.data.picture.size,
      },
    });

    const user = await payload.create({
      collection: "users",
      data: {
        email: validation.data.email,
        password: validation.data.password,
        firstName: capitalise(validation.data.firstName),
        lastName: capitalise(validation.data.lastName),
        mobileNumber: validation.data.mobileNumber,
        jobTitle: capitalise(validation.data.jobTitle),
        organisation: capitalise(validation.data.organisation),
        picture: picture.id,
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
        <a href="${getUrl()}/auth/verify/${
        user._verificationToken
      }" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Verify your email</a>
      `,
    });

    return { success: true };
  } catch (e) {
    return actionError(e, "Error creating user.");
  }
};
