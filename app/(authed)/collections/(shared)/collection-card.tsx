import Link from "next/link";

import { cn } from "@/lib/utils";
import { Collection } from "@/types";
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

const CollectionCard = ({
    collection,
    invoice_date_label,
    customer_name_label,
    customer_email_label,
}: {
    collection: Collection;
    invoice_date_label: string;
    customer_name_label: string;
    customer_email_label: string;
}) => {
    const {
        id,
        status,
        amount,
        currency,
        customer,
        invoice_date,
        invoice_name,
        invoice_image_url,
    } = collection;

    const collections = [
        {
            value: invoice_date,
            label: invoice_date_label,
        }
    ];

    const customers = [
        {
            value: customer?.name,
            label: customer_name_label,
        },
        {
            value: customer?.email,
            label: customer_email_label,
        }
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
                                    {collections.map((item, index) => (
                            <div key={index} className="mt-3 flex flex-row items-center whitespace-nowrap justify-between px-1">
                                <CardDescription className={`${inter.className}`}>
                                    {item.label}
                                </CardDescription>
                                <div className="flex flex-row justify-around">
                                    <CardTitle className={`${inter.className} `}>
                                        {item.value}
                                    </CardTitle>
                                </div>
                            </div>
                        ))}
                        {
                            customers.map((item, index) => (
                                <div key={index} className="mt-3 flex flex-row items-center whitespace-nowrap justify-between px-1">
                                    <CardDescription className={`${inter.className}`}>
                                        {item.label}
                                    </CardDescription>
                                    <div className="flex flex-row justify-around">
                                        <CardTitle className={`${inter.className} `}>
                                            {item.value}
                                        </CardTitle>
                                    </div>
                                </div>
                            ))

                        }
                        <div className="mt-3 flex flex-row items-center whitespace-nowrap justify-between px-1 pb-1">
                            <CardDescription className={`${inter.className}`}>
                                {`${amount} ${currency}`}
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

CollectionCard;
