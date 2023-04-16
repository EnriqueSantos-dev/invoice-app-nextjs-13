import z from "zod";

const formSchema = z.object({
  billFromStreetAddress: z.string().min(1, { message: "cannot be empty" }),
  billFromPostCode: z
    .string()
    .trim()
    .min(1, { message: "cannot be empty" })
    .regex(/^\d{5}(?:[-\s]\d{4})?$/),
  billFromCity: z.string().min(1, { message: "cannot be empty" }),
  billFromCountry: z.string().min(1, { message: "cannot be empty" }),
  billToName: z.string().min(1, { message: "cannot be empty" }),
  billToEmail: z
    .string()
    .email("this email is not valid")
    .min(1, { message: "cannot be empty" })
    .transform((value) => value.toLowerCase()),
  billToStreetAddress: z.string().min(1, { message: "cannot be empty" }),
  billToPostCode: z
    .string()
    .trim()
    .min(1, { message: "cannot be empty" })
    .regex(/^\d{5}(?:[-\s]\d{4})?$/, "invalid format"),
  billToCountry: z.string().min(1, { message: "cannot be empty" }),
  billToCity: z.string().min(1, { message: "cannot be empty" }),
  invoiceDate: z
    .string()
    .min(1, { message: "cannot be empty" })
    .transform((value) => new Date(value)),
  description: z.string().min(1, { message: "cannot be empty" }),
  items: z.array(
    z.object({
      name: z.string({ required_error: "cannot be empty" }),
      quantity: z.coerce.number().nonnegative({ message: "cannot negative" }),
      price: z.coerce.number().nonnegative({ message: "cannot negative" }),
    })
  ),
});

export default formSchema;
