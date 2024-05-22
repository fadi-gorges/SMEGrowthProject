import { CollectionConfig } from "payload/types";
import { admins } from "../../access/admins";

export const Enterprises: CollectionConfig = {
  slug: "enterprises",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id", "name", "abn", "industrySector", "numEmployees"],
    listSearchableFields: ["name", "abn"],
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
      unique: true,
      required: true,
    },
    {
      name: "abn",
      type: "text",
      minLength: 11,
      maxLength: 11,
    },
    {
      name: "numEmployees",
      type: "number",
    },
    {
      name: "website",
      type: "textarea",
    },
    {
      name: "suburb",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "growthPotential",
      type: "number",
    },
    {
      name: "postCode",
      type: "number",
    },
    {
      name: "manufacturer",
      type: "checkbox",
    },
    {
      name: "sme",
      type: "checkbox",
    },
    {
      name: "industrySector",
      type: "text",
    },
  ],
};
