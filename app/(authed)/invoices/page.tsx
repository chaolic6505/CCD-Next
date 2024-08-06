import { Metadata } from "next";
import { Suspense } from "react";

import SearchBar from "@/components/search-bar";
import { Heading } from "@/components/ui/heading";
import { InvoicesTableSkeleton } from "@/components/shared/skeletons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Pagination from "./(shared)/pagination";
import InvoicesTable from "./(shared)/invoices-table";
import { fetchInvoicesPages } from "@/lib/actions/invoice.actions";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

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

    const { total, totalPages } = await fetchInvoicesPages(query);

    return (
        <div className="flex-1 space-y-4  p-4 pt-1 md:p-8">
            <Heading title={`Total Invoices (${total ?? 0})`} />
            <Separator />
            <Tabs defaultValue="table" className="space-y-4">
                <div className="flex items-start justify-between">
                    <TabsList>
                        <TabsTrigger value="table">Table</TabsTrigger>
                        <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>
                </div>
                <SearchBar placeholder="Search invoices..." />

                <TabsContent value="table" className="space-y-4">
                    <Suspense
                        key={query + currentPage}
                        fallback={<InvoicesTableSkeleton />}
                    >
                        <InvoicesTable
                            query={query}
                            currentPage={currentPage}
                        />
                        {/* <Breadcrumbs items={breadcrumbItems} /> */}
                        <div className="flex w-full justify-center">
                            <Pagination totalPages={totalPages} />
                        </div>
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    );
}
