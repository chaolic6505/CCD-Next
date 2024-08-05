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

export default async function LatestInvoicesWrapper() {
    const latestInvoices = await fetchLatestInvoices();

    return (
        <Card className="col-span-4 md:col-span-3">
            <CardHeader>
                <CardTitle>Recent invoices</CardTitle>
                <CardDescription>
                    {latestInvoices.length} new invoices
                </CardDescription>
            </CardHeader>
                <CardContent>
                        {latestInvoices.map((invoice, i) => {
                            return (
                                <div
                                    key={invoice.id}
                                    className="flex flex-row items-center justify-between py-4"
                                >
                                    <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                                        <AvatarImage src={'https://utfs.io/f/f41e86b4-9d2a-45b3-89ba-746fe220ed8e-ke5lr6.png'} alt="Avatar" />
                                        <AvatarFallback>JL</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {invoice.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {invoice.email}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">{invoice.amount}</div>
                                </div>
                            );
                        })}
                    <div className="flex items-center pb-2 pt-6">
                        <RefreshCcw className="h-5 w-5" />
                        <h3 className="ml-2 text-sm">
                            Updated just now
                        </h3>
                    </div>
            </CardContent>
        </Card>
    );
}




