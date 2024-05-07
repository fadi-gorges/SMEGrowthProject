import { CollectionConfig } from "payload/types";
import { admins } from "../../access/admins";

export const SearchProfiles: CollectionConfig = {
  slug: "searchProfiles",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "user", "searchQuery"],
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
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "searchQuery",
      type: "text",
    },
    {
      name: "industrySector",
      type: "text",
      hasMany: true,
    },
    {
      name: "minEmployees",
      type: "number",
    },
    {
      name: "maxEmployees",
      type: "number",
    },
    {
      name: "minRevenue",
      type: "number",
    },
    {
      name: "maxRevenue",
      type: "number",
    },
    {
      name: "minValuation",
      type: "number",
    },
    {
      name: "maxValuation",
      type: "number",
    },
  ],
};
