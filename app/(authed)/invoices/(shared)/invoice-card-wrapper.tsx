import Link from "next/link";
import Image from "next/image";

import { Invoice } from "@/types";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

export const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
    console.log(invoice, "invoice");
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
        <Link href={`/invoices/${invoice.id}`} key={invoice.id}>
            <Card
                key={id}
                className="max-w-sm overflow-hidden shadow-lg rounded-lg"
            >
                <CardHeader></CardHeader>
                {invoice_image_url ? (
                    <Image
                        width={300}
                        height={200}
                        alt="invoice"
                        src={invoice_image_url}
                        className="object-cover w-full h-48"
                    />
                ) : null}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                    <CardTitle className="text-xl font-medium truncate">
                        {invoice_name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
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
        </Link>
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
