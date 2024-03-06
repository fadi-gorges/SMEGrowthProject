// TODO: Add email update functionality
// "use server"
// import { getServerUser } from "@/lib/utils/getServerUser";
// import {
//   UpdateUserData,
//   updateUserSchema,
// } from "@/lib/validations/auth/updateUserSchema";
// import getPayloadClient from "@/payload/payloadClient";

// export const updateUser = async (
//   data: UpdateUserData
// ): Promise<{ success: true } | ActionResponseFail> => {
//   const user = await getServerUser();

//   if (!user) {
//     return { success: false, error: "Unauthorized" };
//   }

//   const validation = updateUserSchema.safeParse(data);

//   if (!validation.success) {
//     return { success: false, errors: validation.error.errors };
//   }

//   const payload = await getPayloadClient();

//   try {
//     await payload.update({
//       collection: "users",
//       id: user.id,
//       data,
//     });

//     return { success: true };
//   } catch (e: any) {
//     return { success: false, error: "Error updating user." };
//   }
// };
