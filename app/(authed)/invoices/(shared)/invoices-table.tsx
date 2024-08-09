import { columns } from "./columns";

import { Invoice } from "@/types";
import { DataTable } from "@/components/ui/data-table";

export default async function InvoicesTable({
    invoices,
}: {
    invoices: Invoice[];
}) {
    return (
        <DataTable
            data={invoices}
            columns={columns}
            hideSearchBar={true}
            hidePagination={true}
        />
    );
}
