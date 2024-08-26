"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


import prisma from "@/db";
import { formatCurrency } from "../utils";
import { ITEMS_PER_PAGE } from "../constants/systems";
import { InvoiceFormValues, invoiceSchema } from "../schemas/invoice";

export async function fetchCardData() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return {};

    try {
        const invoiceCountPromise = prisma.invoice.count({});
        const customerCountPromise = prisma.customers.count();
        const invoiceStatusPromise = prisma.invoice.groupBy({
            by: ['status'],
            where: {
                created_by: user.id
            },
            _sum: {
                amount: true
            }
            }).then(results => {
                return results.reduce((acc, curr) => {
                    if (curr.status) {
                        acc[curr.status.toLowerCase() as 'paid' | 'pending'] = curr._sum.amount || 0;
                    }
                    return acc;
                }, { paid: 0, pending: 0 });
            });

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
        ]);
        const numberOfInvoices = Number(data[0] ?? "0");
        const numberOfCustomers = Number(data[1] ?? "0");
        const { paid, pending } = data[2];

        return {
            numberOfInvoices,
            numberOfCustomers,
            totalPaidInvoices: paid,
            totalPendingInvoices: pending,
        };
    } catch (error) {
        throw new Error("Failed to fetch card data.");
    }
}

export async function fetchRevenue() {
    // try {
    //     const data = await db.select().from(revenue);
    //     return data;
    // } catch (error) {
    //     throw new Error("Failed to fetch the revenues.");
    // }
}
export async function fetchLatestInvoices() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;

    // try {
    //     const data = await db
    //         .select({
    //             id: invoices.id,
    //             status: invoices.status,
    //             customer_name: customers.name,
    //             customer_email: customers.email,
    //             created_at: invoices.created_at,
    //             invoice_amount: invoices.amount,
    //             invoice_name: invoices.invoice_name,
    //             invoice_date: invoices.invoice_date,
    //             invoice_image_url: invoices.image_url,
    //         })
    //         .from(invoices)
    //         .where(eq(invoices.created_by, user.id))
    //         .innerJoin(customers, eq(invoices.customer_id, customers.id))
    //         .orderBy(desc(invoices.invoice_date))
    //         .limit(5);

    //     const latestInvoices = data.map((invoice) => ({
    //         ...invoice,
    //         invoice_amount: invoice.invoice_amount ? formatCurrency(invoice.invoice_amount) : 0,
    //     }));

    //     return latestInvoices;
    // } catch (error) {
    //     throw new Error("Failed to fetch the latest invoices.");
    // }
}

export async function deleteInvoice(id: string) {
    // try {
    //     await db.delete(invoices).where(eq(invoices.id, id));
    //     revalidatePath("/invoices");
    //     return { message: "Deleted Invoice" };
    // } catch (error) {
    //     return { message: "Database Error: Failed to Delete Invoice." };
    // }
}

export async function fetchFilteredInvoices(
    query: string,
    currentPage: number
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;

    // try {
    //     const data = await db
    //         .select({
    //             id: invoices.id,
    //             status: invoices.status,
    //             currency: invoices.currency,
    //             customer_name: customers.name,
    //             customer_email: customers.email,
    //             created_at: invoices.created_at,
    //             invoice_amount: invoices.amount,
    //             invoice_name: invoices.invoice_name,
    //             invoice_date: invoices.invoice_date,
    //             invoice_image_url: invoices.image_url,
    //         })
    //         .from(invoices)
    //         .innerJoin(customers, eq(invoices.customer_id, customers.id))
    //         .where(
    //             and(
    //                 eq(invoices.created_by, user.id),
    //                 (
    //                     ilike(customers.name, sql`${`%${query}%`}`),
    //                     ilike(customers.email, sql`${`%${query}%`}`),
    //                     ilike(invoices.status, sql`${`%${query}%`}`),
    //                     ilike(invoices.invoice_name, sql`${`%${query}%`}`)
    //                 )
    //             )
    //         )
    //         .orderBy(desc(invoices.created_at))
    //         .limit(ITEMS_PER_PAGE)
    //         .offset(offset);

    //     return data;
    // } catch (error) {
    //     throw new Error("Failed to fetch invoices.");
    // }
}

