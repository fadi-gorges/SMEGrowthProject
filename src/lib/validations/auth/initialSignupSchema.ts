import * as z from "zod";

export const initialSignupSchema = z
  .object({
    firstName: z
      .string()
      .refine(
        (str) => str.trim().indexOf(" ") === -1,
        "Please enter only one Name"
      ),
    lastName: z
      .string()
      .refine(
        (str) => str.trim().indexOf(" ") === -1,
        "Please enter only one Name"
      ),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z.string(),
    // picture: z
    //   .custom<File>((v) => v instanceof File, {
    //     message: "Picture is required",
    //   })
    //   .refine(
    //     (v) => v.type === "image/jpeg" || v.type === "image/png",
    //     "Please upload a valid image"
    //   ),
    // jobTitle: z.string(),
    // organisation: z.string(),
    // mobileNumber: z
    //   .string()
    //   .refine(validator.isMobilePhone, "Please enter a valid phone number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type InitialSignupData = z.infer<typeof initialSignupSchema>;
