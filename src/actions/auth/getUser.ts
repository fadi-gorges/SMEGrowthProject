"use server";
import { getServerUser } from "@/lib/utils/getServerUser";

export const getUser = async () => {
  return await getServerUser();
};
