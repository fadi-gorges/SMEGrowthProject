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
  picture: z
    .custom<File>((v) => v instanceof File, {
      message: "Picture is required",
    })
    .refine(
      (v) => v.type === "image/jpeg" || v.type === "image/png",
      "Please upload a valid image"
    )
    .optional(),
  jobTitle: z.string(),
  mobileNumber: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number"),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
