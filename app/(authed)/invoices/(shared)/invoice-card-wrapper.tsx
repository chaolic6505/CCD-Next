"use client";

import { useTranslations } from 'next-intl';

import { Invoice } from "@/types";
import InvoiceCard from "./invoice-card";

export default function InvoicesCardsWrapper({
    invoices,
}: {
    invoices: Invoice[];
}) {
    const t = useTranslations('InvoicePage');
    if (!invoices) return null;
    return (
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {invoices.map((invoice, index) => (
                <InvoiceCard
                    key={index}
                    invoice={invoice}
                    invoice_date_label={t('invoice_date_label')}
                    customer_name_label={t('customer_name_label')}
                    customer_email_label={t('customer_email_label')}
                />
            ))}
        </div>
    );
}
