import { getUrl } from "@/lib/utils/getUrl";
import getPayloadClient from "@/payload/payloadClient";
import { rest } from "@/providers/auth/rest";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await rest(
    `${getUrl()}/api/users/me`,
    {},
    {
      method: "GET",
    }
  );

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await getPayloadClient();

  try {
    const picture = await payload.findByID({
      collection: "profilePictures",
      id: user.picture as string,
    });
    return NextResponse.json({ picture });
  } catch (e) {
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
