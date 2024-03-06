import type { Access } from "payload/config";

import { checkRole } from "../../collections/Users/checkRole";

export const adminsOrOwner: Access = ({ req: { user } }) => {
  if (checkRole(["admin"], user)) return true;

  return {
    user: {
      equals: user,
    },
  };
};
