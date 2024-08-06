import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductForm } from "@/components/forms/product-form";
import { ScrollArea } from "@/components/ui/scroll-area";

const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Employee", link: "/employee" },
    { title: "Create", link: "/employee/create" },
];

export default function Page() {
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <ProductForm
                    key={null}
                    initialData={null}
                    categories={[
                        { _id: "shirts", name: "shirts" },
                        { _id: "pants", name: "pants" },
                    ]}
                />
            </div>
        </ScrollArea>
    );
}