export async function fetchInvoicesPages(query: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;

    // try {
    //     const data = await db
    //         .select({
    //             count: count(),
    //         })
    //         .from(invoices)
    //         .innerJoin(customers, eq(invoices.customer_id, customers.id))
    //         .where(
    //             and(
    //                 eq(invoices.created_by, user.id),
    //                 ilike(customers.name, sql`${`%${query}%`}`),
    //                 ilike(customers.email, sql`${`%${query}%`}`),
    //                 ilike(invoices.status, sql`${`%${query}%`}`)
    //             )
    //         );
    //     const total = data ? data[0].count : 0;
    //     const totalPages = data ? Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE) : 0;

    //     return { totalPages, total };
    // } catch (error) {
    //     throw new Error("Failed to fetch total number of invoices.");
    // }
}

const FormSchema = z.object({
    id: z.string(),
    invoice_name: z
    .string()
    .min(3, { message: "Invoice name must have at least 3 characters" }),
    currency: z.string().min(1, { message: "Please select a currency" }),
    customer_id: z.string({
        invalid_type_error: "Please select a customer.",
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    status: z.enum(["pending", "paid"], {
        invalid_type_error: "Please select an invoice status.",
    }),
    invoice_date: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
            message: "Invoice date should be in the format YYYY-MM-DD",
        }),
    image_url: z.string().optional().nullable(),
});

export type State = {
    errors?: {
        amount?: string[];
        status?: string[];
        customer_id?: string[];
    };
    message?: string | null;
};

export async function createInvoice(
    formData: InvoiceFormValues,
) {
    // Validate form fields using Zod
    const validatedFields = invoiceSchema.safeParse(formData);

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Invoice.",
        };
    }

    // Prepare data for insertion into the database
    const {
        amount,
        status,
        currency,
        image_urls,
        customer_id,
        invoice_date,
        invoice_name,
    } = validatedFields.data;

    //Insert data into the database
    try {
        await prisma.invoice.create({
            data: {
                status: status,
                currency: currency,
                customer_id: customer_id,
                invoice_name: invoice_name,
                userId: user.id,
                isArchived: false,
                created_by: user.id,
                amount: parseFloat(amount),
                invoice_date: new Date(invoice_date).toISOString(),
            }
        });

    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: "Database Error: Failed to Create Invoice.",
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath("/invoices");
    redirect("/invoices");

}

const UpdateInvoice = FormSchema.omit({
    id: true,
});

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateInvoice.safeParse({
        amount: formData.get("amount"),
        status: formData.get("status"),
        currency: formData.get("currency"),
        image_url: formData.get("image_url"),
        customer_id: formData.get("customer_id"),
        invoice_date: formData.get("invoice_date"),
        invoice_name: formData.get("invoice_name"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Invoice.",
        };
    }

    const { invoice_name, invoice_date, image_url, customer_id, currency, amount, status,  } = validatedFields.data;
    try {
        // await db
        //     .update(invoices)
        //     .set({
        //         status,
        //         amount,
        //         currency,
        //         customer_id: customer_id,
        //         invoice_date: invoice_date,
        //         invoice_name: invoice_name,
        //         image_url: image_url && image_url?.length > 3  ? image_url : null,
        //     })
        //     .where(eq(invoices.id, id))
        //     .returning();

    } catch (error) {
        return { message: "Database Error: Failed to Update Invoice." };
    }
    revalidatePath("/invoices");
    redirect("/invoices");
}

export async function fetchInvoiceById(id: string) {
    try {
        // const data = await db
        //     .select({
        //         id: invoices.id,
        //         amount: invoices.amount,
        //         status: invoices.status,
        //         currency: invoices.currency,
        //         customer_id: invoices.customer_id,
        //         invoice_name: invoices.invoice_name,
        //         invoice_date: invoices.invoice_date,
        //         invoice_image_url: invoices.image_url,
        //     })
        //     .from(invoices)
        //     .where(eq(invoices.id, id));

        //return data[0];
    } catch (error) {
        throw new Error("Failed to fetch invoice.");
    }
}
