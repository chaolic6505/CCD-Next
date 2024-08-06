import { Metadata } from "next";

import CustomersTable from "@/components/shared/customers/table";
import { fetchFilteredCustomers } from "@/lib/actions/customer.actions";

export const metadata: Metadata = {
    title: "Customers",
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";

    const customers = await fetchFilteredCustomers(query);

    return (
        <main>
            <CustomersTable customers={customers} />
        </main>
    );
}
