import { User } from "@/payload-types";
import { FieldHook } from "payload/types";

export const populatePictureUrl: FieldHook<User> = async ({
  req: { payload },
  data,
}) => {
  if (!data || !data.picture) {
    return;
  }

  const picture = await payload.findByID({
    collection: "profilePictures",
    id: data.picture as string,
  });

  return picture?.url;
};
