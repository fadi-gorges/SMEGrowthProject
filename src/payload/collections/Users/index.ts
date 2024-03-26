import type { CollectionConfig } from "payload/types";

import { getUrl } from "../../../lib/utils/getUrl";
import { admins } from "../../access/admins";
import { readOnlyField } from "../../access/fields/readOnlyField";
import { populatePictureUrl } from "../../collections/Users/hooks/populatePictureUrl";
import adminsAndUser from "./access/adminsAndUser";
import { checkRole } from "./checkRole";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";
import { ensureUserRole } from "./hooks/ensureUserRole";

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "firstName", "lastName", "roles", "createdAt"],
    listSearchableFields: [
      "email",
      "mobileNumber",
      "firstName",
      "lastName",
      "jobTitle",
      "organisation",
    ],
  },
  access: {
    read: adminsAndUser,
    create: admins,
    update: admins,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(["admin"], user),
  },
  hooks: {
    afterChange: [],
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return `
          <h1 style="margin-bottom: 16px;">Verify your email</h1>
          <p style="margin-bottom: 8px;">Hi ${user.email},</p>
          <p style="margin-bottom: 16px;">Click the button below to verify your email address:</p>
          <a href="${getUrl()}/auth/verify/${token}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Verify your email</a>
        `;
      },
    },
    forgotPassword: {
      generateEmailHTML: (args) => {
        const { token, user } = args as {
          token: string;
          user: { email: string };
        };

        if (!token || !user) {
          return "There was an error in generating your reset password email. Please try again.";
        }

        return `
          <h1 style="margin-bottom: 16px;">Reset your password</h1>
          <p style="margin-bottom: 8px;">Hi ${user.email},</p>
          <p style="margin-bottom: 16px;">Click the button below to reset your password:</p>
          <a href="${getUrl()}/auth/reset-password/${token}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Reset your password</a>
        `;
      },
    },
  },
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["user"],
      options: [
        {
          label: "admin",
          value: "admin",
        },
        {
          label: "user",
          value: "user",
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin, ensureUserRole],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "picture",
      type: "upload",
      relationTo: "profilePictures",
      required: true,
    },
    {
      name: "jobTitle",
      type: "text",
      required: true,
    },
    {
      name: "organisation",
      type: "text",
      required: true,
    },
    {
      name: "mobileNumber",
      type: "text",
      required: true,
    },
    {
      name: "pictureUrl",
      type: "text",
      access: readOnlyField,
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            siblingData.pictureUrl = undefined;
          },
        ],
        afterRead: [populatePictureUrl],
      },
    },
  ],
  timestamps: true,
};

export default Users;
