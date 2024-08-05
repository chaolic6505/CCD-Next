import Image from "next/image";

import {
    Card,

} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const cards = [
    {
        url: "https://utfs.io/f/f41e86b4-9d2a-45b3-89ba-746fe220ed8e-ke5lr6.png",
        title: "Total Revenue",
        icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
        value: "$45,231.89",
        change: "+20.1% from last month",
    },
    {
        url: "https://utfs.io/f/438a4433-1a21-443f-a8b0-6cbd04c3827d-1tn2lc.jpeg",
        title: "Subscriptions",
        icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
        value: "+2350",
        change: "+180.1% from last month",
    },
    {
        url: "https://utfs.io/f/4ef7c58e-6e4a-4acf-be71-200af43bec99-2487m.jpeg",
        title: "Sales",
        icon: "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z M2 10h20",
        value: "+12,234",
        change: "+19% from last month",
    },
    {
        url: "https://utfs.io/f/f41e86b4-9d2a-45b3-89ba-746fe220ed8e-ke5lr6.png",
        title: "Active Now",
        icon: "M22 12h-4l-3 9L9 3l-3 9H2",
        value: "+573",
        change: "+201 since last hour",
    },
    {
        url: "https://utfs.io/f/438a4433-1a21-443f-a8b0-6cbd04c3827d-1tn2lc.jpeg",
        title: "Sales",
        icon: "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z M2 10h20",
        value: "+12,234",
        change: "+19% from last month",
    },
    {
        url: "https://utfs.io/f/4ef7c58e-6e4a-4acf-be71-200af43bec99-2487m.jpeg",
        title: "Active Now",
        icon: "M22 12h-4l-3 9L9 3l-3 9H2",
        value: "+573",
        change: "+201 since last hour",
    },
];

interface ImageCardProps {
    url: string;
    index: number;
    title: string;
    icon: string;
    value: string;
    change: string;
}

const ImageCard = ({
    url,
    title,
    icon,
    value,
    change,
    index,
}: ImageCardProps) => {
    return (
        <Card key={index} className="group rounded-lg border px-1 py-1">

            <div className="overflow-hidden rounded-md">
                <Image
                    height="0"
                    src={url}
                    alt={title}
                    width="400"
                    className={cn(
                        "transition-all hover:scale-105 w-full object-cover h-96 sm:h-96"
                    )}
                />
            </div>
        </Card>
    );
};
export default function page() {
    return (
        <ScrollArea className="h-full overflow-hidden">
            <div className="flex-1 p-4 md:p-4">
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" disabled>
                            Analytics
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-1">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {cards.map((card, index) =>
                                ImageCard({ ...card, index })
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}
