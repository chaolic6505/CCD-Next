import { Metadata } from "next";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { InvoicesSkeleton } from "@/components/shared/skeletons";
import { TabsContent } from "@/components/ui/tabs";

// import InvoiceLayout from "./(shared)/invoice-layout";
// import InvoicesTable from "./(shared)/invoices-table";
// import InvoicesSummaryWrapper from "./(shared)/invoices-card-summary";
import CollectionCardsWrapper from "./(shared)/collection-cards-wrapper";

import {
    fetchInvoicesPages,
    fetchFilteredInvoices,
} from "@/lib/actions/invoice.actions";
import { fetchCustomers } from "@/lib/actions/customer.actions";
import { fetchLatestInvoices } from "@/lib/actions/invoice.actions";

export const metadata: Metadata = {
    title: "Collections",
};
import CollectionLayout from "./(shared)/collections-layout";



export default async function CollectionsPage({
    searchParams,
}: {
    searchParams?: {
        page?: string;
        query?: string;
    };
}) {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) return redirect("/");

    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const customers = await fetchCustomers();
    const invoices = await fetchLatestInvoices();
    // const invoices = await fetchFilteredInvoices(query, currentPage);
    const pagesData = await fetchInvoicesPages(query);
    const totalPages = 0;
    const total = 0;

    return (
        <CollectionLayout
            total={total}
            customers={customers || []}
            totalPages={totalPages || 0}
        >
            <TabsContent value="cards" className="space-y-4">
                <Suspense
                    key={query + currentPage}
                    fallback={<InvoicesSkeleton />}
                >
                    <CollectionCardsWrapper invoices={invoices || []} />
                </Suspense>
            </TabsContent>
        </CollectionLayout>
    );
}
