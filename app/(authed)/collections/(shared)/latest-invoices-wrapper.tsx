import { RefreshCcw } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { fetchLatestInvoices } from "@/lib/actions/invoice.actions";

export default async function LatestInvoicesWrapper({
    sectionTitle,
    sectionFooterText,
    sectionDescription,
}: {
    sectionTitle: string;
    sectionFooterText: string;
    sectionDescription: string;
}) {
    const latestInvoices = await fetchLatestInvoices();

    return (
        <Card className="col-span-4 md:col-span-3">
            <CardHeader>
                <CardTitle>{sectionTitle}</CardTitle>
                <CardDescription>
                    {latestInvoices?.length} {sectionDescription}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {latestInvoices?.map((invoice, i) => {
                    return (
                        <div
                            key={invoice.id}
                            className="flex flex-row items-center justify-between py-4"
                        >
                            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                                <AvatarImage
                                    src={
                                        "https://utfs.io/f/f41e86b4-9d2a-45b3-89ba-746fe220ed8e-ke5lr6.png"
                                    }
                                    alt="Avatar"
                                />
                                <AvatarFallback>JL</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {invoice.invoice_name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {invoice.customer.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {invoice.invoice_date ? invoice.invoice_date.toString() : ''}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">
                                {invoice.invoice_amount}
                            </div>
                        </div>
                    );
                })}
                <div className="flex items-center pb-2">
                    <RefreshCcw className="h-5 w-5" />
                    <h3 className="ml-2 text-sm">{sectionFooterText}</h3>
                </div>
            </CardContent>
        </Card>
    );
}
