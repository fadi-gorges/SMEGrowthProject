import { FieldAccess } from "payload/types";
import { checkRole } from "../../collections/Users/checkRole";

export const adminsOrOwner: FieldAccess = ({
  req: { user },
  doc,
  siblingData,
}) => {
  if (checkRole(["admin"], user)) return true;

  return doc ? doc.user === user : siblingData!.user === user;
};
