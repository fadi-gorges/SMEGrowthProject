import { CollectionConfig } from "payload/types";
import { admins } from "../../access/admins";

export const Organisations: CollectionConfig = {
  slug: "organisations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "members"],
    listSearchableFields: ["name"],
  },
  access: {
    create: admins,
    read: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "members",
      type: "text",
      hasMany: true,
      required: true,
    },
  ],
};
