import Link from "next/link";
import Image from "next/image";

import { Invoice } from "@/types";
import { cn } from "@/lib/utils";
import { CURRENCY } from "@/lib/constants/currency";

import InvoiceStatus from "./status";
import { ImageCollapsible } from "./image-collapsible";

import { inter, lusitana } from "@/components/shared/fonts";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";

export const InvoiceCard = ({ invoice }: { invoice: Invoice; }) => {
    //console.log(invoice, "invoice");
    const {
        id,
        status,
        currency,
        invoice_date,
        invoice_name,
        customer_email,
        customer_name,
        invoice_amount,
        invoice_image_url,
    } = invoice;

    const invoices = [
        {
            label: "Invoice Date",
            value: invoice_date
        },
        {
            label: "Customer Name",
            value: customer_name
        },
        {
            label: "Customer Email",
            value: customer_email
        }
    ];
    console.log(status, "status");
    return (
        <Card
            className={cn("group rounded-lg border px-1 py-1 hover:bg-primary/5 w-full flex flex-col")}
        >

            <ImageCollapsible invoice_image_url={invoice_image_url} />
            <CardContent className="mt-1 p-0 flex flex-col justify-between">
                <div className="px-1">
                    <CardDescription className={`${inter.className} truncate`}>
                        Invoice Name
                    </CardDescription>
                    <CardTitle className={`${inter.className} `}>
                        {invoice_name}
                    </CardTitle>
                </div>

                {invoices.map((invoice) => (
                    <div className="mt-3 flex flex-row items-center whitespace-nowrap justify-between px-1">
                        <CardDescription className={`${inter.className}`}>
                            {invoice.label}
                        </CardDescription>
                        <div className="flex flex-row justify-around">
                            <CardTitle className={`${inter.className} `}>
                                {invoice.value}
                            </CardTitle>
                        </div>
                    </div>
                ))}
                <div className="mt-3 flex flex-row items-center whitespace-nowrap justify-between px-1">
                    <CardDescription className={`${inter.className}`}>
                        {`${invoice_amount} ${currency}`}
                    </CardDescription>
                    {status ? <InvoiceStatus status={status} className={"w-15"} /> : null}
                </div>

            </CardContent>
        </Card >
    );
};

export default async function InvoicesCardsWrapper({
    invoices,
}: {
    invoices: Invoice[];
}) {
    if (!invoices) return null;
    return (
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {invoices.map((invoice) => (
                <InvoiceCard invoice={invoice} />
            ))}
        </div>
    );
}
