// "use server";
// import { ActionError, actionError } from "@/lib/utils/actionError";
// import { User } from "@/payload-types";
// import getPayloadClient from "@/payload/payloadClient";
// import customLocalLogin from "@/payload/utilities/auth/customLocalLogin";
// import cryptoRandomString from "crypto-random-string";
// import { cookies } from "next/headers";

// function parseJwt(token: string) {
//   return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
// }

// export const googleLoginAction = async ({
//   access_token,
//   credential,
// }: {
//   access_token?: string;
//   credential?: string;
// }): Promise<{ success: true; user: User } | ActionError> => {
//   if (!access_token && !credential) {
//     return { success: false, error: "Unauthorized" };
//   }

//   let email = null;

//   if (access_token) {
//     const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });

//     if (!res.ok) {
//       return { success: false, error: "Unauthorized" };
//     }

//     const data = await res.json();
//     email = data.email;
//   } else if (credential) {
//     const token = parseJwt(credential);
//     email = token.email;
//   }

//   if (!email) {
//     return { success: false, error: "Unauthorized" };
//   }

//   const payload = await getPayloadClient();

//   const { docs } = await payload.find({
//     collection: "users",
//     where: {
//       email: {
//         equals: email,
//       },
//     },
//     limit: 1,
//   });

//   try {
//     if (docs.length === 0) {
//       const _user = await payload.create({
//         collection: "users",
//         data: {
//           email,
//           password: cryptoRandomString({ length: 64 }),
//           _verified: true,
//         },
//         disableVerificationEmail: true,
//       });

//       const { user, token, exp } = await customLocalLogin(payload, {
//         collection: "users",
//         data: { email },
//       });

//       if (!token || !exp) throw new Error();

//       cookies().set("payload-token", token, {
//         httpOnly: true,
//         path: "/",
//         sameSite: "lax",
//         expires: new Date(exp * 1000),
//       });

//       return { success: true, user };
//     } else {
//       const { user, token, exp } = await customLocalLogin(payload, {
//         collection: "users",
//         data: { email },
//       });

//       if (!token || !exp) throw new Error();

//       cookies().set("payload-token", token, {
//         httpOnly: true,
//         path: "/",
//         sameSite: "lax",
//         expires: new Date(exp * 1000),
//       });

//       return { success: true, user };
//     }
//   } catch (e) {
//     return actionError(e, "An error occured.");
//   }
// };
