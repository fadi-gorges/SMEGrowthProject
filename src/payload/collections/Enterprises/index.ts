import { CollectionConfig } from "payload/types";
import { admins } from "../../access/admins";

export const Enterprises: CollectionConfig = {
  slug: "enterprises",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["id","name", "abn", "sector", "numEmployees",],
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
      name: "industrySector",
      type: "text",
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
      name: "contact",
      type: "textarea",
    },
    {
      name: "revenue",
      type: "number",
    },
    {
      name: "valuation",
      type: "number",
    },
    {
      name: "establishedDate",
      type: "date",
    },
    {
      name: "about",
      type: "textarea"
    },
    {
      name: "growthPotential",
      type: "number"
    },
    {
      name: "location",
      type: "textarea"
    }
  ],
};
