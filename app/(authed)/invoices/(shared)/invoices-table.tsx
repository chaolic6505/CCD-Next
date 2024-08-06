import { columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";
import { fetchFilteredInvoices } from "@/lib/actions/invoice.actions";

export default async function InvoicesTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const invoices = await fetchFilteredInvoices(query, currentPage);

    return (
        <DataTable
            data={invoices}
            columns={columns}
            hideSearchBar={true}
            hidePagination={true}
        />
    );
}
