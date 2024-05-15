import validator from "validator";
import * as z from "zod";

export const userTypes = {
  University: "university",
  VET: "vet",
  RTO: "rto",
  "Non-Profit": "non-profit",
  "Government Agency": "government",
  "R&D Institute": "rdi",
  "Industry Group/Assoc": "industry",
} as const;

export const updateUserSchema = z.object({
  id: z.string(),
  firstName: z
    .string()
    .refine(
      (str) => str.trim().indexOf(" ") === -1,
      "Please enter a valid name"
    ),
  lastName: z
    .string()
    .refine(
      (str) => str.trim().indexOf(" ") === -1,
      "Please enter a valid name"
    ),
  // picture: z
  //   .custom<File>((v) => v instanceof File, {
  //     message: "Picture is required",
  //   })
  //   .refine(
  //     (v) => v.type === "image/jpeg" || v.type === "image/png",
  //     "Please upload a valid image"
  //   )
  //   .optional(),
  jobTitle: z.string(),
  mobileNumber: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number"),
  userType: z.nativeEnum(userTypes),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
