import { Metadata } from "next";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
    CardsSkeleton,
    InvoicesSkeleton,
    InvoicesTableSkeleton,
} from "@/components/shared/skeletons";
import { TabsContent } from "@/components/ui/tabs";

import InvoiceLayout from "./(shared)/invoice-layout";
import InvoicesTable from "./(shared)/invoices-table";
import InvoicesCardsWrapper from "./(shared)/invoice-card-wrapper";
import InvoicesSummaryWrapper from "./(shared)/invoices-card-summary";

import {
    fetchInvoicesPages,
    fetchFilteredInvoices,
} from "@/lib/actions/invoice.actions";
import { fetchCustomers } from "@/lib/actions/customer.actions";
import { fetchLatestInvoices } from "@/lib/actions/invoice.actions";

export const metadata: Metadata = {
    title: "Invoices",
};

const InvoicesSummary = () => {
    const t = useTranslations("dashboard");

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
            <Suspense fallback={<CardsSkeleton />}>
                <InvoicesSummaryWrapper
                    card1Title={t("card1Title")}
                    card2Title={t("card2Title")}
                    card3Title={t("card3Title")}
                    card4Title={t("card4Title")}
                />
            </Suspense>
        </div>
    );
};

export default async function InvoicesPage({
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
    const res = await fetchLatestInvoices()
    // const invoices = await fetchFilteredInvoices(query, currentPage);
    const pagesData = await fetchInvoicesPages(query);
    const totalPages = 0;
    const total = 0;

    return (
        <InvoiceLayout
            total={total}
            customers={customers || []}
            totalPages={totalPages || 0}
        >
            <TabsContent value="cards" className="space-y-4">
                <Suspense
                    key={query + currentPage}
                    fallback={<InvoicesSkeleton />}
                >
                    <InvoicesCardsWrapper invoices={[]} />
                </Suspense>
            </TabsContent>
            <TabsContent value="table" className="space-y-4">
                <Suspense
                    key={query + currentPage}
                    fallback={<InvoicesTableSkeleton />}
                >
                    <InvoicesTable
                        hideSearchBar
                        hidePagination
                        invoices={[]}
                    />
                </Suspense>
            </TabsContent>

            <InvoicesSummary />
        </InvoiceLayout>
    );
}
