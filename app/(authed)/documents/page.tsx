"use client";


import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";
import { UserNoteForm } from "@/components/forms/user-note-form";
import { use } from "react";

const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Notes", link: "/notes" },
];
export default function page() {
const documents = useQuery(api.document.getDocuments, {});
console.log(documents);
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                {/* <UserNoteForm categories={[]} initialData={null} /> */}
            </div>
        </ScrollArea>
    );
}
