import { getUrl } from "@/lib/utils/getUrl";
import { User } from "@/payload-types";
import getPayloadClient from "@/payload/payloadClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const token = cookies().get("payload-token")?.value;

  const meUserReq = await fetch(`${getUrl()}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  const { user }: { user: User | null } = await meUserReq.json();

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const payload = await getPayloadClient();

  const fullUser = await payload.findByID({
    collection: "users",
    id: user.id,
    depth: 1,
  });

  return NextResponse.json({ user: fullUser });
};
