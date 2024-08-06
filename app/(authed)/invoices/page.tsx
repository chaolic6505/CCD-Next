import { Metadata } from "next";
import { Suspense } from "react";

import Search from "@/components/shared/search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InvoicesTableSkeleton } from "@/components/shared/skeletons";

import Pagination from "./(shared)/pagination";
import InvoicesTable from "./(shared)/invoices-table";
import { fetchInvoicesPages } from "@/lib/actions/invoice.actions";

export const metadata: Metadata = {
    title: "Invoices",
};

const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Invoices", link: "/invoices" },
];

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

    const totalPages = await fetchInvoicesPages(query);

    return (
        <div className="flex-1 space-y-4  p-4 pt-1 md:p-8">
            <Search placeholder="Search invoices..." />
            <Suspense
                key={query + currentPage}
                fallback={<InvoicesTableSkeleton />}
            >
                <InvoicesTable query={query} currentPage={currentPage} />
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </Suspense>
        </div>
    );
}
