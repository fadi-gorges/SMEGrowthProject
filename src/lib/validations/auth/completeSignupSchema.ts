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

export const completeSignupSchema = z.object({
  mobileNumber: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid phone number"),
  userType: z.nativeEnum(userTypes),
  organisation: z.string(),
  jobTitle: z.string(),
  // picture: z
  //   .custom<File>((v) => v instanceof File, {
  //     message: "Picture is required",
  //   })
  //   .refine(
  //     (v) => v.type === "image/jpeg" || v.type === "image/png",
  //     "Please upload a valid jpeg or png image"
  //   ),
});

export type CompleteSignupData = z.infer<typeof completeSignupSchema>;
