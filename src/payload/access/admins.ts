import { AllAccess } from "@/payload/access/types";
import { checkRole } from "../collections/Users/checkRole";

export const admins: AllAccess = ({ req: { user } }) => {
  return checkRole(["admin"], user);
};
