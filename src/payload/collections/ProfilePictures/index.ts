// NOT USED
import { CollectionConfig } from "payload/types";
import { admins } from "../../access/admins";
import { none } from "../../access/none";

export const ProfilePictures: CollectionConfig = {
  slug: "profilePictures",
  upload: {
    staticURL: `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com`,
    adminThumbnail: ({ doc }) =>
      `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com/${doc.filename}`,
    mimeTypes: ["image/jpeg", "image/png"],
    resizeOptions: {
      width: 320,
      height: 320,
    },
  },
  admin: {
    hidden: true,
  },
  access: {
    create: admins,
    read: admins,
    update: admins,
    delete: none,
  },
  fields: [],
};
