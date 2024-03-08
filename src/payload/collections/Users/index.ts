import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import adminsAndUser from "./access/adminsAndUser";
import { checkRole } from "./checkRole";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";
import { ensureUserRole } from "./hooks/ensureUserRole";
import { loginAfterCreate } from "./hooks/loginAfterCreate";

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "roles", "createdAt"],
  },
  access: {
    read: adminsAndUser,
    create: admins,
    update: admins,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(["admin"], user),
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: {
    verify: true,
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
  ],
  timestamps: true,
};

export default Users;
