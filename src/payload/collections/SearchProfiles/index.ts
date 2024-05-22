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
      name: "manufacturer",
      type: "checkbox",
    },
    {
      name: "employeesRange",
      type: "text",
    },
    {
      name: "growthPotentialRange",
      type:"text",
    },
    {
      name:"postcode",
      type:"number",
    },
    {
      name: "industrySector",
      type: "text",
    },
  ],
};
