import { AllAccess } from "@/payload/access/types";
import { checkRole } from "../collections/Users/checkRole";

export const admins: AllAccess = ({ req: { user } }) => {
  return user ? checkRole(["admin"], user) : false;
};
