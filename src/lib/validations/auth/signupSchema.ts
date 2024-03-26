import validator from "validator";
import * as z from "zod";

export const signupSchema = z.object({
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

  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),

  picture: z
    .custom<File>((v) => v instanceof File, {
      message: "Picture is required",
    })
    .refine(
      (v) => v.type === "image/jpeg" || v.type === "image/png",
      "Please upload a valid image"
    ),
  jobTitle: z.string(),
  organisation: z.string(),
  mobileNumber: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number"),
});

export type SignupData = z.infer<typeof signupSchema>;
