"use client";

import { useTranslations } from 'next-intl';

import { Invoice } from "@/types";
import CollectionCard from "./collection-card";

export default function CollectionsCardsWrapper({
    collections,
}: {
            collections: any[];
}) {
    const t = useTranslations('InvoicePage');
    if (!collections) return null;
    return (
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {collections.map((collection, index) => (
                <CollectionCard
                    key={index}
                    collection={collection}
                    invoice_date_label={t('invoice_date_label')}
                    customer_name_label={t('customer_name_label')}
                    customer_email_label={t('customer_email_label')}
                />
            ))}
        </div>
    );
}
