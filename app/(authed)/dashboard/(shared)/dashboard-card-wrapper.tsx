import { BanknoteIcon, ClockIcon, InboxIcon, UsersIcon } from "lucide-react";

import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

import { fetchCardData } from "@/lib/actions/invoice.actions";

interface DashboardCardProps {
    title: string;
    change: string;
    value: number | string;
    type: "invoices" | "customers" | "pending" | "collected";
}

const iconMap = {
    collected: BanknoteIcon,
    customers: UsersIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export const DashboardCard = ({
    type,
    title,
    value,
    change,
}: DashboardCardProps) => {

    const Icon = iconMap[type];

    return (
        <Card
            className="group rounded-lg border px-5 py-4 transition-colors hover:bg-slate-600 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon ? <Icon className="h-5 w-5" /> : null}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    );
};

export default async function DashboardCardsWrapper({
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
            <DashboardCard
                type="collected"
                title={card1Title}
                value={totalPaidInvoices}
                change={"+20.1% from last month"}
            />
            <DashboardCard
                type="pending"
                title={card2Title}
                value={totalPendingInvoices}
                change={"+20.1% from last month"}
            />
            <DashboardCard
                type="invoices"
                title={card3Title}
                value={numberOfInvoices}
                change={"+20.1% from last month"}
            />
            <DashboardCard
                type="customers"
                title={card4Title}
                value={numberOfCustomers}
                change={"+20.1% from last month"}
            />
        </>
    );
}
