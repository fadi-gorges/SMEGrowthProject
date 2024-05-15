import validator from "validator";
import * as z from "zod";

export const paymentSchema = z
  .object({
    name: z.string(),
    cardNumber: z.string(),
    expMonth: z.enum([
      ...(Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      ) as [string, ...string[]]),
    ]),
    expYear: z.enum([
      ...(Array.from({ length: 10 }, (_, i) =>
        (new Date().getFullYear() + i).toString()
      ) as [string, ...string[]]),
    ]),
    cvc: z
      .string()
      .min(3, "Invalid CVC code")
      .max(3, "Invalid CVC code")
      .refine(validator.isNumeric, "Invalid CVC code"),
  })
  .refine(
    (data) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      if (parseInt(data.expYear) === currentYear) {
        return parseInt(data.expMonth) >= currentMonth;
      }

      return true;
    },
    {
      message: "Card has expired",
      path: ["expMonth"],
    }
  );

export type PaymentData = z.infer<typeof paymentSchema>;
