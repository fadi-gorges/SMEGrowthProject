import { CollectionConfig } from "payload/types";
import { admins } from "../../access/admins";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticURL: `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com`,
    adminThumbnail: ({ doc }) =>
      `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.amazonaws.com/${doc.filename}`,
    mimeTypes: ["image/*"],
  },
  access: {
    create: admins,
    read: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
