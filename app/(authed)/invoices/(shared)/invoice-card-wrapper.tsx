import { BanknoteIcon, ClockIcon, InboxIcon, UsersIcon } from "lucide-react";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Invoice } from "@/types";
import Link from "next/link";

export const InvoiceCard = ({
    id,
    image_url,
    invoice_name,
    invoice_date,
    customer_name,
    customer_email,
    invoice_amount,
    invoice_status,
}: Invoice) => {
    return (
        <Link href={`/invoices/${id}`} key={id}>
            <Card
                key={id}
                className="group rounded-lg border px-3 py-2 transition-colors hover:light:bg-slate-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-medium">
                        {invoice_name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-lg font-bold">{customer_email}</div>
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {invoices.map((invoice) => (
                <InvoiceCard key={invoice.id} {...invoice} />
            ))}
        </div>
    );
}
