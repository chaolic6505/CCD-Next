import { Metadata } from "next";
import { Suspense } from "react";

import SearchBar from "@/components/search-bar";
import { Heading } from "@/components/ui/heading";
import { InvoicesSkeleton, InvoicesTableSkeleton } from "@/components/shared/skeletons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Pagination from "./(shared)/pagination";
import InvoicesTable from "./(shared)/invoices-table";
import InvoiceDialog from "./(shared)/invoice-dialog";
import InvoicesCardsWrapper from "./(shared)/invoice-card-wrapper";

import { fetchCustomers } from "@/lib/actions/customer.actions";
import { fetchFilteredInvoices, fetchInvoicesPages } from "@/lib/actions/invoice.actions";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
    title: "Invoices",
};

export default async function InvoicesPage({
    searchParams,
}: {
    searchParams?: {
        page?: string;
        query?: string;
    };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const customers = await fetchCustomers();
    const invoices = await fetchFilteredInvoices(query, currentPage);
    const { total, totalPages } = await fetchInvoicesPages(query);

    //console.log(invoices);
    return (
        <ScrollArea className="h-screen">
            <div className="flex-1 space-y-4  p-4 pt-1 md:p-8">
                <Heading title={`Total Invoices (${total ?? 0})`} />
                <Tabs defaultValue="table" className="space-y-4">
                    <div className="flex items-start justify-between">
                        <TabsList>
                            <TabsTrigger value="table">Table</TabsTrigger>
                            <TabsTrigger value="gallery">Gallery</TabsTrigger>
                        </TabsList>
                        <InvoiceDialog customers={customers} />
                    </div>
                    <SearchBar placeholder="Search invoices..." />

                    <TabsContent value="table" className="space-y-4">
                        <Suspense
                            key={query + currentPage}
                            fallback={<InvoicesTableSkeleton />}
                        >
                            <InvoicesTable invoices={invoices} />
                        </Suspense>
                        <div className="flex w-full justify-center">
                            <Pagination totalPages={totalPages} />
                        </div>
                    </TabsContent>
                    <TabsContent value="gallery" className="space-y-4">
                        <div className="flex w-full justify-center">
                            <Pagination totalPages={totalPages} />
                        </div>
                        <Suspense
                            key={query + currentPage}
                            fallback={<InvoicesSkeleton />}
                        >
                            <InvoicesCardsWrapper invoices={invoices} />
                        </Suspense>

                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}
