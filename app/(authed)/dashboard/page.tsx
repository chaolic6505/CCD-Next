import { Suspense } from "react";
import { useTranslations } from 'next-intl';

import {
    CardsSkeleton,
    RevenueChartSkeleton,
    LatestInvoicesSkeleton,
} from "@/components/shared/skeletons";
import DashboardCardsWrapper from "./(shared)/dashboard-card-wrapper";
import LatestInvoicesWrapper from "./(shared)/latest-invoices-wrapper";

import { Button } from "@/components/ui/button";
import { PieGraph } from "@/components/charts/pie-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { AreaGraph } from "@/components/charts/area-graph";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";





export default function Dashboard() {
    const t = useTranslations('dashboard');

    return (
        <ScrollArea className="h-full overflow-hidden mb-10">
            <div className="flex-1 space-y-4 p-4 md:p-8 mb-10">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {t('title')} 👋
                    </h2>
                    <div className="hidden items-center space-x-2 md:flex">
                        <CalendarDateRangePicker />
                        <Button>
                            {t('download')}
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">
                            {t('overview_tab')}
                        </TabsTrigger>
                        <TabsTrigger value="analytics" disabled>
                            {t('analytics_tab')}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Suspense fallback={<CardsSkeleton />}>
                                <DashboardCardsWrapper />
                            </Suspense>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <div className="col-span-4">
                                <Suspense fallback={<LatestInvoicesSkeleton />}>
                                    <LatestInvoicesWrapper />
                                </Suspense>
                            </div>
                            <div className="col-span-4  md:col-span-3">
                                <Suspense fallback={<RevenueChartSkeleton />}>
                                    <BarGraph />
                                </Suspense>
                            </div>
                            <div className="col-span-4">
                                <AreaGraph />
                            </div>
                            <div className="col-span-4 md:col-span-3">
                                <PieGraph />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}
