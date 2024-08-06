import { Metadata } from "next";

import Form from "../(shared)/create-form";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { fetchCustomers } from "@/lib/actions/customer.actions";

export const metadata: Metadata = {
    title: "Create Invoice",
};

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                items={[
                    { title: "Invoices", link: "/invoices" },
                    {
                        title: "Create Invoice",
                        link: "/invoices/create",
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}
