"use client";

import { Suspense } from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton"; // Assume this component exists

import CollectionCard from "./collection-card";
import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";

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

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

export default function CollectionsPage() {
    const [isAddingNew, setIsAddingNew] = useState(false);

    const { results, status, loadMore } = usePaginatedQuery(
        api.document.getPaginatedDocuments,
        {},
        {
            initialNumItems: 1,
        }
    );
    //console.log(results);
    const handleAddNew = () => {
        setIsAddingNew(true);
        // Logic to add new user
        console.log("Adding new user");
        // After adding, set isAddingNew back to false
        // setIsAddingNew(false);
    };

    if (results === undefined) {
        return <SkeletonCard />;
    }

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <div className="flex items-start justify-between">
                    <Heading
                        title={`Collections (${results?.length ?? 0})`}
                        description="Manage your collections"
                    />
                    <Button
                        // onClick={() => loadMore(1)}
                        className="text-xs md:text-sm"
                        disabled={status !== "CanLoadMore"}
                    >
                        {isAddingNew ? (
                            <SkeletonCard />
                        ) : (
                            <Plus className="mr-2 h-4 w-4" />
                        )}
                        Add New
                    </Button>
                </div>
                <Separator />
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" disabled>
                            Analytics
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">

                        {results && results.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {results.map((doc) => (
                                    <Card key={doc._id}>
                                        {/* Display document information here */}
                                        <h3>{doc.title}</h3>
                                        <p>{doc.description}</p>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p>
                                No collections found. Add some to get started!
                            </p>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}
