import React from 'react';
import { useTranslations } from "next-intl";

import { inter } from "@/components/shared/fonts";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface CardTitleWrapperProps {
    invoice_name: string | null;
}

export default function CardTitleWrapper({ invoice_name }: CardTitleWrapperProps) {
    const t = useTranslations('InvoicePage');

    return (
        <div className="px-1">
            <CardDescription className="truncate">
                {t('cardTitle')}
            </CardDescription>
            <CardTitle className={`${inter.className} `}>
                {invoice_name}
            </CardTitle>
        </div>
    );
}