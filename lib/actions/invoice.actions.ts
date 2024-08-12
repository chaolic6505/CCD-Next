"use server";

import { z } from "zod";
import db from "@/db/drizzle";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { customers, invoices, revenue } from "@/db/schema";
import { count, desc, eq, ilike, or, sql } from "drizzle-orm";

import { Invoice } from "@/types";
import { formatCurrency } from "../utils";
import { ITEMS_PER_PAGE } from "../constants/systems";
import { InvoiceFormValues, invoiceSchema } from "../schemas/invoice";
import { Currency } from "lucide-react";

export async function fetchCardData() {
    try {
        const invoiceCountPromise = db
            .select({ count: count() })
            .from(invoices);
        const customerCountPromise = db
            .select({ count: count() })
            .from(customers);
        const invoiceStatusPromise = db
            .select({
                paid: sql<number>`SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)`,
                pending: sql<number>`SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END)`,
            })
            .from(invoices);

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
        ]);

        const numberOfInvoices = Number(data[0][0].count ?? "0");
        const numberOfCustomers = Number(data[1][0].count ?? "0");
        const totalPaidInvoices = formatCurrency(data[2][0].paid ?? "0");
        const totalPendingInvoices = formatCurrency(data[2][0].pending ?? "0");

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
        };
    } catch (error) {
        throw new Error("Failed to fetch card data.");
    }
}

export async function fetchRevenue() {
    try {
        const data = await db.select().from(revenue);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch the revenues.");
    }
}
export async function fetchLatestInvoices() {
    try {
        const data = await db
            .select({
                id: invoices.id,
                status: invoices.status,
                customer_name: customers.name,
                customer_email: customers.email,
                created_at: invoices.created_at,
                invoice_amount: invoices.amount,
                invoice_name: invoices.invoice_name,
                invoice_date: invoices.invoice_date,
                invoice_image_url: invoices.image_url,
            })
            .from(invoices)
            .innerJoin(customers, eq(invoices.customer_id, customers.id))
            .orderBy(desc(invoices.invoice_date))
            .limit(5);

        const latestInvoices = data.map((invoice) => ({
            ...invoice,
            invoice_amount: invoice.invoice_amount ? formatCurrency(invoice.invoice_amount) : 0,
        }));

        return latestInvoices;
    } catch (error) {
        throw new Error("Failed to fetch the latest invoices.");
    }
}

export async function deleteInvoice(id: string) {
    try {
        await db.delete(invoices).where(eq(invoices.id, id));
        revalidatePath("/dashboard/invoices");
        return { message: "Deleted Invoice" };
    } catch (error) {
        return { message: "Database Error: Failed to Delete Invoice." };
    }
}

export async function fetchFilteredInvoices(
    query: string,
    currentPage: number
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const data = await db
            .select({
                id: invoices.id,
                status: invoices.status,
                currency: invoices.currency,
                customer_name: customers.name,
                customer_email: customers.email,
                created_at: invoices.created_at,
                invoice_amount: invoices.amount,
                invoice_name: invoices.invoice_name,
                invoice_date: invoices.invoice_date,
                invoice_image_url: invoices.image_url,
            })
            .from(invoices)
            .innerJoin(customers, eq(invoices.customer_id, customers.id))
            .where(
                or(
                    ilike(customers.name, sql`${`%${query}%`}`),
                    ilike(customers.email, sql`${`%${query}%`}`),
                    ilike(invoices.status, sql`${`%${query}%`}`),
                    ilike(invoices.invoice_name, sql`${`%${query}%`}`)
                )
            )
            .orderBy(desc(invoices.created_at))
            .limit(ITEMS_PER_PAGE)
            .offset(offset);

        return data;
    } catch (error) {
        throw new Error("Failed to fetch invoices.");
    }
}

export async function fetchInvoicesPages(query: string) {
    try {
        const data = await db
            .select({
                count: count(),
            })
            .from(invoices)
            .innerJoin(customers, eq(invoices.customer_id, customers.id))
            .where(
                or(
                    ilike(customers.name, sql`${`%${query}%`}`),
                    ilike(customers.email, sql`${`%${query}%`}`),
                    ilike(invoices.status, sql`${`%${query}%`}`)
                )
            );
        const total = data[0].count;
        const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);

        return { totalPages, total };
    } catch (error) {
        throw new Error("Failed to fetch total number of invoices.");
    }
}

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: "Please select a customer.",
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    status: z.enum(["pending", "paid"], {
        invalid_type_error: "Please select an invoice status.",
    }),
    date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(
    formData: InvoiceFormValues,
    created_by: string
) {
    //const { user } = useUser();
    // Validate form fields using Zod
    const validatedFields = invoiceSchema.safeParse(formData);

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
    let values = {
        status,
        currency,
        created_by,
        customer_id,
        invoice_name,
        invoice_date,
        amount: parseFloat(amount),
        created_at: Math.round(+new Date() / 1000),
        image_url: image_urls?.length ? image_urls[0].url : null,
    };
    //Insert data into the database
    try {
        let insertedInvoices = await db
            .insert(invoices)
            .values(values)
            .returning();

        //return insertedInvoices[0];
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

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Invoice.",
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await db
            .update(invoices)
            .set({
                customer_id: customerId,
                amount: amountInCents,
                status,
            })
            .where(eq(invoices.id, id));
    } catch (error) {
        return { message: "Database Error: Failed to Update Invoice." };
    }
    revalidatePath("/invoices");
    redirect("/invoices");
}

export async function fetchInvoiceById(id: string) {
    try {
        const data = await db
            .select({
                id: invoices.id,
                amount: invoices.amount,
                status: invoices.status,
                currency: invoices.currency,
                customer_id: invoices.customer_id,
                invoice_name: invoices.invoice_name,
                invoice_date: invoices.invoice_date,
                invoice_image_url: invoices.image_url,
            })
            .from(invoices)
            .where(eq(invoices.id, id));

        const invoice = data.map((invoice) => ({
            ...invoice,
            // Convert amount from cents to dollars
            status: invoice.status === "paid" ? "paid" : "pending",
            amount: invoice.amount ? invoice.amount / 100 : null,
        }));

        return invoice[0] as Invoice;
    } catch (error) {
        throw new Error("Failed to fetch invoice.");
    }
}
