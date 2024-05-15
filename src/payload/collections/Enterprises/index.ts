import { CollectionConfig } from "payload/types";
import { admins } from "../../access/admins";

export const Enterprises: CollectionConfig = {
  slug: "enterprises",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "abn", "industrySector", "numEmployees"],
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
      unique: true,
    },
    {
      name: "numEmployees",
      type: "number",
    },
    {
      name: "website",
      type: "text",
    },
    {
      name: "suburb",
      type: "text",
    },
    {
      name: "postCode",
      type: "number",
    },
    {
      name: "sme",
      type: "checkbox",
    },
    {
      name: "manufacturer",
      type: "checkbox",
    },
    {
      name: "growthPotential",
      type: "number",
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};
