import { Suspense } from "react";

import {
    CardsSkeleton,
    RevenueChartSkeleton,
    LatestInvoicesSkeleton,
} from "@/components/shared/skeletons";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { BarGraph } from "@/components/charts/bar-graph";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DashboardCardsWrapper from "./(shared)/dashboard-card-wrapper";
import LatestInvoicesWrapper from "./(shared)/latest-invoices-wrapper";
import { AreaGraph } from "@/components/charts/area-graph";
import { PieGraph } from "@/components/charts/pie-graph";

export default function page() {
    return (
        <ScrollArea className="h-full overflow-hidden mb-10">
            <div className="flex-1 space-y-4 p-4 md:p-8 mb-10">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Hi, Welcome back 👋
                    </h2>
                    <div className="hidden items-center space-x-2 md:flex">
                        <CalendarDateRangePicker />
                        <Button>Download</Button>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" disabled>
                            Analytics
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
