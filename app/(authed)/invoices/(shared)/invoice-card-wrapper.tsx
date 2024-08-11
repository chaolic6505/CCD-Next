import Link from "next/link";
import Image from "next/image";

import { Invoice } from "@/types";
import { ImageCollapsible } from "./image-collapsible";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

export const InvoiceCard = ({ invoice }: { invoice: Invoice; }) => {
    //console.log(invoice, "invoice");
    const {
        id,
        invoice_date,
        invoice_name,
        customer_email,
        customer_name,
        invoice_amount,
        invoice_status,
        invoice_image_url,
    } = invoice;
    return (
        <Card
            className="group rounded-lg border px-1 py-1 hover:bg-primary/5"
        >

            <ImageCollapsible invoice_image_url={invoice_image_url} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                    {invoice_name}
                </CardTitle>
                {/* {Icon ? <Icon className="h-5 w-5" /> : null} */}
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">{invoice_amount}</div>
                <p className="text-xs text-muted-foreground">{invoice_status}</p>
                <div className="text-lg font-bold truncate">
                    {customer_email}
                </div>
                <p className="text-xs text-muted-foreground">
                    {customer_name}
                </p>
                <p className="text-xs text-muted-foreground">
                    {invoice_date}
                </p>
                <p className="text-xs text-muted-foreground">
                    {invoice_amount}
                </p>
                <p className="text-xs text-muted-foreground">
                    {invoice_status}
                </p>
            </CardContent>
        </Card>
    );
};

export default async function InvoicesCardsWrapper({
    invoices,
}: {
    invoices: Invoice[];
}) {
    if (!invoices) return null;
    return (
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 auto-rows-fr">
            {invoices.map((invoice) => (
                <InvoiceCard invoice={invoice} />
            ))}
        </div>
    );
}
