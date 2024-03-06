import { User } from "@/payload-types";
import type { FieldHook } from "payload/types";

export const ensureUserRole: FieldHook<User> = async ({ data }) => {
  const userRoles = new Set(data?.roles || []);
  userRoles.add("user");
  return [...userRoles];
};
