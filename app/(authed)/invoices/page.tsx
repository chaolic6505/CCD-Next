import { Metadata } from "next";
import { Suspense } from "react";

import {
    InvoicesSkeleton,
    InvoicesTableSkeleton,
} from "@/components/shared/skeletons";
import { TabsContent } from "@/components/ui/tabs";

import InvoiceLayout from "./(shared)/invoice-layout";
import InvoicesTable from "./(shared)/invoices-table";
import InvoicesCardsWrapper from "./(shared)/invoice-card-wrapper";

import {
    fetchFilteredInvoices,
    fetchInvoicesPages,
} from "@/lib/actions/invoice.actions";
import { fetchCustomers } from "@/lib/actions/customer.actions";

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

    return (
        <InvoiceLayout
            total={total}
            customers={customers}
            totalPages={totalPages}
        >
            <TabsContent value="table" className="space-y-4">
                <Suspense
                    key={query + currentPage}
                    fallback={<InvoicesTableSkeleton />}
                >
                    <InvoicesTable
                        hideSearchBar
                        hidePagination
                        invoices={invoices}
                    />
                </Suspense>
            </TabsContent>
            <TabsContent value="cards" className="space-y-4">
                <Suspense
                    key={query + currentPage}
                    fallback={<InvoicesSkeleton />}
                >
                    <InvoicesCardsWrapper invoices={invoices} />
                </Suspense>
            </TabsContent>
        </InvoiceLayout>
    );
}
