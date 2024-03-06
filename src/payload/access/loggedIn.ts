import { AllAccess } from "@/payload/access/types";

export const loggedIn: AllAccess = ({ req: { user } }) => {
  return !!user;
};
