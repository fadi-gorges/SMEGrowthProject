import { getUrl } from "@/lib/utils/getUrl";
import { User } from "@/payload-types";
import { cookies } from "next/headers";

export const getServerUser = async () => {
  const token = cookies().get("payload-token")?.value;

  const meUserReq = await fetch(`${getUrl()}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  const { user }: { user: User | null } = await meUserReq.json();
  return user;
};
