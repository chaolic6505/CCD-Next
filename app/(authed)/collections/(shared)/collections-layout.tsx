"user client";

import React from "react";
import { useTranslations } from "next-intl";

import CollectionDialog from "./collection-dialog";

import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Customer } from "@/lib/definitions";

const CollectionLayout = ({
    total,
    children,
    customers,
    totalPages,
}: {
    total: number;
    totalPages: number;
    children: React.ReactNode;
    customers: Customer[];
}) => {
    const t = useTranslations('InvoicePage');

    return (
        <ScrollArea className="h-screen">
            <div className="flex-1 space-y-4  p-4 pt-1 md:p-8">
                <Tabs defaultValue="cards" className="space-y-4">
                    <div className="flex items-start justify-start">
                        {customers ? <CollectionDialog customers={customers} /> : null}

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

export default CollectionLayout;


