import { getUrl } from "@/lib/utils/getUrl";
import { User } from "@/payload-types";
import getPayloadClient from "@/payload/payloadClient";
import { UserWithPicture } from "@/providers/auth/types";
import { cookies } from "next/headers";

export const getServerUser = async () => {
  const token = cookies().get("payload-token")?.value;

  const meUserReq = await fetch(`${getUrl()}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  const { user }: { user: User | null } = await meUserReq.json();

  if (!user) return user;

  const payload = await getPayloadClient();

  const fullUser = await payload.findByID({
    collection: "users",
    id: user.id,
    depth: 1,
  });

  return fullUser as UserWithPicture;
};
