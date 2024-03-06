import { User } from "@/payload-types";
import { cookies } from "next/headers";

export const getServerUser = async () => {
  const token = cookies().get("payload-token")?.value;

  const meUserReq = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );

  const { user }: { user: User | null } = await meUserReq.json();
  return user;
};
