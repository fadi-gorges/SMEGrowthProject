"use server";
import { ActionResponse } from "@/lib/utils/actionResponse";
import { getServerUser } from "@/lib/utils/getServerUser";
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

  const organisationDoc = await payload.find({
    collection: "organisations",
    where: {
      name: {
        equals: validation.data.organisation,
      },
    },
  });

  let organisation;

  if (organisationDoc.docs.length === 0) {
    organisation = await payload.create({
      collection: "organisations",
      data: {
        name: validation.data.organisation,
        members: [user.email],
      },
    });
  } else {
    organisation = organisationDoc.docs[0];

    if (user.organisation !== organisation.id) {
      const oldOrganisation = await payload.findByID({
        collection: "organisations",
        id: user.organisation as string,
      });

      const members = oldOrganisation.members.filter(
        (memberEmail) => memberEmail !== user.email
      );

      console.log(members);

      await payload.update({
        collection: "organisations",
        where: {
          id: {
            equals: oldOrganisation.id,
          },
        },
        data: {
          members: members,
        },
      });
    }

    if (!organisation.members.includes(user.email)) {
      await payload.update({
        collection: "organisations",
        where: {
          id: {
            equals: organisation.id,
          },
        },
        data: {
          members: [...organisation.members, user.email],
        },
      });
    }
  }

  await payload.update({
    collection: "users",
    id: user.id,
    data: {
      firstName: validation.data.firstName,
      lastName: validation.data.lastName,
      jobTitle: validation.data.jobTitle,
      mobileNumber: validation.data.mobileNumber,
      organisation: organisation.id,
    },
  });

  // if (!validation.data.picture) return { success: true };

  // await payload.update({
  //   collection: "profilePictures",
  //   id: user.picture as string,
  //   data: {},
  //   file: {
  //     data: await readBuffer(validation.data.picture),
  //     name: user.email,
  //     mimetype: validation.data.picture.type,
  //     size: validation.data.picture.size,
  //   },
  //   overwriteExistingFiles: true,
  // });

  return { success: true };
};
