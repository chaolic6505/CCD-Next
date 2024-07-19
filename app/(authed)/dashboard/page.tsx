import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RecentSales } from "@/components/recent-sales";
import { BarGraph } from "@/components/charts/bar-graph";
import { PieGraph } from "@/components/charts/pie-graph";
import { AreaGraph } from "@/components/charts/area-graph";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const cards = [
    {
        title: "Total Revenue",
        icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
        value: "$45,231.89",
        change: "+20.1% from last month",
    },
    {
        title: "Subscriptions",
        icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
        value: "+2350",
        change: "+180.1% from last month",
    },
    {
        title: "Sales",
        icon: "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z M2 10h20",
        value: "+12,234",
        change: "+19% from last month",
    },
    {
        title: "Active Now",
        icon: "M22 12h-4l-3 9L9 3l-3 9H2",
        value: "+573",
        change: "+201 since last hour",
    },
];

interface DashboardCardProps {
    index: number;
    title: string;
    icon: string;
    value: string;
    change: string;
}

const DashboardCard = ({ title, icon, value, change, index }: DashboardCardProps) => {
    return (
        <Card
            key={index}
            className="group rounded-lg border px-5 py-4 transition-colors hover:bg-slate-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <svg
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d={icon} />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    );
};
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
                            {cards.map((card, index) =>
                                DashboardCard({ ...card, index })
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <div className="col-span-4">
                                <BarGraph />
                            </div>
                            <Card className="col-span-4 md:col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Sales</CardTitle>
                                    <CardDescription>
                                        You made 265 sales this month.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales />
                                </CardContent>
                            </Card>
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
