import { userTypes } from "@/lib/validations/auth/completeSignupSchema";
import validator from "validator";
import * as z from "zod";

export const updateUserSchema = z.object({
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
  jobTitle: z.string(),
  mobileNumber: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number"),
  userType: z.nativeEnum(userTypes),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
