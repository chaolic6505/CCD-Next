import { BanknoteIcon, ClockIcon, InboxIcon, UsersIcon } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Invoice } from "@/types";




export const InvoiceCard = ({
    image_url,
    invoice_name,
    invoice_date,
    customer_name,
    customer_email,
    invoice_amount,
    invoice_status,
}: Invoice) => {


    return (
        <Card
            className="group rounded-lg border px-5 py-4 transition-colors hover:light:bg-slate-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">{invoice_name}</CardTitle>
                <CardTitle className="text-2xl font-medium">{invoice_status}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-lg font-bold">{customer_email}</div>
                <p className="text-xs text-muted-foreground">{customer_name}</p>
                <p className="text-xs text-muted-foreground">{invoice_date}</p>
                <p className="text-xs text-muted-foreground">{invoice_amount}</p>
            </CardContent>
        </Card>
    );
};

export default async function InvoicesCardsWrapper({ invoices }: { invoices: Invoice[]; }) {
    if (!invoices) return null;
    return (
        invoices.map((invoice) => (
            <InvoiceCard {...invoice} />
        ))
    );
}
