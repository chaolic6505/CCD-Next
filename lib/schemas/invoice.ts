import * as z from "zod";

const STATUS_ENUM = ["pending", "paid"] as const;
export const invoiceSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Invoice Name must have least 1 character" }),
    amount: z.string().min(1, { message: "Please enter an amount" }),
    currency: z.string().min(1, { message: "Please select a currency" }),
    status: z.string().min(1, { message: "Please select a status" }),
    customer: z.string().min(1, { message: "Please select a customer" }),
    // name: z.string(),
    // brand: z.string(),
    // title: z.string(),
    // subtitle: z.string(),
    // note: z.string(),
    // details: z.string(),
    // description: z.string(),
    // pickup_location: z.string(),
    // purchase_method: z.string(),
    // size_wanted: z.string(),
    // size_needed: z.string(),
    // size_purchased: z.string(),
    // review: z.coerce.number(),
    // country: z.string().min(1, { message: "Please select a category" }),
    // city: z.string().min(1, { message: "Please select a category" }),
    // purchased_date: z
    //     .string()
    //     .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    //         message: "Date should be in the format YYYY-MM-DD",
    //     }),
    // tags: z.array(z.string()),
    // money_saved: z.coerce.number(),
    // delivery_fee: z.coerce.number(),
    // original_price: z.coerce.number(),
    // purchased_price: z.coerce.number(),
    // discounted_price: z.coerce.number(),
    // percentage_saved: z.coerce.number(),
    // jobs array is for the dynamic fields
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
