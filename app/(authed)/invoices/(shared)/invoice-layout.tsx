"user client";

import React, { Suspense } from "react";
import { useTranslations } from "next-intl";

import Pagination from "./pagination";
import InvoiceDialog from "./invoice-dialog";


import SearchBar from "@/components/search-bar";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoicesSummaryWrapper from "./invoices-card-summary";
import { CardsSkeleton } from "@/components/shared/skeletons";
import { CustomerField } from "@/lib/definitions";

const InvoiceLayout = ({
    total,
    children,
    customers,
    totalPages,
}: {
    total: number;
    totalPages: number;
    children: React.ReactNode;
    customers: CustomerField[];
}) => {
    const t = useTranslations('InvoicePage');

    return (
        <ScrollArea className="h-screen">
            <div className="flex-1 space-y-4  p-4 pt-1 md:p-8">
                <Tabs defaultValue="cards" className="space-y-4">
                    <div className="flex items-start justify-start">
                        {customers ? <InvoiceDialog customers={customers} /> : null}

                        <TabsList>
                            <TabsTrigger value="cards">
                                {t('tab1')}
                            </TabsTrigger>
                            <TabsTrigger value="table">
                                {t('tab2')}
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="flex w-full justify-center">
                        <Pagination totalPages={totalPages} />
                    </div>
                    <SearchBar placeholder={t('search')} />
                    {children}
                </Tabs>
            </div>
        </ScrollArea>
    );
};

export default InvoiceLayout;


