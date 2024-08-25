import Link from "next/link";

import { cn } from "@/lib/utils";
import { Invoice } from "@/types";
import { CURRENCY } from "@/lib/constants/currency";

import InvoiceStatus from "./status";
import CardTitleWrapper from "./card-title-wrapper";
import { ImageCollapsible } from "./image-collapsible";

import { inter } from "@/components/shared/fonts";
import {
    Card,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";

const InvoiceCard = ({
    invoice,
    invoice_date_label,
    customer_name_label,
    customer_email_label,
}: {
    invoice: Invoice;
    invoice_date_label: string;
    customer_name_label: string;
    customer_email_label: string;
}) => {
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
            value: invoice_date,
            label: invoice_date_label,
        },
        {
            value: customer_name,
            label: customer_name_label,
        },
        {
            value: customer_email,
            label: customer_email_label,
        },
    ];
    return (
        <div>
            <Card
                className={cn(
                    "group rounded-lg border px-1 py-1 hover:shadow-lg w-full flex flex-col"
                )}
            >
                {invoice_image_url ? (
                    <ImageCollapsible invoice_image_url={invoice_image_url} />
                ) : null}
                <Link href={`/invoices/${id}`}>
                    <CardContent className="mt-1 p-0 flex flex-col justify-between">
                        {invoice_name ? (
                            <CardTitleWrapper invoice_name={invoice_name} />
                        ) : null}
                        {invoices.map((invoice, index) => (
                            <div key={index} className="mt-3 flex flex-row items-center whitespace-nowrap justify-between px-1">
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
                        <div className="mt-3 flex flex-row items-center whitespace-nowrap justify-between px-1 pb-1">
                            <CardDescription className={`${inter.className}`}>
                                {`${invoice_amount} ${currency}`}
                            </CardDescription>
                            {status ? (
                                <InvoiceStatus status={status} className={"w-15"} />
                            ) : null}
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </div>
    );
};

export default InvoiceCard;
