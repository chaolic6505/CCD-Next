import { BanknoteIcon, ClockIcon, InboxIcon, UsersIcon } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

import { fetchCardData } from "@/lib/actions/invoice.actions";
import { useTranslations } from "next-intl";

interface InvoiceCardSummaryProps {
    title: string;
    change?: string;
    value?: number | string;
    type: "invoices" | "customers" | "pending" | "collected";
}

const iconMap = {
    collected: BanknoteIcon,
    customers: UsersIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export const InvoiceCardSummary = ({
    type,
    title,
    value,
    change,
}: InvoiceCardSummaryProps) => {

    const Icon = iconMap[type];
    const t = useTranslations("dashboard");

    return (
        <Card
            className="group rounded-lg border px-5 py-4 hover:shadow-lg transition-shadow duration-300 border-transparent"
        >

            <CardHeader className="flex flex-row items-center justify-start space-y-0 pb-2">
                {Icon ? <Icon className="h-5 w-5 mr-1" /> : null}
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change ? <p className="text-xs text-muted-foreground">{change}</p> : null}

            </CardContent>
        </Card >
    );
};

export default async function InvoicesSummaryWrapper({
    card1Title,
    card2Title,
    card3Title,
    card4Title,
}: {
    card1Title: string;
    card2Title: string;
    card3Title: string;
    card4Title: string;
}) {
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();

    return (
        <>
            <InvoiceCardSummary
                type="collected"
                title={card1Title}
                value={totalPaidInvoices}
            />
            <InvoiceCardSummary
                type="pending"
                title={card2Title}
                value={totalPendingInvoices}
            />
            <InvoiceCardSummary
                type="invoices"
                title={card3Title}
                value={numberOfInvoices}
            />
            <InvoiceCardSummary
                type="customers"
                title={card4Title}
                value={numberOfCustomers}
            />
        </>
    );
}
